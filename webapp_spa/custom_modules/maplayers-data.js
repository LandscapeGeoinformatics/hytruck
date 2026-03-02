// Map layers configuration data
module.exports = {
  "layers": [

    /////////// SUITABLITY ///////////
    {
      "id": "suitability_view",
      "attributions": "cite 1",
      "description": {
        "en": ""
      },
      "format": "fill",
      "group": "ahp",
      "layers": "weighted_suitability",
      "projection": "wgs84",
      "style": {
        "style_id": "",
        "url": ""
      },
      "title": {
        "en": "Suitability"
      },
      "transparent": false,
      "active": false,
      "type": "mvt",
      "url": "https://dggs.geokuup.ee/tiles-api/suitability_hytruck_parquet/{z}/{x}/{y}",
      // "url": "https://dggs.geokuup.ee/tiles-api/suitability_hytruck_parquet/{z}/{x}/{y}?relative_depth=1",
      //  relative_detph : [0, 1, 2]
      // https://dggs.geokuup.ee/tiles-api/suitability_hytruck_parquet/%7Bz%7D/%7Bx%7D/%7By%7D
      // "url": "https://pydggsapi-hytruck-299240043987.europe-west1.run.app/tiles-api/suitability_hytruck/{z}/{x}/{y}?relative_depth=0",
//      "url": "https://pydggsapi-hytruck-299240043987.europe-west1.run.app/tiles-api/suitability_hytruck/{z}/{x}/{y}",
      "version": "1.1.1",
      "zIndex": 0,
      "docurl": {
        "en": "https://hytruck.landscape-geoinformatics.eu/docs/about"
      }
    },


    /////////// BASE ///////////
    {
      "id": "esri_world_imagery",
      "attributions": "arcgis",
      "description": {
        "en": "Collaborative project",
        "ee": "Koostööprojekt"
      },
      "format": "png",
      "group": "base map",
      "layers": "esri_world_imagery",
      "projection": "epsg:3857",
      "style": {
        "style_id": "",
        "url": ""
      },
      "title": {
        "en": "ESRI World Imagery",
        "ee": "ESRI World Imagery"
      },
      "transparent": false,
      "active": false,
      "type": "wms",
      "url": "https://server.arcgisonline.com/arcgis/rest/services/world_imagery/mapserver/tile/{z}/{y}/{x}.png",
      "version": "1.1.1",
      "zIndex": 0,
      "docurl": {
        "en": "",
        "ee": ""
      }
    },
    {
      "id": "osm",
      "attributions": "osm community",
      "description": {
        "en": "Collaborative project",
        "ee": "Koostööprojekt"
      },
      "format": "png",
      "group": "base map",
      "layers": "osm",
      "projection": "epsg:3857",
      "style": {
        "style_id": "",
        "url": ""
      },
      "title": {
        "en": "Open Street Map",
        "ee": "Open Street Map"
      },
      "transparent": false,
      "active": true,
      "type": "wms",
      "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "version": "1.1.1",
      "zIndex": 0,
      "docurl": {
        "en": "",
        "ee": ""
      }
    },

/////////// EHB ///////////

{
  "id": "ehb_2030",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "pmtiles",
  "group": "ehb",
  "layers": "ehb_2030",  // This becomes the dataLayer name for PMTiles
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "EHB 2030"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/ehb_2030.pmtiles",
  // "url": "http://localhost:7000/ehb_2030.pmtiles",
  "version": "1.1.1",
  "zIndex": 10,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/ehb_2030/"
  }
},

{
  "id": "ehb_2040",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "ehb",
  "layers": "ehb_2040",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "EHB 2040"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/ehb_2040.pmtiles",
  "version": "1.1.1",
  "zIndex": 20,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/ehb_2040/"
  }
},

{
  "id": "storages",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "ehb",
  "layers": "storages",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Storages"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/storages.pmtiles",
  "version": "1.1.1",
  "zIndex": 30,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/storages/"
  }
},
{
  "id": "gas_import_terminals",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "ehb",
  "layers": "gas_import_terminals",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Gas import terminals"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/gas_import_terminals.pmtiles",
  "version": "1.1.1",
  "zIndex": 30,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/gas_import/"
  }
},
{
  "id": "import_pipelines",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "ehb",
  "layers": "import_pipelines",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Import pipelines"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/import_pipelines.pmtiles",
  "version": "1.1.1",
  "zIndex": 40,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/import_pipelines/"
  }
},
{
  "id": "offshore_wind_2030",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "ehb",
  "layers": "offshore_wind_2030",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Offshore wind 2030"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/offshore_wind_2030.pmtiles",
  "version": "1.1.1",
  "zIndex": 40,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/wind_2030/"
  }
},
{
  "id": "offshore_wind_2040",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "ehb",
  "layers": "offshore_wind_2040",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Offshore wind 2040"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/offshore_wind_2040.pmtiles",
  "version": "1.1.1",
  "zIndex": 50,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/wind_2040/"
  }
},

