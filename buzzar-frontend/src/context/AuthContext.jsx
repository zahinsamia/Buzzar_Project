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
