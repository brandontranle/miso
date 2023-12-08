import "../style.css";
import React from "react";
import Box from "../Logo-Ext";
import axios from "axios";
import { useState } from "react";
import VerificationForm from "./Verification-form";
import { useUserContext } from "../useUserContext"; // Import the user context
import miso from "../miso/brown_cat/cat01_sit_8fps.gif";

const LoginForm: React.FC<{ onLoginSuccess: () => void }> = ({
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [userId, setUserId] = useState(""); // Changed variable name to userId
  const { setUser, setIsAuthenticated } = useUserContext(); // Use the user context

  const verifyUserStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/verifyStatus", {
        params: { email: email },
      });

      if (!response.data.isVerified) {
        const resendResponse = await axios.post(
          "http://localhost:5000/sendOTP",
          {
            email: email,
            userId: response.data.userId,
          }
        );

        setShowVerificationForm(true);
        setUserId(resendResponse.data.userId); // Update the variable name here
      } else {
        setUserId(response.data.userId); // Update the variable name here
      }

      return response.data;
    } catch (error) {
      console.error("Verify Status error:", error);
      return { isVerified: false, userId: "" };
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      if (response.data.message === "Login successful") {
        setMessage("");

        // Check the verification status only if login is successful
        const { isVerified, userId } = await verifyUserStatus(); // Update the variable name here

        if (!isVerified) {
          setShowVerificationForm(true);
          setUserId(userId); // Update the variable name here
          return;
        }

        // Store userId and token in session storage
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("token", response.data.token);

        document.cookie = `token=${response.data.token}; Secure`;
        setUser({ name: response.data.name, userId: response.data.userId }); // Set user info in context
        setIsAuthenticated(true); // Set authentication status
        onLoginSuccess(); // Close the login form
        alert("Login successful");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      setMessage("Invalid Credentials");
    }
  };

  return (
    <div className="side-bar-container">
      <Box />
      <h2
        className={`welcome-message ${
          showVerificationForm ? "hide-welcome" : ""
        }`}
      >
        LOGIN TO MISO{" "}
      </h2>{" "}
      {showVerificationForm ? (
        <div className="nav-bar-form">
          <VerificationForm
            email={email}
            uid={userId}
            onLoginSuccess={onLoginSuccess}
          />
        </div>
      ) : (
        <div className="nav-bar-form">
          {message && <p className="error-message">{message}</p>}
          <div className="input-field">
            <input
              className="input-box"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label"> Email </label>
          </div>
          <div className="input-field">
            <input
              className="input-box"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label"> Password </label>
          </div>
          <div className="button-wrapper">
            <button className="extended-button" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="row-centered">
            <label className="default-label"> </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
