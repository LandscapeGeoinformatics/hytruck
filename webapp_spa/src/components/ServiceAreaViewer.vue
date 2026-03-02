<template>
  <div id="listContainer">
    <q-list dense bordered class="rounded-borders" v-if="areasComputed.length > 0">
      <q-item class="q-mt-sm text-weight-medium">{{ listTitle }}</q-item>
      <q-item v-for="item in areasComputed" v-bind:key="item" clickable v-ripple>
        <q-item-section
          style="display:flex; flex-direction: row; justify-content: space-between;"
          @mouseover="updateOpacity(item)"
          @mouseout="updateOpacity(item)"
        >
          {{ returnTitle(item) }}
          <q-btn class="deleteBtn" size="xs" icon="delete" @click="deleteFn(item)">
            <q-tooltip>
              Remove {{ item }}
            </q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>

/* 
  Imports
*/

import { gisStore } from "stores/gis"
import { computed } from "vue"
import { storeToRefs } from 'pinia'
import { useQuasar } from "quasar"

/* 
  Data
*/

const mapStore = gisStore()
const $q = useQuasar()
const { activeServiceAreas } = storeToRefs(mapStore)

/* 
  Computed properties
*/

const screenSize = computed(() => {
  return $q.screen.width
})

const listTitle = computed(() => {
  if (screenSize.value <= 600) {
    return 'Areas'
  } else {
    return 'Planned service areas'
  }
})

const areasComputed = computed(() => {
  return activeServiceAreas.value.flat()
})

/* 
  Functions
*/

function returnTitle(input) {
  // return area title in normal viw and only a number in mobile view
  if (screenSize.value <= 600) {
    return input.substr(input.length - 1)
  } else {
    return input
  }
}

function deleteFn(input) {
  let entries = Object.entries(mapStore.serviceAreaPane._layers)

  entries.forEach(element => {
    let key = parseInt(element)
    let entry = mapStore.serviceAreaPane._layers[key]

    // points
    if (entry._layers == undefined) {
      if (entry.options.name == input) {
        entry.remove()
        mapStore.serviceAreaPane.removeLayer(key)
      }
    } else {
      // polygons
      if (entry._layers[key-1].feature.name == input) {
        entry._layers[key-1].remove()
        delete entry._layers[key-1]
        mapStore.serviceAreaPane.removeLayer(key)
        // remove entries from store
        let idx = mapStore.activeServiceAreas.indexOf(input)
        if (idx > -1) {
          mapStore.activeServiceAreas.splice(idx, 1)
        }
      }
    }
  })
}

function updateOpacity(input) {
  let entries = Object.entries(mapStore.serviceAreaPane._layers)
  entries.forEach(element => {
    let layerData = mapStore.serviceAreaPane._layers[parseInt(element)]._layers
    if (layerData !== undefined) {
      let layerKey = Object.keys(layerData)
      let name = layerData[layerKey].feature.name
      if (name == input) {
        let currentOpacity = layerData[layerKey].options.fillOpacity
        let newOpacity
        if (currentOpacity == mapStore.polygonOpacity.new) {
          newOpacity = mapStore.polygonOpacity.original
        } else {
          newOpacity = mapStore.polygonOpacity.new
        }
        layerData[layerKey].setStyle({fillOpacity: newOpacity})
      }
    }
  })
}

</script>

<style lang="scss" scoped>
#listContainer {
  position: absolute;
  top: 190px;
  left: 12px;
  z-index: 700;
  background-color: rgb(255, 255, 255);
  height: auto;
  width: auto;
  padding: 10px;
  display: block;
  padding: 0px;
  border-radius: 3px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
}

.deleteBtn {
  margin-top: 2px;
  height: fit-content;
  width: 20px;
  margin-left: 10px;
}
</style>