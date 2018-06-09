let pushPoint = function(lat, lng, resource) {
  console.log("lat " + lat);
  console.log("lng " + lng);
  console.log("resource " + resource);
  let data = {
      "lat": lat,
      "lng": lng,
      "resource": resource,
      "time-in-millis": "testing"
  };
  $.ajax({
    type: "POST",
    url: "https://6da0mqzrok.execute-api.us-east-1.amazonaws.com/dev/cognitoAddPoint",
    dataType: "json",
    crossDomain: "true",
    headers: {
      "Authorization": cognitoUser.signInUserSession.idToken.jwtToken,
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data),
    success: function(response) {
      console.log(response);
    },
    error: function(xhr, status) {
      alert("error");
    }
  });
}
