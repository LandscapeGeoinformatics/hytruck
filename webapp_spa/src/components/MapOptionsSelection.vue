<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div id="customLocation" class="optionsContainer2" v-if="mobileView && mapStore.showDropDownMenus">
      <q-btn style="width: 30px; height: 60px; border-radius: 0px;" class="q-pa-lg" flat @click="showSettings()">
        <q-tooltip>Show layer weight settings</q-tooltip>
        <q-icon
          name="settings"
          size="30px"
          style="height: auto; margin-top: -10px;"
        />
    </q-btn>
    </div>
  </transition>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
  <div id="customLocation" class="optionsContainer" v-if="showSettingSelection && mapStore.showDropDownMenus">
    <q-btn v-if="mobileView" style="width: 30px; height: 60px; border-right: 1px solid rgb(204, 204, 204); border-radius: 0px;" class="q-pa-lg" flat @click="showSettings()">
      <q-tooltip>Hide layer weight settings</q-tooltip>
      <q-icon
        name="arrow_back_ios"
        size="30px"
        style="height: auto; margin-top: -10px; margin-left: 10px;"
      />
    </q-btn>
    <q-select
      v-model="mapStore.selectedWeight"
      :options="options"
      label="Saved Weights"
      class="dropDown q-pl-md"
      style="width: 200px;"
      label-color="black"
      popup-content-style="background-color: rgb(255, 255, 255)"
      borderless
      :loading="showLoading"
      :disable="showLoading"
    >
    </q-select>
    <q-select
      v-model="countryModel"
      :options="mapStore.countryOptions"
      label="Country"
      class="dropDown q-pl-md"
      label-color="black"
      popup-content-style="background-color: rgb(255, 255, 255)"
      style="border-left: 1px solid rgb(204, 204, 204)"
      borderless
      :loading="showCountriesLoading"
      :disable="showCountriesLoading"
    />
  </div>
  </transition>
</template>

<script setup>

/*
  Imports
*/

  // pinia stores
  import { useQuasar } from "quasar"
  import { gisStore } from "stores/gis"
  import { onMounted, ref, reactive, watch, computed, inject } from 'vue'
  const mapStore = gisStore()
  import { api } from "src/boot/axios"

/*
  Data
*/

  let options = ref([])
  const countryModel = ref(mapStore.countryOptions[0])
  const $q = useQuasar()
  let mobileView = ref(false)
  let showSettingSelection = ref(true)
  const showLoading = ref(true)
  const showCountriesLoading = ref(false)

/*
  Lifecycle hooks
*/

  onMounted(() => {
    if (mapStore.countryOptions.length == 1) {
      showCountriesLoading.value = true
      getCountryData()
    } else if (mapStore.countryOptions[mapStore.selectedCountry] !== undefined) {
      countryModel.value = mapStore.countryOptions[mapStore.selectedCountry]
    }
    getWeightNames()
    if (screenSize.value <= 600) {
      mobileView.value = true
      showSettingSelection.value = false
    } else if (screenSize.value >= 600) {
      mobileView.value = false
      showSettingSelection.value = true
    }
  })

/*
  Computed
*/

  const screenSize = computed(() => {
    return $q.screen.width
  })

  const layersSelectedComputed = computed(() => {
    return mapStore.newLayersSelected.all
  })

/*
  Watchers
*/

  watch(screenSize, (newValue, oldValue) => {
    if (newValue <= 600) {
      mobileView.value = true
      showSettingSelection.value = false
    } else if (newValue > 600) {
      mobileView.value = false
      showSettingSelection.value = true
    }
  })

