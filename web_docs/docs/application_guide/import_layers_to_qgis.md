# Import layers to QGIS

Open QGIS
![wms and vector tiles layers menu](../screenshots/qgis.png)

## WMS geoserver layers

- Layer
- Add WMS Layer
- Add new layer information
- Add new layer information
    - Add name: the name as it will be shown in GQIG
    - Paste url: `https://maps.landscape-geoinformatics.org/geoserver/hytruck/wms`
- Save
- In the *Browser* left panel, double click or right click, add *Layer to Project*

![wms paste url](../screenshots/qgis_paste_wms_url.png)

![wms show layer](../screenshots/qgis_display_wms_layer.png)

## Vector tiles HyTruck AHP-suitability layer

- Layer
- Add Vector Tile Layer
- Add new layer information
    - Add name: you want it to show in GQIG
    - Paste url: `https://hytruck.landscape-geoinformatics.eu/tiles-api/v1/suitability/{z}/{x}/{y}`
- Save
- In the *Browser* left panel, double click or right click, add *Layer to Project*

![vector_tile paste url](../screenshots/qgis_paste_vector_tile_url.png)

![vector_tile show layer](../screenshots/qgis_display_vector_tile_layer.png)

