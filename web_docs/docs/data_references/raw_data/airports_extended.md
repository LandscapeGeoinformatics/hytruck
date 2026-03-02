## Airports - OpenFlights.org 
 
- Layer title: Extended airport dataset. 
- Layer name: airports_openflights.gpkg 
- Sub-layers: None. 
- Description: Vector point dataset containing airports for the HyTruck extent from Openflights.org.  
- Format: GeoPackage (gpkg). 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): 6.0424200000000008,47.6712989769392124 : 30.0736009999999894,68.6072998036843416 
- Temporal extent: 14/09/2023 (time-instant). 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035). 
- Encoding: UTF-8 
- Scale/Denominator: Unknown. 
- Topic category: Transportation. 
- Keywords: infrastructure, airports. 
- List of input datasets: airports_extended.gpkg, infrastructure_3035.gpkg 
- Attributes:  
	[name] 
	Data type: String (100) 
	Description: Name of airport. May or may not contain the City name. 
	[city]	 
	Data type: String (50) 
	Description: Main city served by airport. May be spelled differently from Name. 
	[code] 
	Data type: String (4) 
	Description: 4-letter ICAO code, null if not assigned. 
- Date: Accessed on 02/04/2024 via https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat 
- Quality/Lineage: Minor airports have been filtered out by exporting the ones intersecting with a 1km buffer of the infrastructure layer from CORINE. 
- License: Open Data Commons Open Database License (ODbL) v1.0. 
