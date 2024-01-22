const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Robert",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Robert",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Robert",
    description: "This a page where you can get useful information",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({
          error,
        });
      }

      return res.send({
        address: req.query.address,
        forecast: forecast.forecast,
        maxTemperature: forecast.maxTemperature,
        humidity: forecast.humidity,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help",
    name: "Robert",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    name: "Robert",
    message: "Page not found",
  });
});

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
