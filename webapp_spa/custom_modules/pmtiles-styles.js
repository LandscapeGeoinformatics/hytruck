// Unified PMTiles styling and legend configuration
// Single source of truth for both map rendering and legend generation

/**
 * Layer configurations - single source of truth
 */
const LAYER_CONFIGS = {
  'ehb_2030': {
    data_layer_name: 'ehb_2030',
    rules: [
      {
        filter: (feature) => feature.props.type_code === 1,
        label: 'Repurposed',
        geometry_type: 'line',
        style: {
          color: '#0b5060',
          width: 3,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.type_code === 2,
        label: 'New',
        geometry_type: 'line',
        style: {
          color: '#e1a409',
          width: 3,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.type_code === 3,
        label: 'Import / Export',
        geometry_type: 'line',
        style: {
          color: '#ca6222',
          width: 3,
          line_cap: 'round',
          line_join: 'round',
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.type_code === 5,
        label: 'UK',
        geometry_type: 'line',
        style: {
          color: '#0b5060',
          width: 3,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: null,
        label: 'Subsea',
        geometry_type: 'line',
        style: {
          color: '#05b3de',
          width: 3,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      }
    ]
  },

  'ehb_2040': {
    data_layer_name: 'ehb_2040',
    rules: 'COPY:ehb_2030'
  },

  'powerplants': {
    data_layer_name: 'powerplants',
    rules: [
      {
        filter: (feature) => feature.props.class === 'Biomass',
        label: 'Biomass',
        geometry_type: 'point',
        style: {
          color: '#91770b',
          radius: 3.5,
          stroke_color: '#000000',
          stroke_width: 1,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.class === 'Fossil',
        label: 'Fossil',
        geometry_type: 'point',
        style: {
          color: '#000000',
          radius: 3.5,
          stroke_color: '#000000',
          stroke_width: 1,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.class === 'Hydro',
        label: 'Hydro',
        geometry_type: 'point',
        style: {
          color: '#3848d7',
          radius: 3.5,
          stroke_color: '#000000',
          stroke_width: 1,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.class === 'Nuclear',
        label: 'Nuclear',
        geometry_type: 'point',
        style: {
          color: '#91f644',
          radius: 3.5,
          stroke_color: '#000000',
          stroke_width: 1,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.class === 'Peat',
        label: 'Peat',
        geometry_type: 'point',
        style: {
          color: '#c5ca3f',
          radius: 3.5,
          stroke_color: '#000000',
          stroke_width: 1,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.class === 'Wind Onshore',
        label: 'Wind Onshore',
        geometry_type: 'point',
        style: {
          color: '#60e5ea',
          radius: 3.5,
          stroke_color: '#000000',
          stroke_width: 1,
          opacity: 1.0,
        }
      },
      {
        filter: null,
        label: 'Other',
        geometry_type: 'point',
        style: {
          color: '#808080',
          radius: 3.5,
          stroke_color: '#000000',
          stroke_width: 1,
          opacity: 1.0,
        }
      }
    ]
  },
'gas_stations': {
  data_layer_name: 'gas_stations',  // ← CHANGED from 'fuel_stations' to 'gas_stations'
  rules: [
    {
      filter: null,
      label: 'Fuel Station',
      geometry_type: 'point',
      style: {
        color: '#FF0000',
        radius: 6,
        stroke_color: '#FFFFFF',
        stroke_width: 2,
        opacity: 1.0,
      }
    }
  ]
},


  'partner_countries': {
    data_layer_name: 'partner_countries',
    rules: [
      {
        filter: (feature) => feature.props.sovereignt === 'Estonia',
        label: 'Estonia',
        geometry_type: 'polygon',
        style: {
          color: '#4CAF50',
          opacity: 0.7,
        }
      },
      {
        filter: (feature) => feature.props.sovereignt === 'Finland',
        label: 'Finland',
        geometry_type: 'polygon',
        style: {
          color: '#2196F3',
          opacity: 0.7,
        }
      },
      {
        filter: (feature) => feature.props.sovereignt === 'Germany',
        label: 'Germany',
        geometry_type: 'polygon',
        style: {
          color: '#FF0107',
          opacity: 0.7,
        }
      },
      {
        filter: (feature) => feature.props.sovereignt === 'Latvia',
        label: 'Latvia',
        geometry_type: 'polygon',
        style: {
          color: '#E91E63',
          opacity: 0.7,
        }
      },
      {
        filter: (feature) => feature.props.sovereignt === 'Lithuania',
        label: 'Lithuania',
        geometry_type: 'polygon',
        style: {
          color: '#9C27B0',
          opacity: 0.7,
        }
      },
      {
        filter: (feature) => feature.props.sovereignt === 'Netherlands',
        label: 'Netherlands',
        geometry_type: 'polygon',
        style: {
          color: '#FF5722',
          opacity: 0.7,
        }
      },
      {
        filter: (feature) => feature.props.sovereignt === 'Norway',
        label: 'Norway',
        geometry_type: 'polygon',
        style: {
          color: '#00BCD4',
          opacity: 0.7,
        }
      },
      {
        filter: (feature) => feature.props.sovereignt === 'Poland',
        label: 'Poland',
        geometry_type: 'polygon',
        style: {
          color: '#FF98f0',
          opacity: 0.7,
        }
      },
      {
        filter: (feature) => feature.props.sovereignt === 'Sweden',
        label: 'Sweden',
        geometry_type: 'polygon',
        style: {
          color: '#FFEB3B',
          opacity: 0.7,
        }
      },
      {
        filter: (feature) => feature.props.sovereignt === 'United Kingdom',
        label: 'United Kingdom',
        geometry_type: 'polygon',
        style: {
          color: '#9E9E9E',
          opacity: 0.7,
        }
      },
      {
        filter: null,
        label: 'Other',
        geometry_type: 'polygon',
        style: {
          color: '#808080',
          opacity: 0.7,
        }
      }
    ]
  },

  'rest_areas': {
    data_layer_name: 'rest_areas',
    rules: [
      {
        filter: null,
        label: 'Rest Area',
        geometry_type: 'point',
        style: {
          color: '#0066FF',
          radius: 3,
          opacity: 1.0,
        }
      }
    ]
  },

  'substations': {
    data_layer_name: 'substations',
    rules: [
      {
        filter: null,
        label: 'Substation',
        geometry_type: 'point',
        style: {
          color: '#FF6600',
          radius: 3,
          opacity: 1.0,
        }
      }
    ]
  },

  'wind_power': {
    data_layer_name: 'wind_power',
    rules: [
      {
        filter: null,
        label: 'Wind Farm',
        geometry_type: 'point',
        style: {
          color: '#56d7ac',
          radius: 3.5,
          stroke_color: '#01f2ff',
          stroke_width: 1,
          opacity: 1.0,
        }
      }
    ]
  },

  'solar': {
    data_layer_name: 'solar',
    rules: [
      {
        filter: null,
        label: 'Solar Farm',
        geometry_type: 'point',
        style: {
          color: '#ffbb01',
          radius: 3.5,
          stroke_color: '#eaff03',
          stroke_width: 1,
          opacity: 1.0,
        }
      }
    ]
  },

  'gas_import_terminals': {
    data_layer_name: 'gas_import_terminals',
    rules: [
      {
        filter: null,
        label: 'Gas Import Terminal',
        geometry_type: 'point',
        style: {
          color: '#b4def7',
          radius: 3.5,
          stroke_color: '#000000',
          stroke_width: 1,
          opacity: 1.0,
        }
      }
    ]
  },

  'offshore_wind_2030': {
    data_layer_name: 'offshore_wind_2030',
    rules: [
      {
        filter: null,
        label: 'Offshore Wind 2030',
        geometry_type: 'point',
        style: {
          color: '#f58220',
          radius: 3,
          stroke_color: '#ffffff',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      }
    ]
  },

  'offshore_wind_2040': {
    data_layer_name: 'offshore_wind_2040',
    rules: [
      {
        filter: null,
        label: 'Offshore Wind 2040',
        geometry_type: 'point',
        style: {
          color: '#f58220',
          radius: 3,
          stroke_color: '#ffffff',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      }
    ]
  },

  'urban_nodes': {
    data_layer_name: 'urban_nodes',
    rules: [
      {
        filter: (feature) => feature.props.type === 'Core-Methodology',
        label: 'Primary',
        geometry_type: 'point',
        style: {
          color: '#ff0105',
          radius: 4.5,
          stroke_color: '#232323',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      },
      {
        filter: null,
        label: 'Secondary',
        geometry_type: 'point',
        style: {
          color: '#ffee01',
          radius: 2,
          stroke_color: '#232323',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      }
    ]
  },

  'corridor_points': {
    data_layer_name: 'corridor_points',
    rules: [
      {
        filter: (feature) => feature.props.type === 'Airport',
        label: 'Airport',
        geometry_type: 'point',
        style: {
          color: '#ff0000',
          radius: 3.5,
          stroke_color: '#ff0000',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.type === 'Port',
        label: 'Port',
        geometry_type: 'point',
        style: {
          color: '#4b5be7',
          radius: 3.5,
          stroke_color: '#4b5be7',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.type === 'Seaport',
        label: 'Seaport',
        geometry_type: 'point',
        style: {
          color: '#ff7f00',
          radius: 3.5,
          stroke_color: '#ff7f00',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.type === 'Rail-Road terminal',
        label: 'Rail-Road terminal',
        geometry_type: 'point',
        style: {
          color: '#e9d626',
          radius: 3.5,
          stroke_color: '#e9d626',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      },
      {
        filter: null,
        label: 'Other',
        geometry_type: 'point',
        style: {
          color: '#808080',
          radius: 3.5,
          stroke_color: '#808080',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      }
    ]
  },

  'storages': {
    data_layer_name: 'storages',
    rules: [
      {
        filter: (feature) => feature.props.geology_type === 1,
        // filter: (feature) => {
        //   console.log('Storages feature geology_type:', feature.props.geology_type, 'type:', typeof feature.props.geology_type)
        //   return feature.props.geology_type === 1
        // },
        label: 'Salt Cavern',
        geometry_type: 'point',
        style: {
          color: '#23b24b',
          radius: 4.5,
          stroke_color: '#d6ebdd',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.geology_type === 2,
        label: 'Aquifer',
        geometry_type: 'point',
        style: {
          color: '#6e2c91',
          radius: 4.5,
          stroke_color: '#d6ebdd',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.geology_type === 3,
        label: 'Depleted field',
        geometry_type: 'point',
        style: {
          color: '#e64011',
          radius: 4.5,
          stroke_color: '#d6ebdd',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      },
      {
        filter: null,
        label: 'Other',
        geometry_type: 'point',
        style: {
          color: '#808080',
          radius: 4.5,
          stroke_color: '#d6ebdd',
          stroke_width: 0.5,
          opacity: 1.0,
        }
      }
    ]
  },

  'h2live': {
    data_layer_name: 'h2live',
  rules: [
    {
      filter: (feature) => feature.props.combinedstatus === 'OPEN',
      label: 'Open',
      geometry_type: 'point',
      style: {
        color: '#33a02c',  // Green
        radius: 7,
        stroke_color: '#232323',
        stroke_width: 0.5,
        opacity: 1.0,
      }
    },
    {
      filter: (feature) => feature.props.combinedstatus === 'PLANNED',
      label: 'Planned',
      geometry_type: 'point',
      style: {
        color: '#ffee00',  // Yellow
        radius: 7,
        stroke_color: '#232323',
        stroke_width: 0.5,
        opacity: 1.0,
      }
    },
    {
      filter: (feature) => feature.props.combinedstatus === 'EXCEPTION',  // ← Changed from PERMCLOSED
      label: 'Exception',  // ← Changed label
      geometry_type: 'point',
      style: {
        color: '#e31a1c',  // Red (changed from grey)
        radius: 7,
        stroke_color: '#232323',
        stroke_width: 0.5,
        opacity: 1.0,
      }
    },
    {
      filter: null,
      label: 'Other',
      geometry_type: 'point',
      style: {
        color: '#858c8c',  // Grey
        radius: 7,
        stroke_color: '#232323',
        stroke_width: 0.5,
        opacity: 1.0,
      }
    }
  ]
  },

  'h2map': {
    data_layer_name: 'h2map',
  rules: [
    {
      // At least one fuel type available
      filter: (feature) => {
        const statuses = [
          feature.props.status_350car,
          feature.props.status_350bus,
          feature.props.status_700car
        ]
        return statuses.includes('available')
      },
      label: 'Available',
      geometry_type: 'point',
      style: {
        color: '#33a02c',  // Green
        radius: 7,
        stroke_color: '#232323',
        stroke_width: 0.5,
        opacity: 1.0,
      }
    },
    {
      // Limited availability (outside opening hours)
      filter: (feature) => {
        const statuses = [
          feature.props.status_350car,
          feature.props.status_350bus,
          feature.props.status_700car
        ]
        return statuses.includes('outside-opening-hours')
      },
      label: 'Limited Availability',
      geometry_type: 'point',
      style: {
        color: '#ffee00',  // Yellow
        radius: 7,
        stroke_color: '#232323',
        stroke_width: 0.5,
        opacity: 1.0,
      }
    },
    {
      // All fuel types unavailable
      filter: (feature) => {
        const statuses = [
          feature.props.status_350car,
          feature.props.status_350bus,
          feature.props.status_700car
        ].filter(s => s !== 'n/a')  // Exclude n/a

        return statuses.length > 0 && statuses.every(s => s === 'unavailable')
      },
      label: 'Unavailable',
      geometry_type: 'point',
      style: {
        color: '#e31a1c',  // Red
        radius: 7,
        stroke_color: '#232323',
        stroke_width: 0.5,
        opacity: 1.0,
      }
    },
    {
      // All unknown
      filter: (feature) => {
        const statuses = [
          feature.props.status_350car,
          feature.props.status_350bus,
          feature.props.status_700car
        ].filter(s => s !== 'n/a')

        return statuses.length > 0 && statuses.every(s => s === 'unknown')
      },
      label: 'Unknown',
      geometry_type: 'point',
      style: {
        color: '#ff7f00',  // Orange
        radius: 7,
        stroke_color: '#232323',
        stroke_width: 0.5,
        opacity: 1.0,
      }
    },
    {
      // Everything is n/a (no fuel types available at station)
      filter: null,
      label: 'Not Provided',
      geometry_type: 'point',
      style: {
        color: '#858c8c',  // Grey
        radius: 7,
        stroke_color: '#232323',
        stroke_width: 0.5,
        opacity: 1.0,
      }
    }
  ]
  },

  'corridor_lines': {
    data_layer_name: 'corridor_lines',
    rules: [
      {
        filter: (feature) => feature.props.type === 'Inland waterway',
        label: 'Inland waterway',
        geometry_type: 'line',
        style: {
          color: '#5b82eb',
          width: 1,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.type === 'Railway',
        label: 'Railway',
        geometry_type: 'line',
        style: {
          color: '#969696',
          width: 1,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.type === 'Roads',
        label: 'Roads',
        geometry_type: 'line',
        style: {
          color: '#000000',
          width: 1,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: null,
        label: 'Other',
        geometry_type: 'line',
        style: {
          color: '#808080',
          width: 1,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      }
    ]
  },

  'powerlines': {
    data_layer_name: 'powerlines',
    rules: [
      {
        filter: (feature) => feature.props.voltage === '200-250 kV',
        label: '200-250 kV',
        geometry_type: 'line',
        style: {
          color: '#3ae0f2',
          width: 3,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.voltage === '300-350 kV',
        label: '300-350 kV',
        geometry_type: 'line',
        style: {
          color: '#ffc700',
          width: 3,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.voltage === '380-400 kV',
        label: '380-400 kV',
        geometry_type: 'line',
        style: {
          color: '#ff0000',
          width: 3,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: (feature) => feature.props.voltage === 'DC-Line',
        label: 'DC-Line',
        geometry_type: 'line',
        style: {
          color: '#ff91f8',
          width: 3,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      },
      {
        filter: null,
        label: 'Other',
        geometry_type: 'line',
        style: {
          color: '#808080',
          width: 3,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      }
    ]
  },

  // 'gas_pipeline': {
  //   data_layer_name: 'gas_pipeline',
  // 'gas_pipeline': {
  //   data_layer_name: 'gas_pipeline',
  'import_pipelines': {
    data_layer_name: 'import_pipelines',
    rules: [
      {
      //   filter : (feature) => {
      //     console.log('import pipeline FEATURE:', feature.props)
      //     return true  // Accept all features
      //   },

        filter: null,
        label: 'Import Pipeline',
        geometry_type: 'line',
        style: {
          color: '#cd7421',
          width: 4,
          line_cap: 'square',
          line_join: 'bevel',
          opacity: 1.0,
        }
      }
    ]
  },

  'h2live_ready': {
    data_layer_name: 'h2live_ready',
    rules: [
      {
        filter: null,
        label: 'Ready',
        geometry_type: 'polygon',
        style: {
          color: '#33a02c',
          opacity: 0.26,
          stroke_color: '#33a02c',
          stroke_width: 1,
        }
      }
    ]
  },

  'h2live_not_ready': {
    data_layer_name: 'h2live_not_ready',
    rules: [
      {
        filter: null,
        label: 'Not Ready',
        geometry_type: 'polygon',
        style: {
          color: '#e31a1c',
          opacity: 0.26,
          stroke_color: '#e31a1c',
          stroke_width: 1,
        }
      }
    ]
  },
}

/**
 * Resolve layer config (handles COPY references)
 */
function resolve_layer_config(layer_id) {
  const config = LAYER_CONFIGS[layer_id]
  if (!config) return null

  // Handle COPY references
  if (typeof config.rules === 'string' && config.rules.startsWith('COPY:')) {
    const source_layer = config.rules.substring(5)
    return {
      data_layer_name: config.data_layer_name,
      rules: LAYER_CONFIGS[source_layer].rules
    }
  }

  return config
}

/**
 * Generate protomaps-leaflet paint rules from layer configuration
 */
/**
 * Generate protomaps-leaflet paint rules from layer configuration
 */
function get_paint_rules_from_layer_id(layer_id, data_layer_name) {
  const config = resolve_layer_config(layer_id)
  if (!config) return []

  const paint_rules = config.rules.map(rule => {
    const paint_rule = {
      dataLayer: data_layer_name || config.data_layer_name
    }

    // Add symbolizer based on geometry type
    if (rule.geometry_type === 'line') {
      paint_rule.symbolizer = new protomapsL.LineSymbolizer({
        color: rule.style.color,
        width: rule.style.width,
        opacity: rule.style.opacity || 1.0,
        lineCap: rule.style.line_cap || 'butt',
        lineJoin: rule.style.line_join || 'miter',
      })
    } else if (rule.geometry_type === 'point') {
      paint_rule.symbolizer = new protomapsL.CircleSymbolizer({
        radius: rule.style.radius || 5,
        fill: rule.style.color,
        opacity: rule.style.opacity || 1.0,
        stroke: rule.style.stroke_color,
        width: rule.style.stroke_width || 0,
      })
    } else if (rule.geometry_type === 'polygon') {
      paint_rule.symbolizer = new protomapsL.PolygonSymbolizer({
        fill: rule.style.color,
        opacity: rule.style.opacity || 1.0,
        stroke: rule.style.stroke_color,
        width: rule.style.stroke_width || 0,
      })
    }

    // Add filter
    if (rule.filter === null) {
      // For default/else rules, filter out anything that matched previous rules
      const previous_filters = config.rules
        .slice(0, config.rules.indexOf(rule))
        .filter(r => r.filter !== null)
        .map(r => r.filter)

      paint_rule.filter = (zoom, feature) => {
        return !previous_filters.some(f => f(feature))
      }
    } else {
      paint_rule.filter = (zoom, feature) => {
        return rule.filter(feature)
      }
    }

    return paint_rule
  })

  // ADD THIS CONSOLE LOG - NOW AFTER paint_rules IS DEFINED
  // paint_rules.forEach((rule, index) => {
  //   console.log(`Rule ${index}:`, {
  //     dataLayer: rule.dataLayer,
  //     symbolizer: rule.symbolizer.constructor.name,
  //     hasFilter: typeof rule.filter === 'function'
  //   })
  // })

  return paint_rules
}

/**
 * Generate legend items from layer configuration
 */
function get_legend_items_from_layer_id(layer_id) {
  const config = resolve_layer_config(layer_id)
  if (!config) return []

  return config.rules.map(rule => ({
    label: rule.label,
    geometry_type: rule.geometry_type,
    style: rule.style
  }))
}

/**
 * Generate SVG data URL for legend based on geometry type
 */
function generate_legend_svg(legend_item, width = 40, height = 20) {
  if (legend_item.geometry_type === 'line') {
    return generate_line_svg(legend_item.style, width, height)
  } else if (legend_item.geometry_type === 'point') {
    return generate_point_svg(legend_item.style, width, height)
  } else if (legend_item.geometry_type === 'polygon') {
    return generate_polygon_svg(legend_item.style, width, height)
  }
  return ''
}

function generate_line_svg(style, width, height) {
  const line_y = height / 2
  const svg_string = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="${line_y}" x2="${width - 2}" y2="${line_y}" stroke="${style.color}" stroke-width="${style.width}" stroke-linecap="${style.line_cap || 'butt'}" stroke-linejoin="${style.line_join || 'miter'}" stroke-opacity="${style.opacity || 1.0}"/></svg>`
  return `data:image/svg+xml;base64,${btoa(svg_string)}`
}

function generate_point_svg(style, width, height) {
  const cx = width / 2
  const cy = height / 2
  const r = style.radius || 5
  const stroke = style.stroke_color ? `stroke="${style.stroke_color}" stroke-width="${style.stroke_width || 1}"` : ''

  const svg_string = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${style.color}" opacity="${style.opacity || 1.0}" ${stroke}/></svg>`
  return `data:image/svg+xml;base64,${btoa(svg_string)}`
}

function generate_polygon_svg(style, width, height) {
  const margin = 2
  const stroke = style.stroke_color ? `stroke="${style.stroke_color}" stroke-width="${style.stroke_width || 1}"` : 'stroke="none"'

  const svg_string = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect x="${margin}" y="${margin}" width="${width - 2 * margin}" height="${height - 2 * margin}" fill="${style.color}" opacity="${style.opacity || 1.0}" ${stroke}/></svg>`
  return `data:image/svg+xml;base64,${btoa(svg_string)}`
}

/**
 * Check if a layer has PMTiles configuration
 */
function has_pmtiles_legend(layer_id) {
  return LAYER_CONFIGS.hasOwnProperty(layer_id)
}

module.exports = {
  get_paint_rules_from_layer_id,
  get_legend_items_from_layer_id,
  generate_legend_svg,
  has_pmtiles_legend
}
