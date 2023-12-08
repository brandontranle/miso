import { useState, useEffect } from "react";
import "./home-features.css";
import motivationalQuotes from "./motivational-quotes";

const Quote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const updateQuote = () => {
      const now = new Date();
      const dayOfYear = getDayOfYear(now); // Get the day of the year (1-365)

      // Choose a quote based on the day of the year
      const quoteIndex = dayOfYear % motivationalQuotes.length;
      setQuote(motivationalQuotes[quoteIndex]);
    };

    // Get the day of the year function
    const getDayOfYear = (date) => {
      const start = new Date(date.getFullYear(), 0, 0);
      const diff = (date - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
      const oneDay = 1000 * 60 * 60 * 24;
      const day = Math.floor(diff / oneDay);
      return day;
    };

    // Initial update of the quote
    updateQuote();
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