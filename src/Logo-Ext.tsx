import "./style.css";
import catLogo from "./catLogo.png";

export const Box = () => {
  return (
    <div className="box">
      <div className="vector-wrapper">
        <img className="vector" alt="Vector" src={catLogo} />
      </div>
    </div>
  );
};

export default Box;
