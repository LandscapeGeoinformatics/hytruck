import { defineStore } from "pinia";
import { ref } from 'vue'
import { config } from 'src/boot/axios'
// lodash
var filter = require("lodash.filter");

export const gisStore = defineStore("gis", {
  state: () => ({
    layersSelected: [],
    map: undefined,
    // mapZoom: 7,
    // mapCenter: [58.723111, 25.048427],
    mapZoom: 5,
    mapCenter: [59.823289, 20.786132],
    wmsUrlParameters: null,
    tileProps: '',
    layersData: undefined,
    layerGroups: [],
    newLayersSelected: {
      raster: [],
      all: [],
      baseMap: undefined,
    },
    leftDrawerOpen: true,
    tilesToLoad: 0,
    layersLoading: [],
    layersList: [],
    selectedCountry: -1,
    weightOptions: [],
    selectedWeight: '',
    showDropDownMenus: true,
    countryOptions: ['All'],
    countryCodes: {'All': -1},
    tempuuid: config.defaults.guestId,  // ← KEEP THIS! Used in MVT URLs
    serviceAreaPane: undefined,
    activeServiceAreas: [],
    polygonOpacity: {
      original: 0.33,
      new: 0.6
    },

    // data for LoadingData component
    loadingData: false,
    loadingMsg: '',
    showActionComplete: false,
    completeAction: '',
    suitabilityMode: 'ahp',  // ADD THIS: 'ahp' or 'survey'
  }),

  getters: {
    layersWms(state) {
      const layersWms = filter(state.layersSelected, function (layer) {
        return layer.type === "wms";
      });
      return layersWms;
    },
  },

  actions: {
    // increment() {
    //   this.layers += 100;
    // },
    // decrement() {
    //   this.layers -= 100;
    // },
  },
});
