# Explore Himachal — Phase 1

A responsive, custom-designed homepage prototype for Explore Himachal.

## Run locally
Open `index.html` in a browser. For the district GeoJSON fetch, run a local static server (recommended):
- VS Code Live Server, or
- `python -m http.server 8000` then visit http://localhost:8000

## Deploy
Push this folder to GitHub and import the repository into Vercel. The site is static; no build command is required and the output directory is the project root.

## Included
- Responsive desktop/mobile homepage
- Adaptive light/dark theme (remembers manual choice)
- Kullu-inspired geometric textile accents
- Custom SVG map renderer that converts district GeoJSON into interactive SVG paths
- District selection, search, destination filters, trek difficulty filters
- Starter trip-outline form
- Destination, culture, experiences, trekking, hidden-place and journal sections

## Geographic data
The map requests district polygons from Esri India's 2024 administrative boundary service:
https://livingatlas.esri.in/server/rest/services/IAB2024/India_Administrative_Boundaries_2024/MapServer/2

The service must be reachable from the visitor's browser and permit cross-origin requests. If it is unavailable, the district list and rest of the site still render, but map polygons will not appear. For production, download and validate an authorised GeoJSON/Shapefile and store a cleaned GeoJSON file in `maps/` so the map does not depend on a live third-party endpoint.

## Important content notes
Destination imagery is illustrative remote photography. Destination descriptions and trekking details are starter editorial content, not a verified travel database. Confirm coordinates, access, permits, route difficulty, safety, seasonal conditions and local information with official/local sources before publishing as authoritative.

The district map uses real polygon geometry when the GIS request succeeds. Terrain relief, map pins, river styling and some visual map details are illustrative design treatments; do not treat the illustrative pins or river strokes as surveyed locations.

## Next development steps
1. Validate and bundle the 12 district polygons locally.
2. Replace illustrative map pins with verified destination coordinates.
3. Build individual district and destination pages.
4. Add a proper trip itinerary builder and verified trek database.
5. Add source links, content review dates, accessibility checks and SEO metadata.