watch(() => mapStore.selectedWeight, (newValue, oldValue) => {
  // Map weight name to mode
  if (newValue && newValue.toLowerCase().includes('survey')) {
    mapStore.suitabilityMode = 'survey'
  } else {
    mapStore.suitabilityMode = 'ahp'
  }
})

  watch(countryModel, (newValue, oldValue) => {
    // define centers and zoom levels for each country
    const locations = {
      'Germany': { 'lat': 51.546840, 'lng': 10.502929, 'zoom': 6 },
      'Denmark': { 'lat': 56.249640, 'lng': 10.678710, 'zoom': 7 },
      'Estonia': { 'lat': 58.723111, 'lng': 25.048427, 'zoom': 7 },
      'Finland': { 'lat': 65.517301, 'lng': 27.377929, 'zoom': 5 },
      'Latvia': { 'lat': 57.082899, 'lng': 24.543457, 'zoom': 7 },
      'Lithuania': { 'lat': 55.378458, 'lng': 23.851318, 'zoom': 7 },
      'Poland': { 'lat': 52.464691, 'lng': 19.599609, 'zoom': 6 },
      'Sweden': { 'lat': 62.632951, 'lng': 18.676757, 'zoom': 5 },
      'All': { 'lat': 59.823289, 'lng': 20.786132, 'zoom': 5 }
    }
    // fly to selected country and display suitability
    let country = locations[newValue]
    mapStore.map.flyTo([country.lat, country.lng], country.zoom)
    mapStore.selectedCountry = mapStore.countryCodes[newValue]
  })

  watch(layersSelectedComputed, (newValue, oldValue) => {
    // hide dropdown menus if suitability layer is switched off
    let index = layersSelectedComputed.value.indexOf('suitability_view')
    if (index == -1 ) {
      mapStore.showDropDownMenus = false
    } else {
      mapStore.showDropDownMenus = true
    }
  })
  // make the component use only the mapStore so component re-rendering wouldnt reset the selected value?

/*
  Functions
*/

  function showSettings() {
    showSettingSelection.value = !showSettingSelection.value
  }

  async function getCountryData() {
    api('/clientsetting/countrylist', {method: 'POST'}).then(response => {
      let countryList = response.data.return_.data
      countryList.forEach(element => {
        // save country key-value pairs and generate list of countries
        mapStore.countryCodes[element[1]] = element[0]
        mapStore.countryOptions.push(element[1])
      })
      // reset to previously selected country if it is in store
      let selected = mapStore.selectedCountry
      if (selected !== -1) {
        countryModel.value = mapStore.countryOptions[selected]
      }
      showCountriesLoading.value = false
    })
  }

async function getWeightNames() {
  showCountriesLoading.value = true

  api('/clientsetting/weight_criterias', {
    method: 'POST',
    data: {
      action: 'query',
      uuid: mapStore.tempuuid
    }
  }).then(response => {
    const data = response.data.return_.data

    // sort the entries according to uuid
    let sorted = data.sort((a, b) => {
      if (a[0] < b[0]) return -1
      if (a[0] > b[0]) return 1
      return 0
    })

    // populate weight options
    mapStore.weightOptions = []
    options.value = []
    sorted.forEach(entry => {
      mapStore.weightOptions.push(entry[1])
      options.value.push(entry[1])
    })

    // set first option as default
    if (options.value.length > 0) {
      mapStore.selectedWeight = options.value[0]
    }

    showLoading.value = false
    showCountriesLoading.value = false
  }).catch(error => {
    console.error('Error fetching weight names:', error)
    showLoading.value = false
    showCountriesLoading.value = false
  })
}

</script>

<style lang="scss" scoped>
  #customLocation {
    left: 58px;
  }

  .optionsContainer {
    color: black;
    background-color: rgb(255, 255, 255);
    height: 61px;
    width: 400px;
    position: absolute;
    top: 12px;
    z-index: 500;
    display: grid;
    grid-gap: 20px;
    justify-content: center;
    grid-template-columns: auto auto auto;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
  }

  .optionsContainer2 {
    color: black;
    background-color: rgb(255, 255, 255);
    height: 61px;
    width: auto;
    position: absolute;
    top: 12px;
    z-index: 500;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
  }

  .dropDown {
    color: black;
    width: 170px;
  }
</style>
