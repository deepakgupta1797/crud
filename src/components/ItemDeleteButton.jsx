import React from "react";
import { useDeleteItemMutation } from "../features/apiSlice";

const ItemDeleteButton = ({ id }) => {
  const [deleteItem, { isLoading }] = useDeleteItemMutation();

  const handleDelete = async () => {
    try {
      await deleteItem(id).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{ color: "red" }}
      disabled={isLoading}
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default ItemDeleteButton;
