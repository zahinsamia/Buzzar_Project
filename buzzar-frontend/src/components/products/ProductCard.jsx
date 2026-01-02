// import React from 'react';

// const ProductCard = ({ product }) => {
//   // Fallback image if product has none
//   const imageSrc = product.image || "https://via.placeholder.com/300x300?text=No+Image";

//   return (
//     <div style={{
//       backgroundColor: "#FFFFFF",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//       overflow: "hidden",
//       transition: "transform 0.2s, box-shadow 0.2s",
//       border: "1px solid #E5E7EB",
//       display: "flex",
//       flexDirection: "column"
//     }}>
//       {/* Product Image */}
//       <div style={{ height: "200px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9fafb" }}>
//         <img 
//           src={imageSrc} 
//           alt={product.name} 
//           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         />
//       </div>

//       {/* Product Details */}
//       <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
//         <h3 style={{ margin: "0 0 0.5rem 0", color: "#1F2937", fontSize: "1.25rem" }}>
//           {product.name}
//         </h3>
        
//         <p style={{ color: "#6B7280", fontSize: "0.9rem", flex: 1, marginBottom: "1rem" }}>
//           {product.description 
//             ? product.description.substring(0, 60) + "..." 
//             : "No description available."}
//         </p>

//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
//           <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2563EB" }}>
//             ${product.price}
//           </span>
          
//           <button style={{
//             backgroundColor: "#2563EB",
//             color: "white",
//             border: "none",
//             padding: "0.5rem 1rem",
//             borderRadius: "6px",
//             cursor: "pointer",
//             fontWeight: "600"
//           }}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;





import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = async () => {
    try {
      await addToCart(product, 1);
      alert("Added to cart!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "0.5rem",
        padding: "1rem",
        backgroundColor: "#111827",
        color: "#F9FAFB",
      }}
    >
      <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        {product.name}
      </h3>
      <p style={{ marginBottom: "0.5rem" }}>
        ${product.price?.toFixed(2)}
      </p>
      <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "0.75rem" }}>
        {product.description?.slice(0, 80)}...
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Link to={`/products/${product._id}`}>
          <button>View Details</button>
        </Link>
        <button onClick={handleAdd}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
