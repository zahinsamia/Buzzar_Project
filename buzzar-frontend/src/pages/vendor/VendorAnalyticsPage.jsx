// src/pages/vendor/VendorAnalyticsPage.jsx
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const VendorAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosClient.get("/api/orders/analytics/vendor");
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load vendor analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vendor Analytics
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

      {/* Analytics Content */}
      {!loading && !error && analytics && (
        <>
          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Orders
                  </Typography>
                  <Typography variant="h5">
                    {analytics.totalOrders}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Revenue
                  </Typography>
                  <Typography variant="h5">
                    ${analytics.totalRevenue?.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Top Products */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Top Products
            </Typography>

            {analytics.topProducts && analytics.topProducts.length > 0 ? (
              <List>
                {analytics.topProducts.map((product, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={product.name}
                      secondary={`Orders: ${product.totalSold}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No product data available.
              </Typography>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default VendorAnalyticsPage;







// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";

// const VendorAnalyticsPage = () => {
//     const [analytics, setAnalytics] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchVendorAnalytics = async () => {
//             try {
//                 const res = await axiosClient.get("/api/orders/analytics/vendor");
//                 setAnalytics(res.data);
//             } catch (err) {
//                 console.error("Vendor analytics fetch error:", err);
//                 setError("Failed to load vendor analytics.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchVendorAnalytics();
//     }, []);

//     if (loading) return <p style={{ padding: "2rem" }}>Loading analytics...</p>;

//     if (error) {
//         return (
//             <div style={{ padding: "2rem" }}>
//                 <h2>Vendor Analytics</h2>
//                 <p style={{ color: "red" }}>{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div style={{ padding: "2rem" }}>
//             <h2>Vendor Analytics</h2>

//             {/* Summary Cards */}
//             <div
//                 style={{
//                     display: "flex",
//                     gap: "1.5rem",
//                     marginTop: "1.5rem",
//                     flexWrap: "wrap",
//                 }}
//             >
//                 <div style={cardStyle}>
//                     <h3>Total Orders</h3>
//                     <p style={cardValue}>{analytics.totalOrders}</p>
//                 </div>

//                 <div style={cardStyle}>
//                     <h3>Total Revenue</h3>
//                     <p style={cardValue}>
//                         RM {analytics.totalRevenue.toFixed(2)}
//                     </p>
//                 </div>
//             </div>

//             {/* Top Products Section */}
//             <div style={{ marginTop: "3rem" }}>
//                 <h3>Top Products</h3>

//                 {!analytics.topProducts || analytics.topProducts.length === 0 ? (
//                     <p>No product sales data available.</p>
//                 ) : (
//                     <table
//                         width="100%"
//                         border="1"
//                         cellPadding="10"
//                         style={{ marginTop: "1rem", borderCollapse: "collapse" }}
//                     >
//                         <thead>
//                             <tr style={{ backgroundColor: "#f0f0f0" }}>
//                                 <th align="left">Product ID</th>
//                                 <th align="right">Quantity Sold</th>
//                                 <th align="right">Revenue (RM)</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {analytics.topProducts.map((product) => (
//                                 <tr key={product._id}>
//                                     <td>{product._id}</td>
//                                     <td align="right">{product.totalQuantity}</td>
//                                     <td align="right">
//                                         {product.revenue.toFixed(2)}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );

// };

// const cardStyle = {
//     minWidth: "220px",
//     padding: "1.5rem",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     backgroundColor: "#fafafa",
// };

// const cardValue = {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     marginTop: "0.5rem",
// };

// export default VendorAnalyticsPage;
