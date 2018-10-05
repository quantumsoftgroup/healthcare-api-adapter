<template>
  <div class="gcp-store-picker">
    <DicomStoreList :stores="stores" :loading="loading" :error="error" :onSelect="onSelect"/>
  </div>
</template>

<script>
import DicomStoreList from './DicomStoreList.vue';
import api from '../services/GoogleCloudApi';

export default {
  name: 'DicomStorePicker',
  components: { DicomStoreList },
  props: {
    dataset: {
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
      stores: [],
      locations: []
    };
  },
  created: async function() {
    this.loading = true;
    const response = await api.loadDicomStores(this.dataset.name);
    this.loading = false;
    if (response.isError) {
      this.error = response.message;
      return;
    }
    this.stores = response.data.dicomStores;
  },
  methods: {}
};
</script>

<style lang="stylus">
</style>
