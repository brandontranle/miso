export const TasksWidget = ({ handleMinimize, isMinimized }) => {
  return (
    <div className="tasks-widget">
      <div className="widget-header">
        <p className="widget-title">tasks</p>
        <button
          className="minimize-symbol"
          onClick={() => handleMinimize()}
        ></button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="widget-content">
          <p>This is the tasks widget!</p>
        </div>
      </>
    </div>
  );
};

export default TasksWidget;
