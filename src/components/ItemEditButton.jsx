import React from "react";

const ItemEditButton = ({ onEdit }) => {
  return (
    <button
     onClick={onEdit} 
     style={{ marginRight: "8px" }}
     >
      Edit
    </button>
  );
};

export default ItemEditButton;
