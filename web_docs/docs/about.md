
# About

[https://interreg-baltic.eu/project/hytruck](https://interreg-baltic.eu/project/hytruck)

The HyTruck project helps public authorities design a network of hydrogen refuelling stations for large trucks, bringing the region closer to zero-emissions in road freight transport.

To understand the main criteria for selecting suitable sites for Hydrogen Refueling Stations (HRS), considering structural requirements, EU policy and environmental concerns. Following EU guidelines and using site suitability map, to create an optimized network of HRS for trucks operating in the Baltic Sea Region.

## Objectives

At first the criteria have to be selected through a literature review and iterative stakeholder feedback then follow two computational phases. Together, these three objectives are introduced below:  

1. Criteria Selection

Most of the current research on site selection for HRS stays within one country or even just a region within a single country.  

2. Site Suitability and AHP

In the suitability modeling process using AHP, selected criteria are amalgamated into evenly sized grid cells, upon which they are classified based on literature review and stakeholder inputs. These classifications assign basic suitability values ranging from 0 (not suitable) to 5 (very suitable) to each criterion within a grid cell.

The final suitability score for each grid cell is then calculated as a weighted (in the case of AHP) average of these values. This approach allows for the incorporation of different weights assigned to each criterion through ranking and AHP. Such weighting reflects varying levels of importance as perceived by stakeholders and planners, enabling them to impart their perspectives and priorities into the analysis.

This methodology ensures a nuanced and tailored assessment of each grid cell's suitability, aligning the analysis with specific planning and decision-making objectives. To create a site suitability map, the data needs to be translated into the same granularity grid, in the web map we currently start out with a ca 1km grid.

3. Spatial optimization of fuel station placement on the Ten-T road network

As the project's ultimate objective is to optimize the placement of new HRS along the existing Ten-T network, adhering to the operational requirement that they be positioned no more than 200 km apart. This optimization is informed by the suitability analysis conducted across the region's data grid, which shall identify potential locations based on specific criteria including accessibility, cost-effectiveness, and existing landscape and infrastructure compatibility.

The process involves integrating predefined stations at existing hubs into the transport network and strategically selecting (algorithmically proposing so to say based on the data inputs) new sites to ensure comprehensive coverage without redundancy. The aim is to minimize the number of new stations required while maximizing the network's efficiency and service area.

## Iterative improvement

This prototype will serve as the basis for the next stage of stakeholder consultation. An iterative process of feedback and refinement will be conducted to ensure that the tool is fit for purpose and meets the needs of the target users.

## Guideline

<object data="../pdfs/2024-12-16_Guideline-HRS.pdf" type="application/pdf" width="100%" height="600px">
    <p>It appears you don't have a PDF plugin for this browser. You can 
    <a href="../pdfs/2024-12-16_Guideline-HRS.pdf">click here to download the PDF file.</a></p>
</object>

## Standards
    
<object data="../pdfs/A_catalog_of_technical_standards_and_norms_for_hydrogen_refueling_stations_dedicated_for_heavy_duty_transportation_in_the_BSR.pdf" type="application/pdf" width="100%" height="600px">
    <p>It appears you don't have a PDF plugin for this browser. You can 
    <a href="../pdfs/A_catalog_of_technical_standards_and_norms_for_hydrogen_refueling_stations_dedicated_for_heavy_duty_transportation_in_the_BSR.pdf">click here to download the PDF file.</a></p>
</object>

## Expected results and sustainability

To ensure ongoing availability and operational continuity of our database and web application beyond the project's conclusion, we'll need to secure funding for sustained maintenance and hosting. This will cover the costs of server uptime, technical support, and periodic updates critical for system performance and security  

## Development team

This application was developed within the HyTruck project by Landscape Geoinformatics Lab of University of Tartu. In case you have any questions or comments about the application, please contact the project manager Alexander Kmoch at alexander.kmoch@ut.ee.

**Project manager, GoA 1.1 lead**: Alexander Kmoch  
**Methods**: Aleksandra Bratic, Evelyn Uuemaa, Alexander Kmoch  
**Data**: Raul Garcia Estevez, Aleksandra Bratic, Evelyn Uuemaa  
**Software and IT**: Wai Tik Chan, Alexander Kmoch, Ats Remmelg, Arvi Kiik, Guillaume Ameline  
**Scientific advisory**: Evelyn Uuemaa, Age Poom   

**Copyright**: [Landscape Geoinformatics Lab](https://landscape-geoinformatics.ut.ee/)  © 2023-2025 (v.bdadac45)  
