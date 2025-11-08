import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../utils/axios";
import { useNavigate } from "react-router";

function useCreateBanner() {
  return useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (key === "image") {
          formData.append("image", values.image[0]);
        } else {
          formData.append(key, values[key]);
        }
      }

      const res = await api.post("/banner/create-banner", formData);
      return res.data;
    },

    onSuccess: (data) => {
      console.log("✅ Banner created successfully:", data);
      // e.g. toast.success("Banner created successfully!");
    },

    onError: (error) => {
      console.error("❌ Failed to create banner:", error);
      // e.g. toast.error(error.response?.data?.message || "Failed to create banner");
    },
  });
}

// update banner
function useUpdateBanner() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (key === "image") {
          formData.append("image", values.image[0]);
        } else {
          formData.append(key, values[key]);
        }
      }

      const res = await api.put(`/banner/update-banner/${values.id}`, formData);
      return res.data;
    },

    onSuccess: (data) => {
      console.log("✅ Banner update successfully:", data);
      navigate("/bannerlist");
      // e.g. toast.success("Banner created successfully!");
    },

    onError: (error) => {
      console.error("❌ Failed to update banner:", error);
      // e.g. toast.error(error.response?.data?.message || "Failed to create banner");
    },
  });
}
// update banner
function useDeleteBanner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/banner/delete-banner/${id}`);
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(["bannerlist"]);
      console.log("✅ Banner delete successfully:", data);
    },

    onError: (error) => {
      console.error("❌ Failed to delete banner:", error);
      // e.g. toast.error(error.response?.data?.message || "Failed to create banner");
    },
  });
}
export { useCreateBanner, useUpdateBanner, useDeleteBanner };
