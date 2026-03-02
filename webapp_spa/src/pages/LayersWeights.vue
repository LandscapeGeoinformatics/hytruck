<template>
  <q-page id="pageContainer">
    <div style="width: 600px; height: 600px" class="q-pa-md">
      <div class="text-h4 q-pb-lg text-bold" style="width: 100%; display: flex; justify-content: center;">
        Choose layer weights
      </div>
      <div class="flex-container">
        <q-table
          style="width: 60%;"
          :rows="displayed_rows"
          :columns="columns"
          row-key="key"
          dense
          :rows-per-page-options="[0]"
          hide-pagination
          table-class="table-class"
          class="q-mr-md"
        >
          <template v-slot:body-cell-weight="props">
            <q-td :props="props" style="width:100px">
              <div>
                {{ Number(props.row.weight).toFixed(3) }}
              </div>
            </q-td>
          </template>
        </q-table>
        <div style="width: 40%;">
          <p class="q-mb-sm">Choose a saved setting:</p>
          <q-select
            style="width: 100%;"
            v-model="selected_weight_setting"
            :options="available_weight_options"
            dense
            outlined
            class="q-pb-none"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const WEIGHT_PRESETS = {
  'AHP default settings': {
    'modelled_fuel_stations': 0.086,
    'modelled_seashore': 0.083,
    'modelled_solar_wind': 0.090,
    'modelled_urban_nodes': 0.213,
    'modelled_water_bodies': 0.032,
    'modelled_gas_pipelines': 0.011,
    'modelled_hydrogen_pipelines': 0.028,
    'modelled_corridor_points': 0.015,
    'modelled_powerlines': 0.073,
    'modelled_transport_nodes': 0.136,
    'modelled_residential_areas': 0.011,
    'modelled_rest_areas': 0.052,
    'modelled_slope': 0.014
  },
  'Survey default settings': {
    'modelled_fuel_stations': 0.059,
    'modelled_seashore': 0.041,
    'modelled_solar_wind': 0.057,
    'modelled_urban_nodes': 0.093,
    'modelled_water_bodies': 0.048,
    'modelled_gas_pipelines': 0.050,
    'modelled_hydrogen_pipelines': 0.080,
    'modelled_corridor_points': 0.085,
    'modelled_powerlines': 0.076,
    'modelled_transport_nodes': 0.086,
    'modelled_residential_areas': 0.068,
    'modelled_rest_areas': 0.061,
    'modelled_slope': 0.062
  }
}

const selected_weight_setting = ref('AHP default settings')
const available_weight_options = Object.keys(WEIGHT_PRESETS)

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Layer name',
    align: 'left',
    field: row => display_name_from_key(row.key),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'weight',
    align: 'center',
    label: 'Weight',
    field: 'weight',
    sortable: true
  },
]

const displayed_rows = computed(() => {
  const preset = WEIGHT_PRESETS[selected_weight_setting.value]
  return Object.entries(preset).map(([key, weight]) => ({
    key: key,
    weight: weight
  }))
})

function display_name_from_key(key) {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: row;
}
</style>

