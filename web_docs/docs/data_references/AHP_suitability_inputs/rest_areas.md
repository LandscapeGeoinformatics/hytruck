## Rest Areas - Modelled layer 
 
- Layer title: Model output of the rest areas layer. 
- Layer name: modelled_rest_areas.gpkg 
- Sub-layers: None 
- Description: Vector polygon dataset containing modelled data of the rest areas from OSM.  
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): ... 
- Temporal extent: 22/02/2024 (time-instant) 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: None. 
- Topic category: Utilities communication 
- Keywords: facility, rest 
- List of input datasets: rest_areas.gpkg 
- Attributes: 
	[value] 
	Data type: Integer 
	Description: Refers to the suitability value given by the criteria_catalogue (0 to 10) 
- Date: Created 19/03/2024. 
- Quality/Lineage: The Proximity_to.model3 has been used with the rest_areas.gpkg layer. 
- License: CC-BY-4.0 
 
### Criterion 
 
Abbrev	Group	Criterion	Description	Buffers 
 
- Abbrev: L_RESTSTOP 
- Group: Logistics 
- Criterion: Proximity to rest areas – places where truck drivers can stop during their journe 
- Description: The refueling stations should work with the current drivers and infrastructure that already exists to make success more likely, as well as cheaper. 
- Buffers: 
  - < 500 m (10) 
  -	500m – 1 km (8) 
  - 1 - 5 km (6) 
  - 5 - 10 km (4) 
  -	> 10 km (2) 
