<template>
  <div class="gcp-picker">
    <div class="gcp-dicom-picker__exit" v-if="canClose != undefined" @click="onClose"/>
    <div class="gcp-picker--title">Google Cloud Healthcare API</div>
    <StageIndicator :project="project" :dataset="dataset" :onProjectClick="onProjectClick" :onDatasetClick="onDatasetClick"/>
    <ProjectPicker v-if="!project" :onSelect="onProjectSelect"/>
    <DatasetPicker v-if="project && !dataset" :project="project" :onSelect="onDatasetSelect"/>
    <DicomStorePicker v-if="project && dataset" :dataset="dataset" :onSelect="onDicomStoreSelect"/>
  </div>
</template>

<script>
import '../common.js';
import api from '../../services/GoogleCloudApi';
import StageIndicator from '../../components/StageIndicator.vue';
import ProjectPicker from '../../components/ProjectPicker.vue';
import DatasetPicker from '../../components/DatasetPicker.vue';
import DicomStorePicker from '../../components/DicomStorePicker.vue';

export default {
  name: 'DatasetSelector',
  components: {
    StageIndicator,
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
    oidcKey: {
      type: String,
      required: true
    },
    canClose: String
  },
  data: function() {
    return {
      project: null,
      dataset: null,
      unloading: false
    };
  },
  created: function() {
    api.setOidcStorageKey(this.oidcKey);
  },
  methods: {
    onProjectSelect(project) {
      this.project = project;
    },
    onDatasetSelect(dataset) {
      this.dataset = dataset;
    },
    onProjectClick() {
      this.dataset = null;
      this.project = null;
    },
    onDatasetClick() {
      this.dataset = null;
    },
    onClose() {
      window.$('#' + this.$props.id).trigger(this.$props.event, null);
    },
    onDicomStoreSelect(dicomStore) {
      if (this.unloading) return;
      const parts = dicomStore.split('/');
      this.unloading = true;
      const result = {
        wadoUriRoot: `https://healthcare.googleapis.com/v1alpha/${dicomStore}/dicomWeb`,
        qidoRoot: `https://healthcare.googleapis.com/v1alpha/${dicomStore}/dicomWeb`,
        wadoRoot: `https://healthcare.googleapis.com/v1alpha/${dicomStore}/dicomWeb`,
        project: parts[1],
        location: parts[3],
        dataset: parts[5],
        dicomStore: parts[7],
      };
      window.$('#' + this.$props.id).trigger(this.$props.event, result);
    }
  }
};
</script>

<style lang="stylus">
@import '../../components/common.styl'

.gcp-picker
  font-family 'Roboto', Helvetica, Arial, sans-serif
  box-sizing border-box
  -webkit-font-smoothing antialiased
  width 600px
  height 600px
  background-color #161A1F
  padding 20px 30px
  position relative
.gcp-dicom-picker__exit
  cursor pointer
  position absolute
  top 30px
  right 30px
  width 14px !important
  height 14px !important
  background-image url('../../assets/Icon-24px-Close.svg')
  filter opacity(0.5)
  &:hover
    filter opacity(1)
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
