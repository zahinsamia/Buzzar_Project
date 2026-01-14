// src/pages/vendor/VendorOrdersPage.jsx
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const VendorOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosClient.get("/api/vendor/orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load vendor orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosClient.put(`/api/orders/${orderId}/status`, {
        status: newStatus,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update order status.");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vendor Orders
      </Typography>

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

      {/* Orders Table */}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Order ID</strong></TableCell>
                <TableCell><strong>Customer</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user?.name || "N/A"}</TableCell>
                  <TableCell>${order.totalAmount}</TableCell>

                  <TableCell>
                    <Select
                      size="small"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
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

export default VendorOrdersPage;




























// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";

// const VendorOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axiosClient.get("/api/vendor/orders");
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load vendor orders.");
//       }
//     };

//     fetchOrders();
//   }, []);

//   const updateStatus = async (orderId, newStatus) => {
//     try {
//       await axiosClient.put(`/api/orders/${orderId}/status`, {
//         orderStatus: newStatus,
//       });

//       setOrders(
//         orders.map((o) =>
//           o._id === orderId ? { ...o, orderStatus: newStatus } : o
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update order status.");
//     }
//   };

//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Vendor Orders</h2>

//       <table width="100%" border="1" cellPadding="8">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>User</th>
//             <th>Total</th>
//             <th>Status</th>
//             <th>Change Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((o) => (
//             <tr key={o._id}>
//               <td>{o._id.slice(-6)}</td>
//               <td>{o.userId}</td>
//               <td>${o.totalPrice}</td>
//               <td>{o.orderStatus}</td>
//               <td>
//                 <select
//                   value={o.orderStatus}
//                   onChange={(e) =>
//                     updateStatus(o._id, e.target.value)
//                   }
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Delivered">Delivered</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VendorOrdersPage;
