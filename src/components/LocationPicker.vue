<template>
  <div class="gcp-location-picker">
    <LocationsList :locations="locations" :loading="loading" :error="error" :onSelect="onSelect"/>
  </div>
</template>

<script>
import LocationsList from './LocationsList.vue';
import api from '../services/GoogleCloudApi';

export default {
  name: 'LocationPicker',
  components: { LocationsList },
  props: {
    project: {
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
      locations: []
    };
  },
  created: async function() {
    this.loading = true;
    const locationsResponse = await api.loadLocations(this.project.projectId);
        this.loading = false;
    if (locationsResponse.isError) {
      this.error = locationsResponse.message;
      return;
    }
    this.locations = locationsResponse.data.locations || [];
  }
};
</script>

<style lang="stylus">
</style>
