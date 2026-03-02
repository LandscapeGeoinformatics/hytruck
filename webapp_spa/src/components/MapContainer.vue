<template>
  <div class="q-pa-none">
    <div class="row">
      <!-- map container -->
      <div id="map-container">
        <!-- map object for leaflet -->
        <div id="map"></div>
      </div>
      <!-- dialog window -->
      <q-dialog v-model="dialog">
        <ClickInfoWMS />
      </q-dialog>
    </div>
  </div>
  <q-dialog v-model="deleteServiceAreasPopup" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" class="deleteIcon" text-color="white"></q-avatar>
          <span class="q-ml-sm">You are about to delete all service areas. Proceed?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" class="deleteText" @click="deleteServiceAreasPopup=false"></q-btn>
          <q-btn flat label="Delete" class="deleteText" @click="clearServiceAreas()"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
/*
  Imports
*/
const pmtiles_styles = require("/custom_modules/pmtiles-styles.js")

// vue
import { ref, reactive, watch, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

// custom modules
const styles = require("/custom_modules/styles.js")

// components
import ClickInfoWMS from "components/ClickInfoWMS.vue"
import { config } from 'src/boot/axios'

// pinia stores
import { gisStore } from "stores/gis"
import vectorTileLayer from 'leaflet-vector-tile-layer'
import cloneDeep from 'lodash.clonedeep'

// axios
const axios = require("axios")

// leaflet library
var L = require("leaflet")
var CRS = require("leaflet")
require("proj4")
require("proj4leaflet")

import "/custom_modules/leaflet-measure/code/leaflet-measure.js"
import "/custom_modules/leaflet-measure/code/leaflet-measure.css"

// material icons
import 'material-icons/iconfont/material-icons.css'

import "leaflet-easyprint"

const mapStore = gisStore()

/*
  Data
*/

const layers = reactive([])
const vectorLayersStyles = [
  { layerID: "", style: styles.polygonDefault },
  { layerID: "cadastral_unit", style: styles.polygonYellow },
  { layerID: "vector_data", style: styles.polygonRed },
]
const dialog = ref(false)
const tileProps = ref('')
const layerPane = ref(L.featureGroup())
const selectedLayerIDs = {}

let generateServiceAreas = false
const deleteServiceAreasPopup = ref(false)
let featureCollection = ref({
  'type': 'FeatureCollection',
  'features': []
})
const selected_hexagon_mode = ref('normal')  // 'fine' | 'normal' | 'coarse'

// Helper function to convert hexagon mode to relative_depth parameter
function get_relative_depth_from_mode(mode) {
  const mode_to_depth = {
    'fine': 2,
    'normal': 1,
    'coarse': 0
  }
  const depth = mode_to_depth[mode] ?? 1
  return depth
}

/*
  Lifecycle hooks
*/

onMounted(() => {
  // Initialize service area pane if needed
  if (mapStore.serviceAreaPane == undefined) {
    mapStore.serviceAreaPane = ref(L.featureGroup())
  }

  // Wait for DOM to be ready before creating map
  nextTick(() => {
    if (mapStore.layersList.length !== 0) {
      createMap()
      nextTick(() => {
        update_hexagon_button_states()
      })

    } else {
    }
  })

  setTimeout(() => {
    const customElement = document.getElementById('customLocation')
    if (customElement) {
      if (mapStore.leftDrawerOpen) {
        customElement.style.left = '358px'
      } else {
        customElement.style.left = '58px'
      }
    }
  }, 100)
})

onBeforeUnmount(() => {
  // cancel all pending requests before switching to another page
  window.stop()
})

function get_pmtiles_layer(layer) {

  try {
    const paint_rules = pmtiles_styles.get_paint_rules_from_layer_id(
      layer.id,
      layer.layers
    )

    const pmtiles_layer_object = protomapsL.leafletLayer({
      url: layer.url,
      paintRules: paint_rules,
      labelRules: [],
      maxDataZoom: 14,
    })

    // ADD THESE LINES:
    if (!mapStore.selectedPmtilesLayers) {
      mapStore.selectedPmtilesLayers = {}
    }
    mapStore.selectedPmtilesLayers[layer.id] = pmtiles_layer_object


    showLoading(pmtiles_layer_object, layer)

    layerPane.value.addLayer(pmtiles_layer_object)

    let layer_ids = Object.keys(layerPane.value._layers)
    selectedLayerIDs[layer.id] = Number(layer_ids[layer_ids.length - 1])

    return pmtiles_layer_object
  } catch (error) {
  }
}


/*
  Computed properties
*/

const areaNumber = computed(() => {
  if (mapStore.activeServiceAreas.length == 0) {
    return 1
  } else {
    let idx = mapStore.activeServiceAreas.length-1
    let entry = mapStore.activeServiceAreas[idx]
    let str = entry.substr(entry.length-1)
    let result = parseInt(str) + 1
    return result
  }
})

// number of objects on service areas pane
const serviceAreaObjectsComputed = computed(() => {
  return Object.entries(mapStore.serviceAreaPane._layers).length
})

// selected basemap
const selectedBasemap = computed(() => {
  return mapStore.newLayersSelected.baseMap
})

// selected layers
const selectedLayers = computed(() => {
  return mapStore.newLayersSelected.all
})

const layersWithClickableFeatures = computed(() => {
  let result = []
  mapStore.layersList.forEach(layer => {
    if (mapStore.newLayersSelected.all.indexOf(layer.id) !== -1) {
      // Include WMS, MVT, and PMTiles - all have clickable features
      if (layer.type === 'wms' || layer.type === 'mvt' || layer.type === 'pmtiles') {
        result.push(layer)
      }
    }
  })
  return result
})

// KEEP THIS for backward compatibility if needed elsewhere
const layersSelectedWmsComputed = computed(() => {
  let result = []
  mapStore.layersList.forEach(layer => {
    if (mapStore.newLayersSelected.all.indexOf(layer.id) !== -1) {
      if (layer.type !== 'mvt' && layer.type !== 'pmtiles') {
        result.push(layer)
      }
    }
  })
  return result
})

// zoom value from vuex
const mapZoomComputed = computed(() => {
  return mapStore.mapZoom
})

// zoom value from vuex
const mapCenterComputed = computed(() => {
  return mapStore.mapCenter
})

// selected country id
const selectedCountry = computed(() => {
  return mapStore.selectedCountry
})

const selectedSuitability = computed(() => {
  return mapStore.selectedWeight
})

const leftDrawerOpenComputed = computed(() => {
  return mapStore.leftDrawerOpen
})

/*
  Watchers
*/

watch(selected_hexagon_mode, (newValue, oldValue) => {
  if (mapStore.newLayersSelected.all.indexOf('suitability_view') !== -1 &&
      selectedLayerIDs['suitability_view'] !== undefined) {
    delete_and_reload_hexagon_layer('suitability_view', mapStore.layersList)
  } else {
  }
})

watch(
  () => mapStore.leftDrawerOpen,
  (newValue) => {
    const customElement = document.getElementById('customLocation')
    if (customElement) {
      if (newValue) {
        // Drawer is open - shift right
        customElement.style.left = '358px'  // 300px drawer + 58px offset
      } else {
        // Drawer is closed - shift left
        customElement.style.left = '58px'
      }
    }
  }
)

watch(mapStore.layersList, (newValue, oldValue) => {
  createMap()
})

watch(selectedCountry, (newValue, oldValue) => {

  // Only update if suitability_view is actually in the selected layers AND has been added to the map
  if (mapStore.newLayersSelected.all.indexOf('suitability_view') !== -1 &&
      selectedLayerIDs['suitability_view'] !== undefined) {
    delete_and_reload_hexagon_layer('suitability_view', mapStore.layersList)
  } else {
  }
})

watch(selectedSuitability, (newValue, oldValue) => {

  // Only update if suitability_view is actually in the selected layers AND has been added to the map
  if (mapStore.newLayersSelected.all.indexOf('suitability_view') !== -1 &&
      selectedLayerIDs['suitability_view'] !== undefined) {
    delete_and_reload_hexagon_layer('suitability_view', mapStore.layersList)
  } else {
  }
})

watch(selectedLayers, (newValue, oldValue) => {
  // remove a layer
  if (newValue.length < oldValue.length) {
    oldValue.forEach(entry => {
      if (newValue.indexOf(entry) == -1) {
        deleteLayer(entry)
      }
    })
  }
  // add a layer
  if (newValue.length > oldValue.length) {
    newValue.forEach(entry => {
      if (oldValue.indexOf(entry) == -1) {
        let layerData = mapStore.layersList.filter(obj => {
          if (obj.id == entry) {
            return obj
          }
        })
        getLayerNew(layerData[0])
      }
    })
  }
})

watch(selectedBasemap, (newValue, oldValue) => {
  addBaseLayer()
  if (oldValue !== undefined) {
    deleteLayer(oldValue)
  }
})

watch(leftDrawerOpenComputed, (newValue, oldValue) => {
  if (newValue == false) {
    moveLeftSideElements('left')
  } else {
    moveLeftSideElements('right')
  }
})

/*
  Functions
*/

// Delete and reload hexagon layer when mode changes
async function delete_and_reload_hexagon_layer(layer_name, layer_list) {
  const layer_data = layer_list.filter(obj => obj.id === layer_name)
  if (layer_data.length > 0) {
    deleteLayer(layer_name)
    // Wait a tick to ensure cleanup completes
    await nextTick()
    getLayerNew(layer_data[0])
  } else {
  }
}

function update_hexagon_button_states() {
  const modes = ['fine', 'normal', 'coarse']
  modes.forEach(mode => {
    const btn = document.getElementById(`hexagonMode_${mode}`)
    if (btn) {
      if (mode === selected_hexagon_mode.value) {
        btn.classList.add('hexagon-btn-active')
        btn.style.backgroundColor = 'rgba(150, 181, 57, 0.3)'
        btn.style.borderLeft = '3px solid rgb(150, 181, 57)'
      } else {
        btn.classList.remove('hexagon-btn-active')
        btn.style.backgroundColor = ''
        btn.style.borderLeft = ''
      }
    }
  })
}

async function getLayerNew(layer) {
  if (layer.type == 'wms') {
    const url = layer.url
    let newLayer = L.tileLayer.wms(url, {
      version: layer.version,
      layers: layer.layers,
      format: 'image/png',
      transparent: layer.transparent,
      zIndex: layer.zIndex,
    })
    showLoading(newLayer, layer)
    layerPane.value.addLayer(newLayer)

    let layerIDs = Object.keys(layerPane.value._layers)
    selectedLayerIDs[layer.id] = Number(layerIDs[layerIDs.length - 1])
  }

  if (layer.type == 'pmtiles') {
    get_pmtiles_layer(layer)
    return
  }

  if (layer.type == 'mvt') {
    let url = layer.url

    // Inject relative_depth parameter for suitability layer
    if (layer.id === 'suitability_view') {
      const relative_depth = get_relative_depth_from_mode(selected_hexagon_mode.value)
      // Check if URL already has query string
      const separator = url.includes('?') ? '&' : '?'
      url = `${url}${separator}relative_depth=${relative_depth}`
    }

    const styleFunction = function(layerFeature) {
      layerFeature.suitability_mode = mapStore.suitabilityMode
      return styles.vectorTileStyle(layerFeature)
    }

    const options = {
      style: styleFunction,
    }

    let newLayer = vectorTileLayer(url, options)

    newLayer.on('click', e => {
      tileProps.value = ''
      tileProps.value = e.layer.properties
      mapStore.tileProps = e.layer.properties
    })
    showLoading(newLayer, layer)
    layerPane.value.addLayer(newLayer)

    let layerIDs = Object.keys(layerPane.value._layers)
    selectedLayerIDs[layer.id] = Number(layerIDs[layerIDs.length - 1])
  }
}


function deleteLayer(layerName) {
  let idToRemove = selectedLayerIDs[layerName]

  // Guard: if layer was never added, just return
  if (idToRemove === undefined) {
    return
  }

  const layer = layerPane.value._layers[idToRemove]

  // For VectorTileLayer, ensure proper cleanup
  if (layer && layer.remove) {
    layer.remove()
  }

  layerPane.value.removeLayer(idToRemove)
  delete selectedLayerIDs[layerName]

  // Also remove PMTiles layer object reference if it exists
  if (mapStore.selectedPmtilesLayers && mapStore.selectedPmtilesLayers[layerName]) {
    delete mapStore.selectedPmtilesLayers[layerName]
  }
}

function addBaseLayer() {

  mapStore.layersList.forEach(layer => {
    let newLayer

    if (layer.id == mapStore.newLayersSelected.baseMap) {
      newLayer = L.tileLayer(layer.url, {
        attribution: layer.attributions,
        zIndex: layer.zIndex,
      })
      showLoading(newLayer, layer)
      layerPane.value.addLayer(newLayer)

      // add key-value pair of layer id to a store
      let layerIDs = Object.keys(layerPane.value._layers)
      selectedLayerIDs[layer.id] = Number(layerIDs[layerIDs.length - 1])
    }
  })
}

function showLoading(layerToAdd, layerData) {
  let layerName = layerData.title.en
  layerToAdd.on('loading', function () {
    let index = mapStore.layersLoading.indexOf(layerName)
    if (index == -1) {
      mapStore.layersLoading.push(layerName)
    }
  })
  layerToAdd.on('load', function () {
    let index = mapStore.layersLoading.indexOf(layerName)
    if (index > -1) {
      mapStore.layersLoading.splice(index, 1)
    }
  })
  layerToAdd.on('remove', function () {
    // remove loading message if layer is removed before fully loading
    let index = mapStore.layersLoading.indexOf(layerName)
    if (index > -1) {
      mapStore.layersLoading.splice(index, 1)
    }
  })
}

const createMap = () => {
  layerPane.value.clearLayers()

  // remove HTML map object
  const mapHTMLobject = document.createElement("div")
  mapHTMLobject.setAttribute("id", "map")
  document.getElementById("map-container").innerHTML = ""
  document.getElementById("map-container").appendChild(mapHTMLobject)

  var myProj = new L.Proj.CRS("EPSG:3857");

  // create leaflet map
  let map = L.map("map", {
    renderer: L.canvas(),
    center: mapCenterComputed.value,
    zoom: mapZoomComputed.value,
    zoomControl: false,
    // crs: eeProj,
  });

  // add zoom control
  L.control.zoom({
    position: "topleft",
  }).addTo(map)

  // map events
  map.on("zoomend", function (e) {
    let zoom = map.getZoom();
    setMapZoom(zoom);
  });

  new L.Control.EasyPrint({
    title: 'Print Map',
    position: 'topleft',
    sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
    filename: 'myMap',
    exportOnly: true,
    hideControlContainer: true
  }).addTo(map);

  map.on("moveend", function (e) {
    // cancel all pending requests
    // window.stop()
    let center = map.getCenter();
    setMapCenter([center.lat, center.lng]);
    // remove old base layer, add new one and update hexagons
    // if (mapStore.newLayersSelected.all.indexOf('suitability_view') !== -1) {
    //   // test removing first and then adding new base layer
    //   // addBaseLayer()
    //   // removeLayer(selectedBasemap.value)
    //   delete_and_reload_hexagon_layer('suitability_view', mapStore.layersList)
    // }
  });

  const serviceAreaBtnText = "Add 100km service area to the map"
  map.on("click", function (event) {
    if (layersWithClickableFeatures.value.length > 0 && !generateServiceAreas) {
      generateWmsRequestUrl(map, myProj, event.latlng)
      dialog.value = true
    }
    if (generateServiceAreas == true) {
      getServiceArea(event.latlng)
      cancelAdding()
    }
  });

  mapStore.serviceAreaPane.addTo(map)

  // scale control
  L.control.scale({ imperial: false, maxWidth: 200 }).addTo(map);

  // measure tool
  var measureControl = new L.control.measure({
    position: 'topleft',
    primaryLengthUnit: 'kilometers', secondaryLengthUnit: 'meters',
    primaryAreaUnit: 'hectares', secondaryAreaUnit: 'sqmeters',
    captureZIndex: 10000,
    activeColor: '#fc3903',
    completedColor: '#fca103'
  })

  // add base layer
  addBaseLayer()

  layerPane.value.addTo(map)
  // add activated layers
  mapStore.newLayersSelected.all.forEach(layer => {
    mapStore.layersList.forEach(layerData => {
      if (layerData.id == layer) {
        getLayerNew(layerData)
      }
    })
  })

  // tooltip to follow mouse pointer when adding service areas is active
  const floatingTooltip = L.tooltip({
    permanent: true,
    direction: 'right'
  }).setContent('Click on the map to generate a 100km service area<br/>Or press Esc to cancel')

  // update tooltip location to follow the cursor
  map.on('mousemove', function(event) {
    floatingTooltip.setLatLng(event.latlng)
  })

  // function to cancel adding service area
  function cancelAdding() {
    generateServiceAreas = false
    floatingTooltip.remove()
    document.getElementsByClassName('leaflet-serviceArea')[0].title = serviceAreaBtnText
    window.removeEventListener('keydown', cancelFunction)
  }

  // function to cancel adding service area on pressing Esc
  function cancelFunction(e) {
    if (e.key == 'Escape') {
      cancelAdding()
    }
  }

  // add custom controls to generate service areas
  let customControl = L.Control.extend({
    options: {
      position: 'topleft'
    },
    onAdd: function (map) {
      // buttons container
      let container = L.DomUtil.create('div', 'leaflet-control leaflet-bar leaflet-control-custom')

      // button to add service areas
      let addAreasBtn = L.DomUtil.create('a', 'leaflet-serviceArea', container)
      addAreasBtn.innerHTML = '<span class="material-icons serviceAreaBtn">edit</span>'
      addAreasBtn.title = serviceAreaBtnText
      L.DomEvent.disableClickPropagation(addAreasBtn)
      L.DomEvent.on(addAreasBtn, 'click', () => {
        generateServiceAreas = !generateServiceAreas
        if (generateServiceAreas) {
          floatingTooltip.addTo(map)
          addAreasBtn.title = 'Cancel'
          window.addEventListener('keydown', cancelFunction)
        } else {
          cancelAdding()
        }
      })

      // button to download all added service areas
      let downloadBtn = L.DomUtil.create('a', 'leaflet-downloadServiceArea draw-control-disabled', container)
      downloadBtn.setAttribute("id", "downloadAreasBtn")
      downloadBtn.innerHTML = '<span class="material-icons serviceAreaBtn">download</span>'
      downloadBtn.title = "Add service areas before downloading"
      L.DomEvent.disableClickPropagation(downloadBtn)
      L.DomEvent.on(downloadBtn, 'click', () => {
        if (serviceAreaObjectsComputed.value > 0) {
          downloadServiceAreas()
        }
      })

      // button to clear the map of all service areas
      let removeAreasBtn = L.DomUtil.create('a', 'leaflet-removeServiceArea draw-control-disabled', container)
      removeAreasBtn.setAttribute("id", "removeAreas")
      removeAreasBtn.innerHTML = '<span class="material-icons serviceAreaBtn">delete</span>'
      removeAreasBtn.title = "There are no layers to delete"
      L.DomEvent.disableClickPropagation(removeAreasBtn)
      L.DomEvent.on(removeAreasBtn, 'click', () => {
        // show confirmation popup to delete objects
        if (serviceAreaObjectsComputed.value > 0) {
          deleteServiceAreasPopup.value = true
        }
      })

      return container;
    },
    onRemove: function () { },
  })

  // add buttons to change hexagon resolution
  let hexagonResolutionControl = L.Control.extend({
    options: {
      position: 'topleft'
    },
    onAdd: function () {
      // buttons container
      let container = L.DomUtil.create('div', 'leaflet-control leaflet-bar leaflet-control-custom')

      // helper to create hexagon mode button
      const create_hexagon_button = (mode_name, icon_size) => {
      let btn = L.DomUtil.create('a', 'hexagon-mode-btn', container)
      btn.setAttribute("id", `hexagonMode_${mode_name}`)
      btn.setAttribute("data-mode", mode_name)
      btn.innerHTML = `<span class="material-icons-outlined" style="font-size: ${icon_size}; display: flex; align-items: center; justify-content: center; line-height: 1;">hexagon</span>`
      btn.title = `Hexagon size: ${mode_name}`
      btn.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; cursor: pointer; border: none; background: none; padding: 0; transition: background-color 0.2s ease;'

      L.DomEvent.disableClickPropagation(btn)
      L.DomEvent.on(btn, 'click', () => {
        selected_hexagon_mode.value = mode_name
        update_hexagon_button_states()
      })

      btn.addEventListener('mouseover', () => {
        if (!btn.classList.contains('hexagon-btn-active')) {
          btn.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
        }
      })
      btn.addEventListener('mouseout', () => {
        if (!btn.classList.contains('hexagon-btn-active')) {
          btn.style.backgroundColor = ''
        }
      })

      return btn
    }

    create_hexagon_button('fine', '16px')
    create_hexagon_button('normal', '24px')
    create_hexagon_button('coarse', '32px')

      return container;
    },
    onRemove: function (map) { },
  })

  map.addControl(new hexagonResolutionControl())

  map.addControl(new customControl());

  measureControl.addTo(map);

  if (mapStore.leftDrawerOpen == true) {
    moveLeftSideElements('right')
  }

  // make map object globally accessible in store
  mapStore.map = map
}

async function getServiceArea(latlng) {
  const url = config.defaults.serviceAreaUrl
  const serviceLayerName = '100km service area'
  // hide loading indicator window
  function hideLoading(layerName) {
    let loadingIndex = mapStore.layersLoading.indexOf(layerName)
    if (loadingIndex > -1) {
      mapStore.layersLoading.splice(loadingIndex, 1)
    }
  }
  try {
    // show layer loading
    mapStore.layersLoading.push(serviceLayerName)
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "locations": [{'lat': latlng.lat, 'lon': latlng.lng}],
        "costing": "truck",
        "contours": [
          { "distance": 100.0 }
        ],
        "polygons": true
      }),
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()

    // define service area, style it and add to the map
    let serviceArea = {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": json.features[0].geometry.coordinates
      },
      "name": `Service area ${areaNumber.value}`
    }
    let serviceAreaStyle = json.features[0].properties

    mapStore.serviceAreaPane.addLayer(L.geoJSON(serviceArea, {style: serviceAreaStyle}))

    // add to the map the point for which service area was created
    let latlngs = [latlng.lat, latlng.lng]
    let geojsonMarkerOptions = {
        radius: 4,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
        name: `Service area ${areaNumber.value}`
    }
    mapStore.serviceAreaPane.addLayer(L.circleMarker(latlngs, geojsonMarkerOptions))

    // add service area name to store
    mapStore.activeServiceAreas.push(`Service area ${areaNumber.value}`)

    // add service area to feaureCollection
    featureCollection.value.features.push(serviceArea)

    // add service area point to featureCollection
    let serviceAreaPoint = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [latlng.lng, latlng.lat]
      }
    }
    featureCollection.value.features.push(serviceAreaPoint)

    // enable delete and download buttons
    if (serviceAreaObjectsComputed.value <= 2) {
      let element = document.getElementById("removeAreas")
      element.classList.toggle("draw-control-disabled")
      element.title = "Clear all service areas"
      let deleteBtn = document.getElementById("downloadAreasBtn")
      deleteBtn.classList.toggle("draw-control-disabled")
      deleteBtn.title = "Download all service areas"
    }

    hideLoading(serviceLayerName)
  } catch (error) {
    hideLoading(serviceLayerName)

  }
}

