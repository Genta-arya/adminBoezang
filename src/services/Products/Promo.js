import { axiosConfig } from "../AxiosConfig";

export const CreatePromo = async (data) => {
  try {
    const response = await axiosConfig.post("/promo/data", data, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSinglePromo = async (id, data) => {
  try {
    const response = await axiosConfig.put(`/promo/data/${id}`, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const StopPromo = async (id) => {
  try {
    const response = await axiosConfig.delete(`/promo/data/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}