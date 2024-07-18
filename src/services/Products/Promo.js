import { axiosConfig } from "../AxiosConfig";

export const CreatePromo = async (data) => {
  try {
    const response = await axiosConfig.post("/promo/data", data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};
