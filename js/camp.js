/**
Initialize mapbox
**/

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2YwOCIsImEiOiJjamh4Z2d5ZzgwYmlqM3dvNmxmZnRqYnIxIn0.7o_eO-2qNGzCFlfOjsqZSQ';
map = new mapboxgl.Map({
  container: 'map',
  center: [-81.8880960437775, 35.8574565740673],
  zoom: 10,
  style: 'mapbox://styles/marcf08/cjhxpdtwh2n5i2rpbhckpno9h'
});

map.on('mouseup', function(e) {
  if (e.originalEvent.button == 2) {
    if (map.getZoom() < 15.5) {
      $('#ZoomInModal').modal('show');      ;
      return;
    }
    let tempLat = e.lngLat.lat;
    let tempLong = e.lngLat.lng;
    $('#addToMapModal').modal('show');
    $('#resourceLatitude').val(tempLat);
    $('#resourceLongitude').val(tempLong);
  }
});

let addMarker = function(resourceType, lat, lng, popup) {
  let el = document.createElement('div');
  el.className = 'marker';
  let marker = new mapboxgl.Marker(el)
    .setLngLat([lng, lat])
    .setPopup(popup)
    .addTo(map);
}
