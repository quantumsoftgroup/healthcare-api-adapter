<template>  
   <div v-html="icon"></div>
</template>  

<script>
export default {
  name: 'SvgIcon',
  inheritAttrs: true,
  props: {
    icon: {
      type: String,
      required: true
    }
  }
};
</script>
