import React from "react";
import "../style.css";

interface ItemCheckboxProps {
  checked: boolean;
  onClick: () => void;
}

export const ItemCheckbox: React.FC<ItemCheckboxProps> = ({
  checked,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={checked ? "checkbox-checked" : "checkbox-unchecked"}
    >
      {checked ? (
        <div className="checkbox-checked">
          <svg
            width="25"
            height="25"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Check Mark">
              <rect
                id="check mark button"
                width="35"
                height="35"
                rx="9"
                fill="#9EEC8B"
              />
              <path
                id="Subtract"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0C4.02944 0 0 4.02944 0 9V29C0 33.9706 4.02944 38 9 38H29C33.9706 38 38 33.9706 38 29V9C38 4.02944 33.9706 0 29 0H9ZM10 4C6.68629 4 4 6.68629 4 10V28C4 31.3137 6.68629 34 10 34H28C31.3137 34 34 31.3137 34 28V10C34 6.68629 31.3137 4 28 4H10Z"
                fill="#9EEC8B"
              />
              <path
                id="Line 1"
                d="M10.3536 20.6465L16.3536 26.6465"
                stroke="#FEF2E7"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                id="Line 2"
                d="M28 12L16.3536 26.6465"
                stroke="#FEF2E7"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      ) : (
        <div className="checkbox-unchecked">
          <svg
            width="25"
            height="25"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Uncheck Mark">
              <rect
                id="check mark button"
                width="38"
                height="38"
                rx="9"
                fill="#FEF2E7"
              />
              <path
                id="Subtract"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0C4.02944 0 0 4.02944 0 9V29C0 33.9706 4.02944 38 9 38H29C33.9706 38 38 33.9706 38 29V9C38 4.02944 33.9706 0 29 0H9ZM10 4C6.68629 4 4 6.68629 4 10V28C4 31.3137 6.68629 34 10 34H28C31.3137 34 34 31.3137 34 28V10C34 6.68629 31.3137 4 28 4H10Z"
                fill="#E7BCA4"
              />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ItemCheckbox;
