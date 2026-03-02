## Hydrogen Pipelines - Modelled layer 
 
- Layer title: Model output of the ehb_2040 layer. 
- Layer name: modelled_hydrogen_pipelines.gpkg 
- Sub-layers: None 
- Description: Vector polygon dataset containing modelled data of the hydrogen pipelines expected by 2040 
for the HyTruck project.  
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): ... 
- Temporal extent: 14/09/2023 (time-instant) 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: None. 
- Topic category: Structure 
- Keywords: infrastructure, hydrogen. 
- List of input datasets: ehb_2040.gpkg 
- Attributes: 
	[value] 
	Data type: Integer 
	Description: Refers to the suitability value given by the criteria_catalogue (0 to 10) 
- Date: Created 19/03/2024. 
- Quality/Lineage: The Proximity_to.model3 has been used with the ehb_2040.gpkg layer. 
- License: CC-BY-4.0 
 
### Criterion 
 
Abbrev	Group	Criterion	Description	Buffers 
 
- Abbrev: L_HYPIPE 
- Group: Logistics 
- Criterion: Distance from hydrogen specific pipelines	 
- Description: A significant portion of the ultimate cost is due to storage and transportation of the fuel. 
- Buffers: 
  -	< 1.5 km (10) 
  -	1.5 - 5 km (8) 
  -	5 - 7.5 km (6) 
  -	> 7.5 km (4) 
