import "./App.css";
import axios from "axios";
import { useState } from "react";

// i've struggled with React so far so I'm gonna comment EVERYTHING I'm not 100% sure on so I know what it does

// define the API key, which is in .env to keep it secret
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  // search has a state of an empty string, until setSearch does something
  const [search, setSearch] = useState("");
  // location has a state of an empty object, until setLocation does something
  const [location, setLocation] = useState({});
  // weather has a state of empty array, until setWeather does something
  const [weather, setWeather] = useState([]);

  // function that listens for input in the form and updates search state to the input text
  function handleChange(event) {
    setSearch(event.target.value);
  }

  // function to get location when form is submitted; it's asynchrounous
  // preventDefault stops the page refreshing when the form is submitted
  async function getLocation(event) {
    event.preventDefault();

    // the API URL that we're getting our results from, self explanatory
    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;

    // get result from the API, use "await" as it takes time (asynchronous!)
    const result = await axios.get(API);

    // pull the first piece of info from the result and update location state, invoke getWeather and get first piece of info from what that returns
    setLocation(result.data[0]);
    getWeather(result.data[0]);
  }

  // function to get weather info from our API and update weather state
  async function getWeather(tempLocation) {
    const API = `http://localhost:8080/weather?lat=${tempLocation.lat}&lon=${tempLocation.lon}&searchQuery=${search}`;
    const result = await axios.get(API);
    setWeather(result.data);
  }

  // all of the below makes sense
  // conditional render - if location.lat is truthy, render everything else
  return (
    <>
      <div className="titleBox">
        <h1>
          &#x1F3D9; <i>City Guys</i> &#x1F3D9;{" "}
        </h1>
        <form onSubmit={getLocation}>
          <input onChange={handleChange} placeholder="Gimme a location" />
          <button>Explore!</button>
        </form>
      </div>
      {location.lat && (
        <div className="results">
          <h2>{location.display_name}</h2>
          <h3>
            {location.lat}, {location.lon}
          </h3>
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=13&markers=${location.lat},${location.lon}|icon:tiny-black-cutout`}
          />
          {weather.map((day) => {
            return (
              <p>
                On {day.date}, the weather was {day.description}.
              </p>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
