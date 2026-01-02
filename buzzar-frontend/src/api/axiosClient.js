// import axios from "axios";

// const axiosClient = axios.create({
//   // baseURL: "http://localhost:3000", 
//     baseURL: "http://localhost:3000/api", 

//   headers: {
//     "Content-Type": "application/json",
//   },
// });



// // Request Interceptor: Attach the Token for protected routes (like the Cart)
// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // You should check your backend documentation for the correct header name.
//       // Common names are 'Authorization' or 'x-auth-token'.
//       // We will use 'Authorization: Bearer <token>' which is standard.
//       config.headers['Authorization'] = `Bearer ${token}`; 
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosClient;




//rasha1
// src/api/axiosClient.js
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
