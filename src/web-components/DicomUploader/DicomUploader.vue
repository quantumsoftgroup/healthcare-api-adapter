<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import "../common.js";

export default {
  name: "DicomUploader",
  props: {
    msg: String
  }
};
</script>

<style lang="stylus">
</style>
