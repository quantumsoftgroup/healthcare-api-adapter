<template>
  <div class="gcp-files-selector">
      <md-button class="gcp-files-selector__btn-dir" @click="$refs.dirSelecor.click()"/>
      <md-button class="gcp-files-selector__btn-file" @click="$refs.fileSelecor.click()"/>
      <input ref="dirSelecor" class="gcp-invisible-input" type="file" accept="DICOM files/dcm" webkitdirectory mozdirectory @change="onSelect($event.target.files)"/>
      <input ref="fileSelecor" class="gcp-invisible-input" type="file" accept="DICOM files/*.dcm" multiple @change="onSelect($event.target.files)"/>
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
.gcp-files-selector__btn-dir,
.gcp-files-selector__btn-file {
  height: 80px !important;
  width: 228px !important;
  font-size: 14px;
  border-radius: 8px;
  margin: 0 !important;
}
.gcp-files-selector__btn-dir {
  background-image: url('../assets/Button_Folder.svg');
}
.gcp-files-selector__btn-file {
  background-image: url('../assets/Button_File.svg');
}
.gcp-invisible-input {
  position: absolute;
  display: none;
  z-index: -1000;
  max-width: 0 !important;
  max-height: 0 !important;
}
.gcp-hidden {
  display: none;
}
</style>
