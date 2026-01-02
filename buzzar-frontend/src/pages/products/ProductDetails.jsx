import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart(product, 1);
      alert("Added to cart!");
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading product...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  if (!product) return <p style={{ padding: "2rem" }}>Product not found.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h1>{product.name}</h1>
      <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        ${product.price?.toFixed(2)}
      </p>
      <p style={{ marginTop: "1rem" }}>{product.description}</p>
      <p style={{ marginTop: "0.5rem", color: "#6B7280" }}>
        Category: {product.category}
      </p>
      <p style={{ marginTop: "0.5rem", color: "#6B7280" }}>
        In stock: {product.stock}
      </p>

      <button
        style={{ marginTop: "1.5rem" }}
        onClick={handleAddToCart}
        disabled={adding}
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductDetails;
