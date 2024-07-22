import { axiosConfig } from "../AxiosConfig";

export const createArtikel = async (data) => {
  try {
    // Mengirim data ke server
    const response = await axiosConfig.post("/artikel/data", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Header untuk multipart/form-data
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getArtikel = async () => {
  try {
    const response = await axiosConfig.get("/artikel/data");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateArtikel = async (id, data) => {
  try {
    const response = await axiosConfig.put(`/artikel/data/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateSingleStatus = async (id, data) => {
  try {
    const response = await axiosConfig.put(`/artikel/data/status/${id}`, {
      status: data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
