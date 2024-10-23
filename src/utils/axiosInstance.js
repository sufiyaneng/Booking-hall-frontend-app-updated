import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-sand-one-58.vercel.app/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  
  },
});

export default axiosInstance;
