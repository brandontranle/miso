import { useState, useEffect } from "react";
import React, { CSSProperties } from 'react';
import brownCatWalkGif from "../miso/brown_cat/cat01_walk_8fps.gif"
import brownCatRunGif from "../miso/brown_cat/cat01_run_12fps.gif"
import brownCatSitGif from "../miso/brown_cat/cat01_sit_8fps.gif"
import brownCatAttackGif from "../miso/brown_cat/cat01_attack_12fps.gif"
import pixelbackground1 from "../miso/backgrounds/pixelbackground1.jpg"
import pixelbackground2 from "../miso/backgrounds/pixelbackground2.png"
import Tooltip from "../Tooltip";





const actions = {
  SIT: brownCatSitGif,
  WALK: brownCatWalkGif,
  RUN: brownCatRunGif,
  ATTACK: brownCatAttackGif
};


export const MisoWidget = ({ handleMinimize, isMinimized }) => {
  const [misoAction, setMisoAction] = useState(actions.SIT);
  const [misoPosition, setMisoPosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [attacking, setAttacking] = useState(false);  
  const [showTooltip, setShowTooltip] = useState(false); // State for showing the tooltip
  const containerWidth = 300; // Width of the widget container
  const misoWidth = 50; // Width of the Miso gif
  const stepSize = 3; // Number of pixels Miso moves per step



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
        console.log(randomTime)
        const timeoutId = setTimeout(() => {
          const randomAction = Math.random() < 0.5 ? actions.ATTACK : actions.SIT;
          setAttacking(true)
          setMisoAction(randomAction);
          // Reset animation after some time
          setTimeout(() => {
            setMisoAction(actions.WALK);
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
        setMisoAction(actions.WALK);
      
        setMisoPosition(prevPosition => {
          // Calculate new position
          let newPosition = prevPosition + stepSize * direction;
  
          // Check if Miso hits the boundaries
          if (newPosition >= containerWidth - misoWidth || newPosition < 0) {
            // Change direction if at boundary
            setDirection(-direction);
            // Adjust position to be within boundaries
            newPosition = newPosition >= containerWidth - misoWidth
                          ? containerWidth - misoWidth
                          : 0;
          }
          
          return newPosition;
          
        });
      }
      };
  
  
    // Style for Miso's position
    const misoStyle:CSSProperties = {
      position: 'absolute',
      top: '90%', // Example vertical centering
      left: `${misoPosition}px`,
      height: "70px", 
      transform: `translateY(-50%) ${direction === -1 ? 'scaleX(-1)' : ''}`, // Flip image when moving left
      transition: 'left 200ms linear' // Smooth transition for movement
    };

   

   
  
   

  return (
    <div className="miso-widget">
      <div className="widget-header">
        <p className="widget-title">Miso</p>
        <Tooltip content="This is a tooltip message">
        <button>Hover over me</button>
      </Tooltip>
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
        <div className="widget-content" style={{ backgroundImage: `url(${pixelbackground2})`, backgroundPosition:"bottom", backgroundRepeat: "no-repeat"  }}>        
        <img src={misoAction} className="miso"style={misoStyle} alt="Miso the cat"  />
        </div>
      </>
    </div>
  );
};

export default MisoWidget;