function downloadServiceAreas() {
  let data = featureCollection.value
  let downloadBtn = document.getElementById('downloadAreasBtn')

  // create export
  var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  downloadBtn.setAttribute('href', 'data:' + convertedData)
  downloadBtn.setAttribute('download','data.geojson')
}

function clearServiceAreas() {
  // clear all data from service areas pane
  let layerIDs = Object.keys(mapStore.serviceAreaPane._layers)
  layerIDs.map(function(entry) {
    mapStore.serviceAreaPane.removeLayer(Number(entry))
  })
  deleteServiceAreasPopup.value = false

  // disable delete and download buttons
  let element = document.getElementById("removeAreas")
  element.classList.toggle("draw-control-disabled")
  element.title = "There are no layers to delete"
  let deleteBtn = document.getElementById("downloadAreasBtn")
  deleteBtn.classList.toggle("draw-control-disabled")
  deleteBtn.title = "Add service areas before downloading"

  // reset downloadable featureCollection
  featureCollection.value = {
    'type': 'FeatureCollection',
    'features': []
  }

  // remove download functionality
  let downloadBtn = document.getElementById('downloadAreasBtn')
  downloadBtn.removeAttribute('href')
  downloadBtn.removeAttribute('download')

  // reset service area names in store
  mapStore.activeServiceAreas = []
}

