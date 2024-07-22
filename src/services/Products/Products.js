import { axiosConfig } from "../AxiosConfig";

export const createProduct = async (data) => {
  try {
    // Mengirim data ke server
    const response = await axiosConfig.post("/product/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Header untuk multipart/form-data
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error;
  }
};



export const updateProduct = async (id,data) => {
  try {
    // Mengirim data ke server
    const response = await axiosConfig.put(`/product/data/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Header untuk multipart/form-data
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error;
  }
};


export const DeleteSingleProduct = async (id) => {
  try {
    const response = await axiosConfig.delete(`/product/data/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}






export const getProduct = async (kategori = null) => {
  let url = "/product/data"; // Hanya menggunakan path karena baseURL sudah ada di axiosConfig

  if (kategori) {
    url += `?kategori=${encodeURIComponent(kategori)}`;
  }

  try {
    const response = await axiosConfig.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const getSingleProduct = async (id) => {
  try {
    const response = await axiosConfig.get(`/product/data/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}