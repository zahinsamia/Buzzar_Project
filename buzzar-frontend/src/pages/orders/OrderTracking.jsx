import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const OrderTrackingPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosClient.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Order fetch error:", err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading order details...</p>;
  }

  if (error) {
    return (
      <p style={{ padding: "2rem", color: "red" }}>
        {error}
      </p>
    );
  }

  if (!order) {
    return <p style={{ padding: "2rem" }}>Order not found.</p>;
  }

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
            <h2>Order Tracking</h2>

            <p>
                <strong>Order ID:</strong> {order._id}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {/* <span style={{ color: "green" }}>{order.status}</span> */}
                <span style={{ color: "green" }}>
                    {order.status || "Processing"}
                </span>

            </p>

      <p>
        <strong>Placed On:</strong>{" "}
        {new Date(order.createdAt).toLocaleString()}
      </p>

      <hr />

      <h3>Shipping Address</h3>
      <p>{order.shippingAddress?.address}</p>
      <p>
        {order.shippingAddress?.city},{" "}
        {order.shippingAddress?.country}
      </p>

      <hr />

      <h3>Items</h3>

      <table style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th align="left">Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th align="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td align="center">{item.quantity}</td>
              <td align="center">${item.price.toFixed(2)}</td>
              <td align="right">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: "1rem" }}>
        Total Paid: ${order.totalPrice.toFixed(2)}
      </h3>
    </div>
  );
};

export default OrderTrackingPage;
