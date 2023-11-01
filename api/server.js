// boilerplate that goes into all express servers
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));

// define weather API key, which is in .env to keep it secret
const API_KEY = process.env.WEATHER_API_KEY;

// give access to our data
const data = require("./data/weather.json");

// endpoint for main, test our server is working
// use underscore rather than "request" as we're never going to use request
app.get("/", (_, response) => {
  response.json("Hey Johnny");
});

// endpoint for /weather, request for lat, lon and searchQuery objects
app.get("/weather", (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const searchQuery = request.query.searchQuery;

  // look through weather.json's data array and return city with matching name
  const foundCity = data.find((city) => {
    return (
      city.city_name === searchQuery
      // && city.lat == lat && city.lon === lon  -- we were going to make sure lat and lon match too but it doesn't work
    );
  });

  // look through returned info (foundCity) and return just the description and date information
  const wrangledData = foundCity.data.map((day) => {
    return {
      description: day.weather.description,
      date: day.datetime,
    };
  });
  // set the app response in json format
  response.json(wrangledData);
});
