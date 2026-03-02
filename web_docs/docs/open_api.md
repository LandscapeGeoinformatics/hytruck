# Open API

## Overview
The HyTruck API provides programmatic access to the HyTruck Spatial Planning Toolkit, enabling users to interact with the system's hydrogen refueling station (HRS) planning capabilities.  
The API follows OpenAPI 3.1 specifications and is accessible at:  
[https://hytruck.landscape-geoinformatics.eu/openapi](https://hytruck.landscape-geoinformatics.eu/openapi)

## API Endpoints

The API is organized into four main categories:

### 1. HyTruck API (`/hytruck-api/v1`)
Core functionality endpoints:

- **Authentication**
    - `POST /login` - User authentication 
    - `GET /logout` - End user session
    - `GET /me` - Verify current user session

- **Map management**
    - `GET /maplayers` - Retrieve available map layers
    - `POST /clientsetting/countrylist` - Get list of countries
    - `POST /clientsetting/weight_criterias` - Manage weights and criteria
    - `POST /clientsetting/feedback` - Submit user feedback

### 2. Tiles API (`/tiles-api/v1`)
Handles map tile operations:

- `GET /{layer}/{z}/{x}/{y}.pbf` - Vector tile retrieval
- `GET /{layer}/{z}/{x}/{y}` - Vector tile retrieval
- `GET /{layer}.json` - Layer metadata

### 3. QGIS Integration
- `GET /tiles-api/v1/{layer}/{z}/{x}/{y}.pbf` - QGIS-specific tile endpoint

### 4. OGC DGGS API (`/dggs-api/v1-pre`)
Discrete Global Grid System functionality:

- `GET /` - API landing page

*this is a prototype implementation for the DRAFT OGC DGGS API standard*  
*for more details, please see:*  
[OGC API - DGGS - website](https://ogcapi.ogc.org/dggs/)  
[OGC API - DGGS - documentatiom](https://docs.ogc.org/DRAFTS/21-038.html)  

## Authentication
The API uses JWT-based authentication. Protected endpoints require a valid authentication token obtained through the login endpoint.

## Response Formats
The API supports multiple response formats:
- GeoJSON for spatial data
- Protocol Buffers (PBF) for vector tiles
- JSON for general responses

## Error Handling

The API uses standard HTTP status codes and returns detailed error messages in a consistent format:  

- 400 - Bad Request
- 401 - Unauthorized  
- 403 - Forbidden  
- 404 - Not Found  
- 500 - Internal Server Error  
  
<!-- ## Usage Examples -->
<!-- For detailed examples and interactive testing, visit the Swagger UI at: -->
<!-- `https://hytruck.landscape-geoinformatics.eu/openapi` -->

<!-- ## Terms of Service -->
<!-- For additional information about the project and terms of service, visit: -->
<!-- `https://interreg-baltic.eu/project/hytruck/` -->

<!-- ## Contact -->
<!-- For technical support or queries: -->
<!-- - Website: `https://landscape-geoinformatics.ut.ee/projects/hytruck/` -->
<!-- - Email: alexander.kmoch@ut.ee -->
