import React, { useEffect, useState } from 'react';
import './weather.css';
import WeatherCard from './weatherCard';
import {apiUrl, apiKey} from './config';

//import WeatherComponent from './weatherComponent';
//require('dotenv').config({path: '../../openWeatherMapAPI/.env'});
  //this allows us to use process.env.REACT_APP...

  //WeatherData represnts the sturcture of the data fetched from the weather API,
  //it includes properties like main, weaether, name, and others.  We will be only using these.
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

const Weather: React.FC = () => {

  const [selectedUnit, setSelectedUnit]  = useState('metric') //default unit is celcius
  const [lat, setLat] = useState<number | null>(null); //lat for latitutde, when initailized can be a number or  null
  const [long, setLong] = useState<number | null>(null); //long for longitude
  const [data, setData] = useState<WeatherData | null>(null);
  const [locationDenied, setLocationDenied] = useState(false); //do not show unit dropdown if location is denied


  useEffect(() => { //load functions when application is loaded and reloaded
    //get latitude and longitude using navigator.gelocation
    
    //Function to fetch weather data from weather API, based on longitude/latitude
    //process.env.REACT_APP_API_URL gets API address...
    const fetchData = async() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      function (error){
        setLocationDenied(true);
      });
    };
    fetchData();

    //change units
    type Unit = 'standard' | 'metric' | 'imperial';
    const handleUnitChange = (newUnit: Unit) => 
    {
      setSelectedUnit(newUnit);
      //update api call to use selected unit
    }
    
    const fetchWeatherData = async () => {
      if (lat !== null && long !== null && apiUrl && apiKey) {
        try {
          const response = await fetch(
            `${apiUrl}/weather/?lat=${lat}&lon=${long}&units=${selectedUnit}&appid=${apiKey}`
          );
          const result: WeatherData = await response.json();
          setData(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching weather data: ", error);
        }
      }
    };
    console.log("Latitude is: ", lat)
    console.log("Longitude is: ", long )

    const intervalId = setInterval(fetchWeatherData, 600000); //fetch data every 10 minutes
    fetchWeatherData(); //intial fetch
    
  }, [lat, long, apiUrl, apiKey, selectedUnit]);

  return (

    <div className="weather-container">
      {!locationDenied && lat !== null && long !== null && (
      <div className="unit-selector">
        <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
          <option value ="standard">Kelvin</option>
          <option value="metric">Celcius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>
      )}
      {data ? <WeatherCard weatherData={data} selectedUnit={selectedUnit}/> : <div></div>} {/*shows nothing if location is not allowed*/}
      {/*We pass props weatherData and selctedunit to WeatherCard component*/}
    </div>
    
  );
};

export default Weather;
