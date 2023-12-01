import { useEffect } from "react";
import react from "react";
import Navbar from "./UpperSection";
import LoginScreen from "./forms/Log-In-Screen";
import WidgetBar from "./Widget-bar";
import { useState } from "react";
import "./style.css";
import MisoWidget from "./widgets/MisoWidget";
import HubsWidget from "./widgets/HubsWidget";
import TimerWidget from "./widgets/TimerWidget";
import TasksWidget from "./widgets/TasksWidget";
import SoundsWidget from "./widgets/SoundsWidget";
import SpotifyWidget from "./widgets/SpotifyWidget";
import CatGPTWidget from "./widgets/CatGPTWidget";
import NotesWidget from "./widgets/NotesWidget";
import backgroundImage from "./assets/background.png";
import backgroundGif from "./assets/ghibli.gif";
import backgroundGif2 from "./assets/ghibli2.gif";
import Clock from "./home-features/clock";
import Date from "./home-features/date";
import Weather from "./home-features/weather";
import Quote from "./home-features/quote";
import { useUserContext } from "./useUserContext"; // Import the user context
import "./features.css";

import Draggable, { DraggableCore } from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Import the CSS for resizable
import "./resizable.css";

export const Home: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<number[]>([]); // This now tracks multiple widgets
  const [minimizedWidgets, setMinimizedWidgets] = useState<
    Map<number, boolean>
  >(new Map());

  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0);

  const toggleMinimize = (widgetId: number) => {
    setMinimizedWidgets((prev) =>
      new Map(prev).set(widgetId, !prev.get(widgetId))
    );

    setActiveWidgets((prevActiveWidgets) =>
      prevActiveWidgets.filter((id) => id !== widgetId)
    );

    console.log("Deactivated widget", widgetId);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundGif})`,
    backgroundSize: "cover", // Optional: Scale the background image to cover the entire container
    backgroundRepeat: "no-repeat", // Optional: Prevent background image from repeating
    backgroundPosition: "center center", // Optional: Center the background image
  };

  const handleWidgetClick = async (widgetId: number) => {
    // Update the active widgets state
    if (activeWidgets.includes(widgetId)) {
      // If already active, deactivate by filtering out
      /*await setActiveWidgets((prevActiveWidgets) =>
        prevActiveWidgets.filter((id) => id !== widgetId)
      );*/

      await setMinimizedWidgets((prev) =>
        new Map(prev).set(widgetId, !prev.get(widgetId))
      );

      console.log("Deactivated widget", widgetId);
      return;
    }

    console.log("Activated widget", widgetId);

    /* first time click launch*/

    setActiveWidgets((prevActiveWidgets) => [...prevActiveWidgets, widgetId]);
    setMinimizedWidgets((prev) => new Map(prev).set(widgetId, false));
    return;
  };
  /*
  const widgetComponents: { [key: number]: JSX.Element } = {
    1: <MisoWidget handleMinimize={() => toggleMinimize(1)} />,
    2: <HubsWidget />,
    3: <TimerWidget />,
    4: <TasksWidget />,
    5: <SoundsWidget />,
    6: <SpotifyWidget />,
    7: <CatGPTWidget />,
    8: <NotesWidget />,
    // 2: <OtherWidgetComponent />,
    // ... add other widget components as needed
  };*/

  const renderWidgetContent = (widgetId: number) => {
    let widgetClass = "";
    //let contentComponent = widgetComponents[widgetId] || null; // Default to null if no component is found
    let WidgetComponent: JSX.Element | null = null;
    const isMinimized = minimizedWidgets.get(widgetId) || false;

    switch (widgetId) {
      case 1: // Assuming 1 is the ID for the Notes widget
        widgetClass = "miso-widget";
        WidgetComponent = (
          <MisoWidget
            isMinimized={isMinimized}
            handleMinimize={() => handleWidgetClick(widgetId)}
          />
        );
        break;
      case 2: // Another widget ID
        widgetClass = "hubs-widget";
        WidgetComponent = (
          <HubsWidget
            isMinimized={isMinimized}
            handleMinimize={() => handleWidgetClick(widgetId)}
          />
        );
        break;
      case 3:
        widgetClass = "timer-widget";
        WidgetComponent = (
          <TimerWidget
            isMinimized={isMinimized}
            handleMinimize={() => handleWidgetClick(widgetId)}
          />
        );
        break;
      case 4:
        widgetClass = "tasks-widget";
        WidgetComponent = (
          <TasksWidget
            isMinimized={isMinimized}
            handleMinimize={() => handleWidgetClick(widgetId)}
          />
        );
        break;
      case 5:
        widgetClass = "sounds-widget";
        WidgetComponent = (
          <SoundsWidget
            isMinimized={isMinimized}
            handleMinimize={() => handleWidgetClick(widgetId)}
          />
        );
        break;
      case 6:
        widgetClass = "spotify-widget";
        WidgetComponent = (
          <SpotifyWidget
            isMinimized={isMinimized}
            handleMinimize={() => handleWidgetClick(widgetId)}
          />
        );
        break;
      case 7:
        widgetClass = "catGPT-widget";
        WidgetComponent = (
          <CatGPTWidget
            isMinimized={isMinimized}
            handleMinimize={() => handleWidgetClick(widgetId)}
          />
        );
        break;
      case 8:
        widgetClass = "notes-widget";
        WidgetComponent = (
          <NotesWidget
            isMinimized={isMinimized}
            handleMinimize={() => handleWidgetClick(widgetId)}
          />
        );
        break;
      // Add cases for other widgets as needed ~ these are realistically the ones we are doing for the project, but we will delete if necessary!
      default:
        break;
    }

    return (
      <Draggable handle=".widget-drag-handle">
        <div
          key={widgetId}
          className={`widget-window ${widgetClass} ${
            isMinimized ? "minimized" : ""
          }`}
        >
          <div className="widget-drag-handle">
            {/* Render the content based on the widgetId */}
            {WidgetComponent}
          </div>
        </div>
      </Draggable>
    );
  };

  return (
    <div className="page" style={backgroundImageStyle}>
      <div className="TopBarContainer">
        <div className="Nav-Bar">
          <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
      </div>
      <div className="MainContainer">
        <div className="MainContent">
          <Clock />
          <Date />
          <Weather />
          {activeWidgets.map(renderWidgetContent)}
        </div>
        <WidgetBar onWidgetClick={handleWidgetClick} />
      </div>
      <div
        className={`backdrop ${showSidebar ? "backdrop-visible" : ""}`}
      ></div>
      <LoginScreen showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};
export default Home;
