<h2> Miso </h2>
<img width="1280" alt="image" src="https://github.com/brandontranle/miso/assets/111268644/5cd5f13b-6811-4f8d-ba76-3bfc85c918c5">


  Miso, our productivity app, is designed to elevate your work efficiency while offering a touch of comfort. Meet Miso, our adorable cat mascot, keeping you company on-screen to uplift your spirits during those long study or work sessions. Beyond the delightful feline presence, Miso boasts a suite of features aimed at enhancing your focus and productivity. Engage with our Pomodoro timer for structured work intervals, immerse yourself in ambient sounds to create an ideal work environment, discover daily quotes that ignite your motivation, and utilize our intuitive note-taking feature to capture ideas seamlessly. With Miso by your side, your productivity journey becomes not just efficient but also enjoyable and rewarding.

**Creators**: Brandon Le, Hannah Truong, Alicia Filomeno, Tingyu Gong, and Ivan Lin
<h2> Getting Started </h2>


**Prerequisites:**
To start our web app, you must install the following programs. These are used to manage our backend and have it working locally on your computer.
* MongoDB 6.0.10: https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.10-signed.msi
* MongoDB Compass (Optional): https://www.mongodb.com/try/download/shell
* Node.js (LTS) or 18.18.10: https://nodejs.org/en

MongoDB compass can be used to see what's going on in our backend. Since we do not have an ATLAS server with MongoDB, we settled with local databases on our devices. 

The backend of our program utilizes the nodemailer module to send out emails. Due to the budget limitations, we only have the ability to create 
To get this working properly, set up a nodemailer account at https://mailtrap.io/home
* Create an .env file and insert your nodemailer credentials
<img width="179" alt="image" src="https://github.com/brandontranle/miso/assets/111268644/dc954b2b-a529-4c4a-a8de-f267b5ce7ed2">

* Replace the user and pass credentials (and port if necessary) based on what is located in your nodemailer account. Documentation of nodemailer can be reviewed on their website. 

  <img width="306" alt="image" src="https://github.com/brandontranle/miso/assets/111268644/edfaa3bc-0bcf-4d98-89f4-f43d643cf544">


1. Clone the repository <br/>
```
git clone https://github.com/brandontranle/miso.git
```
2. Install modules/packages
```
npm install --force
```
3. Run the frontend
```
npm run dev
```
4. Run the backend
```
cd backend
npm start
```

<h2> Features </h2>

Miso encompasses 9 widgets for you to explore!
Here are three other distinct features for you to see.
* **Spotify Widget**: This allows you to connect your Spotify premium account to control what music you want to play within Miso! It is catered to support your study habits. This was developed by using the Spotify SDK for the web player and API for authentication. 
* **Statistics Chart**: While you're studying using our fantastic Pomodoro timer, your time gets logged into our MongoDB database, where we process your data into a bar graph using ChartJS.
* **Weather/Date/Time**: After you wake up and open Miso, you're incentivized to see what time it is and what the weather is like today! In addition to this, You can specify your timezone within the Settings after you are authenticated; otherwise, you can always hide this feature in the Settings as well. Please note you need to allow access to your location within the browser tab. This was all implemented using the OpenWeather Map WeatherData API and built-in React libraries. 
  
