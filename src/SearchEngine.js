import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [name, setName] = useState("");
  let [temperature, setTemperature] = useState("");
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");

  function showWeather(response) {
    // console.log(response);
    setLoaded(true);
    setName(response.data.name);
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    // setIcon(response.data.weather[0].icon);
    setIcon(
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log({ city });
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b107f0128f12cb3797262a88dde7c0fa&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="SearchEngine">
        {form}
        <div>
          <ul>
            <li>City: {name}</li>
            <li>Temperature: {temperature}°C</li>
            <li>Description: {description}</li>
            <li>Humidity:{humidity}%</li>
            <li>Wind: {wind}km/h</li>
            <li>
              <img src={icon} alt="description" />
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
