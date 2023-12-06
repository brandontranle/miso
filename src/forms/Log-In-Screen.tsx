import React, { useState } from "react";
import "../style.css";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useUserContext } from "../useUserContext"; // Import the user context
import UserProfile from "../UserProfile";

interface LoginScreenProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
  currentContent: string;
}

enum FormType {
  Login,
  SignUp,
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  showSidebar,
  setShowSidebar,
  currentContent,
}) => {
  const [currentForm, setCurrentForm] = useState(FormType.Login);
  const [loggedIn, setLoggedIn] = useState(false); // Add this state
  const { isAuthenticated, setIsAuthenticated } = useUserContext();

  const handleFormChange = (formType: FormType) => {
    setCurrentForm(formType);
  };


  

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Update the user context
    setLoggedIn(true);
    setShowSidebar(false); // Close the sidebar
  };

  const handleClose = () => {
    setShowSidebar(false);
  };

  return (
    <div className={`sidebar ${showSidebar ? "sidebar-open" : ""}`}>
      <div className="sidebar-wrapper">
        <button className="exit-button" onClick={handleClose}>
          <svg
            fill="#53443a"
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "></polygon>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
          {/* This is a simple text 'X', you can use an icon or SVG instead */}
        </button>
        <div className="sidebar-content">
        {isAuthenticated && currentContent === 'userProfile' ? (
            <UserProfile />
          ) : currentContent === 'content1' ? (
            
            <> balls 1 </>
          ) : currentContent === 'content2' ? (
            // Render Content 2
            <> balls 2 </>
          ) : (
            <>
              <div className="form-switcher">
                <label
                  className={`form-switch-btn ${
                    currentForm === FormType.Login ? "active" : ""
                  }`}
                  onClick={() => handleFormChange(FormType.Login)}
                >
                  Login
                </label>
                <label
                  className={`form-switch-btn ${
                    currentForm === FormType.SignUp ? "active" : ""
                  }`}
                  onClick={() => handleFormChange(FormType.SignUp)}
                >
                  Sign Up
                </label>
              </div>
              {currentForm === FormType.Login ? (
                // Render the login form here
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              ) : (
                // Render the sign-up form here and pass handleFormChange as a prop
                <SignUpForm onLoginSuccess={handleLoginSuccess} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
