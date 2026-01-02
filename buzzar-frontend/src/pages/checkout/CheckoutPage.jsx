import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useCart(); // keep loading for UX consistency (no cart usage here)

  // ✅ ONLY use selected items passed from CartPage
  const checkoutItems = location.state?.items || [];
  const checkoutTotalPrice = location.state?.totalPrice ?? 0;

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ✅ Guard: if user opens /checkout directly or refreshes, no items exist
  if (!loading && (!checkoutItems || checkoutItems.length === 0)) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
        <h2>Checkout</h2>
        <p style={{ color: "red" }}>
          No items selected for checkout. Please select items from your cart.
        </p>
        <button onClick={() => navigate("/cart")}>Back to Cart</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    // basic validation (prevents empty shipping fields causing messy orders)
    if (
      !shipping.address.trim() ||
      !shipping.city.trim() ||
      !shipping.postalCode.trim() ||
      !shipping.country.trim()
    ) {
      setError("Please fill in all shipping address fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // 1️⃣ Create Order with ONLY selected items
      const orderRes = await axiosClient.post("/api/checkout", {
        items: checkoutItems,
        totalPrice: checkoutTotalPrice,
        shippingAddress: shipping,
      });

      const orderId = orderRes.data._id;

      // 2️⃣ Process Payment (Stripe test)
      await axiosClient.post("/api/checkout/payment", { orderId });

      // 3️⃣ Redirect to order tracking
      navigate(`/orders/${orderId}`);
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Checkout failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading checkout...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h2>Checkout</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* SHIPPING FORM */}
      <div style={{ marginBottom: "2rem" }}>
        <h3>Shipping Address</h3>

        <input
          name="address"
          placeholder="Address"
          value={shipping.address}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />

        <input
          name="city"
          placeholder="City"
          value={shipping.city}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />

        <input
          name="postalCode"
          placeholder="Postal Code"
          value={shipping.postalCode}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />

        <input
          name="country"
          placeholder="Country"
          value={shipping.country}
          onChange={handleChange}
          required
          style={{ width: "100%" }}
        />
      </div>

      {/* ORDER SUMMARY */}
      <div style={{ marginBottom: "2rem" }}>
        <h3>Order Summary</h3>

        {checkoutItems.map((item) => (
          <div
            key={item.productId}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <hr />
        <h4>Total: ${Number(checkoutTotalPrice).toFixed(2)}</h4>
      </div>

      <button onClick={handleCheckout} disabled={submitting}>
        {submitting ? "Processing..." : "Place Order & Pay"}
      </button>
    </div>
  );
};

export default CheckoutPage;








// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";
// import { useCart } from "../../context/CartContext";

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const { cart, loading } = useCart();

//   const [shipping, setShipping] = useState({
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!loading && (!cart || cart.items.length === 0)) {
//       navigate("/cart");
//     }
//   }, [cart, loading, navigate]);

//   const handleChange = (e) => {
//     setShipping({ ...shipping, [e.target.name]: e.target.value });
//   };

//   const handleCheckout = async () => {
//     setSubmitting(true);
//     setError("");

//     try {
//       // 1️⃣ Create Order
//       const orderRes = await axiosClient.post("/api/checkout", {
//         items: cart.items,
//         totalPrice: cart.subtotal,
//         shippingAddress: shipping,
//       });

//       const orderId = orderRes.data._id;

//       // 2️⃣ Process Payment (Stripe test)
//       await axiosClient.post("/api/checkout/payment", {
//         orderId,
//       });

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

//         {cart.items.map((item) => (
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
//         <h4>Total: ${cart.subtotal.toFixed(2)}</h4>
//       </div>

//       <button onClick={handleCheckout} disabled={submitting}>
//         {submitting ? "Processing..." : "Place Order & Pay"}
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;
