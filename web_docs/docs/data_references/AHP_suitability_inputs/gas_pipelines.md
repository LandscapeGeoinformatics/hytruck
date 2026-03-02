## Gas Pipelines - Modelled layer 
 
- Layer title: Model output of the gas pipelines layer. 
- Layer name: modelled_gas_pipelines.gpkg 
- Sub-layers: None 
- Description: Vector polygon dataset containing modelled data of the gas pipelines for the HyTruck project.  
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): ... 
- Temporal extent: 10/02/2024 (time-instant) 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: None. 
- Topic category: Structure 
- Keywords: infrastructure, gas, pipelines 
- List of input datasets: gas_pipelines.gpkg 
- Attributes: 
	[value] 
	Data type: Integer 
	Description: Refers to the suitability value given by the criteria_catalogue (0 to 10) 
- Date: Created 19/03/2024. 
- Quality/Lineage: The Proximity_to.model3 has been used with the gas_pipelines.gpkg layer. 
- License: CC-BY-4.0 
 
### Criterion 
 
Abbrev	Group	Criterion	Description	Buffers 
 
- Abbrev: L_GASPIPE 
- Group: Logistics 
- Criterion: Distance from gas pipelines 
- Description: A significant portion of the ultimate cost is due to storage and transportation of the fuel. Some gas pipelines can be adapted to accommodate hydrogen. 
- Buffers: 
  - < 1.5 km (10) 
  -	1.5 - 5 km (8) 
  -	5 - 7.5 km (6) 
  -	> 7.5 km (4) 
