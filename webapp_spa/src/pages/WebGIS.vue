<template>
  <q-page class="q-pt-none" :style-fn="minHeight">
    <!-- map -->
    <div><MapContainer /></div>
    <div><LoadingIndicator /></div>
    <div><MapOptionsSelection /></div>
    <div><ServiceAreaViewer /></div>
  </q-page>
</template>

<script>
import MapContainer from "components/MapContainer.vue";
import LoadingIndicator from 'components/LoadingIndicator.vue'
import MapOptionsSelection from "src/components/MapOptionsSelection.vue";
import ServiceAreaViewer from "src/components/ServiceAreaViewer.vue";

export default {
  name: "Web-GIS",

  components: { MapContainer, LoadingIndicator, MapOptionsSelection, ServiceAreaViewer },

  data() {
    return {};
  },

  mounted() {},

  methods: {
    minHeight(offset) {
      return { minHeight: offset ? `calc(90vh - ${offset}px)` : "100vh" };
    },
  },

  computed: {},
};
</script>

<style scoped></style>
