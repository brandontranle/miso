import React from "react";
import "./style.css";
import "./profile.css";
import profilePicture from "./assets/profile-picture.png";
import { useUserContext } from "./useUserContext";
import { useState } from "react";

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useUserContext();
  const region = useState("");

  return (
    <div className="side-bar-container">
      <button className="row-button-right"> Settings </button>
      <div className="nav-bar-form">
        <div className="profile-container">
          <img className="profile-picture" src={profilePicture}></img>
          {user && <h3 id="username"> {user.name} </h3>}
          <label className="profile-row-label">80 kibbles🍥</label>

          <label className="profile-row-label">
            Region:
            <select>
              <option></option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
