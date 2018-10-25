import axios from 'axios';
import { getOidcToken } from '../utils/helpers';

class GoogleCloudApi {
  constructor() {
    this.api = axios.create({
      timeout: 15000
    });
  }

  setOidcStorageKey(oidcStorageKey) {
    /* eslint-disable */
    if (!oidcStorageKey) console.error('OIDC storage key is empty');
    this.oidcStorageKey = oidcStorageKey;
  }

  get axiosConfig() {
    if (!this.oidcStorageKey) throw new Error('OIDC storage key is not set');
    const accessToken = getOidcToken(this.oidcStorageKey);
    if (!accessToken) throw new Error('OIDC access_token is not set');
    return {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };
  }

  async doRequest(requestFunc) {
    try {
      const response = await requestFunc();
      if (response.status >= 200 && response.status < 300)
        return {
          isError: false,
          status: response.status,
          data: response.data
        };
      else
        return {
          isError: true,
          status: response.status,
          message: (response.data && response.data.message) || 'Unknown error'
        };
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
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
    return this.doRequest(() =>
      this.api.get('https://cloudresourcemanager.googleapis.com/v1/projects', this.axiosConfig)
    );
  }

  async loadLocations(projectId) {
    return this.doRequest(() =>
      this.api.get(
        `https://healthcare.googleapis.com/v1alpha/projects/${projectId}/locations`,
        this.axiosConfig
      )
    );
  }

  async loadDatasets(projectId, locationsIds) {
    const promises = locationsIds.map(locationId =>
      this.doRequest(() =>
        this.api.get(
          `https://healthcare.googleapis.com/v1alpha/projects/${projectId}/locations/${locationId}/datasets`,
          this.axiosConfig
        )
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
    return this.doRequest(() =>
      this.api.get(
        `https://healthcare.googleapis.com/v1alpha/${dataset}/dicomStores`,
        this.axiosConfig
      )
    );
  }
}

export default new GoogleCloudApi();
