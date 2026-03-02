<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ $t("avaliable_wms_layers") }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <div class="q-pl-lg q-pr-lg">
        <!-- layers list -->
        <q-list padding class="rounded-borders">
          <q-item-label header>{{ $t("select_wms_layer") }}</q-item-label>
          <q-item
            v-for="layerAndFeatures in layersFeatures"
            :key="layerAndFeatures.layer.id"
            clickable
            v-ripple
            class="text-blue-grey-9"
            :active="link === layerAndFeatures.layer.id"
            active-class="bg-blue-grey-1 text-blue-grey-9"
            @click="showFeatureInfo(layerAndFeatures)"
          >
            <q-item-section avatar>
              <q-icon name="layers" />
            </q-item-section>
            <q-item-section>{{
              translateProperty(layerAndFeatures.layer.title)
            }}</q-item-section>
          </q-item>
        </q-list>
        <!-- layer info -->
        <div style="height: 40vh">
          <!-- scroll -->
          <q-scroll-area
            style="width: 100%; height: 35vh"
            class="q-pr-lg q-mt-lg"
          >
            <div v-if="layerFeatures">
              <div
                v-for="feature in layerFeatures"
                :key="feature.id"
                class="q-mb-lg"
              >
                <q-markup-table flat bordered>
                  <tbody class="bg-grey-1">
                    <tr
                      v-for="(value, index) in feature.properties"
                      :key="index"
                    >
                      <td class="text-left">{{ index }}</td>
                      <td class="text-left">{{ value }}</td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
// axios
const axios = require("axios");

import cloneDeep from "lodash.clonedeep";
// lodash
// var filter = require("lodash.filter");

// pinia stores
import { gisStore } from "stores/gis";

export default {
  name: "ClickInfoWMS",

  components: {},

  // Pinia stores
  setup() {
    const mapStore = gisStore();
    return { mapStore };
  },

  props: {},

  data() {
    return {
      // layers: [],
      link: null,
      layersFeatures: [],
      layerFeatures: null,
      clickCoordinates: null,  // Store the lat/lng where user clicked
    };
  },

  watch: {},

  created() {},

  mounted() {
    this.checkLayersGetFeatures(this.layersSelectedWmsComputed);
    this.checkVectorTiles(this.mapStore.tileProps)
    this.checkPmtilesLayers(this.layersSelectedPmtilesComputed);
  },

  unmounted() {},

  methods: {
    // select translation
    translateProperty(property) {
      if (this.$i18n.locale === "en-US") {
        return property.en;
      } else {
        return property.ee;
      }
    },

  checkPmtilesLayers(pmtilesLayers) {

    if (!this.wmsRequestParameters.lat || !this.wmsRequestParameters.lng) {
      return
    }

    const lat = this.wmsRequestParameters.lat
    const lng = this.wmsRequestParameters.lng
    const zoom = this.wmsRequestParameters.zoom
    const brushSize = 16  // Default from demo - adjust later if needed


    // Query each PMTiles layer
    pmtilesLayers.forEach((layer) => {

      // Get the actual PMTiles layer object
      const pmtilesLayerObject = this.mapStore.selectedPmtilesLayers[layer.id]

      if (!pmtilesLayerObject) {
        return
      }


      // Query the layer
      const results = pmtilesLayerObject.queryTileFeaturesDebug(lng, lat, brushSize)


      // Process results
      if (results && results.size > 0) {
        // results is a Map<string, PickedFeature[]>
        for (const [dataLayerName, features] of results.entries()) {

          if (features.length > 0) {
            // Transform to the format expected by the UI
            const layerAndFeatures = {
              layer: layer,
              features: features.map(pickedFeature => ({
                properties: pickedFeature.feature.props
              }))
            }

            this.layersFeatures.push(layerAndFeatures)
          }
        }
      } else {
      }
    })

  },




    checkLayersGetFeatures(layers) {
      let ref = this;
      this.layerInfo = null;
      ref.layersFeatures = [];
      layers.forEach((layer) => {
        const url = `${layer.url}SERVICE=WMS&VERSION=${layer.version}&REQUEST=GetFeatureInfo&QUERY_LAYERS=${layer.layers}&LAYERS=${layer.layers}&INFO_FORMAT=application/json&FEATURE_COUNT=50&X=${this.wmsRequestParameters.x}&Y=${this.wmsRequestParameters.y}&SRS=${layer.projection}&WIDTH=${this.wmsRequestParameters.width}&HEIGHT=${this.wmsRequestParameters.height}&BBOX=${this.wmsRequestParameters.bbox}`;
        axios
          .get(url)
          .then((response) => {
            let layerAndFeatures = {
              layer: "",
              features: [],
            };
            if (response.data.features.length > 0) {
              layerAndFeatures.layer = layer;
              layerAndFeatures.features = response.data.features;
              ref.layersFeatures.push(layerAndFeatures);
            }
          })
          .catch((error) => {
          });
      });
    },

    checkVectorTiles(vectorTile) {
      let layerAndFeatures = {
        layer: {},
        features: [],
      }
      layerAndFeatures.layer.id = vectorTile.name
      layerAndFeatures.layer.title = {
          ee: "Sobivusanalüüs",
          en: "Suitability analysis"
        }
      layerAndFeatures.features.push({properties: cloneDeep(vectorTile)})
      if (typeof(vectorTile) == 'object' && this.layersSelectedMvtComputed.length > 0) {
        this.layersFeatures.push(layerAndFeatures)
      }
    },

    showFeatureInfo(layerFeatures) {
      this.layerFeatures = layerFeatures.features;
      this.link = layerFeatures.layer.id;
    },
  },

  computed: {
    // selected WMS layers
    layersSelectedWmsComputed: function () {
      let result = []
      this.mapStore.layersList.forEach(layer => {
        if (this.mapStore.newLayersSelected.all.indexOf(layer.id) !== -1) {
          // CHANGE THIS LINE - exclude both 'mvt' AND 'pmtiles':
          if (layer.type !== 'mvt' && layer.type !== 'pmtiles') {
            result.push(layer)
          }
        }
      })
      return result
    },

   layersSelectedMvtComputed: function () {
      let result = []
      this.mapStore.layersList.forEach(layer => {
        if (this.mapStore.newLayersSelected.all.indexOf(layer.id) !== -1) {
          if (layer.type == 'mvt') {
            result.push(layer)
          }
        }
      })
      return result
    },

    layersSelectedPmtilesComputed: function () {
      let result = []
      this.mapStore.layersList.forEach(layer => {
        if (this.mapStore.newLayersSelected.all.indexOf(layer.id) !== -1) {
          if (layer.type == 'pmtiles') {
            result.push(layer)
          }
        }
      })
      return result
    },

    // wms url parameters
    wmsRequestParameters: function () {
      return this.mapStore.wmsUrlParameters;
    },
  },
};
</script>

<style lang="scss" scoped></style>
