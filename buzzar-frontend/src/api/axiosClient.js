import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",   // ✔ Correct: Gateway root
});

// Attach token for ALL requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // ✔ Correct header name (used by your backend)
    config.headers["x-auth-token"] = token;
  }

  return config;
});

export default axiosClient;
