<template>
  <div class="gcp-dicom-uploader">
    <FilesSelector v-if="files == null" :onSelect="onSelectFiles"/>
    <div v-else>
      <div class="gcp-dicom-uploader__top">
        <div class="gcp-dicom-uploader__uploading">
          {{status}}
          <span v-if="percents">{{percents}}%</span>
          <SvgIcon class="gcp-dicom-uploader__exit" :icon="require('./Icon-24px-Close.svg')" @click.native="onCloseClick"/>
        </div>
      </div>
      <div class="gcp-dicom-uploader__progress_block">
        <md-progress-bar class="gcp-dicom-uploader__progress" md-mode="determinate" :md-value="percents"/>
        <div class="gcp-dicom-uploader__status">
          <div class="gcp-dicom-uploader__status-left">
            {{lastFile}} 
            <span class="gcp-dicom-uploader__volume">
              {{volumeLeft}}
            </span>
          </div>
          <div class="gcp-dicom-uploader__status-right">
            {{filesLeft}}
          </div>
        </div>
      </div>
      <UploaderFilesList :files="uploadedList"/>
      <div class="gcp-dicom-uploader__bottom">
        <md-button class="md-raised gcp-dicom-uploader__cancel-btn" @click="onButtonClick">{{buttonCaption}}</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import '../common.js';
import SvgIcon from '../../components/SvgIcon';
import FilesSelector from '../../components/FilesSelector';
import UploaderFilesList from '../../components/UploaderFilesList';
import dicomUploader from '../../services/DicomUploadService';
import CancellationToken from '../../utils/CancellationToken';
import { formatFileSize } from '../../utils/helpers';

export default {
  name: 'DicomUploader',
  components: { FilesSelector, UploaderFilesList, SvgIcon },
  props: {
    id: {
      type: String,
      required: true
    },
    event: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    oidcKey: {
      type: String,
      required: true
    }
  },
  data: () => ({
    status: 'Uploading...',
    isCancelled: false,
    files: null,
    uploadedVolume: null,
    wholeVolumeStr: null,
    speed: null,
    timeLeft: null,
    uploadedList: null,
    totalCount: 0,
    successfullyUploadedCount: 0,
    lastFile: '',
    uploadContext: null // this is probably not needed, but we use this variable to destinguish between different downloads
  }),
  computed: {
    filesLeft: function() {
      if (!this.totalCount) return '';
      return this.successfullyUploadedCount + ' of ' + this.totalCount;
    },
    volumeLeft: function() {
      if (!this.wholeVolumeStr) return '';
      let left = formatFileSize(this.uploadedVolume);
      if (left.indexOf(' ') >= 0 && left.split(' ')[1] === this.wholeVolumeStr.split(' ')[1])
        left = left.split(' ')[0];
      return left + ' of ' + this.wholeVolumeStr;
    },
    percents: function() {
      if (!this.files || !this.uploadedList) return 0;
      return parseInt((100 * this.uploadedList.length) / Object.keys(this.files).length);
    },
    isFinished: function() {
      return this.isCancelled || Object.keys(this.files).length === this.uploadedList.length;
    },
    buttonCaption: function() {
      return this.isFinished ? 'Close' : 'Cancel';
    }
  },
  created: function() {
    dicomUploader.setOidcStorageKey(this.oidcKey);
  },
  methods: {
    onSelectFiles: function(files) {
      const filesArray = Array.from(files);
      const filesDict = {};
      filesArray.forEach((file, i) => {
        const fileDesc = {
          id: i,
          name: file.name,
          path: file.webkitRelativePath || file.name,
          size: file.size,
          error: null,
          processed: false,
          processedInUI: false
        };
        filesDict[i] = fileDesc;
        file.fileId = i;
      });
      this.files = filesDict;
      this.uploadedList = [];
      this.uploadedVolume = 0;
      this.lastFile = filesArray[0].name;
      this.totalCount = filesArray.length;
      const wholeVolume = filesArray.map(f => f.size).reduce((a, b) => a + b);
      this.wholeVolumeStr = formatFileSize(wholeVolume);
      const uploadContext = Math.random();
      this.uploadContext = uploadContext;
      this.cancellationToken = new CancellationToken();
      const uploadCallback = (fileId, error) =>
        uploadContext === this.uploadContext && this.uploadCallback.call(this, fileId, error);
      dicomUploader.smartUpload(
        files,
        this.url,
        this.token,
        uploadCallback,
        this.cancellationToken
      );
    },
    uploadCallback: function(fileId, error) {
      const file = this.files[fileId];
      file.processed = true;
      if (!error) {
        this.lastFile = file.name;
        this.uploadedVolume += file.size;
      } else file.error = error;
      this.uploadedList.push(file);
      //this.updateUI(file);
    },
    onCloseClick() {
      this.cancellationToken.set(true);
      this.onClose();
    },
    onButtonClick() {
      if (this.isFinished) this.onClose();
      else {
        this.cancellationToken.set(true);
      }
    },
    onClose() {
      window.$('#' + this.$props.id).trigger(this.$props.event);
    }
  }
};
</script>

<style lang="stylus">
@import '../../../node_modules/vue-material/dist/vue-material.min.css'
@import '../../../node_modules/vue-material/dist/theme/default-dark.css'
@import url('https://fonts.googleapis.com/css?family=Roboto')
@import '../../components/common.styl'

.gcp-dicom-uploader
  font-family 'Roboto', Helvetica, Arial, sans-serif
  box-sizing border-box
  -webkit-font-smoothing antialiased
  background-color #161A1F
  width 536px
  padding 20px 30px
.gcp-dicom-uploader__exit
  cursor pointer
  float right
  width 14px
  height 14px
.gcp-dicom-uploader__uploading
  margin 5px 0 20px
  font-size 16px
.gcp-dicom-uploader__progress
  height 40px
  background-color #07090A !important
  .md-progress-bar-fill
    background-color #52ABD3 !important
.gcp-dicom-uploader__progress_block
  position relative
.gcp-dicom-uploader__status
  position absolute
  line-height 40px
  top 0
  width 100%
  font-size 14px
.gcp-dicom-uploader__status-left
  float left
  padding 0 12px
.gcp-dicom-uploader__status-right
  float right
  padding 0 12px
.gcp-dicom-uploader__volume
  padding-left 10px
  opacity 0.5
.gcp-dicom-uploader__bottom
  height 50px
.gcp-dicom-uploader__cancel-btn
  background-color #52ABD3 !important
  float right
  margin-top 20px
  text-transform none
  font-size 13px
  height 32px
  width 80px
</style>
