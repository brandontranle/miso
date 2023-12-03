import React,{useState,useEffect} from "react";

const SoundsWidget = ({ handleMinimize, isMinimized }) => {
  const [campfireVolume, setCampfireVolume] = useState(0.0); 
  const [rainVolume, setRainVolume] = useState(0.0); 
  const [waterfallVolume, setWaterfallVolume] = useState(0.0); 

  const adjustVolume = (volumeSetter) => (event) => {
    const volume = parseFloat(event.target.value);
    volumeSetter(volume);
  };
  useEffect(() => {
    const campfireAudio = new Audio("src/widgets/sounds/campfire.mp3");
    campfireAudio.loop = true;
    campfireAudio.volume = campfireVolume;
    campfireAudio.play();

    return () => {
      campfireAudio.pause();
      campfireAudio.currentTime = 0;
    };
  }, [campfireVolume]);

  useEffect(() => {
    const rainAudio = new Audio("src/widgets/sounds/rain.mp3");
    rainAudio.loop = true;
    rainAudio.volume = rainVolume;
    rainAudio.play();

    return () => {
      rainAudio.pause();
      rainAudio.currentTime = 0;
    };
  }, [rainVolume]);

  useEffect(() => {
    const waterfallAudio = new Audio("src/widgets/sounds/waterfall.mp3");
    waterfallAudio.loop = true;
    waterfallAudio.volume = waterfallVolume;
    waterfallAudio.play();

    return () => {
      waterfallAudio.pause();
      waterfallAudio.currentTime = 0;
    };
  }, [waterfallVolume]);

  return (
    <div className="sounds-widget">
       <div className="widget-header">
        <p className="widget-title">sounds</p>
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
      <div className="widget-line"></div>

      <div className="widget-content">
        <div>
          <div className="volume-slider">
          <label htmlFor="campfireVolume">Campfire: </label>
          <input
            type="range"
            id="campfireVolume"
            min="0"
            max="1"
            step="0.1"
            value={campfireVolume}
            onChange={adjustVolume(setCampfireVolume)}
          />
          </div>
          <div className="volume-slider">
          <label htmlFor="rainVolume">Rain: </label>
          <input
            type="range"
            id="rainVolume"
            min="0"
            max="1"
            step="0.1"
            value={rainVolume}
            onChange={adjustVolume(setRainVolume)}
          />
          </div>
          <div className="volume-slider">
          <label htmlFor="waterfallVolume">Waterfall:</label>
          <input
            type="range"
            id="waterfallVolume"
            min="0"
            max="1"
            step="0.1"
            value={waterfallVolume}
            onChange={adjustVolume(setWaterfallVolume)}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundsWidget;