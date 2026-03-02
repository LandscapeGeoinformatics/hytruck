## HRS Availabity
 
info:
   - title: 'E-HRS-AS: HRS Real-Time Availability Status API'
   - version: '1.0.1'
   - contact:
      - name: Clean Hydrogen JU
      - email: e-hrs-as@clean-hydrogen.europa.eu

The European Hydrogen Refuelling Station Availability System (E-HRS-AS) collects real-time availability data
reported by HRS all over Europe on a non-proprietary, open-source platform.

This API provides public access to both the real-time availability status as well as various static HRS information. Despite being free for everyone to use, the API is secured by a token-based authorization mechanism in order to
prevent misuse. If you would like to obtain an API token, please write an email to the contact information above.

We recommend to query status data no more than once per minute. Although there is no rate limiting in place currently, this might change in the future.

An example of how the information provided by this API can be seen on https://h2-map.eu.


interactive map (https://h2-map.eu/)

project page (https://h2-stations.eu/)

API page (https://h2-map.eu/api/v1/doc/)