function moveLeftSideElements(moveTo) {
  // moves leaflet elements on the left side of the screen to accommodate layers list being opened/closed

  let position
  if (moveTo == 'right') {
    position = '300px'
  } else if (moveTo == 'left') {
    position = '0px'
  }

  // move leaflet elements
  let elements = document.getElementsByClassName('leaflet-left')
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    element.style['left'] = position
  }

  // move custom dropdown menu - ONLY if it exists
  let customElement = document.getElementById('customLocation')
  if (customElement) {
    let positionNum = Number(position.substring(0, position.length - 2))
    let newPos = `${positionNum + 58}px`
    customElement.style['left'] = newPos
  } else {
  }
}

// create url string for WMS features request
const generateWmsRequestUrl = (map, mapProjection, clickCoordinates) => {

  // X & Y
  const point = map.latLngToContainerPoint(clickCoordinates, map.getZoom());
  const pointX = point.x.toFixed(); // X
  const pointY = point.y.toFixed(); // Y
  // width & height
  const size = map.getSize();
  const sizeX = size.x; // WIDTH
  const sizeY = size.y; // HEIGHT
  // bbox
  const bounds = map.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  const swProj = mapProjection.projection._proj.forward([sw.lng, sw.lat]);
  const neProj = mapProjection.projection._proj.forward([ne.lng, ne.lat]);
  const bbox = `${swProj[0]},${swProj[1]},${neProj[0]},${neProj[1]}`; // BBOX

  const urlParameters = {
    x: pointX,
    y: pointY,
    width: sizeX,
    height: sizeY,
    bbox: bbox,
    lat: clickCoordinates.lat,
    lng: clickCoordinates.lng,
    zoom: map.getZoom(),
  };

  setWmsUrlParameters(urlParameters);
}

