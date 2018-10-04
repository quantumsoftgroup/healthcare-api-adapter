<template>
  <div class="gcp-dataset-picker">
    <DatasetsList :datasets="datasets" :loading="loading" :error="error" :onSelect="onSelect"/>
  </div>
</template>

<script>
import DatasetsList from './DatasetsList.vue';
import api from '../services/GoogleCloudApi';

export default {
  name: 'DatasetPicker',
  components: { DatasetsList },
  props: {
    projectId: {
      type: String,
      required: true
    },
    onSelect: {
      type: Function,
      required: true
    }
  },
  data: function() {
    return {
      error: null,
      loading: false,
      datasets: [],
      locations: []
    };
  },
  created: async function() {
    this.loading = true;
    const locationsResponse = await api.loadLocations(this.projectId);
    if (locationsResponse.isError) {
      this.loading = false;
      this.error = locationsResponse.message;
      return;
    }
    this.locations = locationsResponse.data.locations;
    if (!this.locations) {
      this.datasets = [];
      this.loading = false;
    }
    const locationsIds = this.locations.map(o => o.locationId);
    const datasetsResponse = await api.loadDatasets(this.projectId, locationsIds);
    this.loading = false;
    if (datasetsResponse.isError) {
      this.error = datasetsResponse.message;
      return;
    }
    this.datasets = datasetsResponse.data.datasets;
  },
  methods: {}
};
</script>

<style lang="stylus">
</style>
