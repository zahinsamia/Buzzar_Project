// src/pages/products/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAdd = async () => {
    try {
      await addToCart(product, 1);
      alert("Added to cart!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) return null;

  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <Container sx={{ py: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={imageSrc}
          alt={product.name}
        />

        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>

          <Typography
            variant="h6"
            color="text.primary"
            fontWeight="bold"
            gutterBottom
          >
            ${product.price?.toFixed(2)}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Button variant="contained" size="large" onClick={handleAdd}>
            Add to Cart
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default ProductDetails;
















// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";
// import { useCart } from "../../context/CartContext";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [adding, setAdding] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axiosClient.get(`/api/products/${id}`);
//         setProduct(res.data);

//         if (res.data.images && res.data.images.length > 0) {
//           setSelectedImage(res.data.images[0]);
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError("Failed to load product details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = async () => {
//     try {
//       setAdding(true);
//       await addToCart(product, 1);
//       alert("Added to cart!");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setAdding(false);
//     }
//   };

//   // ✅ BUY NOW (temporary checkout, cart untouched)
//   const handleBuyNow = () => {
//     const buyNowItem = {
//       productId: product._id,
//       name: product.name,
//       price: product.price,
//       quantity: 1,
//     };

//     navigate("/checkout", {
//       state: {
//         items: [buyNowItem],
//         totalPrice: product.price,
//       },
//     });
//   };

//   if (loading) return <p style={{ padding: "2rem" }}>Loading product...</p>;
//   if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
//   if (!product) return <p style={{ padding: "2rem" }}>Product not found.</p>;

//   return (
//     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
//       {/* Image Gallery */}
//       {product.images && product.images.length > 0 && (
//         <div style={{ marginBottom: "2rem" }}>
//           <img
//             src={selectedImage}
//             alt={product.name}
//             style={{
//               width: "100%",
//               maxHeight: "400px",
//               objectFit: "contain",
//               borderRadius: "0.5rem",
//               marginBottom: "1rem",
//               border: "1px solid #E5E7EB",
//             }}
//           />

//           <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
//             {product.images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Thumbnail ${index + 1}`}
//                 onClick={() => setSelectedImage(img)}
//                 style={{
//                   width: "80px",
//                   height: "80px",
//                   objectFit: "cover",
//                   cursor: "pointer",
//                   borderRadius: "0.25rem",
//                   border:
//                     selectedImage === img
//                       ? "2px solid #2563EB"
//                       : "1px solid #D1D5DB",
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       <h1>{product.name}</h1>

//       <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
//         ${product.price?.toFixed(2)}
//       </p>

//       <p style={{ marginTop: "1rem" }}>{product.description}</p>

//       <p style={{ marginTop: "0.5rem", color: "#6B7280" }}>
//         Category: {product.category}
//       </p>

//       <p style={{ marginTop: "0.5rem", color: "#6B7280" }}>
//         In stock: {product.stock}
//       </p>

//       <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
//         <button onClick={handleAddToCart} disabled={adding}>
//           {adding ? "Adding..." : "Add to Cart"}
//         </button>

//         <button
//           onClick={handleBuyNow}
//           style={{ backgroundColor: "#2563EB", color: "white" }}
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;




