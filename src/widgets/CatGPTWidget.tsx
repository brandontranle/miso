export const CatGPTWidget = ({ handleMinimize, isMinimized }) => {
  return (
    <div className="catgpt-widget">
      <div className="widget-header">
        <p className="widget-title">catgpt</p>
        <button
          className="minimize-symbol"
          onClick={() => handleMinimize()}
        ></button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="widget-content">
          <p>This is the catgpt widget!</p>
        </div>
      </>
    </div>
  );
};

export default CatGPTWidget;
