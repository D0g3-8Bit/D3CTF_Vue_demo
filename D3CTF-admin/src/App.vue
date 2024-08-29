<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup name="App">
  import {RouterView} from 'vue-router'  
</script>

<style>

html, body, .app-container {
  margin: 0;
  padding: 0;
}
</style>