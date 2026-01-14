// src/pages/cart/CartPage.jsx
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const CartPage = () => {
  const { cart, loading, addToCart } = useCart();
  const navigate = useNavigate();

  // Track selected items for checkout (manual selection only)
  const [selectedIds, setSelectedIds] = useState(new Set());

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        <Alert severity="info">
          Your cart is empty.{" "}
          <Link to="/products">Go shopping</Link>
        </Alert>
      </Container>
    );
  }

  // Selected items only
  const selectedItems = cart.items.filter((item) =>
    selectedIds.has(item.productId)
  );

  const selectedSubtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.has(item.productId)}
                    onChange={() => {
                      setSelectedIds((prev) => {
                        const next = new Set(prev);
                        if (next.has(item.productId)) {
                          next.delete(item.productId);
                        } else {
                          next.add(item.productId);
                        }
                        return next;
                      });
                    }}
                  />
                </TableCell>

                <TableCell>{item.name}</TableCell>

                <TableCell align="center">
                  ${item.price.toFixed(2)}
                </TableCell>

                <TableCell align="center">
                  <Button
                    size="small"
                    onClick={() =>
                      addToCart(
                        {
                          _id: item.productId,
                          name: item.name,
                          price: item.price,
                        },
                        -1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    −
                  </Button>

                  <Typography
                    component="span"
                    sx={{ mx: 1, fontWeight: "bold" }}
                  >
                    {item.quantity}
                  </Typography>

                  <Button
                    size="small"
                    onClick={() =>
                      addToCart(
                        {
                          _id: item.productId,
                          name: item.name,
                          price: item.price,
                        },
                        1
                      )
                    }
                  >
                    +
                  </Button>
                </TableCell>

                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Subtotal */}
      <Box sx={{ textAlign: "right", mt: 3 }}>
        <Typography variant="h6">
          Subtotal (Selected): ${selectedSubtotal.toFixed(2)}
        </Typography>
      </Box>

      {/* Checkout */}
      <Box sx={{ textAlign: "right", mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            if (selectedItems.length === 0) {
              alert("Please select at least one item to checkout.");
              return;
            }

            navigate("/checkout", {
              state: {
                items: selectedItems,
                totalPrice: selectedSubtotal,
              },
            });
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;


















// import { useCart } from "../../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// const CartPage = () => {
//   const { cart, loading, addToCart } = useCart();
//   const navigate = useNavigate();

//   // Track selected items for checkout (manual selection only)
//   const [selectedIds, setSelectedIds] = useState(new Set());

//   if (loading) return <p style={{ padding: "2rem" }}>Loading cart...</p>;

//   if (!cart || !cart.items || cart.items.length === 0) {
//     return (
//       <div style={{ padding: "2rem" }}>
//         <h2>Your Cart</h2>
//         <p>Your cart is empty.</p>
//         <Link to="/products">Go shopping</Link>
//       </div>
//     );
//   }

//   // Selected items only
//   const selectedItems = cart.items.filter((item) =>
//     selectedIds.has(item.productId)
//   );

//   const selectedSubtotal = selectedItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
//       <h2>Your Cart</h2>

//       <table style={{ width: "100%", marginTop: "1rem" }}>
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th align="left">Product</th>
//             <th>Price</th>
//             <th>Qty</th>
//             <th align="right">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.items.map((item) => (
//             <tr key={item.productId}>
//               <td align="center">
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.has(item.productId)}
//                   onChange={() => {
//                     setSelectedIds((prev) => {
//                       const next = new Set(prev);
//                       if (next.has(item.productId)) {
//                         next.delete(item.productId);
//                       } else {
//                         next.add(item.productId);
//                       }
//                       return next;
//                     });
//                   }}
//                 />
//               </td>

//               <td>{item.name}</td>

//               <td align="center">${item.price.toFixed(2)}</td>

//               <td align="center">
//                 <button
//                   onClick={() =>
//                     addToCart(
//                       {
//                         _id: item.productId,
//                         name: item.name,
//                         price: item.price,
//                       },
//                       -1
//                     )
//                   }
//                   disabled={item.quantity <= 1}
//                 >
//                   -
//                 </button>

//                 <span style={{ margin: "0 0.5rem" }}>
//                   {item.quantity}
//                 </span>

//                 <button
//                   onClick={() =>
//                     addToCart(
//                       {
//                         _id: item.productId,
//                         name: item.name,
//                         price: item.price,
//                       },
//                       1
//                     )
//                   }
//                 >
//                   +
//                 </button>
//               </td>

//               <td align="right">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h3 style={{ textAlign: "right", marginTop: "1.5rem" }}>
//         Subtotal (Selected): ${selectedSubtotal.toFixed(2)}
//       </h3>

//       <div style={{ textAlign: "right", marginTop: "1rem" }}>
//         <button
//           onClick={() => {
//             if (selectedItems.length === 0) {
//               alert("Please select at least one item to checkout.");
//               return;
//             }

//             navigate("/checkout", {
//               state: {
//                 items: selectedItems,
//                 totalPrice: selectedSubtotal,
//               },
//             });
//           }}
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


