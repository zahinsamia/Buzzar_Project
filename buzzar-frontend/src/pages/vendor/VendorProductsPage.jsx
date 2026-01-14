// src/pages/vendor/VendorProductsPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const VendorProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/api/vendor/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/api/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Vendor Products</Typography>

        <Button
          component={Link}
          to="/vendor/products/new"
          variant="contained"
        >
          Add Product
        </Button>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {!loading && error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Table */}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Stock</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell>{p.stock}</TableCell>

                  <TableCell align="right">
                    <Button
                      component={Link}
                      to={`/vendor/products/${p._id}/edit`}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default VendorProductsPage;





























// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";

// const VendorProductsPage = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axiosClient.get("/api/vendor/products");
//                 setProducts(res.data);
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to load products.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);


//     //handleDelete
//     const handleDelete = async (productId) => {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this product?"
//         );

//         if (!confirmDelete) return;

//         try {
//             await axiosClient.delete(`/api/products/${productId}`);
//             setProducts(products.filter((p) => p._id !== productId));
//         } catch (err) {
//             console.error(err);
//             alert("Failed to delete product.");
//         }
//     };
//     //handleDelete Ends


//     if (loading) return <p>Loading products...</p>;
//     if (error) return <p style={{ color: "red" }}>{error}</p>;

//     return (
//         <div style={{ padding: "2rem" }}>
//             <h2>Vendor Products</h2>

//             <Link to="/vendor/products/new">
//                 <button>Add Product</button>
//             </Link>

//             <table style={{ width: "100%", marginTop: "1rem" }}>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Price</th>
//                         <th>Stock</th>
//                         <th />
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map((p) => (
//                         <tr key={p._id}>
//                             <td>{p.name}</td>
//                             <td>${p.price}</td>
//                             <td>{p.stock}</td>

//                             <td>
//                                 <Link
//                                     to={`/vendor/products/${p._id}/edit`}
//                                     style={{ marginRight: "0.5rem" }}
//                                 >
//                                     Edit
//                                 </Link>

//                                 <button
//                                     onClick={() => handleDelete(p._id)}
//                                     style={{ color: "red" }}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>

//                             {/* <td>
//                 <Link to={`/vendor/products/${p._id}/edit`}>
//                   Edit
//                 </Link>
//               </td> */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default VendorProductsPage;
