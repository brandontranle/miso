export const TimerWidget = ({ handleMinimize, isMinimized }) => {
  return (
    <div className="timer-widget">
      <div className="widget-header">
        <p className="widget-title">timer</p>
        <button
          className="minimize-symbol"
          onClick={() => handleMinimize()}
        ></button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="widget-content">
          <p>This is the timer widget!</p>
        </div>
      </>
    </div>
  );
};

export default TimerWidget;
