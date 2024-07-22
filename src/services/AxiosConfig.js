import axios from 'axios';


const baseURL = "https://boezangapi.hkks.shop/api/v1";
// const baseURL = "http://localhost:5001/api/v1";

export const axiosConfig = axios.create({
  baseURL: baseURL
 
});

