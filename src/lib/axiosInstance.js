import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api/v1/",
  baseURL: "https://chatapp-backend-v5jc.onrender.com/api/v1/",
  withCredentials: true,
});

export default axiosInstance;
