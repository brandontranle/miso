import "./TimerWidget.css";
import { useState, useEffect, useRef } from 'react';

export const TimerWidget = ({ handleMinimize, isMinimized }) => {
  let refInstance = useRef(null);
  const [timerOption, setTimerOption] = useState('pomodoro');

  const handleTimerOption = (option) => {
    setTimerOption(option);
  };

  return (
    <div className="timer-widget">
      <div className="widget-header">
        <p className="widget-title">timer</p>
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
          <div className = "timer-options">
             <button onClick={() => handleTimerOption('pomodoro')} className="timer-button">Pomodoro</button>
             <button onClick={() => handleTimerOption('short break')} className="timer-button">Short Break</button>
             <button onClick={() => handleTimerOption('long break')} className="timer-button">Long Break</button>
          </div>
        </div>
      </>
    </div>
  );
};

export default TimerWidget;
