## Solar & Wind Farms - Modelled layer 
 
- Layer title: Model output of the solar and wind power layers. 
- Layer name: modelled_solar_wind.gpkg 
- Sub-layers: None 
- Description: Vector polygon dataset containing modelled data of the merged solar and wind farms from GEM.  
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): ... 
- Temporal extent: 12/2023 (time-instant). 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: 1/1,000,000 
- Topic category: Structure 
- Keywords: solar, wind, infrastructure, energy 
- List of input datasets: solar.gpkg & wind.gpkg 
- Attributes: 
	[value] 
	Data type: Integer 
	Description: Refers to the suitability value given by the criteria_catalogue (0 to 10) 
- Date: Created 18/03/2024. 
- Quality/Lineage: The Proximity_to.model3 has been used with the merged output of solar.gpkg and wind.gpkg layers. 
- License: CC-BY-4.0 
 
### Criterion 
 
Abbrev	Group	Criterion	Description	Buffers 
 
- Abbrev: O_RENEWBL 
- Group: On-site production 
- Criterion: Proximity to existing wind and solar farms (access to renewable energy sources for on-site hydrogen production)	The ideal would be to make the energy come from a green source. The current gird is not entirely green. 
- Description: Should developers want to perform electrolysis on site they will need more fuel. Proximity to power plants will make this easier. 
- Buffers: 
  - < 500 m (10) 
  -	500m – 1 km (8) 
  -	1 - 5 km (6) 
  -	5 - 10 km (4) 
  -	> 10 km (2) 
