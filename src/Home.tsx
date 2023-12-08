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
import MessagesWidget from "./widgets/MessagesWidget";
import NotesWidget from "./widgets/NotesWidget";
import backgroundImage from "./assets/background.png";
import backgroundGif from "./assets/ghibli.gif";
import backgroundGif2 from "./assets/ghibli2.gif";
import background from "./assets/backgroundd5.gif";
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
import axios from "axios";

import brownCatWalkGif from "./miso/brown_cat/cat01_walk_8fps.gif";
import brownCatSitGif from "./miso/brown_cat/cat01_sit_8fps.gif";
import brownCatAttackGif from "./miso/brown_cat/cat01_attack_12fps.gif";

import pixelBackground from "./miso/backgrounds/pixelbackground1.jpg";

export const Home: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<number[]>([]); // This now tracks multiple widgets
  const [minimizedWidgets, setMinimizedWidgets] = useState<
    Map<number, boolean>
  >(new Map());
  const { user, isAuthenticated } = useUserContext(); // Get the user context

  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [backgroundImage, setBackgroundImage] = useState(background);
  const [misoBackgroundImage, setMisoBackgroundImage] =
    useState(pixelBackground);

  const [misoTexture, setMisoTexture] = useState({
    walk: brownCatWalkGif,
    sit: brownCatSitGif,
    attack: brownCatAttackGif,
  });

  const changeMisoBackgroundImage = (background: string) => {
    setMisoBackgroundImage(background);
  };

  // Function to change the Miso texture
  const changeAllMisoTextures = (newTextures) => {
    setMisoTexture(newTextures);
  };

  const fetchBackground = async () => {
    if (isAuthenticated) {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/getWallpaper",
          {
            userId,
          }
        );

        if (!response.data.wallpaper) {
          setBackgroundImage(background);
        } else {
          handleBackgroundChange(response.data.wallpaper);
        }
        console.log("wallpaper fetched and changed!");
      } catch (error) {
        console.log("error fetching wallpaper");
      }
    }
  };

  const handleBackgroundChange = (newBackgroundImage) => {
    setBackgroundImage(newBackgroundImage);
    console.log("image changed!");
  };

  const [currentContent, setCurrentContent] = useState("userProfile"); // New state for current content

  const handleContentChange = (content: string) => {
    setCurrentContent(content);
    setShowSidebar(true); // Open the sidebar if not already open
  };

  // Call getTimeZone to initialize the timezone state
  useEffect(() => {
    getTimeZone();
  }, [timezone, showSidebar]);

  useEffect(() => {
    fetchBackground();
  }, []);

  const handleTimezoneChange = async () => {
    const newTimezone = getTimeZone();
    if (newTimezone && newTimezone !== timezone) {
      // Update the timezone state when it changes
      setTimezone(newTimezone);
      if (isAuthenticated) {
        //database implemenetation
        try {
          const userId = sessionStorage.getItem("userId");
          const response = await axios.post(
            "http://localhost:5000/changeTimezone",
            {
              userId,
              newTimezone,
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
      localStorage.setItem("timezone", newTimezone);
    }
  };

  useEffect(() => {
    // Listen for changes to the "timezone" state
    console.log("timezone from handletimzone!");
    window.addEventListener("storage", handleTimezoneChange);

    return () => {
      window.removeEventListener("storage", handleTimezoneChange);
    };
  }, [timezone]);

  const getTimeZone = () => {
    //retrieve the timezone from local storage
    const timezone = localStorage.getItem("timezone");
    console.log("timezone!");
    if (timezone) {
      setTimezone(timezone);
    }
    return timezone;
  };

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
    backgroundImage: `url(${backgroundImage})`,
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
            misoTexture={misoTexture}
            misoBackground={misoBackgroundImage}
          />
        );
        break;
      case 2: // Another widget ID
        widgetClass = "hubs-widget";
        WidgetComponent = (
          <HubsWidget
            isMinimized={isMinimized}
            handleMinimize={() => handleWidgetClick(widgetId)}
            setBackgroundImage={handleBackgroundChange}
            setMiso={changeAllMisoTextures}
            setMisoBackgroundImage={changeMisoBackgroundImage}
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
          <SpotifyWidget handleMinimize={() => handleWidgetClick(widgetId)} />
        );
        break;
      case 7:
        widgetClass = "catGPT-widget";
        WidgetComponent = (
          <MessagesWidget
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
      <Draggable
        handle=".widget-drag-handle"
        onStart={(e, data) => {
          const target = e.target as HTMLElement;

          // Check if the target of the click is not a slider
          if (
            target.className.includes("custom-volume-slider") ||
            target.className.includes("notebook") ||
            target.className.includes("item-wrapper")
          ) {
            return false; // returning false will cancel the drag
          }
        }}
      >
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
          <Navbar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            onContentChange={handleContentChange}
          />
        </div>
      </div>
      <div className="MainContainer">
        <div className="MainContent">
          <Clock timezone={timezone} />
          <Weather />
          <Quote />
          {activeWidgets.map(renderWidgetContent)}
        </div>
        <WidgetBar onWidgetClick={handleWidgetClick} />
      </div>
      <div
        className={`backdrop ${showSidebar ? "backdrop-visible" : ""}`}
      ></div>
      <LoginScreen
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        currentContent={currentContent}
      />{" "}
    </div>
  );
};
export default Home;
