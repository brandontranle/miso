import "./SpotifyWidget.css";
import WebPlayback from '../spotify/webplayback';
import Login from '../spotify/login';
import "../spotify/player";
import * as $ from 'jquery';
import Player from "../spotify/player";
import WebPlaybackSDK from "react-spotify-web-playback-sdk";
import React,{ useState, useEffect, Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

export const SpotifyWidget = ({ handleMinimize }) => {

  const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi.SpotifyWebApiJs | null>(null);
  const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false)
  const [token, setToken] = useState("")
  const authToken = 'BQAePqQGcKeKp0NxH_6L-h-IbsQPpWkcERo7YRlxuFiKaQ2ggVRAUQ2-UAyNA4aDof9Bw-CdrQUjcjFJdc0m2SMAzAs0vXES-cDgBdmUt752JpnxklqobTAJX2D-f6MeDh0gXJuluY8NIceG7IbJ9bECbN0dpBQW04Bcf2JcrI0AWCFPmVWx86woAKtPkxR9V_xCBz7-EfYjJ1cDeeTzpYLk8-L9rhHg';
  
  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);

  return (
    <><div className="spotify-widget">
    <div className="widget-header">
      <p className="widget-title">spotify</p>
      <button className="minimize-symbol" onClick={() => handleMinimize()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="2"
          viewBox="0 0 15 2"
          fill="none"
        >
          <path
            d="M1.83081 1L14 1"
            stroke="#4E4E4E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
    <>
      <div className="widget-line"></div>
      <div className="widget-content">
      { (token === '') ? <Login/> : <WebPlayback token={token} /> }
      </div>
    </>
  </div>
    </>
  );
  /*
  interface HashParams {
    access_token?: string;
  }

  Component.constructor();

  useEffect(() => {
    const params = getHashParams();
    const token = params.access_token;
    if(token) {
      const spotifyApiInstance = new SpotifyWebApi();
      spotifyApiInstance.setAccessToken(token);
      this.setState({ token: token});
      setSpotifyApi(spotifyApiInstance);
      setIsSpotifyAuthenticated(true);
    }
  }, []);
  
  const getHashParams = () => {
    const hashParams: HashParams = {};
    const hash = window.location.hash.substring(1);
    const params = hash.split('&');
    for (let i = 0; i < params.length; i++) {
      const [key, value] = params[i].split('=');
      hashParams[key] = decodeURIComponent(value);
    }
    return hashParams;
  };

  const handleLogin = () => {
    const clientID = "40c81832f8b34ebd8a20d172147b3dbe";
    const redirectURI = 'http://localhost:5173';
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const scopes = ['user-read-private', 'user-read-email', 'user-read-currently-playing', 'user-read-playback-state']; // Add scopes as needed
    const authUrl = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join('%20')}&response_type=token` || "";

    window.location.href = authUrl;
  };

  const renderContent = () => {
    if (!isSpotifyAuthenticated) {
      return (
        <button onClick={handleLogin} className="spotify-login-button">
          Login with Spotify
        </button>
      );
    } else {
      // Render authenticated content
      return (
        // Your authenticated content here
        <div>
          <p>Properly Authenticated!</p>
        </div>
      );
    }
  };

  return (
  ); */
};

export default SpotifyWidget;
