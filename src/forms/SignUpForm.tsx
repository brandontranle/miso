import "../style.css";
import React, { useState } from "react";
import Box from "../Logo-Ext";
import axios from "axios";
import VerificationForm from "./Verification-form";

export const SignUpForm: React.FC<{ onLoginSuccess: () => void }> = ({
  onLoginSuccess,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // New state for displaying messages
  const [showVerificationForm, setShowVerificationForm] = useState(false); // Add this state
  const [loading, setLoading] = useState(false); // Add loading state
  const [userId, setUserId] = useState(""); // Add userId state

  const register = async () => {
    setShowVerificationForm(false); // Reset to false before initiating registration
    setLoading(true); // Set loading to true when registration starts

    // Simulate an API call for demonstration purposes
    setTimeout(async () => {
      if (password === confirmPassword) {
        try {
          const userData = {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
          };
          let re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          /*Validate email and password here*/
          const isEmailValid = re.test(email);

          if (!isEmailValid) {
            setMessage("Invalid email format.");
            return;
          }

          if (password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            setLoading(false);
            return;
          }

          // Send POST request using Axios
          const response = await axios.post(
            "http://localhost:5000/signup",
            userData
          );
          // Handle success or display appropriate messages

          setMessage(response.data.message);
          //render verification form to enter OTP
          // ... (registration logic)

          // Show verification form upon successful registration
          //alert(response.data.userId);
          setUserId(response.data.userId); // Store the userId
          setShowVerificationForm(true);
          setLoading(false); // Set loading to false when registration is complete
        } catch (error) {
          setMessage((error as any).error);
          console.error("Registration error:", error);
          if ((error as any).response) {
            console.error("Response status:", (error as any).response.status);
            console.error("Response data:", (error as any).response.data);
          }
          setLoading(false);
        }
      } else {
        setMessage("Passwords do not match.");
        setLoading(false);
      }
    }, 2000); // Simulated delay of 2 seconds
  };

  return (
    <div className="side-bar-container">
      <Box />
      <h2
        className={`welcome-message ${
          showVerificationForm ? "hide-welcome" : ""
        }`}
      >
        WELCOME TO MISO!
      </h2>
      {loading ? (
        <div className="nav-bar-form">
          <p>Loading...</p>
        </div>
      ) : showVerificationForm ? (
        <div className="nav-bar-form">
          <VerificationForm
            uid={userId}
            email={email}
            onLoginSuccess={onLoginSuccess}
          />
        </div>
      ) : (
        <div className="nav-bar-form">
          {message && <p className="message">{message}</p>}{" "}
          <div className="input-field">
            <input
              className="input-box"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <label className="form-label"> First Name </label>
          </div>
          <div className="input-field">
            <input
              className="input-box"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label className="form-label"> Last Name </label>
          </div>
          <div className="input-field">
            <input
              className="input-box"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="form-label"> Email </label>
          </div>
          <div className="input-field">
            <input
              className="input-box"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="form-label"> Password </label>
          </div>
          <div className="input-field">
            <input
              className="input-box"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label className="form-label"> Confirm Password </label>
          </div>
          <div className="button-wrapper">
            <button className="extended-button" onClick={register}>
              Sign Up
            </button>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default SignUpForm;
