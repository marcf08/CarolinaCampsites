var map;
var start_lat = 35.227085;
var start_lng = -80.843124;
$(document).ready(function(){
  map = new GMaps({
    el: '#map',
    lat: start_lat,
    lng: start_lng,
    zoom: 8
  });
  map.setContextMenu({
    control: 'map',
    options: [{
      title: 'Add Campsite',
      name: 'add_campsite',
      action: function(e){
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
        this.addMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          title: 'New marker'
        });
        this.hideContextMenu();
      }
    }, {
      title: 'Center here',
      name: 'center_here',
      action: function(e){
        this.setCenter(e.latLng.lat(), e.latLng.lng());
      }
    }]
  });
  map.setContextMenu({
    control: 'marker',
    options: [{
      title: 'Center here',
      name: 'center_here',
      action: function(e){
        this.setCenter(e.latLng.lat(), e.latLng.lng());
      }
    }]
  });
});
