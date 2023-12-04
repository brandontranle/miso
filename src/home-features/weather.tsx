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

  const [lat, setLat] = useState<number | null>(null); //lat for latitutde, when initailized can be a number or  null
  const [long, setLong] = useState<number | null>(null); //long for longitude
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => { //load functions when application is loaded and reloaded
    //get latitude and longitude using navigator.gelocation
    
    //Function to fetch weather data from weather API, based on longitude/latitude
    //process.env.REACT_APP_API_URL gets API address...
    const fetchData = async() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    };
    fetchData();

      //await fetch(`${apiUrl}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`)
          /*we are inputing into fetch the API call, using user's own lat, long, and our API key*/
      //.then(res => res.json())  /*once we fetched data, then...*/
      //.then(result => {
        //we get the fetch call from the API documentation
        //we can add parameters using &___, from documentation
        /*try { 
          const response = await fetch(`${apiUrl}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`)
          const result = await response.json(); //convert the weather data we get from fetch call to json file
          setData(result);
          console.log(result);
        } catch(error) {
          console.error("Error fetching weather data: ", error);
        }
        */
    const fetchWeatherData = async () => {
      if (lat !== null && long !== null && apiUrl && apiKey) {
        try {
          const response = await fetch(
            `${apiUrl}/weather/?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`
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
    

  }, [lat, long, apiUrl, apiKey]);

  return (

    <div className="weather-container">
      {data ? <WeatherCard weatherData={data}/> : <div>Loading weather...</div>}
    </div>
    
  );
};

export default Weather;
