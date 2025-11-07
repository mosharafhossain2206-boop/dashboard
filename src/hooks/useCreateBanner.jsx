import { useMutation } from "@tanstack/react-query";
import { api } from "../utils/axios";

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

export { useCreateBanner };
