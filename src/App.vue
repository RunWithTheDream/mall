<template>
  <div id="app">
    <!-- <header-nav></header-nav> -->
    <router-view />
  </div>
</template>

<script>
import headerNav from './components/nav/headerNav'
export default {
  name: 'App',
  components: {
    headerNav
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
ul, li{
  list-style: none;
}
html, body{
  height: 100%;
  width: 100%;
}
#app{
  max-height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
