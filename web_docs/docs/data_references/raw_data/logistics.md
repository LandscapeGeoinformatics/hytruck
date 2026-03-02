## Logistics - GoogleMaps 
 
- Layer title: Logistic hubs in the HyTruck partner countries. 
- Layer name: logistics.gpkg 
- Sub-layers: None 
- Description: Vector point dataset from GoogleMaps representing the logistic hubs affecting HyTruck partner countries (Finland, Estonia,  
Latvia, Lithuania, Poland, Germany, Denmark, and Sweden). 
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): 6.7048563000000030,48.0593604963583729 : 28.1791625999999908,63.8436202987600865 
- Temporal extent: 02/04/2024 (time-instant) 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: 1/1,000,000 
- Topic category: Oceans 
- Keywords: Seashore, coast, borders. 
- List of input datasets: Whole extent: DHL, DPD, FedEx, and UPS; Itella (Estonia), Posti Group (Finland), PostNord (Sweden), 
DSV Panalpina (Denmark), Deutsche Post (Germany), InPost (Poland), Latvijas Pasts (Latvia), and Lithuania Post (Lithuania). 
- Attributes:  
	[name] 
	Data type: String (100) 
	Description: Name of the service company or office. 
	[layer] 
	Data type: String (50) 
	Description: Origin layer with values showing the company name and country of extraction through GoogleMaps API. 
- Date: Published 02/04/2024. 
- Quality/Lineage: Data for the different cargo companies has been fetched through GoogleMaps API in Python. Resulting data has been  
merged and extracted where the locations were not in urban land use from CORINE, to remove parcel machines and other inner-city locations. 
- License: CC-BY-4.0. 
- Additional information: NONE. 
