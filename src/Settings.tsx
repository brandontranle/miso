import React from "react";
import "./style.css";
import "./profile.css";
import profilePicture from "./assets/profile-picture.png";
import { useUserContext } from "./useUserContext";
import { useState } from "react";
import TimeZoneDropdown from "./timezone-dropdown-menu";

export const Settings = () => {
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
    <div>
      <div className="input-field">
        <input
          className="input-box"
          type="password"
          placeholder="Password"
          required
        />
        <label className="form-label"> Password </label>
      </div>
      <div className="input-field">
        <input
          className="input-box"
          type="password"
          placeholder="New Password"
          required
        />
        <label className="form-label"> New Password </label>
      </div>
      <TimeZoneDropdown
        handleTimezoneChange={handleTimezoneChange}
        selectedTimezone={selectedTimezone}
      />
    </div>
  );
};

export default Settings;
