import React from "react";
import "../style.css";

interface ItemDeleteButtonProps {
  onClick: () => void;
}

export const ItemDeleteButton: React.FC<ItemDeleteButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="delete-button" onClick={onClick}>
      <svg width="14" height="14" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1.5H4.29289C4.87825 1.5 5.43964 1.26747 5.85355 0.853553C6.07993 0.627177 6.38696 0.5 6.70711 0.5H9.29289C9.61304 0.5 9.92007 0.627177 10.1464 0.853553C10.5604 1.26747 11.1217 1.5 11.7071 1.5H15C15.2761 1.5 15.5 1.72386 15.5 2C15.5 2.27614 15.2761 2.5 15 2.5H1C0.723858 2.5 0.5 2.27614 0.5 2C0.5 1.72386 0.723858 1.5 1 1.5ZM1.5 17V7C1.5 5.61929 2.61929 4.5 4 4.5H12C13.3807 4.5 14.5 5.61929 14.5 7V17C14.5 17.8239 13.8239 18.5 13 18.5H3C2.17614 18.5 1.5 17.8239 1.5 17ZM6.5 16V7C6.5 6.17157 5.82843 5.5 5 5.5C4.17157 5.5 3.5 6.17157 3.5 7V16C3.5 16.8284 4.17157 17.5 5 17.5C5.82843 17.5 6.5 16.8284 6.5 16ZM12.5 16V7C12.5 6.17157 11.8284 5.5 11 5.5C10.1716 5.5 9.5 6.17157 9.5 7V16C9.5 16.8284 10.1716 17.5 11 17.5C11.8284 17.5 12.5 16.8284 12.5 16Z" fill="#4E4E4E" stroke="#4E4E4E"/>
</svg>


    </div>
  );
};

export default ItemDeleteButton;
