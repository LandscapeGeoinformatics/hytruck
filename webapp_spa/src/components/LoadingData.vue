<template>
  <div>
    <div class="q-mt-lg" style="display: flex; flex-direction: column; justify-content: center;">
      <div v-show="mapStore.loadingData" class='flex-container' style="justify-content: center;">
        <q-spinner-ios color="green" size="sm" class="q-mr-sm"/>
        <p>{{ mapStore.loadingMsg }} ...</p>
      </div>
      <div class='flex-container' style="justify-content: center;">
        <p style="padding-top: 14px; width: auto" v-show="mapStore.showActionComplete">{{ mapStore.completeAction }}</p>
        <q-btn
        flat
        v-show="mapStore.showActionComplete"
        class="btn-style"
        @click="mapStore.showActionComplete = !mapStore.showActionComplete"
        >
        Ok ({{ countDown }})
      </q-btn>
    </div>
  </div>
  </div>
</template>

<script setup>
/* 
  Imports
*/

  import { ref, computed, watch } from 'vue'
  import { gisStore } from 'src/stores/gis'

/* 
  Data
*/

  const mapStore = gisStore()
  let counter = ref(0)
  let countDown = ref(10)

/* 
  Computed
*/

  const completeActionComputed = computed(() => {
    return mapStore.showActionComplete
  })

/*
  Watchers
*/

  watch(completeActionComputed, (newValue, oldValue) => {
    if (newValue == true) {
      countDownTimer()
    }
    if (newValue == false) {
      stopCounter()
    }
  })

/* 
  Functions
*/

  function countDownTimer() {
    window.clearTimeout(counter.value)
    counter.value = 0
    if (countDown.value > -1 && mapStore.showActionComplete) {
      counter.value = setTimeout(() => {
        countDown.value -= 1
        countDownTimer()
      }, 1000)
    } else {
      stopCounter()
    }
  }

  function stopCounter() {
    window.clearTimeout(counter.value)
    mapStore.showActionComplete = false
    mapStore.completeAction = ''
    counter.value = 0
    countDown.value = 10
  }

</script>

<style lang="scss" scoped>
  .btn-style {
    background-color: rgb(150, 181, 57);
    color: white;
    height: 30px;
    margin-top: 7px;
    margin-left: 10px;
    width: 20%
  }

  .flex-container {
    display: flex;
    flex-direction: row;
  }
</style>