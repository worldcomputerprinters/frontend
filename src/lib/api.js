import axios from "axios";

// In dev this defaults to your local backend so nothing extra is needed to
// get started; set VITE_API_URL in frontend/.env once you deploy the API.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attaches the stored admin token to every request automatically —
// individual admin pages never have to think about auth headers.
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("wc_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
