<template>
  <transition-group
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <template v-if="ready && legendLayer.type === 'wms'">
      <q-item-section v-if="legendSide" side top style="padding-left: 0px;">
          <div>
            <img :src="legendSource" />
          </div>
      </q-item-section>
      <q-item-section v-else-if="!legendSide" style="padding-left: 45px;" class="column">
        <div>
          <img :src="legendSource" />
        </div>
      </q-item-section>
    </template>
  </transition-group>
</template>

<script>
export default {
  name: "LegendWMS",

  components: {},

  data() {
    return {
      legendLayer: this.layer,
      legendSource: null,
      legendSide: false,
      ready: false,
    };
  },

  props: {
    layer: Object,
    location: String,
  },

  watch: {},

  created() {
    if (this.legendLayer.type === "wms") {
      this.legendShape();
    }
  },

  methods: {
    legendShape() {
      let ref = this;
      const layer = this.layer;
      const legendRequest = `${layer.url}REQUEST=GetLegendGraphic&VERSION=${layer.version}&FORMAT=image/png&WIDTH=30&HEIGHT=30&LAYER=${layer.layers}`;
      const img = new Image();
      img.addEventListener("load", () => {
        if (img.naturalWidth === img.naturalHeight) {
          ref.legendSide = true;
        }
        ref.legendSource = legendRequest;
        ref.ready = true;
      });
      img.src = legendRequest;
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped></style>
