// src/pages/checkout/CheckoutPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../../api/axiosClient";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { items = [], totalPrice = 0 } = location.state || {};

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!items || items.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">
          No items selected for checkout.
        </Alert>
      </Container>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!address || !city || !postalCode || !country) {
      setError("All address fields are required.");
      return;
    }

    try {
      setLoading(true);

      await axiosClient.post("/api/orders", {
        items,
        totalPrice,
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
      });

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      setError("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Shipping Address */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Address"
                fullWidth
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label="City"
                fullWidth
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Postal Code"
                fullWidth
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Country"
                fullWidth
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order & Pay"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            {items.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography>
                  {item.name} × {item.quantity}
                </Typography>
                <Typography>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                pt: 2,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;



































// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";
// import { useCart } from "../../context/CartContext";

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { loading } = useCart(); // keep loading for UX consistency (no cart usage here)

//   // ✅ ONLY use selected items passed from CartPage
//   const checkoutItems = location.state?.items || [];
//   const checkoutTotalPrice = location.state?.totalPrice ?? 0;

//   const [shipping, setShipping] = useState({
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ Guard: if user opens /checkout directly or refreshes, no items exist
//   if (!loading && (!checkoutItems || checkoutItems.length === 0)) {
//     return (
//       <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
//         <h2>Checkout</h2>
//         <p style={{ color: "red" }}>
//           No items selected for checkout. Please select items from your cart.
//         </p>
//         <button onClick={() => navigate("/cart")}>Back to Cart</button>
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     setShipping({ ...shipping, [e.target.name]: e.target.value });
//   };

//   const handleCheckout = async () => {
//     // basic validation (prevents empty shipping fields causing messy orders)
//     if (
//       !shipping.address.trim() ||
//       !shipping.city.trim() ||
//       !shipping.postalCode.trim() ||
//       !shipping.country.trim()
//     ) {
//       setError("Please fill in all shipping address fields.");
//       return;
//     }

//     setSubmitting(true);
//     setError("");

//     try {
//       // 1️⃣ Create Order with ONLY selected items
//       const orderRes = await axiosClient.post("/api/checkout", {
//         items: checkoutItems,
//         totalPrice: checkoutTotalPrice,
//         shippingAddress: shipping,
//       });

//       const orderId = orderRes.data._id;

//       // 2️⃣ Process Payment (Stripe test)
//       await axiosClient.post("/api/checkout/payment", { orderId });

//       // 3️⃣ Redirect to order tracking
//       navigate(`/orders/${orderId}`);
//     } catch (err) {
//       console.error("Checkout error:", err);
//       setError("Checkout failed. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <p style={{ padding: "2rem" }}>Loading checkout...</p>;

//   return (
//     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
//       <h2>Checkout</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* SHIPPING FORM */}
//       <div style={{ marginBottom: "2rem" }}>
//         <h3>Shipping Address</h3>

//         <input
//           name="address"
//           placeholder="Address"
//           value={shipping.address}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", marginBottom: "0.5rem" }}
//         />

//         <input
//           name="city"
//           placeholder="City"
//           value={shipping.city}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", marginBottom: "0.5rem" }}
//         />

//         <input
//           name="postalCode"
//           placeholder="Postal Code"
//           value={shipping.postalCode}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", marginBottom: "0.5rem" }}
//         />

//         <input
//           name="country"
//           placeholder="Country"
//           value={shipping.country}
//           onChange={handleChange}
//           required
//           style={{ width: "100%" }}
//         />
//       </div>

//       {/* ORDER SUMMARY */}
//       <div style={{ marginBottom: "2rem" }}>
//         <h3>Order Summary</h3>

//         {checkoutItems.map((item) => (
//           <div
//             key={item.productId}
//             style={{ display: "flex", justifyContent: "space-between" }}
//           >
//             <span>
//               {item.name} × {item.quantity}
//             </span>
//             <span>${(item.price * item.quantity).toFixed(2)}</span>
//           </div>
//         ))}

//         <hr />
//         <h4>Total: ${Number(checkoutTotalPrice).toFixed(2)}</h4>
//       </div>

//       <button onClick={handleCheckout} disabled={submitting}>
//         {submitting ? "Processing..." : "Place Order & Pay"}
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;




