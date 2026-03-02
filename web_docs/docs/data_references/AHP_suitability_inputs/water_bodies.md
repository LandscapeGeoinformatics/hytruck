## Water Bodies - Modelled layer 
 
- Layer title: Model output of the water bodies layer. 
- Layer name: modelled_water_bodies.gpkg 
- Sub-layers: None 
- Description: Vector polygon dataset containing modelled data of the water bodies from the European Environment Agency.  
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): ... 
- Temporal extent: 2019-2023 (Time period) 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: Unknown. 
- Topic category: Inland Waters 
- Keywords: lakes, hydrology, water.  
- List of input datasets: water_bodies.gpkg 
- Attributes: 
	[value] 
	Data type: Integer 
	Description: Refers to the suitability value given by the criteria_catalogue (0 to 10) 
- Date: Created 21/03/2024. 
- Quality/Lineage: The Proximity_to.model3 has been used with the water_bodies.gpkg layer. 
- License: CC-BY-4.0 
 
### Criterion 
 
Abbrev	Group	Criterion	Description	Buffers 
 
- Abbrev: O_SURFWATER 
- Group: On-site production 
- Criterion: Proximity to standing surface water bodies – lakes, reservoirs, etc. (access to water for on-site hydrogen production) 
- Description: Should developers want to consider on site electrolysis, having water nearby is important 
- Buffers: 
  - But not directly on (0) 
  -	< 5km 
  -	5 - 10 km 
  -	10 - 15 km 
  -	>15 km 
