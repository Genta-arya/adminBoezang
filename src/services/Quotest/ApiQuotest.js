import { axiosConfig } from "../AxiosConfig";

export const postQuotest = async (data) => {
  try {
    const response = await axiosConfig.post("/quotest/data", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQuotest = async () => {
  try {
    const response = await axiosConfig.get("/quotest/data");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const EditQuotest = async (id, data) => {
  try {
    const response = await axiosConfig.put(`/quotest/data/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const DeleteQuotest = async (id) => {
  try {
    const response = await axiosConfig.delete(`/quotest/data/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}