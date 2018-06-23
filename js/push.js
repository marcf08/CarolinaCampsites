let pushPoint = function(resource, lat, lng) {
  console.log(resource);
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
