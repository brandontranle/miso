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
  selectedUnit: string;
  onUnitChange: (unit: string) => void;
}


const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, selectedUnit, onUnitChange }) => {
  //Capitalize the description string from weather data
  const capitalizedDescription =
    weatherData.weather[0].description.charAt(0).toUpperCase() +
    weatherData.weather[0].description.slice(1);
  //.chartAt(0) retrieves 0th index/character of string
  //.toUpperCase(): converts this character into uppercase
  //+ weatherData....sliec(1) takes rest of string using slice and appends it to first capitlized letter.
  //allow uesr to change unit
  const convertTemperature = (temp: number):string => 
  {
    switch (selectedUnit)
    {
      case 'standard':
        return `${temp} Kelvin`;
      case 'metric':
        return `${temp} °C`;
      case 'imperial':
        return `${temp} °F`;
      default:
        return `${temp} °C`; // Default to Celsius
    }
  };

  /*
  return (
    <div className="flex">
      <div className="main-weather">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="Weather Icon"
          className="icon"
        />
        
        <label className="temp">{convertTemperature(weatherData.main.temp)}</label>
      </div>
      <div className="location">
        <div>{capitalizedDescription} in </div>
        <div>{weatherData.name}</div>
      </div>
     
    </div>
  );
  */

  return (
    <div className="flex">
      <div className="main-weather">
      <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="Weather Icon"
          className="icon"
        />
        <label className="temp">{convertTemperature(weatherData.main.temp)}</label>
      </div>
      <div className="location">
      <div>{capitalizedDescription} in </div>
        <div>{weatherData.name}</div>
      </div>
      <div className="unit-selector">
        <select value={selectedUnit} onChange={(e) => onUnitChange(e.target.value)}>
          <option value="standard">Kelvin</option>
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>
    </div>
  );
};



export default WeatherCard;
