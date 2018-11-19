<template>
  <div class="gcp-dicom-uploader">
    <div class="gcp-dicom-uploader__top">
      <div class="gcp-dicom-uploader__uploading">
        {{status}}
        <span v-if="percents">{{percents}}%</span>
        <div class="gcp-dicom-uploader__exit" @click="onCloseClick"/>
      </div>
    </div>
    <FilesSelector v-if="files == null" :onSelect="onSelectFiles"/>
    <div v-else>
      <div :class="['gcp-dicom-uploader__progress_block', {'gcp-has-error': errorsCount && isFilesListHidden}]" @click="isFilesListHidden = !isFilesListHidden">
        <md-progress-bar class="gcp-dicom-uploader__progress" md-mode="determinate" :md-value="percents"/>
        <div class="gcp-dicom-uploader__status">
          <div class="gcp-dicom-uploader__status-left">
            <div :class="['gcp-status-icon', statusIcon]"/>
            <span class="gcp-dicom-uploader__error-message">{{errorsMessage}}</span>
            <span class="gcp-last-file">{{lastFile}}</span>
            <span class="gcp-dicom-uploader__volume">
              {{volumeLeft}}
            </span>
          </div>
          <div class="gcp-dicom-uploader__status-right">
            {{filesLeft}}
          </div>
        </div>
      </div>
      <UploaderFilesList :files="uploadedList" :isHidden="isFilesListHidden"/>
      <div class="gcp-dicom-uploader__bottom">
        <md-button class="gcp-dicom-uploader__cancel-btn" @click="onButtonClick">{{buttonCaption}}</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import '../common.js';
import FilesSelector from '../../components/FilesSelector';
import UploaderFilesList from '../../components/UploaderFilesList';
import dicomUploader from '../../services/DicomUploadService';
import CancellationToken from '../../utils/CancellationToken';
import { formatFileSize } from '../../utils/helpers';

export default {
  name: 'DicomUploader',
  components: { FilesSelector, UploaderFilesList },
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
    status: 'Upload',
    isCancelled: false,
    errorsCount: 0,
    files: null,
    uploadedVolume: null,
    wholeVolumeStr: null,
    isFilesListHidden: true,
    timeLeft: null,
    uploadedList: null, //[{}],
    totalCount: 0,
    successfullyUploadedCount: 0,
    lastFile: '',
    uploadContext: null // this is probably not needed, but we use this variable to destinguish between different downloads
  }),
  computed: {
    filesLeft() {
      if (!this.totalCount) return '';
      return this.successfullyUploadedCount + ' of ' + this.totalCount;
    },
    volumeLeft() {
      if (!this.wholeVolumeStr) return '';
      let left = formatFileSize(this.uploadedVolume);
      if (left.indexOf(' ') >= 0 && left.split(' ')[1] === this.wholeVolumeStr.split(' ')[1])
        left = left.split(' ')[0];
      return left + ' of ' + this.wholeVolumeStr;
    },
    percents() {
      if (!this.files || !this.uploadedList) return 0;
      return parseInt((100 * this.uploadedList.length) / Object.keys(this.files).length);
    },
    isFinished() {
      return this.isCancelled || Object.keys(this.files).length === this.uploadedList.length;
    },
    buttonCaption() {
      return this.isFinished ? 'Close' : 'Cancel';
    },
    errorsMessage() {
      if (!this.errorsCount) return '';
      const errors = this.errorsCount === 1 ? ' error' : ' errors';
      return this.errorsCount + errors + ' while uploading, click for more info';
    },
    statusIcon() {
      if (this.errorsCount) return 'gcp-error-icon';
      let icon = 'gcp-status-icon';
      if (!this.isFilesListHidden) icon += ' gcp-icon-turned';
      return icon;
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
      this.status = 'Uploading...';
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
        this.uploadedVolume += file.size;
      } else {
        file.error = error;
        this.errorsCount += 1;
      }
      this.lastFile = file.name;
      this.uploadedList.push(file);
    },
    onCloseClick() {
      if (this.cancellationToken) this.cancellationToken.set(true);
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
@import '../../components/common.styl'

.gcp-dicom-uploader
  font-family 'Roboto', Helvetica, Arial, sans-serif
  box-sizing border-box
  -webkit-font-smoothing antialiased
  background-color #161A1F
  width 536px
  padding 30px
.gcp-dicom-uploader__exit
  cursor pointer
  float right
  width 14px !important
  height 14px !important
  background-image url('../../assets/Icon-24px-Close.svg')
  filter opacity(0.5)
  &:hover
    filter opacity(1)
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
  cursor pointer
.gcp-dicom-uploader__status
  position absolute
  line-height 40px
  top 0
  width 100%
  font-size 14px
  white-space nowrap
.gcp-dicom-uploader__status-left
  float left
  padding-right 12px
  display flex
  position relative
.gcp-last-file
  text-overflow ellipsis
  overflow hidden
  max-width 120px
  min-width 120px
.gcp-dicom-uploader__status-right
  float right
  padding 0 12px
.gcp-dicom-uploader__volume
  padding-left 10px
  opacity 0.5
.gcp-dicom-uploader__bottom
  height 50px
.gcp-dicom-uploader__cancel-btn
  float right
  margin-top 20px
  text-transform none
  font-size 13px
  height 32px
  width 80px
  background-color #52ABD3
.gcp-status-icon
  padding 2px 18px
  background-position center center
  background-repeat no-repeat
  background-image url('./Icon-Arrow.svg')
.gcp-icon-turned
  transform rotate(90deg)
  margin-top -2px
.gcp-error-icon
  padding-top 3px
  background-image url('./Icon-Warn.svg')
.gcp-dicom-uploader__error-message
  position absolute
  z-index -10
  padding-left 38px
  font-size 14px
.gcp-dicom-uploader__progress_block.gcp-has-error
  &:hover
    background-color red
    .gcp-last-file, .gcp-dicom-uploader__volume
      z-index -10
    .gcp-dicom-uploader__error-message
      z-index 1
</style>
