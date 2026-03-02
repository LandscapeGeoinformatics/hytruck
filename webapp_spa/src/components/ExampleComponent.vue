<template>
  <div class="q-pa-lg">
    <div class="text-h4 q-pb-lg">Composition API</div>
    <div class="row q-gutter-x-md">
      <!-- state values -->
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ titleLocal }}</div>
          <div class="text-subtitle2">
            Number: {{ number }} Number double: {{ numberDouble }}
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn @click="decrement()" flat>Decrement</q-btn>
          <q-btn @click="increment()" flat>Increment</q-btn>
        </q-card-actions>
      </q-card>
      <!-- storage values -->
      <q-card class="my-card">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6">{{ titleGlobal }}</div>
          <div class="text-subtitle2">
            Layers: {{ store.layers }} Layers double: {{ store.doubleCount }}
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="decrementLayers()" flat>Decrement</q-btn>
          <q-btn @click="incrementLayers()" flat>Increment</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { mapStore } from "stores/gis";

// map store
const store = mapStore();

// props
const props = defineProps({
  title_1: String,
  title_2: String,
});

// state
const number = ref(0);

// watch
watch(number, (newValue, oldValue) => {
  console.log("New value: " + newValue);
});

// method
const increment = function () {
  number.value++;
};
const decrement = function () {
  number.value--;
};
const incrementLayers = function () {
  store.layers += 100;
};
const decrementLayers = function () {
  store.layers -= 100;
};

// computed
const titleLocal = computed(() => {
  return props.title_1;
});
const titleGlobal = computed(() => {
  return props.title_2;
});
const numberDouble = computed(() => {
  return number.value * 2;
});

// lifecycle hooks
onMounted(() => {
  console.log("component mounted");
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>
