// Boilerplate that goes into all express servers
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));

// Give access to our data
const data = require("./data/weather.json");

// Endpoint for main, test our server is working
app.get("/", (request, response) => {
  response.json("Hey Johnny");
});

// // Endpoint for /weather, include request for lat, lon and searchQuery info
// app.get("/weather", (request,response); = {

// });
