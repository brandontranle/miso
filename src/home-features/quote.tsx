import {useState,useEffect} from "react";
import "./home-features.css"
import motivationalQuotes from "./motivational-quotes";


const Quote = () => {
  const [quote, setQuote] = useState("")
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []); 

  return (
    <div className="quote">
      <div className="quote-content">
        {quote}</div>
    </div>
  );
};

export default Quote;
