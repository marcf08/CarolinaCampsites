window.onload = function() {
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
        addMarker(response.points[i].resource, response.points[i].lat, response.points[i].lng);
      }
      return response;
    },
    error: function(xhr, status) {
      alert("error");
    }
  });
}

//let populateMap = function () { ... }
