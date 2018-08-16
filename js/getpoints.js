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
          "<div class='infowindow_header'>" + response.points[i].resource + "</div>" +
          "<div class='infowindow_body'>" +
            "<div class='infowindow_item'><label>Point ID:</label><div> " + response.points[i].pid + "</div></div>" +
            "<div class='infowindow_item'><label>Latitude:</label><div> " + response.points[i].lat + "</div></div>" +
            "<div class='infowindow_item'><label>Longitude:</label><div> " + response.points[i].lng + "</div></div>" +
          "</div>"
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
