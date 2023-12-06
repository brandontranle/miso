import "./SpotifyWidget.css";
import WebPlayback from "../spotify/webplayback";
import Login from "../spotify/login";
import React, { useState, useEffect, Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

export const SpotifyWidget = ({ handleMinimize }) => {
  const [spotifyApi, setSpotifyApi] =
    useState<SpotifyWebApi.SpotifyWebApiJs | null>(null);
  const [token, setToken] = useState("");
  const authToken =
    "BQAePqQGcKeKp0NxH_6L-h-IbsQPpWkcERo7YRlxuFiKaQ2ggVRAUQ2-UAyNA4aDof9Bw-CdrQUjcjFJdc0m2SMAzAs0vXES-cDgBdmUt752JpnxklqobTAJX2D-f6MeDh0gXJuluY8NIceG7IbJ9bECbN0dpBQW04Bcf2JcrI0AWCFPmVWx86woAKtPkxR9V_xCBz7-EfYjJ1cDeeTzpYLk8-L9rhHg";

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      sessionStorage.setItem("access_token", json.access_token);
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
      <div className="spotify-widget">
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
            {token === "" ? <Login /> : <WebPlayback token={token} />}
          </div>
        </>
      </div>
    </>
  );
};

export default SpotifyWidget;
