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
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.6667 0C29.6122 0 32 2.38781 32 5.33333V26.6667C32 29.6122 29.6122 32 26.6667 32H5.33333C2.38781 32 0 29.6122 0 26.6667V5.33333C0 2.38781 2.38781 0 5.33333 0H26.6667ZM23.9461 8.83497L12.4444 20.3366L8.05392 15.9461C7.53322 15.4254 6.689 15.4254 6.1683 15.9461C5.6476 16.4668 5.6476 17.311 6.1683 17.8317L11.5016 23.165C12.0223 23.6857 12.8666 23.6857 13.3873 23.165L25.8317 10.7206C26.3524 10.1999 26.3524 9.35567 25.8317 8.83497C25.311 8.31427 24.4668 8.31427 23.9461 8.83497Z" fill="#B9835E"/>
</svg>

        </div>
      ) : (
        <div className="checkbox-unchecked">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.88889 0H27.1111C29.8112 0 32 2.18883 32 4.88889V27.1111C32 29.8112 29.8112 32 27.1111 32H4.88889C2.18883 32 0 29.8112 0 27.1111V4.88889C0 2.18883 2.18883 0 4.88889 0ZM4.88889 2.66667C3.66159 2.66667 2.66667 3.66159 2.66667 4.88889V27.1111C2.66667 28.3384 3.66159 29.3333 4.88889 29.3333H27.1111C28.3384 29.3333 29.3333 28.3384 29.3333 27.1111V4.88889C29.3333 3.66159 28.3384 2.66667 27.1111 2.66667H4.88889Z" fill="#B9835E"/>
</svg>

        </div>
      )}
    </div>
  );
};

export default ItemCheckbox;
