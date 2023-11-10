import React, { useState } from "react";
import MisoIcon from "./widget-icons/MisoIcon";
import HubsIcon from "./widget-icons/Hubs-Icon";
import TimerIcon from "./widget-icons/Timer-Icon";
import TasksIcon from "./widget-icons/Tasks-Icon";
import SoundsIcon from "./widget-icons/Sounds-Icon";
import SpotifyIcon from "./widget-icons/Spotify-Icon";
import NotesIcon from "./widget-icons/Notes-Icon";
import "./WidgetBar.css"; // Ensure you have the CSS file named WidgetBar.css

// Define a type for your widget if you have specific properties
type WidgetType = {
  id: number;
  icon: JSX.Element;
  name: string;
  // other properties like name, icon, etc.
};

type WidgetBarProps = {
  onWidgetClick: (id: number) => void;
};

export const WidgetBar: React.FC<WidgetBarProps> = ({ onWidgetClick }) => {
  const [activeWidget, setActiveWidget] = useState<number | null>(null);

  // Define your widgets array with ids or other properties
  const widgets: WidgetType[] = [
    { id: 1, icon: <MisoIcon />, name: "Miso" },
    { id: 2, icon: <HubsIcon />, name: "Hubs" },
    { id: 3, icon: <TimerIcon />, name: "Timer" },
    { id: 4, icon: <TasksIcon />, name: "Tasks" },
    { id: 5, icon: <SoundsIcon />, name: "Sounds" },
    { id: 6, icon: <SpotifyIcon />, name: "Spotify" },
    { id: 7, icon: <MisoIcon />, name: "CatGPT" },
    { id: 8, icon: <NotesIcon />, name: "Notes" },
    // ... other widget properties
  ];

  const handleWidgetClick = (widgetId: number) => {
    // Set the active widget id, or null if it's already active (toggle)
    setActiveWidget(activeWidget === widgetId ? null : widgetId);
  };

  // Function to render the window based on the active widget
  const renderWindow = (widgetId: number) => {
    if (activeWidget === widgetId) {
      return (
        <div className="widget-window">
          {/* Content of the window for the widget */}
          Widget {widgetId} content here
        </div>
      );
    }
    return null;
  };

  return (
    <div className="menu-bar">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className="widget-container"
          onClick={() => onWidgetClick(widget.id)} // Use the prop here
        >
          {widget.icon}
          {widget.name}
        </div>
      ))}
    </div>
  );
};

export default WidgetBar;
