<template>
  <md-table v-model="filteredDatasets" md-sort="name" md-sort-order="asc" md-card md-fixed-header>

    <md-table-toolbar>
      <md-field class="md-toolbar-section-search">
        <md-input placeholder="Search..." v-model="search" />
      </md-field>
      <div class="gcp-black-line"></div>
    </md-table-toolbar>

    <md-table-empty-state :md-label="!loading && !error ? 'No locations found' : undefined">
      <Spinner v-if="loading"/>
      <md-content v-if="error" class="md-accent">{{error}}</md-content>
    </md-table-empty-state>

    <md-table-row slot="md-table-row" slot-scope="{ item }" @click="onSelect(item)">
      <md-table-cell md-label="LOCATIONS">{{ item.locationId }}</md-table-cell>
    <md-table-cell class="gcp-arrow-cell">
      <img src="../assets/arrow_right.svg" alt="">
    </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import Spinner from './Spinner.vue';
export default {
  name: 'LocationsList',
  components: { Spinner },
  props: {
    locations: Array,
    loading: Boolean,
    error: String,
    onSelect: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    search: ''
  }),
  computed: {
    filteredDatasets: function() {
      if (!this.search || !this.locations) return this.locations;
      const str = this.search.toLowerCase();
      return this.locations.filter(p => p.locationId.toLowerCase().indexOf(str) >= 0);
    }
  }
};
</script>

<style lang="stylus">
</style>
