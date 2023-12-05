import React from "react";
import "./weather.css";

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
}

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  //Capitalize the description string from weather data
  const capitalizedDescription =
    weatherData.weather[0].description.charAt(0).toUpperCase() +
    weatherData.weather[0].description.slice(1);
  //.chartAt(0) retrieves 0th index/character of string
  //.toUpperCase(): converts this character into uppercase
  //+ weatherData....sliec(1) takes rest of string using slice and appends it to first capitlized letter.

  return (
    <div className="flex">
      <div className="main-weather">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="Weather Icon"
          className="icon"
        />
        {/*@2x scales the icon */}
        <label className="temp">{weatherData.main.temp} &deg;C</label>
      </div>
      <div className="location">
        {capitalizedDescription} in <br />
        {weatherData.name}
      </div>
      {/*div className = "description">{weatherData.weather[0].description}</div>
            <p className="location">in {weatherData.name}</p> */}
    </div>
  );
};

export default WeatherCard;
