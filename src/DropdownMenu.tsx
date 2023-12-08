import React, { useState } from "react";
import "./DropdownMenu.css"; // Make sure to create this CSS file for styling
import axios from "axios";

interface DropdownMenuProps {
  handlePopup: () => void;
  onContentChange: (string) => void;
}


  children?: React.ReactNode;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
  return (
    <div
      className={`dropdown-item ${children ? "functional" : "no-hover"}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const DropdownMenu: React.FC<DropdownMenuProps & {
  onContentChange: (content: string) => void;
}> = ({ handlePopup, onContentChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const logout = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const response = await axios.post("http://localhost:5000/logout");
        console.log("logged out!");
      }
      // Remove the token from session storage
      sessionStorage.removeItem("token");
      console.log("logged out!");
      window.location.reload();
    } catch (error) {
      console.log("error logging out.");
    }
  };

  return (
    <div className={`dropdown-container ${isOpen ? "open" : ""}`}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9998 21C13.5998 21 15.9598 20.01 17.7398 18.38C17.6398 17.44 17.0398 16.52 15.9698 15.8C13.2498 13.98 8.76977 13.98 6.02977 15.8C4.95977 16.52 4.35977 17.44 4.25977 18.38C6.03977 20.01 8.39977 21 10.9998 21ZM10.9998 21C16.5226 21 21 16.5227 21 11C21 5.47713 16.5228 1 11 1C5.47715 1 1 5.47713 1 11C1 16.5227 5.47695 21 10.9998 21ZM11.1207 11.7799C11.0507 11.7699 10.9607 11.7699 10.8807 11.7799C9.1207 11.7199 7.7207 10.28 7.7207 8.50994C7.7207 6.69995 9.1807 5.22996 11.0007 5.22996C12.8107 5.22996 14.2807 6.69995 14.2807 8.50994C14.2707 10.28 12.8807 11.7199 11.1207 11.7799Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div
            className="dropdown-item"
            onClick={() => {
              handlePopup();
              onContentChange("userProfile");
            }}
          >
            {" "}
            <svg
              className="svg-dropdown-icon"
              width="11"
              height="12"
              viewBox="0 0 11 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.49984 5.33333C6.06022 5.33333 6.60801 5.17694 7.07395 4.88392C7.53989 4.5909 7.90305 4.17443 8.1175 3.68716C8.33194 3.19989 8.38805 2.66371 8.27873 2.14643C8.1694 1.62914 7.89956 1.15399 7.50331 0.78105C7.10706 0.40811 6.60221 0.154134 6.05259 0.0512405C5.50298 -0.0516535 4.93329 0.00115542 4.41557 0.202989C3.89784 0.404823 3.45534 0.746616 3.14401 1.18515C2.83268 1.62368 2.6665 2.13925 2.6665 2.66667C2.6665 3.37391 2.96501 4.05219 3.49637 4.55229C4.02772 5.05238 4.74839 5.33333 5.49984 5.33333Z"
                fill="currentColor"
              />
              <path
                d="M9.75008 12C9.93794 12 10.1181 11.9297 10.251 11.8047C10.3838 11.6797 10.4584 11.5101 10.4584 11.3333C10.4584 10.0956 9.93602 8.90863 9.00615 8.03346C8.07629 7.15829 6.81511 6.66663 5.50008 6.66663C4.18505 6.66663 2.92388 7.15829 1.99401 8.03346C1.06414 8.90863 0.541748 10.0956 0.541748 11.3333C0.541748 11.5101 0.616376 11.6797 0.749214 11.8047C0.882053 11.9297 1.06222 12 1.25008 12H9.75008Z"
                fill="currentColor"
              />
            </svg>
            <label className="item-name">My Account</label>
          </div>
          <DropdownItem
            onClick={() => {
              handlePopup();
              onContentChange("content1");
            }}
          >
            <svg
              className="svg-dropdown-icon"
              width="11"
              height="12"
              viewBox="0 0 11 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.49986 1.03259C5.27476 1.03259 5.05482 1.11403 4.88935 1.26512C4.72311 1.4169 4.62486 1.62788 4.62486 1.85325V10.4132C4.62486 10.6385 4.72311 10.8495 4.88935 11.0013C5.05482 11.1524 5.27476 11.2338 5.49986 11.2338C5.72495 11.2338 5.94489 11.1524 6.11037 11.0013C6.2766 10.8495 6.37486 10.6385 6.37486 10.4132V1.85325C6.37486 1.62788 6.2766 1.4169 6.11037 1.26512C5.94489 1.11403 5.72495 1.03259 5.49986 1.03259ZM9.87496 5.59789C9.64986 5.59789 9.42992 5.67932 9.26445 5.83041C9.09822 5.98219 8.99996 6.19318 8.99996 6.41855V10.4132C8.99996 10.6385 9.09821 10.8495 9.26445 11.0013C9.42992 11.1524 9.64986 11.2338 9.87496 11.2338C10.1001 11.2338 10.32 11.1524 10.4855 11.0013C10.6517 10.8495 10.75 10.6385 10.75 10.4132V6.41855C10.75 6.19318 10.6517 5.98219 10.4855 5.83041C10.32 5.67932 10.1001 5.59789 9.87496 5.59789ZM1.12476 3.31524C0.899659 3.31524 0.679719 3.39668 0.514245 3.54776C0.348013 3.69954 0.249756 3.91053 0.249756 4.1359V10.4132C0.249756 10.6385 0.348012 10.8495 0.514246 11.0013C0.679719 11.1524 0.899659 11.2338 1.12476 11.2338C1.34985 11.2338 1.56979 11.1524 1.73527 11.0013C1.9015 10.8495 1.99976 10.6385 1.99976 10.4132V4.1359C1.99976 3.91053 1.9015 3.69954 1.73527 3.54776C1.56979 3.39668 1.34985 3.31524 1.12476 3.31524Z"
                fill="currentColor"
                stroke="#4E4E4E"
                stroke-width="0.5"
              />
            </svg>

            <label className="item-name"> Statistics </label>
          </DropdownItem>{" "}
          <DropdownItem
            onClick={() => {
              handlePopup();
              onContentChange("content2");
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C9.17891 0 8.38722 0.0997142 7.63143 0.268555C7.47383 0.303878 7.33154 0.385336 7.22424 0.501671C7.11693 0.618005 7.04991 0.763473 7.03243 0.917969L6.86666 2.36914C6.81244 2.84468 6.52638 3.26543 6.09476 3.50488C5.66401 3.74386 5.14117 3.77033 4.68522 3.57812H4.6842L3.29601 2.99121C3.14794 2.92864 2.98329 2.91176 2.82481 2.9429C2.66632 2.97403 2.52181 3.05165 2.41123 3.16504C1.33209 4.26979 0.50386 5.60753 0.0335101 7.10059C-0.0133415 7.24919 -0.0110134 7.40809 0.0401729 7.55537C0.0913592 7.70265 0.188881 7.83105 0.319284 7.92285L1.55086 8.79004C1.95302 9.07396 2.18953 9.5214 2.18953 10C2.18953 10.4789 1.95303 10.9267 1.55086 11.21L0.319284 12.0762C0.188881 12.168 0.0913592 12.2964 0.0401729 12.4436C-0.0110134 12.5909 -0.0133415 12.7498 0.0335101 12.8984C0.50381 14.3913 1.33138 15.7301 2.41123 16.835C2.52193 16.9482 2.66649 17.0256 2.82498 17.0566C2.98346 17.0875 3.14804 17.0705 3.29601 17.0078L4.6842 16.4209C5.14037 16.2283 5.66371 16.256 6.09476 16.4951C6.52638 16.7346 6.81244 17.1553 6.86666 17.6309L7.03243 19.082C7.05004 19.2362 7.11701 19.3814 7.2241 19.4975C7.3312 19.6136 7.47315 19.695 7.63042 19.7305C8.38655 19.8999 9.17891 20 10 20C10.8211 20 11.6128 19.9003 12.3686 19.7314C12.5262 19.6961 12.6685 19.6147 12.7758 19.4983C12.8831 19.382 12.9501 19.2365 12.9676 19.082L13.1333 17.6309C13.1876 17.1553 13.4736 16.7346 13.9052 16.4951C14.336 16.2561 14.8588 16.2287 15.3148 16.4209L16.704 17.0078C16.852 17.0705 17.0165 17.0875 17.175 17.0566C17.3335 17.0256 17.4781 16.9482 17.5888 16.835C18.6679 15.7302 19.4961 14.3915 19.9665 12.8984C20.0133 12.7498 20.011 12.5909 19.9598 12.4436C19.9086 12.2964 19.8111 12.168 19.6807 12.0762L18.4491 11.21C18.047 10.9267 17.8105 10.4789 17.8105 10C17.8105 9.52114 18.047 9.07333 18.4491 8.79004L19.6807 7.92383C19.8111 7.83203 19.9086 7.70363 19.9598 7.55635C20.011 7.40907 20.0133 7.25017 19.9665 7.10156C19.4961 5.60851 18.6679 4.26979 17.5888 3.16504C17.4781 3.05182 17.3335 2.97438 17.175 2.94342C17.0165 2.91246 16.852 2.9295 16.704 2.99219L15.3148 3.5791C14.8588 3.77131 14.336 3.74386 13.9052 3.50488C13.4736 3.26543 13.1876 2.84468 13.1333 2.36914L12.9676 0.917969C12.95 0.763777 12.883 0.618621 12.7759 0.502492C12.6688 0.386363 12.5268 0.304974 12.3696 0.269531C11.6135 0.100078 10.8211 0 10 0ZM10 1.5C10.5073 1.5 10.9945 1.58744 11.4828 1.66992L11.5804 2.53223C11.6886 3.48169 12.2634 4.32617 13.1242 4.80371C13.9855 5.28157 15.0342 5.3365 15.9443 4.95215L16.7701 4.60352C17.4042 5.3347 17.9063 6.16059 18.2569 7.06543L17.5247 7.58105C16.723 8.14576 16.2484 9.04486 16.2484 10C16.2484 10.9551 16.723 11.8542 17.5247 12.4189L18.2569 12.9346C17.9063 13.8394 17.4042 14.6653 16.7701 15.3965L15.9443 15.0479C15.0342 14.6635 13.9855 14.7184 13.1242 15.1963C12.2634 15.6738 11.6886 16.5183 11.5804 17.4678L11.4828 18.3301C10.9945 18.4123 10.5071 18.5 10 18.5C9.49268 18.5 9.00551 18.4126 8.51723 18.3301L8.4196 17.4678C8.31135 16.5183 7.73657 15.6738 6.87581 15.1963C6.01449 14.7184 4.96584 14.6635 4.0557 15.0479L3.22991 15.3965C2.59566 14.6654 2.09369 13.8395 1.74307 12.9346L2.4753 12.4189C3.27698 11.8542 3.75162 10.9551 3.75162 10C3.75162 9.04486 3.2766 8.14518 2.4753 7.58008L1.74307 7.06445C2.09389 6.15927 2.59643 5.33392 3.23092 4.60254L4.0557 4.95117C4.96584 5.33553 6.01449 5.28157 6.87581 4.80371C7.73657 4.32617 8.31135 3.48169 8.4196 2.53223L8.51723 1.66992C9.00546 1.58767 9.49293 1.5 10 1.5ZM10 6C7.70866 6 5.83441 7.79975 5.83441 10C5.83441 12.2003 7.70866 14 10 14C12.2913 14 14.1656 12.2003 14.1656 10C14.1656 7.79975 12.2913 6 10 6ZM10 7.5C11.4471 7.5 12.6035 8.6104 12.6035 10C12.6035 11.3896 11.4471 12.5 10 12.5C8.55288 12.5 7.39651 11.3896 7.39651 10C7.39651 8.6104 8.55288 7.5 10 7.5Z"
                fill="currentColor"
              />
            </svg>
            <label className="item-name"> Settings </label>
          </DropdownItem>{" "}
          <DropdownItem onClick={logout}>
            <label className="item-name-last-child"> Logout</label>
          </DropdownItem>
          <DropdownItem></DropdownItem>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
