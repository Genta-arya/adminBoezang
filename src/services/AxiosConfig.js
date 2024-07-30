import axios from 'axios';




export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_NODE_ENV !== 'production' ? import.meta.env.VITE_API_URL_LOCAL :  import.meta.env.VITE_API_URL,
 
});

