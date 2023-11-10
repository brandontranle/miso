import { useState } from "react";

/* 
Instruction:
Pass a function from the home component that makes thee widget window display to none


*/

export const MisoWidget = ({ handleMinimize }) => {
  return (
    <div className="miso-widget">
      <div className="widget-header">
        <p className="widget-title">miso</p>
        <button
          className="minimize-symbol"
          onClick={() => handleMinimize()}
        ></button>
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
