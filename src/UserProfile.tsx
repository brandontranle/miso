import React from "react";
import "./style.css";
import "./profile.css";
import profilePicture from "./assets/profile-picture.png";
import { useUserContext } from "./useUserContext";
import { useState } from "react";
import TimeZoneDropdown from "./timezone-dropdown-menu";

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useUserContext();
  const region = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(
    "America/Los_Angeles"
  );

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimezone(event.target.value);
    localStorage.setItem("timezone", event.target.value);
  };

  return (
    <div className="side-bar-container">
      <div className="nav-bar-form">
        <div className="profile-container">
          <img className="profile-picture" src={profilePicture}></img>
          {user && <h3 id="username"> {user.name} </h3>}
          <label className="profile-row-label">80 kibbles🍥</label>
          <TimeZoneDropdown
            handleTimezoneChange={handleTimezoneChange}
            selectedTimezone={selectedTimezone}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
