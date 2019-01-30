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
    project: {
      type: Object,
      required: true
    },
    location: {
      type: Object,
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
      datasets: []
    };
  },
  created: async function() {
    this.loading = true;
    const datasetsResponse = await api.loadDatasets(this.project.projectId, this.location.locationId);
    this.loading = false;
    if (datasetsResponse.isError) {
      this.error = datasetsResponse.message;
      return;
    }
    this.datasets = datasetsResponse.data.datasets || [];
  }
};
</script>

<style lang="stylus">
</style>
