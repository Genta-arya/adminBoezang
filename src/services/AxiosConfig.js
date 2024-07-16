import axios from 'axios';


const baseUrl = "http://localhost:5001/api/v1";


export const axiosConfig = axios.create({
  baseURL: baseUrl,
 
});
