<template>
  <div class="gcp-files-selector">
      <md-button class="gcp-files-selector__btn md-primary md-raised" @click="$refs.dirSelecor.click()">
        FOLDER UPLOAD
      </md-button>
      <md-button class="gcp-files-selector__btn md-primary md-raised" @click="$refs.fileSelecor.click()">
        FILES UPLOAD
      </md-button>
      <input ref="dirSelecor" class="gcp-invisible-input" type="file" webkitdirectory mozdirectory @change="onSelect($event.target.files)"/>
      <input ref="fileSelecor" class="gcp-invisible-input" type="file"  multiple @change="onSelect($event.target.files)"/>
  </div>
</template>

<script>
export default {
  name: 'FilesSelector',
  props: {
    onSelect: {
      type: Function,
      required: true
    }
  }
};
</script>


<style>
.gcp-files-selector {
  display: flex;
  justify-content: space-between;
}
.gcp-files-selector__btn {
  background-color: #52abd3 !important;
  height: 70px !important;
  width: 220px !important;
  font-size: 14px;
  border-radius: 8px;
}
.gcp-invisible-input {
  position: absolute;
  display: none;
  z-index: -1000;
  max-width: 0 !important;
  max-height: 0 !important;
}
</style>
