// src/pages/products/ProductList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import ProductCard from "../../components/products/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {!loading && error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;













// import React, { useEffect, useState } from 'react';
// import axiosClient from '../../api/axiosClient';
// import ProductCard from '../../components/products/ProductCard';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // This calls Gateway (3000) -> Inventory Service (3002)
//         // const response = await axiosClient.get('/products');
//         const response = await axiosClient.get('/api/products');
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to load products. Is the Inventory Service running?");
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return (
//     <div style={{ padding: "4rem", textAlign: "center", color: "#6B7280" }}>
//       <h2>Loading Inventory...</h2>
//     </div>
//   );

//   if (error) return (
//     <div style={{ padding: "4rem", textAlign: "center", color: "#EF4444" }}>
//       <h2>Error</h2>
//       <p>{error}</p>
//     </div>
//   );

//   return (
//     <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
//       <h1 style={{ 
//         color: "#1F2937", 
//         marginBottom: "2rem", 
//         borderBottom: "2px solid #E5E7EB", 
//         paddingBottom: "1rem" 
//       }}>
//         Featured Products
//       </h1>

//       {products.length === 0 ? (
//         <p>No products found in the inventory.</p>
//       ) : (
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//           gap: "2rem"
//         }}>
//           {products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;