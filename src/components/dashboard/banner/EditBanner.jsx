import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CreateBanner } from "./CreateBanner";
import { getSinglebanner } from "../../api/Api";
import BannerTableSkeleton from "../../skeleton/BannerList";
import GenericError from "../../error/Generics";

export function EditBanner() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { isLoading, data, isError } = getSinglebanner(slug);
  if (isLoading) {
    return <BannerTableSkeleton />;
  }
  if (isError) {
    return (
      <GenericError message="banneEdit Error occured !!" onRetry={refetch} />
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Banner</h2>
      {/* Reuse CreateBanner form but pass default values */}
      <CreateBanner
        defaultValues={{
          ...data.data[0],
          endDate: data.data[0].endDate.split("T")[0],
          startDate: data.data[0].startDate.split("T")[0],
        }}
      />
      <button
        onClick={() => navigate("/bannerlist")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
}
