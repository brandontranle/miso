import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Import the CSS for resizable

const Resizable = ({ direction, children }) => {
  return (
    <ResizableBox width={300} height={200} resizeHandles={["se"]}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
