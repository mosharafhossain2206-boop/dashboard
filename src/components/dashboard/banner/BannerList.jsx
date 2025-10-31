import React from "react";
import { useNavigate } from "react-router";
import { Virtuoso } from "react-virtuoso";

export function BannerList() {
  const navigate = useNavigate();
  const data = Array.from({ length: 1000 }, (_, i) => ({
    title: `Summer Sale Banner ${i + 1}`,
    image:
      "https://images.pexels.com/photos/33430991/pexels-photo-33430991.jpeg",
    link: "https://yourwebsite.com/summer-sale",
    headLine: "Up to 50% Off on All Products",
    description:
      "Get the best summer deals before they’re gone. Limited time offer!",
    isActive: i % 2 === 0,
    priority: i + 1,
    createdAt: new Date().toISOString(),
  }));

  const handleEdit = (item) => {
    navigate(`/editBanner/1`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete "${item.title}"?`)) {
      alert("Deleted!");
    }
  };

  return (
    <div className="w-full mx-auto h-[90vh] border rounded-lg shadow-sm bg-white">
      {/* Table Header */}
      <div className="grid grid-cols-[150px_120px_200px_200px_300px_100px_180px_150px] bg-gray-100 font-semibold text-gray-700 border-b p-3 text-sm">
        <div>Title</div>
        <div>Image</div>
        <div>Link</div>
        <div>Headline</div>
        <div>Description</div>
        <div>Priority</div>
        <div>Created At</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Virtualized Table Rows */}
      <Virtuoso
        data={data}
        itemContent={(index, item) => (
          <div className="grid grid-cols-[150px_120px_200px_200px_300px_100px_180px_150px] items-center border-b text-sm hover:bg-gray-50 transition-all py-5">
            <div className="truncate px-2">{item.title}</div>
            <div className="px-2">
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 object-cover rounded"
              />
            </div>
            <div className="truncate px-2 text-blue-600">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.link}
              </a>
            </div>
            <div className="truncate px-2">{item.headLine}</div>
            <div className="truncate px-2 text-gray-600">
              {item.description}
            </div>
            <div className="px-2 text-center">{item.priority}</div>
            <div className="px-2 text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-3 text-xs cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="px-3 cursor-pointer py-3 text-xs bg-red-500 text-white rounded hover:bg-red-600"
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
