import "./App.css";
import axios from "axios";
import { useState } from "react";

// I've struggled with React so far so I'm gonna comment EVERYTHING I'm not 100% sure on so I know what it does

// Define the API key, which is in .env to keep it secret
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  // search has a state of an empty string, until setSearch does something
  const [search, setSearch] = useState("");

  // Function that listens for input in the form and updates search state to the input text
  function handleChange(event) {
    setSearch(event.target.value);
  }

  // location has a state of an empty object, until setLocation does something
  const [location, setLocation] = useState({});

  // Function to get location when form is submitted; it's asynchrounous
  // preventDefault stops the form's submitted info being added to the URL
  async function getLocation(event) {
    event.preventDefault();

    // The API URL that we're getting out results from, self explanatory
    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;

    // Get result from the API, use "await" as it takes time (asynchronous!)
    const result = await axios.get(API);

    // Pull the first piece of info from the result and update location state
    setLocation(result.data[0]);
  }

  // map is the image
  const map = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=18&markers=${location.lat},${location.lon}|icon:tiny-black-cutout`;

  // All of the below makes sense
  return (
    <>
      <h1>City Guys</h1>
      <form onSubmit={getLocation}>
        <input onChange={handleChange} placeholder="Gimme a location" />
        <button>Explore!</button>
      </form>

      <div className="output">
        <h2>Location: {location.display_name}</h2>
        <h3>Latitude: {location.lat}</h3>
        <h3>Longitude: {location.lon}</h3>
        <img src={map} />
      </div>
    </>
  );
}

export default App;
