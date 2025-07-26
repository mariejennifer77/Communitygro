const locations = [
  { name: "Peoria Food Bank", city: "Peoria", zip: "61614", lat: 40.6936, lng: -89.5890 },
  { name: "Springfield Shelter", city: "Springfield", zip: "62704", lat: 39.7817, lng: -89.6501 },
  { name: "Bloomington Aid Center", city: "Bloomington", zip: "61701", lat: 40.4842, lng: -88.9937 },
];

function displayLocations(filtered) {
  const list = document.getElementById('locationList');
  list.innerHTML = '';
  filtered.forEach(loc => {
    const item = document.createElement('div');
    item.textContent = `${loc.name} - ${loc.city}, ${loc.zip}`;
    list.appendChild(item);
  });
}

document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = locations.filter(loc =>
    loc.name.toLowerCase().includes(query) ||
    loc.city.toLowerCase().includes(query) ||
    loc.zip.includes(query)
  );
  displayLocations(filtered);
});

displayLocations(locations);

function initMap() {
  const center = { lat: 40.6936, lng: -89.5890 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: center,
  });

  locations.forEach(loc => {
    new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map: map,
      title: loc.name
    });
  });
}