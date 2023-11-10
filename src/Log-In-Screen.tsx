import React, { useState } from "react";
import "./style.css";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useUserContext } from "./useUserContext"; // Import the user context
import UserProfile from "./UserProfile";

interface LoginScreenProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
}

enum FormType {
  Login,
  SignUp,
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  showSidebar,
  setShowSidebar,
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

  return (
    <div className={`sidebar ${showSidebar ? "sidebar-open" : ""}`}>
      <div className="sidebar-wrapper">
        <div className="sidebar-content">
          {isAuthenticated ? (
            // Render user profile information
            <UserProfile />
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
                {currentForm === FormType.SignUp && (
                  <div
                    className="back-button"
                    onClick={() => handleFormChange(FormType.Login)}
                  >
                    {/* Your back button SVG code */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="back array">
                        <path
                          id="Vector"
                          d="M21 11H6.83L10.41 7.41L9 6L3 12L9 18L10.41 16.58L6.83 13H21V11Z"
                          fill="#54453A"
                        />
                      </g>
                    </svg>
                  </div>
                )}
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
