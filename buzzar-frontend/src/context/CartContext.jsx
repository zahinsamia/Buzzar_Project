// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null); // { userId, items: [], subtotal }
  const [loading, setLoading] = useState(false);

  // Load cart once user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // no cart for guests in your backend

    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/api/cart");
        setCart(res.data);
      } catch (err) {
        console.error("Error loading cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      const body = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
      };

      const res = await axiosClient.post("/api/cart/add", body);
      // backend returns updated cart
      setCart(res.data);
    } catch (err) {
      console.error("Error adding to cart:", err);
      throw new Error("Failed to add item to cart.");
    }
  };



  const clearCartLocal = () => setCart(null); // we’ll extend this later for checkout

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        clearCartLocal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
