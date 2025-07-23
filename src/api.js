// src/api.js or wherever your api.js is

import axios from "axios";

const api = axios.create({
  baseURL: "https://food-app-backend-16ip.onrender.com/api", // ✅ FIXED
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
