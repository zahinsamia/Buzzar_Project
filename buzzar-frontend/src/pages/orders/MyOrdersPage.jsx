import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosClient.get("/api/orders/my");
        setOrders(res.data);
      } catch (err) {
        console.error("Orders fetch error:", err);
        setError("Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading your orders...</p>;
  }

  if (error) {
    return (
      <p style={{ padding: "2rem", color: "red" }}>
        {error}
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>My Orders</h2>
        <p>You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h2>My Orders</h2>

      <table style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th align="left">Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th align="right">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(-8)}</td>
              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              {/* <td>{order.status || "Processing"}</td>
              <td>{order.status || "Pending"}</td> */}
              <td>{order.orderStatus || "Pending"}</td>

              <td>${order.totalPrice.toFixed(2)}</td>
              <td align="right">
                <Link to={`/orders/${order._id}`}>
                  View / Track
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrdersPage;
