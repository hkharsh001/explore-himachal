const districts = [
  {name:"Bilaspur",desc:"A district shaped by the Sutlej, reservoirs, hills and a rich local heritage.",tags:["Sutlej valley","Heritage","Nature"],popular:false},
  {name:"Chamba",desc:"Historic temples, traditional crafts, mountain valleys and a distinctive cultural identity.",tags:["Heritage","Chamba Rumal","Valleys"],popular:true},
  {name:"Hamirpur",desc:"A lower-hill district with settled landscapes, local traditions and regional connections.",tags:["Lower hills","Culture","Local life"]},
  {name:"Kangra",desc:"Tea gardens, temples, historic sites and the dramatic Dhauladhar mountain range.",tags:["Dhauladhar","Tea gardens","Heritage"],popular:true},
  {name:"Kinnaur",desc:"High mountains, apple-growing villages and distinctive Himalayan culture.",tags:["High Himalaya","Villages","Apple country"],popular:true},
  {name:"Kullu",desc:"River valleys, forests, mountain towns, village trails and living craft traditions.",tags:["Valleys","Shawls","Adventure"],popular:true},
  {name:"Lahaul and Spiti",desc:"A high-altitude cold-desert region of stark landscapes, monasteries and remote settlements.",tags:["Cold desert","Monasteries","High altitude"],popular:true},
  {name:"Mandi",desc:"Temple heritage, river landscapes and a rich cultural history in the heart of Himachal.",tags:["Temples","Rivers","Culture"]},
  {name:"Shimla",desc:"Forested ridges, historic settlements, orchards and popular mountain routes.",tags:["Heritage","Forests","Orchards"],popular:true},
  {name:"Sirmaur",desc:"A southern hill district with forests, valleys and varied natural landscapes.",tags:["Forests","Valleys","Nature"]},
  {name:"Solan",desc:"Mid-Himalayan hills, heritage towns, educational centres and agricultural landscapes.",tags:["Hill towns","Heritage","Nature"]},
  {name:"Una",desc:"Foothill landscapes, religious heritage and important regional connections.",tags:["Foothills","Heritage","Local culture"]}
];
const places = [
 {name:"Manali",district:"Kullu",type:"Mountain town",desc:"A well-known mountain town and gateway to the upper Kullu Valley.",img:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80"},
 {name:"Bir Billing",district:"Kangra",type:"Adventure",desc:"A mountain destination widely associated with paragliding.",img:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80"},
 {name:"Spiti Valley",district:"Lahaul and Spiti",type:"High-altitude region",desc:"A high-altitude cold desert with monasteries and remote settlements.",img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80"},
 {name:"Kalpa",district:"Kinnaur",type:"Mountain village",desc:"A Kinnaur village known for dramatic mountain views.",img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80"},
 {name:"Tirthan Valley",district:"Kullu",type:"Nature & slow travel",desc:"A quieter valley of rivers, villages and forest landscapes.",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80"},
 {name:"Khajjiar",district:"Chamba",type:"Landscape",desc:"A scenic meadow landscape surrounded by forested slopes.",img:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80"},
 {name:"Dharamshala",district:"Kangra",type:"Culture & mountains",desc:"A hill destination with Dhauladhar views and Tibetan cultural influences.",img:"https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=700&q=80"},
 {name:"Shimla",district:"Shimla",type:"Heritage town",desc:"Historic hill town known for heritage architecture and forest walks.",img:"https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=700&q=80"}
];
const treks = [
 {name:"Triund Trek",district:"Kangra",level:"Easy",distance:"9 km",duration:"1–2 days",height:"2,850 m",img:"https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=500&q=75"},
 {name:"Hampta Pass",district:"Kullu",level:"Moderate",distance:"26 km",duration:"4–5 days",height:"4,270 m",img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=75"},
 {name:"Pin Parvati Pass",district:"Kullu",level:"Difficult",distance:"110 km",duration:"8–11 days",height:"5,319 m",img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=75"}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let selectedDistrict = null, activeDestinationFilter = "All", mapScale = 1, mapOffset = {x:0,y:0};
function renderDistrictList(filter="") {
 const list=$("#district-list"); list.innerHTML="";
 districts.filter(d=>d.name.toLowerCase().includes(filter.toLowerCase())).forEach(d=>{
  const b=document.createElement("button"); b.textContent=d.name; b.className=selectedDistrict===d.name?"active":"";
  b.addEventListener("click",()=>selectDistrict(d.name)); list.appendChild(b);
 });
}
function selectDistrict(name) {
 selectedDistrict=name; const d=districts.find(x=>x.name===name); if(!d)return;
 $("#selected-district").textContent=d.name; $("#selected-description").textContent=d.desc;
 $("#selected-tags").innerHTML=d.tags.map(t=>`<span>${t}</span>`).join("");
 $$(".district-shape").forEach(p=>p.classList.toggle("selected",p.dataset.name===name));
 $$(".district-list button").forEach(b=>b.classList.toggle("active",b.textContent===name));
 renderPlaces(); $("#map-status").textContent=`Selected: ${name}`;
}
function renderPlaces() {
 const filtered=places.filter(p=>activeDestinationFilter==="All"||p.district===activeDestinationFilter);
 $("#destination-grid").innerHTML=filtered.map(p=>`<article class="destination-card" style="--photo:url('${p.img}')"><button class="save-place" aria-label="Save ${p.name}" title="Save place">♡</button><div class="destination-info"><b>${p.name}</b><span>${p.district} · ${p.type}</span></div></article>`).join("");
 $("#destination-empty").style.display=filtered.length?"none":"block";
 $$(".save-place").forEach(b=>b.addEventListener("click",()=>{b.textContent=b.textContent==="♡"?"♥":"♡";b.style.color=b.textContent==="♥"?"#f2b7a2":"white"}));
}
function renderTreks(level="All") {
 $("#trek-grid").innerHTML=treks.filter(t=>level==="All"||t.level===level).map(t=>`<article class="trek-card"><img src="${t.img}" alt="${t.name}"><div class="trek-card-content"><h3>${t.name}</h3><p>${t.district} district</p><div class="trek-meta"><span class="level ${t.level.toLowerCase()}">${t.level}</span><span>${t.distance}</span><span>${t.duration}</span><span>${t.height}</span></div></div></article>`).join("");
}
function setupFilters() {
 $$("#destination-filters button").forEach(b=>b.addEventListener("click",()=>{$$("#destination-filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeDestinationFilter=b.dataset.filter;renderPlaces()}));
 $$(".trek-filters button").forEach(b=>b.addEventListener("click",()=>{$$(".trek-filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderTreks(b.dataset.level)}));
 $$("#district-chips button").forEach(b=>b.addEventListener("click",()=>{$$("#district-chips button").forEach(x=>x.classList.remove("active"));b.classList.add("active");const key=b.dataset.district;if(key==="Popular"){const p=districts.find(x=>x.popular);if(p)selectDistrict(p.name)}else if(key==="All")renderDistrictList();else renderDistrictList()}));
 $("#district-search").addEventListener("input",e=>renderDistrictList(e.target.value));
 $("#search-clear").addEventListener("click",()=>{$("#district-search").value="";renderDistrictList()});
}
function setupTheme() {
 const saved=localStorage.getItem("eh-theme");
 const preferred=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
 document.documentElement.dataset.theme=saved||preferred;
 $("#theme-toggle").addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem("eh-theme",next)});
}
function setupMapControls() {
 const g=$("#district-shapes");
 function apply(){g.setAttribute("transform",`translate(${mapOffset.x} ${mapOffset.y}) scale(${mapScale})`);$("#map-labels").setAttribute("transform",`translate(${mapOffset.x} ${mapOffset.y}) scale(${mapScale})`);$("#map-pins").setAttribute("transform",`translate(${mapOffset.x} ${mapOffset.y}) scale(${mapScale})`)}
 $("#map-zoom-in").onclick=()=>{mapScale=Math.min(1.8,mapScale+.15);apply()};
 $("#map-zoom-out").onclick=()=>{mapScale=Math.max(.75,mapScale-.15);apply()};
 $("#map-reset").onclick=()=>{mapScale=1;mapOffset={x:0,y:0};apply()};
}
function project(lon,lat,bounds){const x=70+(lon-bounds.minLon)/(bounds.maxLon-bounds.minLon)*580;const y=80+(bounds.maxLat-lat)/(bounds.maxLat-bounds.minLat)*500;return [x,y]}
function drawDistricts(features) {
 const names=features.map(f=>{const p=f.properties||{};return p.name||p.NAME||p.dtname||p.DTNAME||p.district||p.DISTRICT||""});
 const coords=[];features.forEach(f=>{const geom=f.geometry;if(!geom)return;const polys=geom.type==="Polygon"?[geom.coordinates]:geom.type==="MultiPolygon"?geom.coordinates:[];polys.forEach(poly=>poly[0].forEach(c=>coords.push(c)))});
 if(!coords.length)throw new Error("The GIS response contained no polygon coordinates.");
 const bounds={minLon:Math.min(...coords.map(c=>c[0])),maxLon:Math.max(...coords.map(c=>c[0])),minLat:Math.min(...coords.map(c=>c[1])),maxLat:Math.max(...coords.map(c=>c[1]))};
 const shapeGroup=$("#district-shapes"),labelGroup=$("#map-labels");shapeGroup.innerHTML="";labelGroup.innerHTML="";
 features.forEach((feature,i)=>{
  const name=names[i];if(!name)return;const geom=feature.geometry;const polys=geom.type==="Polygon"?[geom.coordinates]:geom.type==="MultiPolygon"?geom.coordinates:[];
  const pathData=polys.map(poly=>poly.map(ring=>ring.map((c,j)=>{const [x,y]=project(c[0],c[1],bounds);return `${j?"L":"M"}${x.toFixed(1)},${y.toFixed(1)}`}).join(" ")+" Z").join(" ")).join(" ");
  const path=document.createElementNS("http://www.w3.org/2000/svg","path");path.setAttribute("d",pathData);path.setAttribute("class","district-shape");path.dataset.name=name;
  const palette=["#8eaa88","#a8bb98","#75977d","#b5c7a6","#8ca99a","#a1b68b","#c0cba9","#91aa91","#789982","#b3c5a2","#89a78d","#a6b995"];path.style.fill=palette[i%palette.length];
  path.addEventListener("click",()=>selectDistrict(name));path.addEventListener("mouseenter",()=>{$("#map-status").textContent=name});path.addEventListener("mouseleave",()=>{$("#map-status").textContent=selectedDistrict?`Selected: ${selectedDistrict}`:"Select a district to explore"});
  shapeGroup.appendChild(path);
  // Use a polygon centroid approximation for label placement.
  const ring=polys[0]?.[0]||[];if(ring.length){const avg=ring.reduce((a,c)=>[a[0]+c[0],a[1]+c[1]],[0,0]);const [x,y]=project(avg[0]/ring.length,avg[1]/ring.length,bounds);const text=document.createElementNS("http://www.w3.org/2000/svg","text");text.setAttribute("x",x);text.setAttribute("y",y);text.setAttribute("class","district-label");text.textContent=name==="Lahaul and Spiti"?"Lahaul & Spiti":name;labelGroup.appendChild(text)}
 });
 // Decorative featured pins are intentionally illustrative until verified coordinates are added.
 const pinGroup=$("#map-pins");[[240,280],[390,340],[510,420],[320,470],[450,510]].forEach(([x,y])=>{const c=document.createElementNS("http://www.w3.org/2000/svg","circle");c.setAttribute("cx",x);c.setAttribute("cy",y);c.setAttribute("r",5);c.setAttribute("class","map-pin");pinGroup.appendChild(c)});
 $("#map-status").textContent=`${new Set(names.filter(Boolean)).size} district features loaded. Select one to explore.`;
 renderDistrictList();
}
async function loadMap() {
 const url="https://livingatlas.esri.in/server/rest/services/IAB2024/India_Administrative_Boundaries_2024/MapServer/2/query?where=state%3D%27Himachal%20Pradesh%27&outFields=*&returnGeometry=true&outSR=4326&f=geojson";
 try{const res=await fetch(url);if(!res.ok)throw new Error(`GIS service returned ${res.status}`);const data=await res.json();if(!data.features?.length)throw new Error("No district polygons returned");drawDistricts(data.features);if(new Set(data.features.map(f=>f.properties?.name||f.properties?.NAME||f.properties?.dtname||f.properties?.DTNAME)).size!==12)$("#map-status").textContent+=" Check that the source returns all 12 districts."}
 catch(err){console.error(err);$("#map-status").textContent="District geometry could not load. Check the GIS service connection. Other homepage features remain available.";renderDistrictList()}
}
function setupPlanner(){
 $("#planner-form").addEventListener("submit",e=>{e.preventDefault();const place=$("#plan-destination").value,days=Number($("#plan-days").value),budget=$("#plan-budget").value;const result=$("#planner-result");result.innerHTML=`<b>Your ${days}-day ${place} trip outline</b><br>Start with arrival and local orientation, reserve time for the main experiences, and keep a flexible final day. Selected budget band: approximately ₹${Number(budget).toLocaleString("en-IN")} per person. This is a planning prompt, not a live price quote. Verify transport, accommodation, permits and conditions before booking.`;result.classList.add("show")});
}
$("#mobile-menu").addEventListener("click",()=>$("#main-nav").classList.toggle("open"));
$$(".main-nav a").forEach(a=>a.addEventListener("click",()=>$("#main-nav").classList.remove("open")));
$("#year").textContent=new Date().getFullYear();
setupTheme();setupFilters();renderPlaces();renderTreks();setupMapControls();setupPlanner();loadMap();
