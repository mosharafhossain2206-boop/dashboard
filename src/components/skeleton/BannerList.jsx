import React from "react";

const BannerTableSkeleton = () => {
  const rows = Array.from({ length: 6 });

  return (
    <div className="w-full mx-auto h-[90vh] border rounded-lg shadow-sm bg-white animate-pulse">
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

      {/* Skeleton Rows */}
      <div className="overflow-y-auto h-[calc(90vh-50px)]">
        {rows.map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[150px_120px_200px_200px_300px_100px_180px_150px] items-center border-b text-sm py-5 px-2"
          >
            <div className="h-4 bg-gray-200 rounded w-[80%]" />
            <div className="h-20 w-20 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-[90%]" />
            <div className="h-4 bg-gray-200 rounded w-[70%]" />
            <div className="h-4 bg-gray-200 rounded w-[95%]" />
            <div className="h-4 bg-gray-200 rounded w-[40%] mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-[60%]" />
            <div className="flex justify-center gap-2">
              <div className="h-8 w-12 bg-gray-200 rounded" />
              <div className="h-8 w-12 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerTableSkeleton;
