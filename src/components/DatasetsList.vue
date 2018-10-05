<template>
  <md-table v-model="datasets" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
    <md-table-empty-state :md-label="!loading && !error ? 'No datasets found' : undefined">
      <md-progress-spinner v-if="loading" md-mode="indeterminate"></md-progress-spinner>
      <md-content v-if="error" class="md-accent">{{error}}</md-content>
    </md-table-empty-state>

    <md-table-row slot="md-table-row" slot-scope="{ item }" @click="onSelect(item)">
      <md-table-cell md-label="DATASETS">{{ item.name | datasetName }}</md-table-cell>
    <md-table-cell class="gcp-arrow-cell">
      <img src="../assets/arrow_right.svg" alt="">
    </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  name: 'DatasetsList',
  filters: {
    datasetName: function(dataset) {
      return dataset.split('/').splice(-1)[0];
    }
  },
  props: {
    datasets: Array,
    loading: Boolean,
    error: String,
    onSelect: {
      type: Function,
      required: true
    }
  },
  methods: {}
};
</script>

<style lang="stylus">
</style>
