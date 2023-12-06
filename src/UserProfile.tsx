import React from "react";
import "./style.css";
import "./profile.css";
import profilePicture from "./assets/profile-picture.png";
import { useUserContext } from "./useUserContext";
import { useState, useEffect } from "react";
import TimeZoneDropdown from "./timezone-dropdown-menu";
import axios from "axios";

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useUserContext();
  const region = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(
    "America/Los_Angeles"
  );
  const [kibbles, setKibbles] = useState(0);

  const roundKibbles = (num: number) => {
    setKibbles(Math.round(num));
  };

  const getKibbles = async () => {
    try {
      const userId = sessionStorage.getItem("userId");

      const response = await axios.post("http://localhost:5000/getKibbles", {
        userId: userId,
      });

      roundKibbles(response.data.kibbles);
      console.log("kibbles retrieved");
    } catch (error) {
      console.log(error + " failed to retrieve kibbles");
    }
  };

  useEffect(() => {
    getKibbles();
  }, [isAuthenticated]);

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
          <label className = "my-stats-label">MY ACCOUNT</label>
          <img className="profile-picture" src={profilePicture}></img>
          {user && <h3 id="username"> {user.name} </h3>}
          <label className="profile-row-label">{kibbles} kibbles 🍥</label>
          <div className="horizontal-line"> </div>
          <label className="profile-row-label-about"> About me! </label>
          <label className="profile-bio">
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
