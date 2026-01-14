// src/components/products/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // ✅ Get first image safely (fallback if none)
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/300x200?text=No+Image";

  const handleAdd = async () => {
    try {
      await addToCart(product, 1);
      alert("Added to cart!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="180"
        image={imageSrc}
        alt={product.name}
      />

      {/* Product Info */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.primary"
          fontWeight="bold"
        >
          ${product.price?.toFixed(2)}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {product.description?.slice(0, 80)}...
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Button
            component={Link}
            to={`/products/${product._id}`}
            size="small"
            variant="outlined"
          >
            View Details
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={handleAdd}
          >
            Add to Cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ProductCard;








// import { Link } from "react-router-dom";
// import { useCart } from "../../context/CartContext";

// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart();

//   // ✅ Get first image safely (fallback if none)
//   const imageSrc =
//     product.images && product.images.length > 0
//       ? product.images[0]
//       : "https://via.placeholder.com/300x200?text=No+Image";

//   const handleAdd = async () => {
//     try {
//       await addToCart(product, 1);
//       alert("Added to cart!");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div
//       style={{
//         border: "1px solid #E5E7EB",
//         borderRadius: "0.5rem",
//         padding: "1rem",
//         backgroundColor: "#111827",
//         color: "#F9FAFB",
//       }}
//     >
//       {/* ✅ Product Image (first image only) */}
//       <img
//         src={imageSrc}
//         alt={product.name}
//         style={{
//           width: "100%",
//           height: "180px",
//           objectFit: "cover",
//           borderRadius: "0.5rem",
//           marginBottom: "0.75rem",
//         }}
//       />

//       <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
//         {product.name}
//       </h3>

//       <p style={{ marginBottom: "0.5rem" }}>
//         ${product.price?.toFixed(2)}
//       </p>

//       <p
//         style={{
//           fontSize: "0.9rem",
//           color: "#9CA3AF",
//           marginBottom: "0.75rem",
//         }}
//       >
//         {product.description?.slice(0, 80)}...
//       </p>

//       <div style={{ display: "flex", gap: "0.5rem" }}>
//         <Link to={`/products/${product._id}`}>
//           <button>View Details</button>
//         </Link>
//         <button onClick={handleAdd}>Add to Cart</button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;





