import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Virtuoso } from "react-virtuoso";
import { getAllbanner } from "../../api/Api";
import BannerTableSkeleton from "../../skeleton/BannerList";
import GenericError from "../../error/Generics";
import DeleteConfirmModal from "../../commonCoponents/DeleteConfirmModal";
import { useDeleteBanner } from "../../../hooks/useCreateBanner";

export function BannerList() {
  const navigate = useNavigate();
  const deleteBanner = useDeleteBanner();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isError, isLoading, refetch } = getAllbanner();

  if (isLoading) {
    return <BannerTableSkeleton />;
  }
  if (isError) {
    return <GenericError message="bannelist no Found" onRetry={refetch} />;
  }

  const handleEdit = (item) => {
    navigate(`/editBanner/${item}`);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      // api hit
      deleteBanner.mutate(selectedItem);
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-full mx-auto h-[90vh] border rounded-lg shadow-sm bg-white">
      {/* Table Header */}
      <div className="grid capitalize grid-cols-[150px_120px_150px_200px_200px_100px_180px_150px] bg-gray-100 font-semibold text-gray-700 border-b p-3 text-sm">
        <div>Title</div>
        <div>Image</div>
        <div>Link</div>
        <div>Target Type</div>
        <div>Description</div>
        <div>Priority</div>
        <div>Created At</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Virtualized Table Rows */}
      <Virtuoso
        data={data?.data}
        itemContent={(index, item) => (
          <div
            key={item._id}
            className="grid grid-cols-[150px_120px_150px_200px_200px_100px_180px_150px] items-center border-b text-sm hover:bg-gray-50 transition-all py-5"
          >
            <div className="truncate px-2">{item.title}</div>
            <div className="px-2">
              <img
                src={item.image?.url}
                alt={item.title}
                className="h-20 w-20 object-cover rounded"
              />
            </div>
            <div className="truncate px-2 text-blue-600">
              <a
                href={item.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.targetUrl}
              </a>
            </div>
            <div className="truncate px-2">{item.targetType}</div>
            <div className="truncate px-2 text-gray-600">
              {item.description}
            </div>
            <div className="px-2 text-center">{item.priority}</div>
            <div className="px-2 text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(item.slug)}
                className="px-3 py-3 text-xs cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 cursor-pointer py-3 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        item={selectedItem}
        isLoading={deleteBanner.isPending}
      />
    </div>
  );
}
