<template>
  <div>
    <div v-if="currentRouterPath === '/map'">
      <div v-for="group in this.getLayerGroups(layersImported)" v-bind:key="group">
        <q-expansion-item
          v-if="group !== 'base map'"
          :label="capitalizeName(group)"
          :default-opened="(group == 'ahp') ? true : false"
        >
          <div
            v-for="layer in groupLayers(layersImported, group)"
            v-bind:key="layer"
          >
            <q-item style="width: 300px; flex-wrap: wrap; flex-direction: row;">
              <q-item-section class="col-2">
                <q-checkbox
                  v-model="this.mapStore.newLayersSelected.all"
                  :val="layer[0]"
                  color="primary"
                />
              </q-item-section>
              <q-item-section class="col-6">
                <q-item-label
                  class="q-pl-sm"
                  v-ripple
                >
                  {{ layer[1] }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-icon name="info" class='infoIcon' v-if="layer[2] != ''" @click="showMoreInfo(layer[2])">
                  <q-tooltip>
                    Click here to read more about the layer
                  </q-tooltip>
                </q-icon>
              </q-item-section>




              <q-item-section
                class="col-auto legendSection"
                v-if="checkIfLayerSelected(this.mapStore.newLayersSelected.all, layer[0])"
              >
                <!-- WMS Legend (default) -->
                <LegendWMS
                  v-if="!has_pmtiles_legend(layer[0])"
                  :layer="returnLayerData(layer[0])"
                />

                <!-- PMTiles Legend -->
                <LegendPmtiles
                  v-if="has_pmtiles_legend(layer[0])"
                  :layer_id="layer[0]"
                />

                <!-- Custom AHP legend remains unchanged -->
                <div v-if="group == 'ahp'" class="customLegendWrapper">
                  <div
                    v-for="(key, value, index) in styleData.tileColors"
                    v-bind:key="value"
                    class="customLegendItem"
                  >
                    <div class="legendColor q-mr-sm" :style="{'background-color': value, 'border': `1px solid value`}"></div>
                    {{chooseOperator(styleData.tileColors, index)}} {{ key }}
                  </div>
                </div>
              </q-item-section>



            </q-item>
          </div>
        </q-expansion-item>
      </div>
      <div v-for="group in this.getLayerGroups(layersImported)" v-bind:key="group">
        <q-expansion-item
          v-if="group == 'base map'"
          :label="capitalizeName(group)"
          default-opened
        >
          <q-item
            v-for="layer in groupLayers(layersImported, group)"
            v-bind:key="layer"
          >
            <q-item-section class="col-2 row">
              <q-radio
                v-model="this.mapStore.newLayersSelected.baseMap"
                :val="layer[0]"
                color="primary"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label
                class="q-pl-sm"
                v-ripple
              >
                {{ layer[1] }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </div>
    </div>
  </div>
</template>

<script>


// components
import LegendPmtiles from "components/LegendPmtiles.vue";
import LegendWMS from "components/LegendWMS.vue";
import AppearTransition from "components/AppearTransition.vue";

const pmtiles_styles = require("/custom_modules/pmtiles-styles.js");

// pinia stores
import { gisStore } from "stores/gis";

// lodash
var filter = require("lodash.filter");
var cloneDeep = require("lodash.clonedeep");

// axios
const axios = require("axios");
const styles = require("/custom_modules/styles.js")

const mapLayersData = require("/custom_modules/maplayers-data.js");

export default {
  name: "LayersList",

  components: {
    LegendWMS,
    LegendPmtiles,
  },

  setup() {
    const mapStore = gisStore();
    return { mapStore };
  },

  data() {
    return {
      layersSelected: {
        layersVector: [],
        layersWMS: [],
        layersBase: [],
        layerSearch: [],
      },
      layerBaseSelected: "osm",
      layersImported: [],
      styleData: styles,
    };
  },

  created() {
    // CRITICAL: Load layers synchronously BEFORE anything else
    if (this.mapStore.layersList.length === 0) {
      this.loadLayersFromFileSync()
    }

    // Now set layersImported AFTER store is populated
    this.layersImported = this.mapStore.layersList

  },

  mounted() {

    this.addAllSelectedLayersToVuex();
  },

  watch: {
    layersSelectedAllIDs(newValue, oldValue) {
      this.addAllSelectedLayersToVuex();
    },

    layerBaseSelected(newValue, oldValue) {
      const layers = filter(this.layersAll, { id: newValue });
      this.layersSelected.layersBase = [layers[0]];
    },
  },

  methods: {
    has_pmtiles_legend(layer_id) {
      return pmtiles_styles.has_pmtiles_legend(layer_id)
    },

    showMoreInfo(input) {
      if(input.length > 0) {
        window.open(input, '_blank')
      }
    },

    chooseOperator(object, index) {
      let entries = Object.values(object)
      if (index == 0) {
        return '0 -'
      } else {
        return `${entries[index-1]} -`
      }
    },

    capitalizeName(name) {
      let result = ''
      let splitter = undefined
      let spacers = [' ', '-']
      spacers.forEach(spacer => {
        if (name.indexOf(spacer) !== -1) {
          splitter = spacer
        }
      })
      if (splitter !== undefined) {
        let words = name.split(splitter)
        words.forEach(word => {
          let string = word[0].toUpperCase() + word.slice(1)
          result += string + splitter
        })
        result = result.slice(0, -1)
      } else if (name.length == 3) {
        result = name.toUpperCase()
      } else {
        result += name[0].toUpperCase() + name.slice(1)
      }
      return result
    },

    getLayerGroups(layerList) {
      let groups = []
      layerList.forEach(layer => {
        if (groups.indexOf(layer.group) == -1) {
          groups.push(layer.group)
        }
      })
      return groups
    },

    groupLayers(layerList, groupName) {
      let result = []
      layerList.forEach(entry => {
        if (entry.group == groupName) {
          result.push([entry.id, entry.title.en, entry.docurl.en])
        }
      })
      return result
    },

    // NEW: Synchronous loading function
    loadLayersFromFileSync() {

      // Clear and populate in one step
      this.mapStore.layersList = []
      mapLayersData.layers.forEach(layer => {
        this.mapStore.layersList.push(layer)
      })


      // Immediately set default layers - no async gaps
      this.addDefaultLayersToStoreSync()

    },

    // NEW: Synchronous version without async gaps
    addDefaultLayersToStoreSync() {

      // Clear existing selections
      this.mapStore.newLayersSelected.all = []
      this.mapStore.newLayersSelected.baseMap = ''

      this.mapStore.layersList.forEach(layer => {
        if (layer.active === true) {
          if (layer.group !== 'base map') {
            this.mapStore.newLayersSelected.all.push(layer.id)
          } else {
            this.mapStore.newLayersSelected.baseMap = layer.id
          }
        }
      })

    },

    getLayersByGroup(groupName) {
      let layersArray = this.mapStore.layersData.return.data
      let result = layersArray.filter((arr) => arr.indexOf(groupName) !== -1)
      result = result.filter((entry => entry[4] !== false))
      return result
    },

    addDefaultLayer(id) {
      let layers = filter(this.layersAll, { id: id });
      this.layersSelected.layersBase = [];
      this.layersSelected.layersBase.push(layers[0]);
    },

    addAllSelectedLayersToVuex() {
      this.mapStore.layersSelected = this.layersSelectedAll;
    },

    landPlotSearch(id) {
      let ref = this;
      this.layersSelected.layerSearch = [];
      const layer = {
        id: "land_plot",
        title: "Land Plot",
        description: "selected land plot",
        attributions: "",
        url: `https://app-a.landscape-geoinformatics.eu/cadastre_query?id=${id}`,
        features: [],
        type: "vector_remote",
        group: "a",
        format: "geojson",
        projection: "EPSG:4326",
      };
      axios
        .get(layer.url)
        .then((response) => {
          layer.features = [response.data];
          ref.layersSelected.layerSearch.push(layer);
        })
        .catch((error) => {
          ref.layersSelected.layerSearch = [];
          if (error.response && parseInt(error.response.status) === 400) {
          } else {
          }
        });
    },

    checkIfLayerSelected(layersArray, layerSelected) {
      let answer = false
      if (layersArray.indexOf(layerSelected) !== -1) {
        answer = true
      }
      return answer
    },

    translate(property) {
      if (this.$i18n.locale === "en-US") {
        return property.en;
      } else {
        return property.ee;
      }
    },

    selectLayersGroup(layersArray, group) {
      layersArray.length = 0;
      this.layersAll.forEach((layer) => {
        if (layer.group === group) {
          layersArray.push(layer);
        }
      });
    },

    returnLayerData(input) {
      let result
      this.layersImported.forEach(layer => {
        if (layer.id == input) {
          result = layer
        }
      })
      return result
    },

    logValue(value) {
    },
  },

  computed: {
    tilesLoaded: function () {
      return Math.floor(100 - (this.mapStore.tilesToLoad / 60 * 100))
    },

    currentRouterPath: function () {
      return this.$route.path;
    },

    layersSelectedAll: function () {
      let layers = [];
      Object.entries(this.layersSelected).forEach((layersArray) => {
        const [key, value] = layersArray;
        layers.push(...value);
      });
      return cloneDeep(layers);
    },

    layersSelectedAllIDs: function () {
      const IDs = this.layersSelectedAll.map((layer) => layer.id);
      return IDs.join();
    },
  },
};

</script>

<style lang="scss">
/* fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, max-height 1s;
}

.fade-enter-from {
  opacity: 0;
  max-height: 0px;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 1000px;
}

.fade-leave-to {
  opacity: 0;
  max-height: 0px;
}

.legendColor {
  display: block;
  height: 15px;
  width: 15px;
  opacity: 0.5;
  /* border: 1px solid; */
  /* border-color: red; */
}

.customLegendWrapper {
  height: auto;
  width: 100px;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-top: 10px;
}

.customLegendItem {
  display: flex;
  flex-direction: row;
}

.infoIcon {
  color: #ccc;
}

.infoIcon:hover {
  color: $primary;
  transform: scale(1.5)
}

.legendSection * {
  padding-right: 0px;
  padding-top: 1px;
}
</style>
