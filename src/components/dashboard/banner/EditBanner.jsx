import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CreateBanner } from "./CreateBanner";

export function EditBanner() {
  const { id } = useParams(); // Get the banner ID from URL
  const [bannerData, setBannerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the banner data by ID from API
    async function fetchBanner() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/banner/single-banner/summer-sale-banner`
        );
        const data = await res.json();

        setBannerData(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBanner();
  }, [id]);

  if (!bannerData) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Banner</h2>
      {/* Reuse CreateBanner form but pass default values */}
      <CreateBanner defaultValues={bannerData} />
      <button
        onClick={() => navigate("/bannerlist")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
}
