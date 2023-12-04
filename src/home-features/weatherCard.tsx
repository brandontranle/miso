import React from 'react'
import './weather.css';

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

const WeatherCard: React.FC<WeatherCardProps> = ({weatherData}) => (
    <div className = "weather-container">
        <div className="flex">
            <img src={'https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x/png'} alt="Weather Icon" className="icon"/>
            <p className="temp">{weatherData.main.temp} &deg;C</p>
            <p className="location">in {weatherData.name}</p> 
        </div>
        <div className = "description">{weatherData.weather[0].description}</div>
    </div>
)

export default WeatherCard