<template>
  <div class="gcp-stage-indicator">
    <div :class="['gcp-stage-block', {selected: project, active: stage === 0}]" @click="onProjectClick">
      <div v-if="project" class="gcp-stage-title">Project</div>
      <span class="gcp-stage-block-text">{{projectLabel}}</span>
    </div>
    <div :class="['gcp-stage-block', {selected: location, active: stage === 1}]" @click="onLocationClick">
      <div v-if="location" class="gcp-stage-title">Location</div>
      <span class="gcp-stage-block-text">{{locationLabel}}</span>
    </div>
    <div :class="['gcp-stage-block', {selected: dataset, active: stage === 2}]" @click="onDatasetClick">
      <div v-if="dataset" class="gcp-stage-title">Dataset</div>
      <span class="gcp-stage-block-text">{{datasetLabel}}</span>
    </div>
    <div :class="['gcp-stage-block', {active: stage === 3}]">
      <span class="gcp-stage-block-text">{{storeLabel}}</span>
    </div>
  </div>
</template>

<script>


export default {
  name: 'StageIndicator',
  props: {
    project: Object,
    location: Object,
    dataset: Object,
    onProjectClick: Function,
    onLocationClick: Function,
    onDatasetClick: Function
  },
  computed: {
    stage: function() {
      if (!this.project) return 0;
      if (!this.location) return 1;
      if (!this.dataset) return 2;
      return 3;
    },
    projectLabel: function() {
      if (this.project) return this.project.name;
      return 'Choose PROJECT';
    },
    locationLabel: function() {
      if (this.location) return this.location.locationId;
      if (this.stage === 1) return 'Choose LOCATION';
      return 'LOCATION';
    },
    datasetLabel: function() {
      if (this.dataset) return this.dataset.name.split('/').slice(-1)[0];
      if (this.stage === 2) return 'Choose DATASET';
      return 'DATASET';
    },
    storeLabel: function() {
      if (this.stage === 3) return 'Choose DICOM STORE';
      return 'DICOM STORE';
    }
  }
};
</script>

<style lang="stylus">
.gcp-stage-indicator
  display flex
  justify-content space-between
  margin 30px 5px
.gcp-stage-block
  height 34px
  flex-basis 24%
  max-width 24%
  border 1.5px dashed #2D2E2E
  border-radius 5px
  transform skewX(-15deg)
  padding-top 6px
  text-align center
  color #444444
  font-size 13px
  position relative
  cursor pointer
  &.selected
    color #999999
  &.active
    color #52ABD3
.gcp-stage-title
  position absolute
  background-color #161A1F
  height 20px
  left 5px
  top -12px
  color #555555
.gcp-stage-block-text
  text-overflow: ellipsis
  white-space nowrap
  overflow hidden
  display block
  padding 0 5px
  font-size 12px
</style>
