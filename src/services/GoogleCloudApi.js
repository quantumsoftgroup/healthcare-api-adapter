import axios from 'axios';

class GoogleCloudApi {
  setAuthToken(token) {
    this.api = axios.create({
      timeout: 15000,
      headers: { Authorization: 'Bearer ' + token }
    });
  }

  async doRequest(requestFunc) {
    try {
      const response = await requestFunc();
      /* eslint-disable */
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
          message: err.response.data.error.message
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
      this.api.get('https://cloudresourcemanager.googleapis.com/v1/projects')
    );
  }

  async loadLocations(projectId) {
    return this.doRequest(() =>
      this.api.get(`https://healthcare.googleapis.com/v1alpha/projects/${projectId}/locations`)
    );
  }

  async loadDatasets(projectId, locationsIds) {
    const promises = locationsIds.map(locationId =>
      this.doRequest(() =>
        this.api.get(
          `https://healthcare.googleapis.com/v1alpha/projects/${projectId}/locations/${locationId}/datasets`
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
      this.api.get(`https://healthcare.googleapis.com/v1alpha/${dataset}/dicomStores`)
    );
  }
}

export default new GoogleCloudApi();
