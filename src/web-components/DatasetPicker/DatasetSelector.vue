<template>
  <div class="gcp-picker">
    <div class="gcp-dicom-picker__exit" v-if="canClose != undefined" @click="onClose"/>
    <div class="gcp-picker--title">Google Cloud Healthcare API</div>
    <StageIndicator :project="project" :location="location" :dataset="dataset" :onProjectClick="onProjectClick" :onLocationClick="onLocationClick" :onDatasetClick="onDatasetClick"/>
    <ProjectPicker v-if="!project" :onSelect="onProjectSelect"/>
    <LocationPicker v-if="project && !location" :project="project" :onSelect="onLocationSelect"/>
    <DatasetPicker v-if="project && location && !dataset" :project="project" :location="location" :onSelect="onDatasetSelect"/>
    <DicomStorePicker v-if="project && dataset" :dataset="dataset" :onSelect="onDicomStoreSelect"/>
  </div>
</template>

<script>
import '../common.js';
import api from '../../services/GoogleCloudApi';
import StageIndicator from '../../components/StageIndicator.vue';
import LocationPicker from '../../components/LocationPicker.vue';
import ProjectPicker from '../../components/ProjectPicker.vue';
import DatasetPicker from '../../components/DatasetPicker.vue';
import DicomStorePicker from '../../components/DicomStorePicker.vue';

export default {
  name: 'DatasetSelector',
  components: {
    StageIndicator,
    ProjectPicker,
    LocationPicker,
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
      location: null,
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
    onLocationSelect(location) {
      this.location = location;
    },
    onDatasetSelect(dataset) {
      this.dataset = dataset;
    },
    onProjectClick() {
      this.dataset = null;
      this.location = null;
      this.project = null;
    },
    onLocationClick() {
      this.dataset = null;
      this.location = null;
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
        wadoUriRoot: `https://healthcare.googleapis.com/v1beta1/${dicomStore}/dicomWeb`,
        qidoRoot: `https://healthcare.googleapis.com/v1beta1/${dicomStore}/dicomWeb`,
        wadoRoot: `https://healthcare.googleapis.com/v1beta1/${dicomStore}/dicomWeb`,
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
  width 650px
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
