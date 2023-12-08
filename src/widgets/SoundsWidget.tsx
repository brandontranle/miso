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
        <p className="widget-title">Sounds</p>
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
        <div className="container">
          <div className="volume-slider">
          <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 611.999 611.999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M216.02,611.195c5.978,3.178,12.284-3.704,8.624-9.4c-19.866-30.919-38.678-82.947-8.706-149.952 c49.982-111.737,80.396-169.609,80.396-169.609s16.177,67.536,60.029,127.585c42.205,57.793,65.306,130.478,28.064,191.029 c-3.495,5.683,2.668,12.388,8.607,9.349c46.1-23.582,97.806-70.885,103.64-165.017c2.151-28.764-1.075-69.034-17.206-119.851 c-20.741-64.406-46.239-94.459-60.992-107.365c-4.413-3.861-11.276-0.439-10.914,5.413c4.299,69.494-21.845,87.129-36.726,47.386 c-5.943-15.874-9.409-43.33-9.409-76.766c0-55.665-16.15-112.967-51.755-159.531c-9.259-12.109-20.093-23.424-32.523-33.073 c-4.5-3.494-11.023,0.018-10.611,5.7c2.734,37.736,0.257,145.885-94.624,275.089c-86.029,119.851-52.693,211.896-40.864,236.826 C153.666,566.767,185.212,594.814,216.02,611.195z"></path> </g> </g></svg>
          <input
            type="range"
            className = "custom-volume-slider"
            id="campfireVolume"
            min="0"
            max="1"
            step="0.1"
            value={campfireVolume}
            onChange={adjustVolume(setCampfireVolume)}
            style={{
              background: `linear-gradient(to right, #333 ${campfireVolume * 100}%, transparent 0%)`,
            }}
          />
          </div>
          
          <div className="volume-slider">
<svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489 489"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(0 -540.36)"> <g> <g> <path d="M163.4,897.91c-3.3,0.1-6.4,1.7-8.2,4.4c-5.1,7.4-21.6,32.6-21.6,46.1c0,16.9,13.4,30.6,29.8,30.6 c16.9,0,30.6-13.8,30.6-30.6c0-13.6-17.1-38.9-22.4-46.3C169.8,899.41,166.7,897.91,163.4,897.91z M163.4,958.91 c-5.3,0-9.8-4.8-9.8-10.6c0-3.1,4.2-12.1,10-22h0c6,9.9,10.4,18.9,10.4,22C174,954.21,169.3,958.91,163.4,958.91z"></path> <polygon points="163.4,979.01 163.4,979.01 163.4,979.01 "></polygon> <path d="M326.7,897.91h-0.1c-3.3,0-6.3,1.6-8.2,4.2c-5.2,7.4-22.4,32.7-22.4,46.3c0,16.9,13.7,30.6,30.6,30.6 c16.4,0,29.8-13.8,29.9-30.6c0-13.5-16.5-38.7-21.6-46.1C333,899.61,330,897.91,326.7,897.91z M326.6,958.91 c-6,0-10.6-4.6-10.6-10.6c0-3.1,4.4-12.1,10.4-22c5.8,9.9,10,18.9,10,22C336.4,954.01,331.9,958.91,326.6,958.91z"></path> <path d="M245,938.41c-3.3,0-6.3,1.6-8.2,4.3c-6.8,9.8-22.4,33.7-22.4,46.2c0,16.9,13.7,30.6,30.6,30.6 c16.9,0,30.6-13.8,30.6-30.6c0-12.5-15.7-36.5-22.4-46.2C251.4,940.01,248.3,938.41,245,938.41z M245,999.51 c-6,0-10.6-4.7-10.6-10.6c0.2-3.1,4.6-12.1,10.6-22.1c6,10,10.4,18.9,10.6,22.1C255.6,994.81,250.9,999.51,245,999.51z"></path> <path d="M367,622.81L367,622.81c-10.4,0-20.6,1.3-30.4,3.8c-8.4-20.6-22.6-39-40.7-52.4c-21.2-15.7-46.3-24-72.5-24 c-44.5,0-85.6,25.2-107.1,64.9c-8.1-2.4-16.7-3.7-24.7-3.7c-50.5,0-91.6,41.2-91.6,91.8s41.1,91.8,91.6,91.8h54.2 c9.1,41,45.7,71.8,89.4,71.8H367c67.3,0,122-54.9,122-122.3C489,677.31,434.3,622.81,367,622.81z M143.6,774.81h-52 c-39.5,0-71.6-32.2-71.6-71.7v0c0-39.6,32.1-71.8,71.6-71.8c8.3,0,17.7,1.9,25.9,5.3c5,2.1,10.7-0.2,13-5.1 c16.8-37.3,53.4-61.4,93-61.4c40.9,0,78.5,25.5,94.2,62.9c-24.6,10.8-45.2,29.6-58,53.9c-7.8-2.1-15.9-3.1-24.5-3.1 c-24.4,0-47.4,9.4-64.7,26.5C153.2,727.41,143.6,750.31,143.6,774.81z M367,846.61L367,846.61l-131.9,0 c-39.5,0-71.6-32.2-71.6-71.8c0-39.1,32.1-71,71.6-71c9.4,0,18,1.5,26.1,4.7c5,1.9,10.6-0.4,12.8-5.4 c15.9-36.7,52.4-60.4,93-60.4c56.3,0,102,45.6,102,101.6C469,800.71,423.2,846.61,367,846.61z"></path> </g> </g> </g> </g></svg>          <input
            type="range"
            className = "custom-volume-slider"
            id="rainVolume"
            min="0"
            max="1"
            step="0.1"
            value={rainVolume}
            onChange={adjustVolume(setRainVolume)}
            style={{
              background: `linear-gradient(to right, #333 ${rainVolume * 100}%, transparent 0%)`,
            }}
          />
          </div>
          <div className="volume-slider">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" height="20px" width="20px"fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M432.3 28.66c-13.4 0-26.6 6.43-40.5 19.98-4 3.94-7.8 8.06-11.6 12.12 3.7 5.59 6.1 12.64 7.7 18.46 5.6-6.15 11.1-12.41 16.5-17.76 10.1-9.98 19.1-15.59 26.9-14.66 16.1 1.9 23.7 6.55 29.6 12.81 5.9 6.26 10.1 15.12 16.4 25.18l15.2-9.58c-5.5-8.82-10-18.95-18.5-28.01-14.6-12.13-28.3-18.55-41.7-18.54zM113.7 45.63c-53.35.23-77.7 17.56-95.66 35.88l12.86 12.6c17.42-17.77 35.03-31.75 90-30.32l34.5 32.52h15c-.2-8.94-7.8-17.4-12.6-22.5-14.9-16.14-24.1-28.22-44.1-28.18zm146.7 9.79c-10.1 0-20.2.21-29.6.57 3.8 8.38 5.6 17.38 6.6 24.88 1 11.64-15.6 12.34-17.8 2.42-1.2-8.61-4.6-19.79-8.9-26.23-15.2 1-28.9 2.35-40.3 3.73 7.3 8.95 18 21.8 18 31.02.5 89.69-2.8 180.09-9.7 270.89 1.6-1.7 3.2-3.4 4.9-4.9 8.4-7.6 18.4-13.7 30-13h.1c2.6.2 5.1.7 7.5 1.4.2-16.6.6-30.9.1-44.4 5.3 5.6 10.7 10 18-.6.7 17.6-.1 35.5-.3 56.9 1.1 1.1 2 2.2 3 3.3 7.4 8.6 13.4 19.2 18.4 29.6 1.8 3.8 3.4 7.5 4.9 11.1 1.3-56.5.5-112.9-2.2-169.4 8.6 11.3 13.3 7 18-.8 2.7 56.6 3.5 113.3 2.2 169.9 11.4-11.3 25.1-22.9 41.6-22.6 4.1.1 7.8 1 11.2 2.5l.1-23.9c7.9 8.9 13.4 6.9 18 0L354 396c3.5 3.6 6.9 7.9 9.8 11.7 3.9-2 8.9-4.4 14.9-7l-5.7-73.9c6 5.5 12 10 18-1.4l5.3 68.5c6.6-2.3 13.5-4.2 20.4-5-11.2-93.4-25.2-192-44.3-296.39h.1c-1.4-7.39-3.3-14.6-5.9-19.56-2.5-4.95-5-7.23-8.7-8.07-18.2-4.12-37.7-6.65-57.3-8.04 8.6 17.14 8.4 34.97 8.6 49.66 1.1 10.8-17.2 17-18 .2-.3-18.71.2-35.46-12.7-50.98-6-.2-12-.29-18.1-.3zm90.8 31.52C362.6 130.7 371.8 206.4 378.3 251c-.9 17.6-14.2 13.4-17.8 2.6-6.5-45-16.1-121.1-26.7-162.09 9.9 7.7 16 6.9 17.4-4.57zM224 107c3.5 55 2.4 109.1-.7 162.5.2 11-15.3 14.1-18-1 3.1-53 4.2-106.3.7-160.3 8.9 13.3 14.2 9.3 18-1.2zm51.5 22.5c3.2 27.5 4.3 42.9 3.9 59.9-6.4 9.5-12.3 7.9-18-.4.4-16-.7-30.2-3.7-57.5 7 8.6 12.8 6.6 17.8-2zm52.3 27.2c3.4 50.7 4.3 90 5.6 154.8-5 5.4-9.8 11.7-18 .4-1.3-64.8-2.2-103.7-5.6-154 7.5 9.3 13.1 6 18-1.2zm-246 180.8c-10.73-.3-16.16 18.9-13.38 29.3 3.68 13.8 34.78 24.8 34.78 24.8s-2-53.6-21.4-54.1zm47.4-.4c-.8.6-1.3 1.4-1.7 2.3-4.2 9.9 22.6 23.1 22.6 23.1s5.9-17.4.6-22.8c-4.7-4.8-16.6-7-21.5-2.6zm319.5-3.8c-.5 0-.9 0-1.3.1-11.7 2.2-13.9 23.8-8.3 34.9 0 0 18.8-9.1 19.8-18 .8-6.3-4-16.8-10.2-17zm29.8 20.5c-20.3 1.1-16.8 58.6-16.8 58.6s27.7-10.5 31.2-22.9c3.5-12.3-1.6-36.4-14.4-35.7zm-282.8 17.3c-6.5 5.9-13 14.6-18.7 23.5-11.2 17.8-18.8 36-18.8 36l-3.6 8.7c-22-11.1-36.9-16.8-57.82-17.6-13.41-.5-24.76 11.5-27.43 22.4-1.41 6.4 0 14.3 9.09 25.6 120.56 14.8 310.86 21.1 411.06.4 3.5-16.4-2.3-27.7-13-37.9-11.7-11.3-29.8-19.6-45-24.5-7.3-2.4-24.9 1.2-39.4 6.9-14.6 5.8-26.4 12.5-26.4 12.5l-7.4 4.2-4.6-7s-4.8-7.3-11.3-14.4c-6.6-7.1-15.5-12.7-17.7-12.7-6.6-.1-20.7 9.2-31.5 20.3-10.7 11-18.6 22.2-18.6 22.2l-11 15.5-5.1-18.3s-5.3-19.1-14.4-38.1c-4.5-9.6-10-19-15.7-25.7-12.7-13.4-20.3-13-32.7-2zM35.58 384c-4.27-.1-7.98 1.2-9.85 4.5-8.27 14.4 30.78 39.3 30.78 39.3s6.88-26.5-.99-35.3c-4.19-4.6-12.83-8.4-19.94-8.5z"></path></g></svg>
          <input
            type="range"
            className = "custom-volume-slider"
            id="waterfallVolume"
            min="0"
            max="1"
            step="0.1"
            value={waterfallVolume}
            style={{
              background: `linear-gradient(to right, #333 ${waterfallVolume * 100}%, transparent 0%)`,
            }}
            onChange={adjustVolume(setWaterfallVolume)}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundsWidget;