import "./style.css";

export const Logo = () => {
  //when the logo is clicked, retun to the same home page or in other words, refresh the page
  return (
    <div className="logo">
      <div className="h-1-wrapper">
        <h1 className="text-wrapper">MISO </h1>
      </div>
    </div>
  );
};

export default Logo;
