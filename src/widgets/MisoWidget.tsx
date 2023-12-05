import { useState } from "react";

/* 
Instruction:
Pass a function from the home component that makes thee widget window display to none


*/

export const MisoWidget = ({ handleMinimize, isMinimized }) => {
  return (
    <div className="miso-widget">
      <div className="widget-header">
        <p className="widget-title">Miso</p>
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
          <p>This is the miso widget!</p>
        </div>
      </>
    </div>
  );
};

export default MisoWidget;
