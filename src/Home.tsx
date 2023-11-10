import React from "react";
import Navbar from "./UpperSection";
import LoginScreen from "./Log-In-Screen";
import { useState } from "react";
import "./style.css";

export const Home: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="page">
      <div className="TopBarContainer">
        <div className="Nav-Bar">
          <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
      </div>
      <LoginScreen showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};
export default Home;
