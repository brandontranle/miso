import React from "react";
import { useReducer, useState } from "react";
import "../style.css";

interface LoginButtonProps {
  text: string;
  hover: boolean;
  className: string;
  onClick: () => void; // New prop for handling button click
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  text = "Login",
  hover,
  className,
  onClick,
}) => {
  const [showSidebar, setShowSidebar] = useState(false); // State for sidebar visibility

  const [state, dispatch] = useReducer(reducer, {
    hover: hover || false,
  });

  const handleButtonClick = () => {
    if (onClick) {
      onClick(); // Call the provided onClick function if available
    }
    setShowSidebar(!showSidebar); // Toggle the sidebar's state
  };

  return (
    <div
      className={`LOGIN-BUTTON hover-${state.hover} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className="button" onClick={handleButtonClick}>
        <div className="login" style={{ textDecoration: "none" }}>
          {text}
        </div>
      </div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        hover: true,
      };

    case "mouse_leave":
      return {
        ...state,
        hover: false,
      };
  }

  return state;
}

export default LoginButton;
