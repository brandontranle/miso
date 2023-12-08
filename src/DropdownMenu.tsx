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
    /*
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
  );*/

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9998 21C13.5998 21 15.9598 20.01 17.7398 18.38C17.6398 17.44 17.0398 16.52 15.9698 15.8C13.2498 13.98 8.76977 13.98 6.02977 15.8C4.95977 16.52 4.35977 17.44 4.25977 18.38C6.03977 20.01 8.39977 21 10.9998 21ZM10.9998 21C16.5226 21 21 16.5227 21 11C21 5.47713 16.5228 1 11 1C5.47715 1 1 5.47713 1 11C1 16.5227 5.47695 21 10.9998 21ZM11.1207 11.7799C11.0507 11.7699 10.9607 11.7699 10.8807 11.7799C9.1207 11.7199 7.7207 10.28 7.7207 8.50994C7.7207 6.69995 9.1807 5.22996 11.0007 5.22996C12.8107 5.22996 14.2807 6.69995 14.2807 8.50994C14.2707 10.28 12.8807 11.7199 11.1207 11.7799Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

{/* PLEASE BRANDON HELP W FORMATIING TEXT AND SVG NEXT TO EACH OTHER LIKE IN STATS!! */}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div className = "dropdown-item">
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.49966 5.33333C6.06004 5.33333 6.60783 5.17694 7.07377 4.88392C7.53971 4.5909 7.90287 4.17443 8.11732 3.68716C8.33176 3.19989 8.38787 2.66371 8.27855 2.14643C8.16922 1.62914 7.89937 1.15399 7.50313 0.78105C7.10688 0.40811 6.60203 0.154134 6.05241 0.0512405C5.5028 -0.0516535 4.93311 0.00115542 4.41539 0.202989C3.89766 0.404823 3.45516 0.746616 3.14383 1.18515C2.8325 1.62368 2.66632 2.13925 2.66632 2.66667C2.66632 3.37391 2.96483 4.05219 3.49619 4.55229C4.02754 5.05238 4.74821 5.33333 5.49966 5.33333Z" fill="#4E4E4E"/>
<path d="M9.74984 12C9.9377 12 10.1179 11.9298 10.2507 11.8047C10.3835 11.6797 10.4582 11.5101 10.4582 11.3333C10.4582 10.0957 9.93578 8.90867 9.00591 8.0335C8.07604 7.15833 6.81487 6.66667 5.49984 6.66667C4.18481 6.66667 2.92363 7.15833 1.99377 8.0335C1.0639 8.90867 0.541504 10.0957 0.541504 11.3333C0.541504 11.5101 0.616132 11.6797 0.74897 11.8047C0.881808 11.9298 1.06198 12 1.24984 12H9.74984Z" fill="#4E4E4E"/>
           </svg>

            <DropdownItem onClick={() => { handlePopup(); onContentChange('userProfile'); }}>My Account Profile</DropdownItem>    
          </div>      
            <div className="horizontal-line"> </div>

          <div className = "dropdown-item">
          
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5001 1.03271C5.275 1.03271 5.05506 1.11415 4.88959 1.26524C4.72336 1.41702 4.6251 1.62801 4.6251 1.85338V10.4133C4.6251 10.6387 4.72336 10.8497 4.88959 11.0014C5.05506 11.1525 5.27501 11.234 5.5001 11.234C5.7252 11.234 5.94514 11.1525 6.11061 11.0014C6.27684 10.8497 6.3751 10.6387 6.3751 10.4133V1.85338C6.3751 1.62801 6.27684 1.41702 6.11061 1.26524C5.94514 1.11415 5.7252 1.03271 5.5001 1.03271ZM9.8752 5.59801C9.65011 5.59801 9.43017 5.67944 9.26469 5.83053C9.09846 5.98231 9.0002 6.1933 9.0002 6.41867V10.4133C9.0002 10.6387 9.09846 10.8497 9.26469 11.0014C9.43017 11.1525 9.65011 11.234 9.8752 11.234C10.1003 11.234 10.3202 11.1525 10.4857 11.0014C10.6519 10.8497 10.7502 10.6387 10.7502 10.4133V6.41867C10.7502 6.1933 10.6519 5.98231 10.4857 5.83053C10.3202 5.67944 10.1003 5.59801 9.8752 5.59801ZM1.125 3.31536C0.899903 3.31536 0.679963 3.3968 0.51449 3.54789C0.348257 3.69967 0.25 3.91065 0.25 4.13602V10.4133C0.25 10.6387 0.348256 10.8497 0.51449 11.0014C0.679963 11.1525 0.899903 11.234 1.125 11.234C1.3501 11.234 1.57004 11.1525 1.73551 11.0014C1.90174 10.8497 2 10.6387 2 10.4133V4.13602C2 3.91065 1.90174 3.69967 1.73551 3.54789C1.57004 3.3968 1.3501 3.31536 1.125 3.31536Z" fill="#4E4E4E" stroke="#4E4E4E" stroke-width="0.5"/>
            </svg>

          <DropdownItem onClick={() => { handlePopup(); onContentChange('content1'); }}>My Stats</DropdownItem>
          </div>

          <div className="horizontal-line"> </div>

          <div className = "dropdown-item">
          <DropdownItem onClick={() => { handlePopup(); onContentChange('content2'); }}>Logout</DropdownItem>       

          </div>   

          <div className="horizontal-line"> </div>
        </div>
      )}
    </div>
  );

};

export default DropdownMenu;