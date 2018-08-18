/**
Initialize mapbox
**/

var addMode;

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2YwOCIsImEiOiJjamh4Z2d5ZzgwYmlqM3dvNmxmZnRqYnIxIn0.7o_eO-2qNGzCFlfOjsqZSQ';
map = new mapboxgl.Map({
  container: 'map',
  center: [-81.8880960437775, 35.8574565740673],
  zoom: 10,
  style: 'mapbox://styles/marcf08/cjhxpdtwh2n5i2rpbhckpno9h'
});

map.on('mouseup', function(e) {
  //Remember mouse button == 2 is right click
  //Mouse button == 1 is center click
  //Mouse button == 0 is left click
  if (e.originalEvent.button == 0) {
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



map.on('zoomend', function(e) {
  if ((map.getZoom() < 15.5) && isLoggedIn()) {
    addMode = true;
    //Then user can click the "Plus button"
  } if (map.getZoom() < 15.5 && !isLoggedIn())
    addMode = false;
   else {
    addMode = false;
    //User cannot click the "Plus button"
  }
})

map.on('mouseover', function(e) {
  console.log("test");
  if (addMode) {
      console.log("You can do it");
  }
})

//TODO: Function for clicking on the "plus button" and entering in the mode



let addMarker = function(resourceType, lat, lng, popup) {
  let el = document.createElement('div');
  if (resourceType == "Campsite") {
    el.className = 'marker';
  }
  if (resourceType == "Water") {
    el.className = 'marker-water';
  }
  let marker = new mapboxgl.Marker(el)
    .setLngLat([lng, lat])
    .setPopup(popup)
    .addTo(map);
}
