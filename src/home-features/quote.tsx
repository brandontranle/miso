import { useState, useEffect } from "react";
import "./home-features.css";
import motivationalQuotes from "./motivational-quotes";


const Quote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);

    const interval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[newIndex]);
    }, 60000); 

    return () => clearInterval(interval); // Cleanup 
  }, []); 

  return (
    <div className="quote">
      <div className="quote-content">
        {quote}
      </div>
    </div>
  );
};

export default Quote;
