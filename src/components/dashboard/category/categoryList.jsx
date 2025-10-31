import React from "react";
import { Virtuoso } from "react-virtuoso";

export function CategoryList() {
  // Sample data
  const data = Array.from({ length: 1000 }, (_, i) => ({
    name: `Category ${i + 1}`,
    image:
      "https://images.pexels.com/photos/33430991/pexels-photo-33430991.jpeg",
    priority: i + 1,
    createdAt: new Date().toISOString(),
  }));

  // Handlers
  const handleEdit = (item) => {
    alert(`Edit clicked for: ${item.name}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete "${item.name}"?`)) {
      alert("Deleted!");
    }
  };

  return (
    <div className="w-full mx-auto  h-[90vh] border rounded-lg shadow-sm bg-white">
      {/* Table Header */}
      <div className="grid grid-cols-5 items-center justify-center bg-gray-100 font-semibold text-gray-700 border-b p-3 text-sm">
        <div>Serial</div>
        <div>Name</div>
        <div>Image</div>
        <div>Priority</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Virtualized Table Rows */}
      <Virtuoso
        data={data}
        itemContent={(index, item) => (
          <div className="grid grid-cols-5 items-center justify-center border-b text-sm hover:bg-gray-50 transition-all py-5">
            <div className="truncate px-2">{index + 1}</div>
            <div className="truncate px-2">{item.name}</div>
            <div className="px-2">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 object-cover rounded"
              />
            </div>
            <div className="px-2 text-center">{item.priority}</div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-2 text-xs cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="px-3 py-2 cursor-pointer text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
