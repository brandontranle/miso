import { useState, useEffect } from "react";
import React, { CSSProperties } from "react";

//brown cat styles
import brownCatWalkGif from "../miso/brown_cat/cat01_walk_8fps.gif";
import brownCatSitGif from "../miso/brown_cat/cat01_sit_8fps.gif";
import brownCatAttackGif from "../miso/brown_cat/cat01_attack_12fps.gif";

//black cat styles
import blackCatWalkGif from "../miso/black_cat/cat05_walk_8fps.gif";
import blackCatSitGif from "../miso/black_cat/cat05_sit_8fps.gif";
import blackCatAttackGif from "../miso/black_cat/cat05_attack_12fps.gif";

//grey cat styles
import greyCatAttackGif from "../miso/grey_cat/cat02_attack_12fps.gif";
import greyCatSitGif from "../miso/grey_cat/cat02_sit_8fps.gif";
import greyCatWalkGif from "../miso/grey_cat/cat02_walk_8fps.gif";

import pixelbackground1 from "../miso/backgrounds/pixelbackground1.jpg";
import pixelbackground2 from "../miso/backgrounds/pixelbackground2.png";
import Tooltip from "../Tooltip";

/*
const actions = {
  SIT: brownCatSitGif,
  WALK: brownCatWalkGif,
  ATTACK: brownCatAttackGif,
};*/

export const MisoWidget = ({
  misoTexture,
  handleMinimize,
  isMinimized,
  misoBackground,
}) => {
  const [misoPosition, setMisoPosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [attacking, setAttacking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // State for showing the tooltip
  const containerWidth = 300; // Width of the widget container
  const misoWidth = 50; // Width of the Miso gif
  const stepSize = 3; // Number of pixels Miso moves per step

  // Now misoTexture contains the textures for all actions
  const [misoAction, setMisoAction] = useState(misoTexture.walk);

  // When misoTexture changes, update the misoAction accordingly
  useEffect(() => {
    setMisoAction(misoTexture.sit); // Or any other default action
    setAttacking(false);
    setDirection(-direction);
  }, [misoTexture]);

  useEffect(() => {
    // Move Miso every 200 milliseconds for a smooth walking animation
    const intervalId = setInterval(moveMiso, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [direction, attacking]);

  useEffect(() => {
    // Randomly trigger attack or sit animations while moving
    if (!attacking) {
      const randomTime = Math.random() * 5000 + 5000; // Random time between 2s to 7s
      console.log(randomTime);
      const timeoutId = setTimeout(() => {
        const randomAction =
          Math.random() < 0.5 ? misoTexture.attack : misoTexture.sit;
        setAttacking(true);
        setMisoAction(randomAction);
        // Reset animation after some time
        setTimeout(() => {
          setMisoAction(misoTexture.walk);
          setAttacking(false);
        }, 4000); // Reset after 4 seconds (adjust this time as needed)
      }, randomTime);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [attacking]);

  const moveMiso = () => {
    if (!attacking) {
      setMisoAction(misoTexture.walk);

      setMisoPosition((prevPosition) => {
        // Calculate new position
        let newPosition = prevPosition + stepSize * direction;

        // Check if Miso hits the boundaries
        if (newPosition >= containerWidth - misoWidth || newPosition < 0) {
          // Change direction if at boundary
          setDirection(-direction);
          // Adjust position to be within boundaries
          newPosition =
            newPosition >= containerWidth - misoWidth
              ? containerWidth - misoWidth
              : 0;
        }

        return newPosition;
      });
    }
  };

  // Style for Miso's position
  const misoStyle: CSSProperties = {
    position: "absolute",
    top: "90%", // Example vertical centering
    left: `${misoPosition}px`,
    height: "70px",
    transform: `translateY(-50%) ${direction === -1 ? "scaleX(-1)" : ""}`, // Flip image when moving left
    transition: "left 200ms linear", // Smooth transition for movement
  };

  /*
 <Tooltip content="This is a tooltip message">
          <button>Hover over me</button>
        </Tooltip>
*/

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
        <div
          className="widget-content"
          style={{
            backgroundImage: `url(${misoBackground})`,
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            src={misoAction}
            className="miso"
            style={misoStyle}
            alt="Miso the cat"
          />
        </div>
      </>
    </div>
  );
};

export default MisoWidget;
