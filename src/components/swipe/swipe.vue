<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(item,index) in slideshow" :key="index">
      <img :src="item.img" alt="" >
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  props: ['slideshow']
}
</script>

<style>
img{
  width: 100%;
  height: 100%;
}
</style>
