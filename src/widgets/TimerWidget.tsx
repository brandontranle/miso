import "./TimerWidget.css";
import { useState, useEffect, useRef } from "react";
import { useUserContext } from "../useUserContext";
import axios from "axios";

const pomodoroTime = 25; // 25 minutes

const longBreakTime = 10; // 20 minutes
const shortBreakTime = 5; //5 minutes
//const breakTime = 2 * 60; // 2 minutes for 120/20 break
const totalCycles = 7;

export const TimerWidget = ({ handleMinimize, isMinimized }) => {
  const [timeLeft, setTimeLeft] = useState(pomodoroTime);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState("pomodoro");
  const [customTime, setCustomTime] = useState(5 * 60); // default 5 minutes
  const [currentCycle, setCurrentCycle] = useState(0);
  const { user, isAuthenticated } = useUserContext();
  const [startClicked, setStartClicked] = useState(false);
  const [cycleCompleted, setCycleCompleted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [selected, setSelected] = useState("");

  const getTimeZone = () => {
    const timezone = localStorage.getItem("timezone");
    return timezone;
  };

  const storeTime = async (time) => {
    const timezone = getTimeZone();

    if (isAuthenticated) {
      try {
        const id = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/storeTimeAndKibbles",
          {
            userId: id,
            time: time,
            timezone: timezone,
          }
        );
      } catch (error) {
        console.error("Error storing time:", error);
      }
    }
  };

  useEffect(() => {
    let interval;

    if (startClicked && currentCycle === 0 && timeLeft === pomodoroTime) {
      setTimeLeft(0);
      setStartClicked(false);
      setCycleCompleted(false);
      return;
    }

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      storeTime(1);
    } else if (timerActive && timeLeft === 0 && !cycleCompleted) {
      setCycleCompleted(true); // Indicate that a cycle has completed
      /*
      const elapsedTime = (Date.now() - sessionStartTime) / 1000; // Convert to seconds
      storeTime(elapsedTime); // Store the elapsed time
      console.log("bro what");
      console.log(elapsedTime);*/
    }

    if (cycleCompleted) {
      setCurrentCycle((prevCycle) => prevCycle + 1);

      setCycleCompleted(false); // Reset for the next cycle

      // Logic to determine the next cycle's state
      // (This can be refactored into a separate function for clarity)

      if (currentCycle + 1 < totalCycles) {
        if ((currentCycle + 1) % 2 !== 0) {
          console.log("study time: " + (currentCycle + 1));
          setTimeLeft(pomodoroTime);
        } else {
          if (currentCycle + 1 === 6) {
            console.log("long break: " + (currentCycle + 1));
            setTimeLeft(longBreakTime);
          } else {
            console.log("short break: " + (currentCycle + 1));
            setTimeLeft(shortBreakTime);
          }
        }
      } else if (currentCycle + 1 >= totalCycles) {
        resetTimer(); // Reset the timer at the end of all cycles
      }
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, cycleCompleted, currentCycle, startClicked]);

  const handleTimerOption = (option) => {
    setTimerMode(option); // Set the timer mode

    switch (option) {
      case "pomodoro":
        setTimeLeft(pomodoroTime);
        break;
      case "shortbreak":
        setTimeLeft(shortBreakTime);
        break;
      case "longbreak":
        setTimeLeft(longBreakTime);
        break;
      default:
        setTimeLeft(pomodoroTime);
    }

    setTimerActive(false); // Stop the timer when changing mode
  };

  const calculateElapsedTime = () => {
    const elapsedTime = (Date.now() - sessionStartTime) / 1000; // Convert to seconds
    return elapsedTime;
  };

  const startTimer = async () => {
    await setTimerActive(true);
    await setStartClicked(true); // Toggle to trigger useEffect
    await setSessionStartTime(Date.now()); // Set the start time for the session

    console.log(startClicked);

    console.log("currentCycle: " + currentCycle);
    console.log(timeLeft);
  };

  const pauseTimer = () => {
    setTimerActive(false);
    //const elapsedTime = (Date.now() - sessionStartTime) / 1000; // Convert to hours
    //storeTime(elapsedTime); // Store the elapsed time
    console.log("here @ pauseTimer");
    //console.log(elapsedTime);
  };

  const resetTimer = () => {
    setTimerActive(false); // Stop the timer
    setCurrentCycle(0);
    setStartClicked(false); // Toggle to trigger useEffect and
    setSessionStartTime(Date.now()); // Set the session start time for the sessions

    switch (timerMode) {
      case "pomodoro":
        setTimeLeft(pomodoroTime);
        break;
      case "shortbreak":
        setTimeLeft(shortBreakTime);
        break;
      case "long break":
        setTimeLeft(longBreakTime);
        break;
      default:
        setTimeLeft(pomodoroTime);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return ` ${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
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
          <div className="timer-container">
            <div className="timer"> {formatTime()} </div>
            <div className="paw">
              {timerActive ? (
                <svg
                  fill="green"
                  viewBox="0 0 256 256"
                  id="Flat"
                  height="35px"
                  width="35px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M189.02051,145.33984A31.35052,31.35052,0,0,1,174.0918,126.606a47.99847,47.99847,0,0,0-92.18262-.00635,31.35,31.35,0,0,1-14.92969,18.74023,44.00739,44.00739,0,0,0,38.11719,79.21094,60.16331,60.16331,0,0,1,45.80664,0,44.00678,44.00678,0,0,0,38.11719-79.21094ZM168,204a19.86485,19.86485,0,0,1-7.80078-1.57568c-.04395-.019-.08887-.0376-.13379-.05616a84.02637,84.02637,0,0,0-64.13086,0c-.04492.01856-.08984.03711-.13379.05616a20.00673,20.00673,0,0,1-17.31445-36.02246c.03515-.01954.07129-.03907.10644-.05909A55.21137,55.21137,0,0,0,104.957,133.29541a23.99908,23.99908,0,0,1,46.08887.00439,55.20367,55.20367,0,0,0,26.36133,33.043c.03515.02.07129.03955.10644.05909A20.00364,20.00364,0,0,1,168,204Zm64-100a24,24,0,1,1-24-24A23.99994,23.99994,0,0,1,232,104ZM48,128a24,24,0,1,1,24-24A23.99994,23.99994,0,0,1,48,128ZM72,56A24,24,0,1,1,96,80,23.99994,23.99994,0,0,1,72,56Zm64,0a24,24,0,1,1,24,24A23.99994,23.99994,0,0,1,136,56Z"></path>{" "}
                  </g>
                </svg>
              ) : (
                <svg
                  fill="darkred"
                  viewBox="0 0 256 256"
                  height="35px"
                  width="35px"
                  id="Flat"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M189.02051,145.33984A31.35052,31.35052,0,0,1,174.0918,126.606a47.99847,47.99847,0,0,0-92.18262-.00635,31.35,31.35,0,0,1-14.92969,18.74023,44.00739,44.00739,0,0,0,38.11719,79.21094,60.16331,60.16331,0,0,1,45.80664,0,44.00678,44.00678,0,0,0,38.11719-79.21094ZM168,204a19.86485,19.86485,0,0,1-7.80078-1.57568c-.04395-.019-.08887-.0376-.13379-.05616a84.02637,84.02637,0,0,0-64.13086,0c-.04492.01856-.08984.03711-.13379.05616a20.00673,20.00673,0,0,1-17.31445-36.02246c.03515-.01954.07129-.03907.10644-.05909A55.21137,55.21137,0,0,0,104.957,133.29541a23.99908,23.99908,0,0,1,46.08887.00439,55.20367,55.20367,0,0,0,26.36133,33.043c.03515.02.07129.03955.10644.05909A20.00364,20.00364,0,0,1,168,204Zm64-100a24,24,0,1,1-24-24A23.99994,23.99994,0,0,1,232,104ZM48,128a24,24,0,1,1,24-24A23.99994,23.99994,0,0,1,48,128ZM72,56A24,24,0,1,1,96,80,23.99994,23.99994,0,0,1,72,56Zm64,0a24,24,0,1,1,24,24A23.99994,23.99994,0,0,1,136,56Z"></path>{" "}
                  </g>
                </svg>
              )}
            </div>

            <div className="status-configuration-buttons">
              <button
                className="timer-status-button"
                onClick={timerActive ? pauseTimer : startTimer}
              >
                {timerActive ? (
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M8 5V19M16 5V19"
                        stroke="#4e4e4e"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    height="30px"
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
                        stroke="#4e4e4e"
                        stroke-width="2"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                )}
              </button>
              <button className="reset-button" onClick={resetTimer}>
                {" "}
                <svg
                  fill="#4e4e4e"
                  height="30px"
                  width="30px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M511.919,254.169c0.034-0.557,0.054-1.117,0.045-1.684c-0.267-16.54-2.36-32.991-6.211-48.952 c-2.894-11.954-14.937-19.233-26.847-16.406c-11.954,2.872-19.3,14.893-16.429,26.847c3.094,12.755,4.764,25.956,4.964,39.201 c0.007,0.505,0.038,1.004,0.078,1.5c-0.026,0.438-0.042,0.878-0.042,1.323c0,98.364-79.723,178.087-178.087,178.087 c-95.187,0-172.913-74.656-177.836-168.615l28.53,28.53c8.693,8.693,22.788,8.693,31.482,0c8.693-8.693,8.693-22.788,0-31.482 l-66.783-66.783c-8.693-8.693-22.788-8.693-31.482,0L6.52,262.518c-8.693,8.693-8.693,22.788,0,31.482 c8.693,8.693,22.788,8.693,31.482,0l28.978-28.978c4.736,118.767,102.482,213.585,222.411,213.585 C412.344,478.606,512,378.951,512,255.998C512,255.381,511.968,254.773,511.919,254.169z"></path>{" "}
                          <path d="M399.48,116.004c10.396,8.17,19.857,17.497,28.138,27.693c4.385,5.409,10.819,8.237,17.297,8.237 c4.92,0,9.862-1.625,14.002-4.986c9.55-7.724,11.019-21.749,3.25-31.299c-10.351-12.778-22.194-24.42-35.172-34.638 c-9.683-7.613-23.663-5.944-31.254,3.74C388.149,94.411,389.797,108.39,399.48,116.004z"></path>{" "}
                          <path d="M289.4,77.915c13.245,0,26.468,1.447,39.246,4.341c1.67,0.356,3.295,0.534,4.92,0.534 c10.173,0,19.367-7.012,21.704-17.363c2.694-11.999-4.831-23.908-16.829-26.624c-16.006-3.584-32.501-5.409-49.041-5.409 c-12.31,0-22.261,9.973-22.261,22.261S277.09,77.915,289.4,77.915z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </button>
            </div>
          </div>

          <div className="timer-options">
            <button
              onClick={() => handleTimerOption("pomodoro")}
              className={`timer-button ${
                timerMode === "pomodoro" ? "selected" : ""
              }`}
            >
              Pomodoro
            </button>
            <button
              onClick={() => handleTimerOption("shortbreak")}
              className={`timer-button ${
                timerMode === "shortbreak" ? "selected" : ""
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => handleTimerOption("longbreak")}
              className={`timer-button ${
                timerMode === "longbreak" ? "selected" : ""
              }`}
            >
              Long Break
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default TimerWidget;
