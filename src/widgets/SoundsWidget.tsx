import React,{useState} from "react";

const SoundsWidget = ({ handleMinimize, isMinimized }) => {
  const playSound = (soundSrc) => {
    const audio = new Audio(soundSrc);
    audio.loop = true
    audio.play();
  };

  return (
    <div className="sounds-widget">
      {/* ... rest of your component */}
      <div className="widget-content">
        <div>
          <p>Select Sounds:</p>
          <button onClick={() => playSound("src/widgets/sounds/campfire.mp3")}>
            Campfire
          </button>
          <button onClick={() => playSound("src/widgets/sounds/rain.mp3")}>
            Rain
          </button>
          <button onClick={() => playSound("src/widgets/sounds/waterfall.mp3")}>
            Waterfall
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundsWidget;