module.exports = {
  polygonYellow: {
    color: "#ffa000",
    fillColor: "#ffa000",
    fillOpacity: 0.3,
    weight: 5,
    opacity: 0.3,
  },
  polygonRed: {
    color: "#e53935",
    fillColor: "red",
    fillOpacity: 0.5,
    weight: 5,
    opacity: 0.3,
  },

  polygonDefault: {
    color: "#1976d2",
    weight: 5,
    opacity: 0.5,
  },

  tileColors: {
    "#d01c25": 1,
    "#ffaa24": 2.5,
    "#fff570": 4,
    "#799ba2": 6,
    "#0049d0": 8,
    "#4e006c": 10,
  },

vectorTileStyle:
  function(layer) {
    const styles = require("/custom_modules/styles.js")

    const suitability_mode = layer.suitability_mode || 'ahp'

    // Use fully qualified property names
    const attribute_name = (suitability_mode === 'survey')
      ? 'survey_suitability_value'
      : 'ahp_suitability_value'

    var value = layer.properties[attribute_name]
    var col = ''
    let keys = Object.keys(styles.tileColors)
    let values = Object.values(styles.tileColors)

    if (value < values[0]) { col = keys[0] }
    else if (value <= values[1]) { col = keys[1]}
    else if (value <= values[2]) { col = keys[2]}
    else if (value <= values[3]) { col = keys[3]}
    else if (value <= values[4]) {col = keys[4]}
    else {col = keys[5]}

    var style = {
      color: col,
      weight: 1,
      fillOpacity: 0.5,
    }
    return style
  },
};
