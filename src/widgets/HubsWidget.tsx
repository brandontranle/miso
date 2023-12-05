import "./hubs.css"
import {useState} from "react";
import ImageButton from "./ImageButton"


export const HubsWidget = ({ handleMinimize, isMinimized }) => {
  const [background, setBackground] = useState();


  const handleOnCick = async () => {


  }


  return (
    <div className="hubs-widget">
      <div className="widget-header">
        <p className="widget-title">Hubs</p>
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
          <div className="hubs-bg-container">
          <div className="left-container"> 

            <label> Background </label>
            </div>
            <div className="row-selections">
              <ImageButton imageUrl={""} onClick={handleOnCick}/>
              <ImageButton imageUrl={""} onClick={handleOnCick}/>
              <ImageButton imageUrl={""} onClick={handleOnCick}/>


            </div>
            <div className="left-container"> 
            <button className="bottom-button"> Choose File </button>
            </div>
          </div>
          <div className="vertical-line"></div>
            <div className="hubs-miso-container">
            <div className="left-container"> 

              <label> Miso </label>
              </div>
              <div className="row-selections">
              <ImageButton imageUrl={""} onClick={handleOnCick}/>
              <ImageButton imageUrl={""} onClick={handleOnCick}/>
              <ImageButton imageUrl={""} onClick={handleOnCick}/>


            </div>

            </div>
        </div>
      </>
    </div>
  );
};

export default HubsWidget;
