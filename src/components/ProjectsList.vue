<template>
  <md-table v-model="filteredProjects" md-sort="name" md-sort-order="asc" md-card md-fixed-header>

    <md-table-toolbar>
      <md-field class="md-toolbar-section-search">
        <md-input placeholder="Search..." v-model="search" />
      </md-field>
      <div class="gcp-black-line"></div>
    </md-table-toolbar>

    <md-table-empty-state :md-label="!loading && !error ? 'No projects found' : undefined">
      <Spinner v-if="loading"/>
      <md-content v-if="error" class="md-accent">{{error}}</md-content>
    </md-table-empty-state>

    <md-table-row slot="md-table-row" slot-scope="{ item }" @click="onSelect(item)">
      <md-table-cell md-label="PROJECT">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="ID">{{ item.projectId }}</md-table-cell>
      <md-table-cell class="gcp-arrow-cell">
        <img src="../assets/arrow_right.svg" alt="">
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import Spinner from './Spinner.vue';
export default {
  name: 'ProjectsList',
  components: { Spinner },
  props: {
    projects: Array,
    loading: Boolean,
    error: String,
    onSelect: Function
  },
  data: () => ({
    search: ''
  }),
  computed: {
    filteredProjects: function() {
      if (!this.search || !this.projects) return this.projects;
      const str = this.search.toLowerCase();
      return this.projects.filter(p => p.name.indexOf(str) >= 0);
    }
  }
};
</script>

<style lang="stylus">
</style>
