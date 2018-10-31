import { getOidcToken } from '../utils/helpers';

class GoogleCloudApi {
  setOidcStorageKey(oidcStorageKey) {
    if (!oidcStorageKey) console.error('OIDC storage key is empty');
    this.oidcStorageKey = oidcStorageKey;
  }

  get fetchConfig() {
    if (!this.oidcStorageKey) throw new Error('OIDC storage key is not set');
    const accessToken = getOidcToken(this.oidcStorageKey);
    if (!accessToken) throw new Error('OIDC access_token is not set');
    return {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };
  }

  async doRequest(url, config = {}) {
    let data = null;
    let response = null;
    try {
      const response = await fetch(url, { ...this.fetchConfig, config });
      try {
        data = await response.json();
      } catch (err) {}
      if (response.status >= 200 && response.status < 300 && data != null)
        return {
          isError: false,
          status: response.status,
          data: data
        };
      else
        return {
          isError: true,
          status: response.status,
          message: (data && data.error && data.error.message) || 'Unknown error'
        };
    } catch (err) {
      if (data && data.error) {
        return {
          isError: true,
          status: err.status,
          message: err.response.data.error.message || 'Unspecified error'
        };
      }
      return {
        isError: true,
        message: (err && err.message) || 'Oops! Something went wrong'
      };
    }
  }

  async loadProjects() {
    return this.doRequest('https://cloudresourcemanager.googleapis.com/v1/projects');
  }

  async loadLocations(projectId) {
    return this.doRequest(
      `https://healthcare.googleapis.com/v1alpha/projects/${projectId}/locations`
    );
  }

  async loadDatasets(projectId, locationsIds) {
    const promises = locationsIds.map(locationId =>
      this.doRequest(
        `https://healthcare.googleapis.com/v1alpha/projects/${projectId}/locations/${locationId}/datasets`
      )
    );
    return Promise.all(promises).then(replies => {
      let datasets = [];
      replies.forEach(r => {
        if (r.isError) return r;
        if (r.data.datasets) datasets = datasets.concat(r.data.datasets);
      });
      return {
        status: 200,
        data: {
          datasets
        }
      };
    });
  }

  async loadDicomStores(dataset) {
    return this.doRequest(`https://healthcare.googleapis.com/v1alpha/${dataset}/dicomStores`);
  }
}

export default new GoogleCloudApi();
