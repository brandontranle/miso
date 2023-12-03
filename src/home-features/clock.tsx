//Notes:
//In JSX, you typically handle DOM manipuation and ineraction within
//React compoenents, and its state management.

//For Timezones, JS has built-in support for handling timezones through the 'Intl.DateTimeFormat' object.
//The valiable timezone data is not in JS itsself.  The browser that JS is running, like Node.js, provdes access
//to timezone information through the host system's time zone database.  So, the Intl object uses timezones info
//avaiable in the user's OS or browser.

import React, { useEffect, useState } from "react";
import "../DateTime.css";

interface ClockProps {
  timezone: string;
}

const Clock: React.FC<ClockProps> = ({ timezone }) => {
  const [selectedTimezone, setSelectedTimezone] = useState(
    "America/Los_Angeles"
  ); //we have set Los Angeles as default timezone;
  //const [userDateTime, setUserDateTime] = useState(""); //before seperating date and time
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    //Intl.DateTimeFormatOptions is an interface in JS to specfic formatting options for date/time
    //It's utizlied in the intl.DateTimeFormat object.

    //the follow is before seperating date and time
    /*const options: Intl.DateTimeFormatOptions = {
      //the following properites are built-in to the JS interface.
      timeZone: selectedTimezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      //second: 'numeric',
      //timeZoneName: 'short'
    };
    */

    //We are seperating date and time
    const timeOptions: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const dateOptions: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const updateUserDateTime = () => {
      //creates a new Date object and formats it as string using 'toLocaleString' method

      //const dateTime = new Date().toLocaleString("en-US", options); //before seperating date and time
      //setUserDateTime(dateTime);

      const currentTime = new Date().toLocaleString("en-US", timeOptions);
      const currentDate = new Date().toLocaleString("en-US", dateOptions);

      setTime(currentTime);
      setDate(currentDate);
    };

    //Calls this function to display date and time when page loads.
    updateUserDateTime();

    const interval = setInterval(updateUserDateTime, 1000); //update every second

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="clock-container">
      {" "}
      {/*using DateTime.css*/}
      <div className="clock">
        <div className="time">{time}</div>
        <div className="date">{date}</div>
      </div>
      {/* creates a dropdown using select elemnt with this ID, to allow users to choose */}
      {/* creates empty element with the ID  */}
      {/* first attempt: <div id="date-time">{userDateTime}</div> */}
    </div>
  );
};
export default Clock;

/*
//Get elements from the DOM
//retrieves the HTML element with the ID "date-time", and stores as HTMLDivElement
const dateTimeElement = document.getElementById('date-time') as HTMLDivElement;
//retreives HTML element and stores as HtmlSelectElement
const timezoneSelector = document.getElementById('timezone-selector') as HTMLSelectElement;

//This function updates the displayed date and time based on selected timezone
function updateDateTime()
{
  //retreives selected value (timezone) from dropdown and stores in selectedTimezone
  const selectedTimezone = timezoneSelector.value;
  //defines options object of time Intl.Date....., for formating date and time
  const options: Intl.DateTimeFormatOptions = {
    timeZone: selectedTimezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  };

  //sets the text content datetimeelemnt to fromated date and time
  dateTimeElement.textContent = userDateTime;
}

//Listen for changes in timezone and update date/time accordingly.
//adds an event listner to timzone dropdown to trigger updateDateTime() whenver selection changes
timezoneSelector.addEventListener('change', updateDateTime);
*/