// save zoom value to vuex
const setMapZoom = (zoom) => {
  mapStore.mapZoom = zoom;
}

// save center value to vuex
const setMapCenter = (center) => {
  mapStore.mapCenter = center;
}

// set url wms parameters
const setWmsUrlParameters = (value) => {
  mapStore.wmsUrlParameters = value;
}
</script>

<style lang="scss">
#map-container {
  background-color: rgb(210, 200, 200);
  height: 100vh;
  height: calc(100vh - 56px);
  width: 100%;
}

#map {
  width: 100%;
  height: 100%;
}

#info-container {
  padding: 0rem 1rem 1rem 1rem;
}

@media (max-width: $breakpoint-xs-max) {
  // #map {
  //   // height: 50vh;
  // }

  #info-container {
    padding: 1rem 0rem 0.5rem 0rem;
  }
}

.serviceAreaBtn {
  font-size: 15px;
}

.deleteIcon {
  background-color: rgb(55, 109, 73);
}

.deleteText {
  color: rgb(55, 109, 73);
}

.draw-control-disabled {
  filter: contrast(20%) brightness(180%);
}

#removeAreas.draw-control-disabled {
  border-top: 1px solid black;
}

.hexagon-mode-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.hexagon-mode-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.hexagon-btn-active {
  background-color: rgba(150, 181, 57, 0.3) !important;
  border-left: 3px solid rgb(150, 181, 57);
}
</style>
