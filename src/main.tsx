import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { UserContextProvider } from "./useUserContext"; // Import the UserContextProvider

ReactDOM.render(
  <React.StrictMode>
  <UserContextProvider>
    <App />
  </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
  );