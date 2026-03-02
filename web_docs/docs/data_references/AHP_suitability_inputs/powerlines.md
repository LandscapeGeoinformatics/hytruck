## Power Transmission Lines - Modelled layer 
 
- Layer title: Model output of the powerlines layer. 
- Layer name: modelled_powerlines.gpkg 
- Sub-layers: None 
- Description: Vector polygon dataset containing modelled data of the industrial areas from CORINE. 
for the HyTruck project.  
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): ... 
- Temporal extent: 27/10/2023 (time-instant) 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: None. 
- Topic category: Utilities communication 
- Keywords: infrastructure, electricity, transmission. 
- List of input datasets: powerlines.gpkg 
- Attributes: 
	[value] 
	Data type: Integer 
	Description: Refers to the suitability value given by the criteria_catalogue (0 to 10) 
- Date: Created 18/03/2024. 
- Quality/Lineage: The Proximity_to.model3 has been used with the powerlines.gpkg layer. 
- License: CC-BY-4.0 
 
### Criterion 
 
Abbrev	Group	Criterion	Description	Buffers 
 
- Abbrev: G_POWERLN 
- Group: General construction 
- Criterion: Proximity to high voltage transmission lines 
- Description: The charging stations need power to operate. 
- Buffers: 
  - < 500 m (10) 
  -	500m – 1 km (8) 
  -	1 - 5 km (6) 
  -	5 - 10 km (4) 
  -	> 10 km (2) 
