## Powerplants - ENTSO-E 
 
- Layer title: Power plants from the Joint Research Center (JRC) and the European Network of Transmission System  
Operators for Electricity (ENTSO-E). 
- Layer name: powerplants.gpkg 
- Sub-layers: None 
- Description: Vector point dataset containing power plants. 
- Format: GeoPackage (gpkg) 
- Version: 1.4.0 
- Geographical extent (xmin,ymin : xmax:ymax): 6.0431478420375448,47.5282805650118476 : 28.7207604436040178,69.8628854913897470 
- Temporal extent: 27/10/2023 (time-instant) 
- CRS: ETRS89-extended / LAEA Europe (epsg:3035) 
- Encoding: UTF-8 
- Scale/Denominator: Unknown, questioned the souce via email (info@entsoe.eu). 
- Topic category: Utilities communication 
- Keywords: infrastructure, electricity, plant 
- List of input datasets: None 
- Attributes:  
	[name]  
	Data type: String (50) 
	Description: Name of the powerplant production unit. 
	[capacity_p] 
	Data type: Real 
	Description: Production unit net capacity in MW. 
	[capacity_g] 
	Data type: Real 
	Description: Generating unit net capacity in MW. 
	[type] 
	Data type: String (50) 
	Description: Text describing the type of fuel used for the power production. 
	[status] 
	Data type: String (25) 
	Description: Text describing the actvity status of the power plant. 
	[year_commissioned] 
	Data type: Integer 
	Description: Year of commission/start of production in the power plant. 
	[water] 
	Data type: String (25) 
	Description: Text describing the water type used for cooling or production. 
	[cooling] 
	Data type: String (50) 
	Description: Text describing the cooling process/technique used. 
	[withdrawal] 
	Data type: Real 
	Description: Water withdrawal, NB! Seems to have mixed units. 
	[water_consumption] 
	Data type: Real 
	Description: Water consumption for electricity production measured in cubic meters per megawatt-hour (m³/MWh). 
	[class] 
	Data type: String (25) 
	Description: Reclassification of the type field where the following classes where grouped together:  
	1)Biomass and waste 2)all fossil fuels besides peat 3)hydro- power plants.  
- Date: Published on 13/12/2019, retrieved from JRC (https://zenodo.org/records/3574566) on 20/02/2024. 
- Quality/Lineage: Entire dataset has been clipped by HyTruck project extent and decommissioned power plants have been removed. 
- License: CC-BY-4.0. 
- Citation: Kanellopoulos K., De Felice M., Hidalgo Gonzalez I., & Bocin A. (2019). JRC Open Power Plants Database (JRC-PPDB-OPEN) 
(1.00) [Data set]. Zenodo. https://doi.org/10.5281/zenodo.3574566 
- Additional information: NONE. 
