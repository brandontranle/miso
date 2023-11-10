import React, { useState } from "react";
import OtpInput from "./OTP-Input";
import axios from "axios";
import ChangeEmailForm from "./ChangeEmail";
import { useUserContext } from "./useUserContext";

interface verificationProps {
  uid: string;
  email: string;
  onLoginSuccess: () => void;
}

export const VerificationForm: React.FC<verificationProps> = ({
  uid,
  email,
  onLoginSuccess,
}) => {
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState(
    "Please check your inbox for your 4-Digit OTP!"
  );
  const onChange = (value: string) => setOTP(value);
  const [showChangeEmailForm, setShowChangeEmailForm] = useState(false);
  const { setUser, setIsAuthenticated } = useUserContext(); // Use the user context

  const showChangeEmail = () => {
    setShowChangeEmailForm(true);
    setMessage(""); // Reset the verification message
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verifyOTP", {
        userId: uid,
        otp: otp,
      });

      setMessage(response.data.message);

      // Store userId and token in session storage
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("token", response.data.token);

      document.cookie = `token=${response.data.token}; Secure`;
      setUser({ name: response.data.name, userId: response.data.userId }); // Set user info in context
      onLoginSuccess(); // Close the login form
      setIsAuthenticated(true); // Set authentication status

      //Something wrong with this line: onLoginSuccess(); it ends up causing an error to be caught and OTP Verification failed
    } catch (error) {
      setMessage("OTP verification failed");
      console.error("OTP verification error:", error);
    }
  };

  const resendOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/resendOTPVerification",
        {
          userId: uid,
          email: email,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to resend OTP.");
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <div className="verification-container">
      <h2
        className={`welcome-message ${
          showChangeEmailForm ? "hide-welcome" : ""
        }`}
      >
        OTP Verification
      </h2>
      {showChangeEmailForm ? (
        <ChangeEmailForm uid={uid} onLoginSuccess={onLoginSuccess} />
      ) : (
        <>
          {message && (
            <p
              className={`message ${
                message.includes("successfully") ||
                message.includes("User email has been verified") ||
                message.includes(
                  "Please check your inbox for your 4-Digit OTP!"
                )
                  ? "message-success bounce"
                  : "message shake"
              }`}
            >
              {message}
            </p>
          )}

          {/* OTP Split into four input fields as substrings */}
          <div className="OTP-split-container">
            <OtpInput value={otp} valueLength={4} onChange={onChange} />
          </div>
          <div className="button-wrapper">
            <button className="extended-button-wrapped" onClick={verifyOTP}>
              Verify
            </button>
          </div>
          <div className="row-centered-label">
            <label className="message-centered"> Didn't Receive OTP?</label>
          </div>
          <div className="row-centered-pd">
            <div className="label-container">
              <label className="verification-label-button" onClick={resendOTP}>
                Resend OTP
              </label>
            </div>
            <div className="divider">
              <label className="divider-label"> OR </label>
            </div>
            <div className="label-container">
              <label
                className="verification-label-button"
                onClick={showChangeEmail}
              >
                Change Email
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VerificationForm;
