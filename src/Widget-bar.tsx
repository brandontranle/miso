import React, { useState } from "react";
import MisoIcon from "./widget-icons/MisoIcon";
import HubsIcon from "./widget-icons/Hubs-Icon";
import TimerIcon from "./widget-icons/Timer-Icon";
import TasksIcon from "./widget-icons/Tasks-Icon";
import SoundsIcon from "./widget-icons/Sounds-Icon";
import SpotifyIcon from "./widget-icons/Spotify-Icon";
import NotesIcon from "./widget-icons/Notes-Icon";
import "./WidgetBar.css"; // Ensure you have the CSS file named WidgetBar.css
import MessagesIcon from "./widget-icons/Messages-Icon";
import ChatIcon from "./widget-icons/Chat-Icon";

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
    { id: 7, icon: <MessagesIcon />, name: "GPA Calculator" },
    { id: 8, icon: <NotesIcon />, name: "Notes" },
    { id: 9, icon: <ChatIcon />, name: "CatGPT"}
    // ... other widget properties
  ];

  return (
    <div className="menu-bar">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className="widget-container"
          onClick={() => onWidgetClick(widget.id)} // Use the prop here
        >
          {widget.icon}
          <p className="widget__name"> {widget.name} </p>
        </div>
      ))}
    </div>
  );
};

export default WidgetBar;
