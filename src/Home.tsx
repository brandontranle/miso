import React from "react";
import Navbar from "./UpperSection";
import LoginScreen from "./Log-In-Screen";
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

export const Home: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<number[]>([]); // This now tracks multiple widgets

  const handleWidgetClick = (widgetId: number) => {
    setActiveWidgets((prevActiveWidgets) => {
      // If already active, deactivate by filtering out, otherwise add to active widgets
      return prevActiveWidgets.includes(widgetId)
        ? prevActiveWidgets.filter((id) => id !== widgetId)
        : [...prevActiveWidgets, widgetId];
    });
  };

  const widgetComponents: { [key: number]: JSX.Element } = {
    1: <MisoWidget />,
    2: <HubsWidget />,
    3: <TimerWidget />,
    4: <TasksWidget />,
    5: <SoundsWidget />,
    6: <SpotifyWidget />,
    7: <CatGPTWidget />,
    8: <NotesWidget />,
    // 2: <OtherWidgetComponent />,
    // ... add other widget components as needed
  };

  const renderWidgetContent = (widgetId: number) => {
    let widgetClass = "";
    let contentComponent = widgetComponents[widgetId] || null; // Default to null if no component is found

    switch (widgetId) {
      case 1: // Assuming 1 is the ID for the Notes widget
        widgetClass = "miso-widget";
        break;
      case 2: // Another widget ID
        widgetClass = "hubs-widget";
        break;
      case 3:
        widgetClass = "timer-widget";
        break;
      case 4:
        widgetClass = "tasks-widget";
        break;
      case 5:
        widgetClass = "sounds-widget";
        break;
      case 6:
        widgetClass = "spotify-widget";
        break;
      case 7:
        widgetClass = "catGPT-widget";
        break;
      case 8:
        widgetClass = "notes-widget";
        break;
      // Add cases for other widgets as needed ~ these are realistically the ones we are doing for the project, but we will delete if necessary!
      default:
        break;
    }

    return (
      <div key={widgetId} className={`widget-window ${widgetClass}`}>
        {/* Render the content based on the widgetId */}
        {contentComponent}
      </div>
    );
  };

  return (
    <div className="page">
      <div className="TopBarContainer">
        <div className="Nav-Bar">
          <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
      </div>
      <div className="MainContainer">
        <div className="MainContent">
          {activeWidgets.map(renderWidgetContent)}
        </div>
        <WidgetBar onWidgetClick={handleWidgetClick} />
      </div>
      <LoginScreen showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};
export default Home;
