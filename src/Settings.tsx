import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import "./profile.css";
import "./Settings.css";
import TimeZoneDropdown from "./timezone-dropdown-menu";
import { useUserContext } from "./useUserContext";
import { useTheme } from "./ThemeContext";
import { useVisibility } from "./VisibilityContext";

export const Settings = () => {
  const {
    showWeather,
    setShowWeather,
    showClock,
    setShowClock,
    showQuote,
    setShowQuote,
  } = useVisibility();

  const { user, isAuthenticated } = useUserContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(
    "America/Los_Angeles"
  );
  const [message, setMessage] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const changePassword = async () => {
    if (newPassword.length < 8) {
      setMessage("Please enter a password with more than 7 characters");
      return;
    }
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.post(
        "http://localhost:5000/changePassword",
        {
          userId: userId,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }
      );
      // Handle response or success notification here
      console.log("Password changed successfully");
      setMessage(response.data.message);
    } catch (error) {
      console.log("Password not changed, error:", error);
    }
  };

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
    localStorage.setItem("timezone", event.target.value);
  };

  return (
    <div className="setting-container">
      <label className="header-label-settings">SETTINGS</label>
      <div
        className={`message ${
          message === "Password updated!" || message === "Email updated!"
            ? "success"
            : ""
        }`}
      >
        {message}
      </div>
      <label className="left-aligned-section-label">Account Info</label>
      {/* Current Password Field */}
      <div className="input-field">
        <input
          className="input-box"
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          required
        />
        <label className="form-label">Current Password</label>
      </div>
      {/* New Password Field */}
      <div className="input-field">
        <input
          className="input-box"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />
        <label className="form-label">New Password</label>
      </div>
      {/* Submit Button */}
      <button className="submit-button" onClick={changePassword}>
        Change Password
      </button>
      <label className="left-aligned-section-label">Region</label>
      {/* Time Zone Dropdown */}
      <TimeZoneDropdown
        handleTimezoneChange={handleTimezoneChange}
        selectedTimezone={selectedTimezone}
      />
      <label className="left-aligned-section-label"> Appearance </label>
      <div className="option">
        <p className="left-aligned-paragraph"> Weather: </p>
        <label className="switch">
          <input
            type="checkbox"
            checked={showWeather}
            onChange={() => setShowWeather(!showWeather)}
          />
          <span className="slider"> </span>
        </label>
      </div>
      <div className="option">
        <p className="left-aligned-paragraph"> Date/Time: </p>
        <label className="switch">
          <input
            type="checkbox"
            checked={showClock}
            onChange={() => setShowClock(!showClock)}
          />{" "}
          <span className="slider"> </span>
        </label>
      </div>
      <div className="option">
        <p className="left-aligned-paragraph"> Daily Quote: </p>
        <label className="switch">
          <input
            type="checkbox"
            checked={showQuote}
            onChange={() => setShowQuote(!showQuote)}
          />
          <span className="slider"> </span>
        </label>
      </div>
    </div>
  );
};

export default Settings;

/*
<p className="left-aligned-paragraph">
        Please give thanks to the amazing engineers that pioneered this
        application into a reality! <br />
        <br />
        Brandon Le, Hannah Truong, Alicia Filomeno, Tingyu Gong, Ivan Lin
      </p>
*/
