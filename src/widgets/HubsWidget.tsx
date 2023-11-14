export const HubsWidget = ({ handleMinimize, isMinimized }) => {
  return (
    <div className="hubs-widget">
      <div className="widget-header">
        <p className="widget-title">hubs</p>
        <button
          className="minimize-symbol"
          onClick={() => handleMinimize()}
        ></button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="widget-content">
          <p>This is the hubs widget!</p>
        </div>
      </>
    </div>
  );
};

export default HubsWidget;
