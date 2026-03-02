## Fuel Stations - Modelled layer 
 
- Layer title: Model output of the fuel stations layer. 
- Layer name: modelled_fuel_stations.gpkg 
- Sub-layers: None 
- Description: Vector polygon dataset containing modelled data of the fuel stations for the HyTruck project.  
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): ... 
- Temporal extent: 13/02/2024 (time-instant) 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: None. 
- Topic category: Utilities communication 
- Keywords: infrastructure, fuel 
- List of input datasets: fuel_stations.gpkg 
- Attributes: 
	[value] 
	Data type: Integer 
	Description: Refers to the suitability value given by the criteria_catalogue (0 to 10) 
- Date: Created 18/03/2024. 
- Quality/Lineage: The Proximity_to.model3 has been used with the fuel_stations.gpkg layer. 
- License: CC-BY-4.0 
 
### Criterion 
 
Abbrev	Group	Criterion	Description	Buffers 
 
- Abbrev: L_GASSTAT 
- Group: Logistics 
- Criterion: Proximity to non-hydrogen fueling stations 
- Description: Other fueling station locations give a good indication that an area is suited for permitting requirements of refueling stations. Co-development or conversion on two popular perspectives when looking at the relationship between HRS and, EVCS and traditional fuel stations.  
- Buffers: 
  - < 500 m (10) 
  - 500m – 1 km (8) 
  - 1 - 5 km (6) 
  - 5 - 10 km (4) 
  - > 10 km (2) 
