<template>
  <md-content class="gcp-uploader-files-list md-scrollbar">
    <div :class="['gcp-uploader-files__item', {'gcp-uploader-files__error': file.error}]" 
      v-for="file in files" :key="file.id">
      <div class="gcp-uploader-files__item-text">{{file.path}}</div>
      <div class="gcp-uploader-files__error-msg" v-if="file.error">
        {{file.error}}
      </div>
    </div>
  </md-content>
</template>

<script>
export default {
  name: 'UploaderFilesList',
  props: {
    files: Array
  }
};
</script>

<style lang="stylus">
.gcp-uploader-files-list
  overflow auto
  background-color #07090A !important
  height 370px
  padding 10px 0
  border-top 1px solid gray
.gcp-uploader-files__item
  font-size 13px
  margin 3px 0
  line-height 15px
.gcp-uploader-files__item-text
  white-space nowrap
  display inline-block
  padding 0 10px
  min-width 100%
.gcp-uploader-files__error
  .gcp-uploader-files__item-text
    background-color #EC4444
.gcp-uploader-files__error-msg
  background-color #07090A
  color #EC4444
  font-weight bold
  display inline-block
  padding 0 10px 0 30px
</style>
