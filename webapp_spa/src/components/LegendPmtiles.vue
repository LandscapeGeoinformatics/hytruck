<template>
  <div class="pmtiles-legend">
    <div
      v-for="(item, index) in legendItems"
      :key="index"
      class="legend-item"
    >
      <img
        :src="generateSvg(item)"
        class="legend-symbol"
        :alt="item.label"
      />
      <span class="legend-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
const pmtiles_styles = require("/custom_modules/pmtiles-styles.js");  // ADD THIS LINE

export default {
  name: "LegendPmtiles",

  props: {
    layer_id: {
      type: String,
      required: true
    }
  },

  computed: {
    legendItems() {
      return pmtiles_styles.get_legend_items_from_layer_id(this.layer_id)
    }
  },

  methods: {
    generateSvg(legend_item) {
      return pmtiles_styles.generate_legend_svg(legend_item, 40, 20)  // Note: generate_legend_svg not generate_line_legend_svg
    }
  }
}
</script>

<style scoped>
.pmtiles-legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-symbol {
  width: 40px;
  height: 20px;
  display: block;
}

.legend-label {
  font-size: 13px;
  color: #333;
}
</style>
