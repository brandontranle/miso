import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { UserContextProvider } from "./useUserContext"; // Import the UserContextProvider

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      {/* Wrap your App with the context provider */}
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
