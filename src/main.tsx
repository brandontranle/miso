import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { UserContextProvider } from "./useUserContext"; // Import the UserContextProvider
import { ThemeProvider } from "./ThemeContext"; // Import ThemeProvider

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
