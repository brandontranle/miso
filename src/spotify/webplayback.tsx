import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faPlay,
  faPause,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import "./webplayback.css";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state => {
        if (!state) {

          console.error('User is not playing music through the Web Playback SDK');
          return;
        }
        console.log("changing player state");

        setTrack(state.track_window.current_track);
        console.log("setting track");
        setPaused(state.paused);
  

        player.getCurrentState().then((state) => {
          (!state)? setActive(false) : setActive(true);

        });
      }));

      player.connect();

    };

  }, [props]);


  return (
    <>
    
      <div className="container" >
      <div className="background-container">
      <div className="white-overlay"></div>
        <div className="blur-background" style={{ backgroundImage: `url(${current_track.album.images[0].url})` }}></div>
    </div>
        <div className="main-wrapper">
        <img src={current_track.album.images[0].url} 
                     className="now-playing__cover" alt="" />
         <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">{ current_track.artists[0].name}</div>
              <button className="btn-spotify" onClick={() => {console.log("prev track"); player?.previousTrack }} >
                    <FontAwesomeIcon icon={faStepBackward} style={{ fontSize: '2em' }}/>
              </button>

        <button className="btn-spotify" onClick={() => { player?.togglePlay }} >
            { is_paused ? <FontAwesomeIcon icon= {faPlay} style={{ fontSize: '2em' }} />  : <FontAwesomeIcon icon= {faPause} style={{ fontSize: '2em' }}/> }
        </button>

      <button className="btn-spotify" onClick={() => {console.log("next track"); player?.nextTrack }} >
        <FontAwesomeIcon icon={faStepForward} style={{ fontSize: '2em' }}/>
      </button>
            </div>
          </div>
      </div>
    </>
  );
}

export default WebPlayback;
