import React, { useState, useEffect } from "react";
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
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      
      const player = new window.Spotify.Player({
        name: "Miso Spotify Player",
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
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setDuration(state.duration);

        player.getCurrentState().then((state) => {
          (!state)? setActive(false) : setActive(true);

        });
      }));

      player.connect();

    };
    const interval = setInterval(() => {
      if (!is_paused) {
        setPosition(prevPosition => {
          const newPosition = prevPosition + 1000; // Increment position by 1000 milliseconds (1 second)
          return newPosition > duration ? duration : newPosition; // Ensure position doesn't exceed duration
        });
      }
    }, 1000); 

    return () => clearInterval(interval);

  }, []);

   useEffect(() => {
    let intervalId;

      // ... (existing code)

      intervalId = setInterval(() => {
        setPosition((prevPosition) => {
          if (!is_paused && prevPosition < duration) {
            const newPosition = prevPosition + 1000; // Increment position by 1000 milliseconds (1 second)
            return newPosition > duration ? duration : newPosition; // Ensure position doesn't exceed duration
          }
          return prevPosition;
        });
      }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [is_paused, duration]);

  const progress = (position / duration) * 100;

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  
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
          <div className="flex-row-container"> 
              <button className="btn-spotify" onClick={() => {console.log("prev track"); player?.previousTrack() }} >
              <svg width="30" height="30" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.6))' }}>
<path d="M8.35938 13.7687C8.65625 14.0156 9.07188 14.0719 9.425 13.9062C9.77813 13.7406 10 13.3875 10 13V3C10 2.6125 9.775 2.25937 9.425 2.09375C9.075 1.92812 8.65938 1.98125 8.35938 2.23125L2.35938 7.23125L2 7.53125V3C2 2.44687 1.55313 2 1 2C0.446875 2 0 2.44687 0 3V13C0 13.5531 0.446875 14 1 14C1.55313 14 2 13.5531 2 13V8.46875L2.35938 8.76875L8.35938 13.7687Z" fill="white"/>
</svg>
              </button>

        <button className="btn-spotify" onClick={() => { player?.togglePlay() }} >
            { is_paused ? <svg width="30" height="30" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.6))' }}>
<path d="M2.28125 1.21875C1.81875 0.934375 1.2375 0.925 0.765625 1.19062C0.29375 1.45625 0 1.95625 0 2.5V13.5C0 14.0437 0.29375 14.5437 0.765625 14.8094C1.2375 15.075 1.81875 15.0625 2.28125 14.7812L11.2812 9.28125C11.7281 9.00938 12 8.525 12 8C12 7.475 11.7281 6.99375 11.2812 6.71875L2.28125 1.21875Z" fill="white"/>
</svg>  : <svg width="30" height="30" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.6))' }}>
<path d="M1.5 2C0.671875 2 0 2.67188 0 3.5V12.5C0 13.3281 0.671875 14 1.5 14H2.5C3.32812 14 4 13.3281 4 12.5V3.5C4 2.67188 3.32812 2 2.5 2H1.5ZM7.5 2C6.67188 2 6 2.67188 6 3.5V12.5C6 13.3281 6.67188 14 7.5 14H8.5C9.32812 14 10 13.3281 10 12.5V3.5C10 2.67188 9.32812 2 8.5 2H7.5Z" fill="white"/>
</svg> }
        </button>

      <button className="btn-spotify" onClick={() => {console.log("next track"); player?.nextTrack() }} >
        <svg
            width="30"
            height="30"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.6))' }}
          >
            <path
              d="M1.64062 13.7687C1.34375 14.0156 0.928125 14.0719 0.575 13.9062C0.221875 13.7406 0 13.3875 0 13V3C0 2.6125 0.225 2.25937 0.575 2.09375C0.925 1.92812 1.34062 1.98125 1.64062 2.23125L7.64062 7.23125L8 7.53125V3C8 2.44687 8.44687 2 9 2C9.55313 2 10 2.44687 10 3V13C10 13.5531 9.55313 14 9 14C8.44687 14 8 13.5531 8 13V8.46875L7.64062 8.76875L1.64062 13.7687Z"
              fill="white"
            />
</svg> 
      </button>
      </div>
      <div className="progress-bar">
      <div className ="progress-unfilled"></div>
      <div className="progress-filled" style={{ width: `${progress}%` }}></div>
</div>
<div className="progress-labels">
  <span>{formatTime(position)}</span>
  <span>{formatTime(duration)}</span>
</div>
            </div>
          </div>
      </div>
    </>
  );
}

export default WebPlayback;
