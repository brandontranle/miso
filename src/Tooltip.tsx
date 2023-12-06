import React, { ReactNode, useState } from 'react';
import './Tooltip.css';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  return (
    <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isTooltipVisible && (
        <div className="tooltip-box">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;