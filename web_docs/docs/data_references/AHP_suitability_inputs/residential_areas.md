## Residential Areas - Modelled layer 
 
- Layer title: Model output of the CORINE urban layer. 
- Layer name: modelled_residential_areas.gpkg 
- Sub-layers: None 
- Description: Vector polygon dataset containing modelled data of the urban class from CORINE. 
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): ... 
- Temporal extent: 24/02/2020 (time-instant) 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: None. 
- Topic category: Utilities communication 
- Keywords: infrastructure, electricity, plant 
- List of input datasets: corine_urban.gpkg 
- Attributes: 
	[value] 
	Data type: Integer 
	Description: Refers to the suitability value given by the criteria_catalogue (0 to 10) 
- Date: Created 19/03/2024. 
- Quality/Lineage: The Distance_from.model3 has been used with the corine_urban.gpkg layer. 
- License: CC-BY-4.0 
 
### Criterion 
 
Abbrev	Group	Criterion	Description	Buffers 
 
- Abbrev: H_RESID 
- Group: Human dimension 
- Criterion: Distance from residential areas 
- Description: The goal is not to have heady duty trucks near people’s homes, this is due to potential permitting issues as well as building goodwill with the community. 
- Buffers: 
  - > 10 km (10) 
  -	5 – 10 km (8) 
  -	1 - 5 km (6) 
  -	500m – 1 km (4) 
  -	< 500 m (2) 
