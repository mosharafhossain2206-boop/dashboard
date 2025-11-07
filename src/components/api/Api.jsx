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
