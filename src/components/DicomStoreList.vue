<template>
  <md-table v-model="filteredStores" md-sort="name" md-sort-order="asc" md-card md-fixed-header>

    <md-table-toolbar>
      <md-field class="md-toolbar-section-search">
        <md-input placeholder="Search..." v-model="search" />
      </md-field>
      <div class="gcp-black-line"></div>
    </md-table-toolbar>
    
    <md-table-empty-state :md-label="!loading && !error ? 'No stores found' : undefined">
      <Spinner v-if="loading"/>
      <md-content v-if="error" class="md-accent">{{error}}</md-content>
    </md-table-empty-state>

    <md-table-row slot="md-table-row" slot-scope="{ item }" @click="onSelect(item.name)">
      <md-table-cell md-label="DICOM STORES">{{ item.name | dicomStoreName }}</md-table-cell>
      <md-table-cell class="gcp-arrow-cell">
        <img src="../assets/arrow_right.svg" alt="">
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import Spinner from './Spinner.vue';
export default {
  name: 'DicomStoreList',
  components: { Spinner },
  filters: {
    dicomStoreName: function(store) {
      return store.split('/').splice(-1)[0];
    }
  },
  props: {
    stores: Array,
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
    filteredStores: function() {
      if (!this.search || !this.stores) return this.stores;
      const str = this.search.toLowerCase();
      return this.stores.filter(p => p.name.indexOf(str) >= 0);
    }
  }
};
</script>

<style lang="stylus">
</style>
