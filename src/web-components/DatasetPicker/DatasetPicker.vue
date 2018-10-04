<template>
  <div class="gcp-picker">
    <div class="gcp-picker--title">Selecting dataset</div>
    <ProjectPicker v-if="!projectId" :onSelect="onProjectSelect"/>
    <DatasetPicker v-if="projectId && !dataset" :projectId="projectId" :onSelect="onDatasetSelect"/>
    <DicomStorePicker v-if="projectId && dataset" :dataset="dataset" :onSelect="onDicomStoreSelect"/>
  </div>
</template>

<script>
import '../common.js';
import api from '../../services/GoogleCloudApi';
import ProjectPicker from '../../components/ProjectPicker.vue';
import DatasetPicker from '../../components/DatasetPicker.vue';
import DicomStorePicker from '../../components/DicomStorePicker.vue';

export default {
  name: 'GcpPicker',
  components: {
    ProjectPicker,
    DatasetPicker,
    DicomStorePicker
  },
  props: {
    id: {
      type: String,
      required: true
    },
    event: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      projectId: null,
      dataset: null,
      unloading: false
    };
  },
  created: function() {
    api.setAuthToken(this.token);
  },
  methods: {
    onProjectSelect(projectId) {
      this.projectId = projectId;
    },
    onDatasetSelect(dataset) {
      this.dataset = dataset;
    },
    onDicomStoreSelect(dataset) {
      if (this.unloading) return;
      this.unloading = true;
      const result = {
        wadoUriRoot: `https://healthcare.googleapis.com/v1alpha/${dataset}/dicomWeb`,
        qidoRoot: `https://healthcare.googleapis.com/v1alpha/${dataset}/dicomWeb`,
        wadoRoot: `https://healthcare.googleapis.com/v1alpha/${dataset}/dicomWeb`
      };
      window.$('#' + this.$props.id).trigger(this.$props.event, result);
    }
  }
};
</script>

<style lang="stylus">
@import '../../../node_modules/vue-material/dist/vue-material.min.css'
@import '../../../node_modules/vue-material/dist/theme/default-dark.css'
@import url('https://fonts.googleapis.com/css?family=Roboto')

.gcp-picker
  font-family 'Roboto', Helvetica, Arial, sans-serif
  box-sizing border-box
  -webkit-font-smoothing antialiased
  width 600px
  height 600px
  background-color #161A1F
  padding 20px 30px
.gcp-picker--btn
  margin auto
.gcp-picker--title
  display block
  color #FFFFFF
  font-size 24px
  line-height 28px
  text-align center
  margin 20px auto
</style>
