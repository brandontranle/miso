import React from 'react'
import './weather.css';

const WeatherCard = ({weatherData}) => (
    <div className = "main">
        <div className="flex">
            <p className="temp">Temperature: {weatherData.main.temp} &deg;C</p>
        </div>
        <p className="header">{weatherData.name}</p>
        <div className = "flex">
            <p className = "description">{weatherData.weather[0].main}</p>
        </div>
    </div>

)

export default WeatherCard