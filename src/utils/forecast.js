const request = require("request");

function forecast(lat, lon, callback) {
  const apiKey = "c86a4b21917814261d4d5c30a49a3240";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  request(url, { json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the server", undefined);
    } else if (body.cod >= 400) {
      callback("Please provide valid information", undefined);
    } else {
      callback(undefined, {
        forecast: body.weather[0].main,
        maxTemperature: body.main.temp_max,
        humidity: body.main.humidity,
      });
    }
  });
}

module.exports = forecast;
