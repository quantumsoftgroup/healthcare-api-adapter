<template>
  <div class="hello">
    <p>Directory: <input type="file" webkitdirectory mozdirectory @change="selectDirectory($event.target.files)"/></p>
  </div>
</template>

<script>
import '../common.js';
import dicomUploader from '../../services/DicomUploadService';
export default {
  name: 'DicomUploader',
  props: {
    token: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    selectDirectory: function(files) {
      /* eslint-disable */
      dicomUploader.smartUpload(files, this.url, this.token);
    }
  }
};
</script>

<style lang="stylus">
</style>
