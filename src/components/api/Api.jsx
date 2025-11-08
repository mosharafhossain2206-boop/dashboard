import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../utils/axios";

// create banner
export const getAllbanner = () => {
  try {
    const queryResponse = useQuery({
      queryKey: ["bannerlist"],
      queryFn: async () => {
        const reponse = await api.get("/banner/get-banner");
        return reponse.data;
      },
    });
    return queryResponse;
  } catch (error) {
    throw new Error("get allbanner newtwork request failed in ", error);
  }
};

// get single banner
export const getSinglebanner = (slug) => {
  try {
    const queryResponse = useQuery({
      queryKey: ["singleBanner", { slug }],
      queryFn: async ({ queryKey }) => {
        const [, { slug }] = queryKey;
        const response = await api.get("/banner/get-banner", {
          params: { slug },
        });
        return response.data;
      },
      enabled: !!slug, // only run if slug exists
    });
    return queryResponse;
  } catch (error) {
    throw new Error("get allbanner newtwork request failed in ", error);
  }
};
