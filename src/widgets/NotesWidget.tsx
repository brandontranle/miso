export const NotesWidget = ({ handleMinimize, isMinimized }) => {
  return (
    <div className="notes-widget">
      <div className="widget-header">
        <p className="widget-title">notes</p>
        <button
          className="minimize-symbol"
          onClick={() => handleMinimize()}
        ></button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="widget-content">
          <p>This is the notes widget!</p>
        </div>
      </>
    </div>
  );
};

export default NotesWidget;
