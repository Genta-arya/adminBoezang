
import { axiosConfig } from "../AxiosConfig";

export const createBrowsur = async (data) => {
  try {
    
    const response = await axiosConfig.post("/popup/data/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error;
  }
};

export const getBrowsur = async () => {
  try {
    const response = await axiosConfig.get("/popup/data");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const EditTitle = async ({ title, id }) => {
  console.log(title);
  try {
    const response = await axiosConfig.put(`/popup/data/edit/${id}`, { title });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editSingleImage = async (browsurId, imageId, file) => {
  const formData = new FormData();

  formData.append("image", file); 

  try {
    const response = await axiosConfig.put(
      `/popup/data/edit/${browsurId}/image/${imageId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; 
  } catch (error) {
 
    throw error; 
  }
};


export const DeleteBrowsur = async (id) => {
    try {
        const response = await axiosConfig.delete(`/popup/data/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const UpdateStatusBrowsur = async ({ id, status }) => {
    console.log(status)
  try {
    const response = await axiosConfig.put(`/popup/data/status/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
}