/////////// POWER ///////////

{
  "id": "powerplants",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "power",
  "layers": "powerplants",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Power plants"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/powerplants.pmtiles",
  "version": "1.1.1",
  "zIndex": 20,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/powerplants/"
  }
},
{
  "id": "substations",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "power",
  "layers": "substations",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Power substation"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/substations.pmtiles",
  "version": "1.1.1",
  "zIndex": 10,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/substations/"
  }
},
{
  "id": "wind_power",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "power",
  "layers": "wind_power",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Wind farms (GEM)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/wind_power.pmtiles",
  "version": "1.1.1",
  "zIndex": 24,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/wind/"
  }
},
{
  "id": "solar",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "power",
  "layers": "solar",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Solar farms (GEM)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/solar.pmtiles",
  "version": "1.1.1",
  "zIndex": 25,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/solar/"
  }
},
{
  "id": "powerlines",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "power",
  "layers": "powerlines",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Power lines"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/powerlines.pmtiles",
  "version": "1.1.1",
  "zIndex": 30,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/powerlines/"
  }
},

/////////// H2 STATIONS INFO ///////////

{
  "id": "h2map",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "h2 stations info",
  "layers": "h2map",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "HRS Availability (h2-map.eu)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/h2map.pmtiles",
  "version": "1.1.1",
  "zIndex": 10,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/HRS_availability"
  }
},
{
  "id": "h2live_ready",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "h2 stations info",
  "layers": "h2live_ready",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "h2live service areas (active)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/h2live_ready.pmtiles",
  "version": "1.1.1",
  "zIndex": 10,
  "docurl": {
    "en": ""
  }
},
{
  "id": "h2live_not_ready",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "h2 stations info",
  "layers": "h2live_not_ready",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "h2live service areas (inactive)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/h2live_not_ready.pmtiles",
  "version": "1.1.1",
  "zIndex": 20,
  "docurl": {
    "en": ""
  }
},
{
  "id": "h2live",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "h2 stations info",
  "layers": "h2live",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "H2.live (cached)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/h2live.pmtiles",
  "version": "1.1.1",
  "zIndex": 9,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/h2live/"
  }
},



/////////// OVERVIEW ///////////

{
  "id": "gas_stations",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "overview",
  "layers": "gas_stations",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Fuel stations (OSM)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/gas_stations.pmtiles",
  "version": "1.1.1",
  "zIndex": 10,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/gas_stations/"
  }
},

{
  "id": "partner_countries",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "overview",
  "layers": "partner_countries",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "HyTruck countries (except Denmark)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/partner_countries.pmtiles",
  "version": "1.1.1",
  "zIndex": 20,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/extent/"
  }
},
{
  "id": "rest_areas",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "overview",
  "layers": "rest_areas",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Resting areas (OSM)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/rest_areas.pmtiles",
  "version": "1.1.1",
  "zIndex": 10,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/rest_areas/"
  }
},
/////////// TEN-T ///////////

{
  "id": "urban_nodes",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "ten-t",
  "layers": "urban_nodes",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Urban nodes"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/urban_nodes.pmtiles",
  "version": "1.1.1",
  "zIndex": 10,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/urban_nodes/"
  }
},
{
  "id": "corridor_lines",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "ten-t",
  "layers": "corridor_lines",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Ten-T Corridor (Lines)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/corridor_lines.pmtiles",
  "version": "1.1.1",
  "zIndex": 20,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/corridor_lines/"
  }
},
{
  "id": "corridor_points",
  "attributions": "cite 2",
  "description": {
    "en": ""
  },
  "format": "image/png",
  "group": "ten-t",
  "layers": "corridor_points",
  "projection": "epsg:3857",
  "style": {
    "style_id": "",
    "url": ""
  },
  "title": {
    "en": "Ten-T Corridor (Points)"
  },
  "transparent": true,
  "active": false,
  "type": "pmtiles",
  "url": "https://storage.googleapis.com/hytruck/temp/corridor_points.pmtiles",
  "version": "1.1.1",
  "zIndex": 20,
  "docurl": {
    "en": "https://hytruck.landscape-geoinformatics.eu/docs/data_references/raw_data/corridor_points/"
  }
}

],
  "status": "ok",
};
