import "./SpotifyWidget.css";
import WebPlayback from "../spotify/webplayback";
import Login from "../spotify/login";
import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";

export const initiateSpotifyAuthFlow = () => {
  const scope =
    "user-read-private user-read-email playlist-read-private user-modify-playback-state user-library-read app-remote-control streaming user-read-playback-position"; // Define the required scopes
  const clientId = "40c81832f8b34ebd8a20d172147b3dbe";
  const redirectUri = encodeURIComponent("http://localhost:5000/auth/callback");
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${redirectUri}`;
  window.location.href = authUrl;
};

export const SpotifyWidget = ({ handleMinimize }) => {
  const [spotifyApi, setSpotifyApi] =
    useState<SpotifyWebApi.SpotifyWebApiJs | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Inside your component or Axios interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 403 || error.response.status === 401)
        ) {
          // Detected an expired token, try to refresh it
          return axios
            .post("http://localhost:5000/refreshToken")
            .then((res) => {
              const newAccessToken = res.data.access_token;
              sessionStorage.setItem("access_token", newAccessToken);
              error.config.headers["Authorization"] =
                "Bearer " + newAccessToken;
              return axios(error.config); // Retry the failed request with new token
            })
            .catch((refreshError) => {
              console.error("Token refresh failed:", refreshError);
              // Handle failed refresh here (e.g., redirect to login)
            });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  const getToken = async () => {
    const response = await axios.post("http://localhost:5000/getToken");
    console.log("Token received from backend:", response.data.access_token);
    setToken(response.data.access_token);
    sessionStorage.setItem("access_token", response.data.access_token);
  };

  useEffect(() => {
    getToken();
  }, [spotifyApi]);

  useEffect(() => {
    // Check for the code parameter in the URL
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    // If the code parameter is found, exchange it for an access token
    if (code) {
      // Clear the code from the URL
      window.history.pushState({}, "", window.location.pathname);

      // Exchange the code for an access token
      fetch(
        `http://localhost:5000/auth/callback?code=${encodeURIComponent(code)}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Store the access token and remove the code from the URL
          sessionStorage.setItem("access_token", data.access_token);
          setToken(data.access_token);
        })
        .catch((error) => console.error("Error fetching auth token:", error));
    } else {
      // If there is no code parameter, try to get the token from session storage
      const storedToken = sessionStorage.getItem("access_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  return (
    <>
      <div className="spotify-widget">
        <div className="widget-header widget-handle">
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
            {token === "" ? <Login /> : <WebPlayback token={token} />}
          </div>
        </>
      </div>
    </>
  );
};

export default SpotifyWidget;
