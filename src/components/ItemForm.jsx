import React, { useState } from "react";
import {
  useAddItemMutation,
  useUpdateItemMutation,
} from "../features/apiSlice";

const ItemForm = ({ item }) => {
  const [name, setName] = useState(item ? item.name : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const [addItem] = useAddItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (item) {
        await updateItem({ id: item.id, name, description }).unwrap();
      } else {
        await addItem({ name, description }).unwrap();
      }
      setName("");
      setDescription("");
      if (typeof onSubmit === "function") onSubmit();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button 
       type="submit"
       >
        {item ? "Update Item" : "Add Item"}
        </button>
    </form>
  );
};

export default ItemForm;
