import React, { useState } from "react";
import "../style.css";

interface ProfileButtonProps {
  onClick: () => void; // New prop for handling button click
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ onClick }) => {
  const [showSidebar, setShowSidebar] = useState(false); // State for sidebar visibility

  const handleButtonClick = () => {
    if (onClick) {
      onClick(); // Call the provided onClick function if available
    }
    setShowSidebar(!showSidebar); // Toggle the sidebar's state
  };

  return (
    <div className="profile-select" onClick={handleButtonClick}>
      My Profile
    </div>
  );
};

export default ProfileButton;
