<template>
  <div class="app">
    <h1></h1>
    <FuzzySearch />
  </div>
</template>

<script setup lang="ts">
import FuzzySearch from './components/FuzzySearch.vue';
</script>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>