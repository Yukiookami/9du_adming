<template>
  <div id="app">
    <gndNav></gndNav>
    <router-view/>
  </div>
</template>

<script>
import gndNav from './components/gndNav'
export default {
  name: 'App',
  components: {
    gndNav
  }
}
</script>

<style>

</style>
