import React from "react";
import "./style.css";

export const UserProfile: React.FC = () => {
  return (
    <div className="side-bar-container">
      <div className="nav-bar-form">
        <button className="row-button-left"> Exit </button>
        <button className="row-button-right"> Settings </button>
      </div>
    </div>
  );
};

export default UserProfile;
