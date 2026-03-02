<template>
  <div id="loadingWindow" class="testClass q-pa-md" v-if="mapStore.layersLoading.length > 0">
    <p>Loading layers...</p>
    <div v-for="layer in mapStore.layersLoading" v-bind:key="layer">
      <q-spinner-tail
        color="white"
        size="20px"
        :thickness="10"
      ></q-spinner-tail>
      {{ layer }}
    </div>
  </div>
</template>

<script setup>
/*
  Imports
*/

  // pinia stores
  import { gisStore } from "stores/gis"
  const mapStore = gisStore()

</script>

<style lang="scss" scoped>
 .testClass {
  color: white;
  background-color: rgb(55, 109, 73, 0.5);
  position: absolute;
  top: 10px;
  right: 10px;
  width: auto;
  z-index: 600;
  max-width: 250px;
  pointer-events: none;
 }

 @media (max-width: $breakpoint-xs-max) {
  .testClass {
    max-width: 150px;
  }
 }
</style>