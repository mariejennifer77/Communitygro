const locations = [
  {
    name: "Fish of Galesburg",
    address: "876 W Main St Suite A, Galesburg, IL",
    lat: 40.945624,
    lng: -90.379321,
    website: "https://fishofgalesburg.org/about",
    phone: "309-343-7807",
    hours: "Mon–Fri, 10 AM – 3 PM (call first)",
    type: "pantry",
    image: "images/fish.png"
  },
  {
    name: "The Rescue Mission (Pantry)",
    address: "547 N Farnham St, Galesburg, IL",
    lat: 40.953238,
    lng: -90.368367,
    website: "http://www.galesburgrescuemission.org/food-service.html",
    phone: "309-343-4151",
    hours: "Mon–Fri, 9–11:30 AM and 1–2:30 PM",
    type: "pantry",
    image: "images/rescue.png"
  },
  {
    name: "The Rescue Mission (Meals)",
    address: "547 N Farnham St, Galesburg, IL",
    lat: 40.953238,
    lng: -90.368367,
    website: "http://www.galesburgrescuemission.org/food-service.html",
    phone: "309-343-4151",
    hours: "Everyday: Breakfast 7–7:20 AM, Lunch 12–12:20 PM, Dinner 6–6:20 PM",
    type: "meal",
    image: "images/rescue.png"
  },
  {
    name: "Jerry Rasmussen Orchard",
    lat: 40.944826,
    lng: -90.339376,
    hours: "Open daily dawn to dusk",
    type: "orchard",
    image: "images/rasmussen-orchard.jpg"
  },
  {
    name: "Jonathan & Sheryl Rodriguez Orchard",
    lat: 40.951504, 
    lng: -90.372513,
    hours: "Open daily dawn to dusk",
    type: "orchard",
    image: "images/rodriguez-orchard.jpg"
  },
   {
    name: "Ross McIntire Orpheum Orchard",
    lat: 40.951525, 
    lng: -90.374175,
    hours: "Open daily dawn to dusk",
    type: "orchard",
    image: "images/orpheum-orchard.jpg"
  },
    {
    name: "Tom Drauden Orchard",
    lat: 40.940053,
    lng: -90.336789,
    hours: "Open daily dawn to dusk",
    type: "orchard",
    image: "images/drauden-orchard.jpg"
  },
  {
    name: "Gary Henry Orchard",
    lat: 40.952897, 
    lng: -90.371038,
    hours: "Open daily dawn to dusk",
    type: "orchard",
    image: "images/henry-orchard.jpg"
  },
  {
    name: "Libby's Corner Orchard",
    lat: 40.935926,  
    lng: -90.376041,
    hours: "Open daily dawn to dusk",
    type: "orchard",
    image: "images/libbys-orchard.jpg"
  },
    {
    name: "OG CommunityGro Garden",
    lat: 40.957385,   
    lng: -90.361495,
    hours: "Open daily dawn to dusk",
    type: "garden",
    image: "images/soon.jpg"
  },
     {
    name: "CommunityGro Hub Host Garden",
    lat: 40.947459,    
    lng: -90.348718,
    hours: "Open daily dawn to dusk",
    type: "garden",
    image: "images/soon.jpg"
  },
];

let map;
let markers = [];

function initMap(locationList) {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 40.7, lng: -89.5 }
  });

  showMarkers(locationList);
}

function showMarkers(locationList) {
  const bounds = new google.maps.LatLngBounds();
  markers.forEach(marker => marker.setMap(null));
  markers = [];

  locationList.forEach((loc, index) => {
    const position = { lat: loc.lat, lng: loc.lng };

    const marker = new google.maps.Marker({
      position,
      map,
      title: loc.name
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="max-width: 250px;">
          <strong>${loc.name}</strong><br>
          ${loc.address}<br>
          ${loc.hours ? `<em>${loc.hours}</em><br>` : ""}
          ${loc.phone ? `Phone: ${loc.phone}<br>` : ""}
          <a class="directions-btn" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address)}" target="_blank" rel="noopener">
            Get Directions
          </a>
        </div>
      `
    });

marker.addListener("click", () => infoWindow.open(map, marker));
markers.push(marker);
bounds.extend(position);
});

if (locationList.length > 0) {
  map.fitBounds(bounds);

  google.maps.event.addListenerOnce(map, 'bounds_changed', function () {
    map.setZoom(Math.max(map.getZoom() - 3, 3)); // zoom out
  });
}
}


function displayGroupedLocations(locList) {
  const container = document.getElementById("groupedLocations");
  if (!container) return;

  container.innerHTML = '';

  const types = ["meal", "pantry", "garden", "orchard", "grove"];
  const typeHeadings = {
    meal: "🍽️ Prepared Meals",
    pantry: "🥫 Food Pantries",
    garden: "🌱 Gardens",
    orchard: "🍎 Orchards",
    grove: "🌳 Groves"
  };

  types.forEach(type => {
    const section = document.createElement("div");
    section.className = "type-section";

    const heading = document.createElement("h2");
    heading.textContent = typeHeadings[type] || type;
    heading.style.marginTop = "30px";

    const grid = document.createElement("div");
    grid.className = "location-grid";

    locList
      .filter(loc => loc.type === type)
      .forEach((loc, index) => {
        const card = document.createElement("div");
        card.className = "location-card";
        card.innerHTML = `
  ${loc.image ? `<img src="${loc.image}" alt="${loc.name}" class="location-image">` : ""}
  <div class="location-card-content">
    <strong>${loc.name}</strong><br>
    ${loc.address ? `${loc.address}<br>` : "<em>GPS only</em><br>"}
    ${loc.hours ? `<em>${loc.hours}</em><br>` : ""}
    ${loc.phone ? `Phone: ${loc.phone}<br>` : ""}
    <a class="directions-btn" href="https://www.google.com/maps/dir/?api=1&destination=${
      loc.address ? encodeURIComponent(loc.address) : `${loc.lat},${loc.lng}`
    }" target="_blank">
      Get Directions
    </a>
  </div>
`;


        card.addEventListener("click", () => {
          if (markers[index]) {
            google.maps.event.trigger(markers[index], 'click');
          }
        });

        grid.appendChild(card);
      });

    if (grid.children.length > 0) {
      section.appendChild(heading);
      section.appendChild(grid);
      container.appendChild(section);
    }
    
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const pageType = document.body.dataset.page || "all";

  const typeMap = {
    food: ["meal", "pantry"],
    produce: ["garden", "orchard", "grove"],
    all: ["meal", "pantry", "garden", "orchard", "grove"]
  };

  const allowedTypes = typeMap[pageType] || typeMap["all"];
  const filtered = locations.filter(loc => allowedTypes.includes(loc.type));

  initMap(filtered);
  displayGroupedLocations(filtered);
});
