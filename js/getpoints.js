var popups = [];

$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "https://6da0mqzrok.execute-api.us-east-1.amazonaws.com/dev/cognitoGetPoints",
    dataType: "json",
    crossDomain: "true",
    headers: {
      "x-api-key": "83IZXwI71v7Ysi1tXeIyE6gGcMFP4tRc9AgSqlpq",
    },
    success: function(response) {
      console.log(response);
      console.log(response.count);
      for (let i = 0; i < response.count; i++) {
        popups[i] = new mapboxgl.Popup({offset: 0}).setHTML(
          "<strong>Point ID:</strong> " + response.points[i].pid + "<br>" +
          "<strong>Resource:</strong> " + response.points[i].resource + "<br>" +
          "<strong>Latitude:</strong> " + response.points[i].lat + "<br>" +
          "<strong>Longitude:</strong> " + response.points[i].lng + "<br>"
        );
        addMarker(response.points[i].resource, response.points[i].lat, response.points[i].lng, popups[i]);
      }
      return response;
    },
    error: function(xhr, status) {
      alert("error");
    }
  });
});

//let populateMap = function () { ... }
