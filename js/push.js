let pushPoint = function(resource, lat, lng) {
  if (localStorage.getItem('token') == '' || localStorage.getItem('token') == null) {
      $('#logMessage').text('You must be logged in to add a campsite or resource.');
      $('#notifyModal').modal('show');
      return;
  }
  console.log("lat " + lat);
  console.log("lng " + lng);
  console.log("resource " + resource);
  let data = {
      "lat": lat,
      "lng": lng,
      "resource": resource,
      "time-in-millis": "testing"
  };
  let token = String(localStorage.getItem('token'));
  $.ajax({
    type: "POST",
    url: "https://6da0mqzrok.execute-api.us-east-1.amazonaws.com/dev/cognitoAddPoint",
    dataType: "json",
    crossDomain: "true",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data),
    success: function(response) {
      console.log(response);
      addMarker(resource, lat, lng);
    },
    error: function(xhr, status) {
      alert("error");
    }
  });
}
