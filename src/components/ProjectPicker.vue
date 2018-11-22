<template>
  <div class="gcp-project-picker">
    <ProjectsList :projects="projects" :loading="loading" :error="error" :onSelect="onSelect"/>
  </div>
</template>

<script>
import ProjectsList from './ProjectsList.vue';
import api from '../services/GoogleCloudApi';

export default {
  name: 'ProjectPicker',
  components: { ProjectsList },
  props: {
    onSelect: {
      type: Function,
      required: true
    }
  },
  data: function() {
    return {
      error: null,
      loading: false,
      projects: []
    };
  },
  created: function() {
    this.loading = true;
    api.loadProjects().then(r => {
      this.loading = false;
      if (r.isError) {
        this.error = r.message;
        return;
      }
      this.projects = r.data.projects || [];
    });
  },
  methods: {}
};
</script>

<style lang="stylus">
</style>
