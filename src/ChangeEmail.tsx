import React, { useState } from "react";
import axios from "axios";
import VerificationForm from "./Verification-form";

interface ChangeEmailProps {
  uid: string;
  onLoginSuccess: () => void;
}

const ChangeEmailForm: React.FC<ChangeEmailProps> = ({
  uid,
  onLoginSuccess,
}) => {
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  const handleChangeEmail = async () => {
    try {
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      /*Validate email and password here*/
      const isEmailValid = re.test(newEmail);

      if (!isEmailValid) {
        setMessage("Invalid email format.");
        return;
      }

      const response = await axios.post("http://localhost:5000/changeEmail", {
        userId: uid,
        newEmail: newEmail,
      });

      setMessage(response.data.message);
      setShowVerificationForm(true);
    } catch (error) {
      setMessage("Cannot change email to already existing email.");
      console.error("Change email error:", error);
    }
  };

  return (
    <div className="change-email-container">
      {/* Show verification form if the email is valid and has been changed*/}
      {showVerificationForm ? (
        <VerificationForm
          uid={uid}
          email={newEmail}
          onLoginSuccess={onLoginSuccess}
        />
      ) : (
        <div className="nav-bar-form">
          <h2
            className={`welcome-message ${
              showVerificationForm ? "hide-welcome" : ""
            }`}
          >
            Change Email
          </h2>
          {message && <p className="message shake">{message}</p>}{" "}
          {/* Display custom error message */}
          <div className="input-field">
            <input
              type="email"
              className="input-box"
              placeholder="New email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <label className="form-label"> New Email Address </label>
          </div>
          <div className="button-wrapper">
            <button className="extended-button" onClick={handleChangeEmail}>
              Change Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeEmailForm;
