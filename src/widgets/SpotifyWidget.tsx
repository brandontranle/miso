export const SpotifyWidget = ({ handleMinimize, isMinimized }) => {
  return (
    <div className="spotify-widget">
      <div className="widget-header">
        <p className="widget-title">spotify</p>
        <button
          className="minimize-symbol"
          onClick={() => handleMinimize()}
        ></button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="widget-content">
          <p>This is the spotify widget!</p>
        </div>
      </>
    </div>
  );
};

export default SpotifyWidget;
