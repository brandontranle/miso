import React from 'react';
import handleMinimize from "../Home";
import axios from "axios"
function Login() {

    const handleLogin = async ()  => {

        try {
        const response = await axios.get(
            "http://localhost:5000/auth/login",
          );

        if (response) {
            console.log('balls')
        }

        } catch (error) {

            console.log("failed to login: " + error)
        }

    }

    return (
        <div className="spotify-widget">
        <>
          <div className="widget-content">
          <a className="spotify-login-button" href="http://localhost:5000/auth/login" >
                    Login with Spotify!
                </a>
          </div>
        </>
    </div>
    )
}

export default Login;
