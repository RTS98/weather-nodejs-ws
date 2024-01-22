const request = require("request");

function geocode(location, callback) {
  const apiKey = "c86a4b21917814261d4d5c30a49a3240";
  const geoCodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;

  request(geoCodeUrl, { json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the server", undefined);
    } else if (body.length === 0) {
      callback("Please provide location information", undefined);
    } else {
      callback(undefined, {
        latitude: body[0].lat,
        longitude: body[0].lon,
      });
    }
  });
}

module.exports = geocode;
