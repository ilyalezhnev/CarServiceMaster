const mymap = L.map('mapid');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

const coords = document.querySelectorAll('.contact__item');
const bounds = [];
const mapMarker = L.icon({
  iconUrl: '/static/img/map_marker.svg',
  iconSize: [41, 55],
  iconAnchor: [20, 54],
});

coords.forEach((item) => {
  const lat = item.querySelector('.locationLat');
  const lon = item.querySelector('.locationLon');

  if (lat && lon) {
    bounds.push([+lat.innerHTML, +lon.innerHTML]);

    L.marker([+lat.innerHTML, +lon.innerHTML], { icon: mapMarker })
      .addTo(mymap)
      .on('click', () => {
        mymap.setView([+lat.innerHTML, +lon.innerHTML], 16);
      });
  }
});

mymap.fitBounds(bounds, { padding: [50, 50] });
