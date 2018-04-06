<template>
  <div id="app">
    <KMeans/>
  </div>
</template>

<script lang="ts">
import KMeans from './components/KMeans.vue'
import Vue from 'vue'

export default{
  name: 'App',
  components: {
    KMeans
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
