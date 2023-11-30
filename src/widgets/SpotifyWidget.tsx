import "./SpotifyWidget.css";
import SpotifyWebApi from 'spotify-web-api-js';

export const SpotifyWidget = ({ handleMinimize, isMinimized }) => {
  const handleLogin = () => {
    const clientID = "";
    const redirectURI = 'http://localhost/';
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const scopes = ['user-read-private', 'user-read-email']; // Add scopes as needed
    const authUrl = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join('%20')}&response_type=token`;
  };

  return (
    <div className="spotify-widget">
      <div className="widget-header">
        <p className="widget-title">spotify</p>
        <button className="minimize-symbol" onClick={() => handleMinimize()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="2"
            viewBox="0 0 15 2"
            fill="none"
          >
            <path
              d="M1.83081 1L14 1"
              stroke="#4E4E4E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="widget-content">
        <button onClick={handleLogin} className="spotify-login-button">
            Click to login to Spotify
          </button>
        </div>
      </>
    </div>
  );
};

export default SpotifyWidget;
