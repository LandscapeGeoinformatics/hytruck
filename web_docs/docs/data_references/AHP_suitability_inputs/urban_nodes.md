## Urban Nodes - Modelled layer 
 
- Layer title: Model output of the urban nodes layer. 
- Layer name: modelled_urban_nodes.gpkg 
- Sub-layers: None 
- Description: Vector polygon dataset containing modelled data of the urban nodes from the Ten-T.  
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): ... 
- Temporal extent: 01/03/2024 (time-instant). 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: Unknown. 
- Topic category: Planning cadastre 
- Keywords: cities, urban 
- List of input datasets: urban_nodes.gpkg 
- Attributes: 
	[value] 
	Data type: Integer 
	Description: Refers to the suitability value given by the criteria_catalogue (0 to 10) 
- Date: Created 19/03/2024. 
- Quality/Lineage: The Proximity_to.model3 has been used with the merged output of urban_nodes.gpkg layer. 
- License: CC-BY-4.0 
- Additional information: None. 
 
### Criterion 
 
Abbrev	Group	Criterion	Description	Buffers 
 
- Abbrev: L_URBANNODE 
- Group: Logistics 
- Criterion: Proximity to urban nodes - area where the transport infrastructure is connected with other parts of that infrastructure. 
- Description: The refueling stations need to be close to areas that trucks actually go by. This criteria is used as an indicator for demand. 
- Buffers: 
  - < 1 km (10) 
  -	1 - 5 km (8) 
  -	5 - 10 km (6) 
  -	10 – 20 km (4) 
  -	>20 km (2) 
