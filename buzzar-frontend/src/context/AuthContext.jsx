// import React, { createContext, useContext, useEffect, useState } from "react";
// import axiosClient from "../api/axiosClient";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);    // { _id, username, email, role, ... }
//   const [loading, setLoading] = useState(true);

//   // Load user if token exists in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     axiosClient
//       // FIX 1: Removed /api/
//       .get("/users/me") 
//       .then((res) => {
//         setUser(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching /users/me:", err?.response?.data || err.message);
//         localStorage.removeItem("token");
//         setUser(null);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const login = async (email, password) => {
//     try {
//       // 1) get token
//       // FIX 2: Removed /api/
//       const res = await axiosClient.post("/auth/login", { email, password });
//       const { token } = res.data;

//       if (!token) {
//         throw new Error("No token returned from server");
//       }

//       // 2) store token
//       localStorage.setItem("token", token);

//       // 3) fetch current user
//       // FIX 3: Removed /api/
//       const meRes = await axiosClient.get("/users/me"); 
//       setUser(meRes.data);

//       return meRes.data;
//     } catch (err) {
//       console.error("Login error:", err?.response?.data || err.message);
//       const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
//       throw new Error(msg);
//     }
//   };

//   const register = async ({ username, email, password, role }) => {
//     try {
//       // 1) create the user
//       // FIX 4: Removed /api/
//       const res = await axiosClient.post("/auth/register", {
//         username,
//         email,
//         password,
//         role,
//       });
//       console.log("Register response:", res.data);

//       // 2) after successful registration, log them in
//       await login(email, password);

//     } catch (err) {
//       console.error("Register error:", err?.response?.data || err.message);
//       const msg =
//         err.response?.data?.message ||
//         "Registration failed. Please check your input.";
//       throw new Error(msg);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);





import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axiosClient
      .get("/api/users/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axiosClient.post("/api/auth/login", { email, password });
      const { token } = res.data;

      if (!token) throw new Error("No token returned from server");

      localStorage.setItem("token", token);

      const userRes = await axiosClient.get("/api/users/me");
      setUser(userRes.data);

      return userRes.data;
    } catch (err) {
      console.error("Login error:", err);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const register = async (form) => {
    try {
      await axiosClient.post("/api/auth/register", form);
      await login(form.email, form.password);
    } catch (err) {
      console.error("Register error:", err);
      throw new Error("Registration failed. Please check your input.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
