module.exports = [
  // Temporary! Delete later
  // https://maps.landscape-geoinformatics.org/geoserver/hytruck/wms?
  {
    //    Vector tile
    // AHP/suitability analysis
    "attributions": "",
    "description": {
      "ee": "",
      "en": ""
    },
    "format": "image/png",
    "group": "AHP",
    "id": "weighted_suitability",
    "layers": "weighted_suitability",
    "projection": "EPSG:3857",
    "style": "",
    "title": {
      "en": "Suitability analysis",
      "ee": "Sobivusanalüüs"
    },
    "transparent": true,
    "active" : true,
    "type": "mvt",
    "url": "https://hytruck.landscape-geoinformatics.eu/tiles/suitability/weighted_suitability/{z}/{x}/{y}",
    "version": "1.1.1",
    "zIndex": 0,
  },
  {
    //    Raster
    // HyTruck corridor lines
    "attributions": "",
    "description": {
      "ee": "",
      "en": ""
    },
    "format": "image/png",
    "group": "Ten-T",
    "id": "corridor_points",
    "layers": "hytruck:corridor_points",
    "projection": "EPSG:3857",
    "style": "",
    "title": {
      "en": "Ten-T Corridor (Point)"
    },
    "transparent": true,
    "active" : false,
    "type": "wms",
    "url": "https://maps.landscape-geoinformatics.org/geoserver/hytruck/wms?",
    "version": "1.1.1",
    "zIndex": 10,
  },
  {
    //    Raster
    // EHB 2040
    "attributions": "",
    "description": {
      "ee": "",
      "en": ""
    },
    "format": "image/png",
    "group": "EHB 2040",
    "id": "ehb_2040",
    "layers": "hytruck:ehb_2040",
    "projection": "EPSG:3857",
    "style": "",
    "title": {
      "en": "EHB 2040"
    },
    "transparent": true,
    "active" : true,
    "type": "wms",
    "url": "https://maps.landscape-geoinformatics.org/geoserver/hytruck/wms?",
    "version": "1.1.1",
    "zIndex": 20,
  },
  //    Base maps
  // Openstreetmap
  {
    "attributions": "OSM community",
    "description": {
      "ee": "Collaborative project",
      "en": "Koostööprojekt"
    },
    "format": "png",
    "group": "Base map",
    "id": "osm",
    "layers": "osm",
    "projection": "EPSG:3301",
    "style": "",
    "title": {
      "en": "Open Street Map"
    },
    "transparent": true,
    "active" : true,
    "type": "raster",
    "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "version": "1.1.1",
    "zIndex": 0
  },

  // ESRI World Imagery
  {
    "attributions": "OSM community",
    "description": {
      "ee": "Collaborative project",
      "en": "Koostööprojekt"
    },
    "format": "png",
    "group": "Base map",
    "id": "esri_world_imagery",
    "layers": "esri_world_imagery",
    "projection": "EPSG:3301",
    "style": "",
    "title": {
      "en": "Base map 2"
    },
    "transparent": true,
    "active" : false,
    "type": "raster",
    "url": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
    "version": "1.1.1",
    "zIndex": 0
  },
]