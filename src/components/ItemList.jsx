import React, { useState } from "react";
import { useGetItemsQuery } from "../features/apiSlice";
import ItemDeleteButton from "./ItemDeleteButton";
import ItemForm from "./ItemForm";

const ItemList = () => {
  const { data, error, isLoading, refetch } = useGetItemsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log('data:', data);
  console.log('error:', error);
  console.log('isLoading:', isLoading);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const handleEditDone = () => {
    setEditingId(null);
  };

  if (isLoading) return;
  <div>Loading...</div>;

  if (error) return;
  <div>Error fetching items</div>;

  
  const filteredData = data?.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );
  console.log('data:', data);
  console.log('search:', search);

  console.log('filteredData:', filteredData);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or description"
        style={{ marginBottom: "16px", padding: "8px", width: "100%" }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Description
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item) => (
            <React.Fragment key={item.id}>
              {editingId === item.id ? (
                <tr>
                  <td
                    colSpan={3}
                    style={{ border: "1px solid #ccc", padding: "8px" }}
                  >
                    <ItemForm
                      key={item.id}
                      item={item}
                      onSubmit={handleEditDone}
                    />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {item.name}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {item.description}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    <button
                      onClick={() => setEditingId(item.id)}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </button>
                    <ItemDeleteButton id={item.id} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
