<template>
  <div class="gcp-picker">
    <md-button class="md-primary md-raised gcp-picker--btn" @click="select()">Select</md-button>
  </div>
</template>

<script>
import '../common.js';

export default {
  name: 'DatasetPicker',
  props: {
    id: {
      type: String,
      required: true
    },
    event: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {};
  },
  methods: {
    select: function() {
      const result = {
        wadoUriRoot:
          'https://healthcare.googleapis.com/v1alpha/projects/healthcare-api-215503/locations/us-central1/datasets/mydataset/dicomStores/mydicomstore/dicomWeb',
        qidoRoot:
          'https://healthcare.googleapis.com/v1alpha/projects/healthcare-api-215503/locations/us-central1/datasets/mydataset/dicomStores/mydicomstore/dicomWeb',
        wadoRoot:
          'https://healthcare.googleapis.com/v1alpha/projects/healthcare-api-215503/locations/us-central1/datasets/mydataset/dicomStores/mydicomstore/dicomWeb'
      };
      window.$('#' + this.$props.id).trigger(this.$props.event, result);
    }
  }
};
</script>

<style lang="stylus">
@import '../../../node_modules/vue-material/dist/vue-material.min.css'
@import '../../../node_modules/vue-material/dist/theme/default-dark.css'

.gcp-picker
  font-family 'Avenir', Helvetica, Arial, sans-serif
  box-sizing border-box
  -webkit-font-smoothing antialiased
  display flex
  width 450px
  height 300px
.gcp-picker--btn
  margin auto
</style>
