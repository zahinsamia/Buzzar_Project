import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

const VendorOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosClient.get("/api/vendor/orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load vendor orders.");
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axiosClient.put(`/api/orders/${orderId}/status`, {
        orderStatus: newStatus,
      });

      setOrders(
        orders.map((o) =>
          o._id === orderId ? { ...o, orderStatus: newStatus } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update order status.");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Vendor Orders</h2>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(-6)}</td>
              <td>{o.userId}</td>
              <td>${o.totalPrice}</td>
              <td>{o.orderStatus}</td>
              <td>
                <select
                  value={o.orderStatus}
                  onChange={(e) =>
                    updateStatus(o._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorOrdersPage;
