//Notes:
//In JSX, you typically handle DOM manipuation and ineraction within
//React compoenents, and its state management.

//For Timezones, JS has built-in support for handling timezones through the 'Intl.DateTimeFormat' object.
//The valiable timezone data is not in JS itsself.  The browser that JS is running, like Node.js, provdes access
//to timezone information through the host system's time zone database.  So, the Intl object uses timezones info
//avaiable in the user's OS or browser.

import React, { useEffect, useState } from "react";
import "../DateTime.css";

const Clock: React.FC = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(
    "America/Los_Angeles"
  ); //we have set Los Angeles as default timezone;
  const [userDateTime, setUserDateTime] = useState("");

  useEffect(() => {
    //Intl.DateTimeFormatOptions is an interface in JS to specfic formatting options for date/time
    //It's utizlied in the intl.DateTimeFormat object.

    const options: Intl.DateTimeFormatOptions = {
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
    const updateUserDateTime = () => {
      //creates a new Date object and formats it as string using 'toLocaleString' method
      const dateTime = new Date().toLocaleString("en-US", options);
      setUserDateTime(dateTime);
    };

    //Calls this function to display date and time when page loads.
    updateUserDateTime();

    const interval = setInterval(updateUserDateTime, 1000); //update every second

    return () => clearInterval(interval);
  }, [selectedTimezone]);

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimezone(event.target.value);
  };

  return (
    <div>
      {/* creates empty element with the ID  */}
      <div id="date-time">{userDateTime}</div>

      {/* creates a dropdown using select elemnt with this ID, to allow users to choose */}
      <select
        id="timezone-selector"
        onChange={handleTimezoneChange}
        value={selectedTimezone}
      >
        <option value="America/New_York">New York, North America</option>
        <option value="America/Los_Angeles">Los Angeles, North America</option>
        <option value="America/Mexico_City">Mexico City, North America</option>
        <option value="America/Sao_Paulo">Sau Paulo, South America</option>
        <option value="America/Argentina/Buenos_Aires">
          Buenos Aires, South America
        </option>
        <option value="Europe/London">London, Europe</option>
        <option value="Europe/Paris">Paris, Europe</option>
        <option value="Asia/Tokyo">Tokyo, Asia</option>
        <option value="Asia/Shanghai">Shanghai, Asia</option>
        <option value="Asia/Singapore">Singapore, Asia</option>
        <option value="Africa/Lagos">Lagos, Africa</option>
        <option value="Africa/Cairo">Cairo, Africa</option>
        <option value="Australia/Sydney">Sydney, Oceania</option>
        <option value="Pacific/Auckland">Auckland, Oceania</option>
        <option value="Pacific/Honolulu">Honolulu, Oceania</option>
      </select>
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
