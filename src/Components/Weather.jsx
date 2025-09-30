import React, { useState, useEffect } from "react";
import "./Weather.css";

const weatherIcon = {
  Moon: "./weather_icon/moon.png",
  Cloudy_night: "./weather_icon/night.png",
  Cloudy_day: "./weather_icon/day.png",
  Rain: "./weather_icon/rain.png",
  Sun: "./weather_icon/sun.png",
  Cloudy: "./weather_icon/cloud.png",
};

// Minimal mock data
const mockWeatherData = {
  name: "Cupertino",
  main: {
    temp: 292.74,
    temp_min: 291.61,
    temp_max: 294.71,
  },
  weather: [
    { main: "Cloudy" }, // Base weather type
  ],
};

const WeatherComponent = () => {
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");
  const [bgStyle, setBgStyle] = useState({});

  const kelvinToFahrenheit = (kelvin) =>
    Math.round(((kelvin - 273.15) * 9) / 5 + 32);

  useEffect(() => {
    const data = mockWeatherData;
    setCity(data.name);
    setDescription(data.weather[0].main);
    setTemperature(kelvinToFahrenheit(data.main.temp));
    setMaxTemp(kelvinToFahrenheit(data.main.temp_max));
    setMinTemp(kelvinToFahrenheit(data.main.temp_min));

    const hour = new Date().getHours();
    const isDayTime = hour >= 6 && hour < 18; // 6am-6pm is day

    // Set icon
    let weatherIconKey = data.weather[0].main;
    if (weatherIconKey === "Cloudy") {
      weatherIconKey = isDayTime ? "Cloudy_day" : "Cloudy_night";
    } else if (weatherIconKey === "Clear") {
      weatherIconKey = isDayTime ? "Sun" : "Moon";
    } else if (weatherIconKey === "Rain") {
      weatherIconKey = "Rain";
    }
    setIcon(weatherIcon[weatherIconKey]);

    // Set dynamic background
    const background = isDayTime
      ? "linear-gradient(rgba(4, 84, 190, 1), rgba(54, 140, 221, 1), rgba(147, 195, 250, 1))" // light blue sky
      : "linear-gradient(rgb(24, 24, 104), rgb(25, 29, 86), rgb(0, 0, 21))"; // night colors
    setBgStyle({ backgroundImage: background });
  }, []);

  if (temperature === null) return null;

  return (
    <div className="weather-container" style={bgStyle}>
      <div className="temp-data">
        <div className="temp-high-low">
          <p>{city}</p>
          <h5>{temperature}°</h5>
          <div className="min-max">
            <small>H: {maxTemp}°</small>
            <br />
            <small>L: {minTemp}°</small>
          </div>
        </div>
        <div className="description-icon">
          <img src={icon} alt="icon" />
          <div className="desc">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
