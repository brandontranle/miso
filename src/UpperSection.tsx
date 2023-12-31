import react from "react";
import "./style.css";
import Logo from "./Logo";
import AboutButton from "./buttons/About-button";
import CustomizationBtn from "./buttons/Customization-button";
/*import LoginButton from "./Log-In-Btn";*/
import HomeButton from "./buttons/Home-button";
import Box from "./Logo-Ext";
import { Link } from "react-router-dom";
import { useUserContext } from "./useUserContext"; // Update the path to your UserContext
import ProfileButton from "./buttons/Profile-button";
import LoginButton from "./buttons/Log-In-Btn";
import DropdownMenu from "./DropdownMenu";

interface NavBarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  onContentChange: (string) => void;
}

export const Navbar: React.FC<NavBarProps> = ({
  showSidebar,
  setShowSidebar,
  onContentChange
}) => {
  const { user, isAuthenticated } = useUserContext();

  return (
    <div className="UpperSection">
      <div className="left-side">
        <Link to="/" className="logoLink">
          <Logo />
        </Link>
      </div>

      <div className="right-side">
        {isAuthenticated ? (
          <div> 
<DropdownMenu handlePopup={() => setShowSidebar(!showSidebar)} onContentChange={onContentChange} />          </div>
        ) : (
          <LoginButton
            className={"LOGIN-BUTTON"}
            text="Login"
            hover={false}
            onClick={() => setShowSidebar(!showSidebar)}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
