import "./hubs.css"
import {useState} from "react";
import ImageButton from "./ImageButton"
import background1 from "../assets/background.png"
import background2 from "../assets/ghibli.gif"
import background3 from "../assets/ghibli2.gif"


interface HubsWidgetProps {
  setBackgroundImage: (image: string) => void;
  handleMinimize: () => void;
  isMinimized: boolean;
}

export const HubsWidget = ({ handleMinimize, isMinimized, setBackgroundImage, setMiso }) => {
  const [background, setBackground] = useState();


  const changeBackground = (newBackground: string) => {
    setBackgroundImage(newBackground);
  };

  const changeMiso = (newMiso: string) => {
    setMiso(newMiso);

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
              <ImageButton imageUrl={background1} onClick={() => changeBackground(background1)}/>
              <ImageButton imageUrl={background2} onClick={() => changeBackground(background2)}/>
              <ImageButton imageUrl={background3} onClick={() => changeBackground(background3)}/>


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
              <ImageButton imageUrl={""} onClick={() => changeBackground("")}/>
              <ImageButton imageUrl={""} onClick={() => changeBackground("")}/>
              <ImageButton imageUrl={""} onClick={() => changeBackground("")}/>


            </div>

            </div>
        </div>
      </>
    </div>
  );
};

export default HubsWidget;
