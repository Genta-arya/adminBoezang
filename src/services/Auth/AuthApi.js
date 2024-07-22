import { axiosConfig } from "../AxiosConfig";

export const handleLogin = async (email, password) => {
  try {
    const response = await axiosConfig.post("/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkLogin = async (token) => {
  try {
    const response = await axiosConfig.post("/user/authentikasi", {
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Logout = async (token) => {
  try {
    const response = await axiosConfig.post("/user/logout",{token});
    return response.data;
  } catch (error) {
    throw error;
  }
};
