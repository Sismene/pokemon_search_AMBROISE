<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
  <div id="app" class="bg-gray-100 min-h-screen">
    <SearchAndDetail />
  </div>
</template>

<script lang="ts">
import SearchAndDetail from './components/SearchAndDetail.vue';

export default {
  name: 'App',
  components: {
    SearchAndDetail
  }
};
</script>