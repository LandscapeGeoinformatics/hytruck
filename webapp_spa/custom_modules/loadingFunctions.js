// this module is used along with LoadingData.vue

import { gisStore } from 'src/stores/gis'
const mapStore = gisStore()

// indicate operation progress
export function showLoading(show, message) {
  mapStore.loadingData = show
  if (show == true) {
    mapStore.loadingMsg = message
  }
  if (show == false) {
    mapStore.loadingMsg = ''
  }
}

// indicate operation result
export function showResult(message) {
  mapStore.showActionComplete = true
  mapStore.completeAction = message
}