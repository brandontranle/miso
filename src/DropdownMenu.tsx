import React, { useState } from "react";
import "./DropdownMenu.css"; // Make sure to create this CSS file for styling

interface DropdownMenuProps {
  handlePopup: () => void;
  onContentChange: (string) => void
}


interface DropdownItemProps {
    children: React.ReactNode;
    onClick?: () => void;
  }

  const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
    return (
      <div className="dropdown-item" onClick={onClick}>
        {children}
      </div>
    );
  };

  const DropdownMenu: React.FC<DropdownMenuProps & { onContentChange: (content: string) => void }> = ({ handlePopup, onContentChange }) => {  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Menu
      </button>
      {isOpen && (
        <div className="dropdown-content">
        <DropdownItem onClick={() => { handlePopup(); onContentChange('userProfile'); }}>Option 1</DropdownItem>          <div className="horizontal-line"> </div>
        <DropdownItem onClick={() => { handlePopup(); onContentChange('content1'); }}>Option 2</DropdownItem>          <div className="horizontal-line"> </div>
        <DropdownItem onClick={() => { handlePopup(); onContentChange('content2'); }}>Option 3</DropdownItem>          <div className="horizontal-line"> </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;