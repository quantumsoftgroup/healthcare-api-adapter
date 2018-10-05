<template>
  <div style="width:100%;height:100%" class="gcp-spinner"><div></div></div>
</template>


<style lang="stylus">
@keyframes gcp-spinner
  0%
    -webkit-transform translate(-50%, -50%) rotate(0deg)
    transform translate(-50%, -50%) rotate(0deg)
  100%
    -webkit-transform translate(-50%, -50%) rotate(360deg)
    transform translate(-50%, -50%) rotate(360deg)
@keyframes gcp-spinner
  0%
    -webkit-transform translate(-50%, -50%) rotate(0deg)
    transform translate(-50%, -50%) rotate(0deg)
  100%
    -webkit-transform translate(-50%, -50%) rotate(360deg)
    transform translate(-50%, -50%) rotate(360deg)
.gcp-spinner
  position relative
.gcp-spinner div, .gcp-spinner div:after
  position absolute
  width 92px
  height 92px
  border 12px solid #52abd3
  border-top-color transparent
  border-radius 50%
.gcp-spinner div
  -webkit-animation gcp-spinner 1s linear infinite
  animation gcp-spinner 1s linear infinite
  top 100px
  left 100px
.gcp-spinner div:after
  -webkit-transform rotate(90deg)
  transform rotate(90deg)
.gcp-spinner
  width 200px !important
  height 200px !important
  -webkit-transform translate(-100px, -100px) scale(1) translate(100px, 100px)
  transform translate(-100px, -100px) scale(1) translate(100px, 100px)
</style>
