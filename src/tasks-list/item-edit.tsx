import React from "react";
import "../style.css";

interface ItemEditButtonProps {
  onClick: () => void;
}

export const ItemEditButton: React.FC<ItemEditButtonProps> = ({ onClick }) => {
  return (
    <div className="edit-button" onClick={onClick}>
      <svg
        fill="#000000"
        version="1.1"
        id="Capa_1"
        width="20px"
        height="20px"
        viewBox="0 0 50 50"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <path d="M48.036,15.73L48.036,15.73l-3.313,5.738v22.976c0,0.144-0.135,0.279-0.277,0.279H5.556c-0.143,0-0.278-0.136-0.278-0.279 V5.556c0-0.143,0.135-0.278,0.278-0.278h28.42l1.291-2.235l0,0l0.744-1.29C36.395,1.088,36.877,0.507,37.425,0H5.556 C2.492,0,0,2.492,0,5.556v38.889C0,47.508,2.492,50,5.556,50h38.889C47.508,50,50,47.508,50,44.443V12.326L48.036,15.73z"></path>{" "}
              <polygon points="25.889,26.23 25.943,36.589 34.943,31.461 45.594,13.013 36.538,7.785 "></polygon>{" "}
              <path d="M48.076,8.714c1.25-2.167,0.232-5.087-2.268-6.531s-5.539-0.865-6.791,1.304l-1.31,2.273l9.058,5.227L48.076,8.714z"></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    </div>
  );
};

export default ItemEditButton;
