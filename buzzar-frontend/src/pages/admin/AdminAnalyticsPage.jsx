// src/pages/admin/AdminAnalyticsPage.jsx
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminAnalytics = async () => {
      try {
        const res = await axiosClient.get("/api/analytics/admin");
        setAnalytics(res.data);
      } catch (err) {
        console.error("Admin analytics fetch error:", err);
        setError("Failed to load admin analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminAnalytics();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Analytics
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

      {/* Analytics */}
      {!loading && !error && analytics && (
        <>
          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
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

            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Revenue
                  </Typography>
                  <Typography variant="h5">
                    RM {analytics.totalRevenue.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Vendors
                  </Typography>
                  <Typography variant="h5">
                    {analytics.totalVendors}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Top Vendors */}
          <Typography variant="h6" gutterBottom>
            Top Vendors
          </Typography>

          {analytics.topVendors.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No vendor sales data available.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Vendor ID</strong></TableCell>
                    <TableCell align="right">
                      <strong>Revenue (RM)</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {analytics.topVendors.map((vendor) => (
                    <TableRow key={vendor._id}>
                      <TableCell>{vendor._id}</TableCell>
                      <TableCell align="right">
                        {vendor.revenue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default AdminAnalyticsPage;



































// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";

// const cardStyle = {
//     minWidth: "200px",
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


// const AdminAnalyticsPage = () => {
//     const [analytics, setAnalytics] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchAdminAnalytics = async () => {
//             try {
//                 const res = await axiosClient.get("/api/analytics/admin");
//                 setAnalytics(res.data);
//             } catch (err) {
//                 console.error("Admin analytics fetch error:", err);
//                 setError("Failed to load admin analytics.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAdminAnalytics();
//     }, []);

//     if (loading) return <p style={{ padding: "2rem" }}>Loading analytics...</p>;

//     if (error) {
//         return (
//             <div style={{ padding: "2rem" }}>
//                 <h2>Admin Analytics</h2>
//                 <p style={{ color: "red" }}>{error}</p>
//             </div>
//         );
//     }

//     if (!analytics) {
//         return (
//             <div style={{ padding: "2rem" }}>
//                 <h2>Admin Analytics</h2>
//                 <p>No analytics data available.</p>
//             </div>
//         );
//     }

//     //   return (
//     //     <div style={{ padding: "2rem" }}>
//     //       <h2>Admin Analytics</h2>

//     //       {/* Debug view (temporary) */}
//     //       <pre
//     //         style={{
//     //           marginTop: "1rem",
//     //           background: "#f6f6f6",
//     //           padding: "1rem",
//     //           borderRadius: "8px",
//     //           overflowX: "auto",
//     //         }}
//     //       >
//     //         {JSON.stringify(analytics, null, 2)}
//     //       </pre>
//     //     </div>
//     //   );

//     return (
//         <div style={{ padding: "2rem" }}>
//             <h2>Admin Analytics</h2>

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

//                 <div style={cardStyle}>
//                     <h3>Total Vendors</h3>
//                     <p style={cardValue}>{analytics.totalVendors}</p>
//                 </div>
//             </div>
//             {/* Top Vendors Table */}
//             <div style={{ marginTop: "3rem" }}>
//                 <h3>Top Vendors</h3>

//                 {analytics.topVendors.length === 0 ? (
//                     <p>No vendor sales data available.</p>
//                 ) : (
//                     <table
//                         width="100%"
//                         border="1"
//                         cellPadding="10"
//                         style={{ marginTop: "1rem", borderCollapse: "collapse" }}
//                     >
//                         <thead>
//                             <tr style={{ backgroundColor: "#f0f0f0" }}>
//                                 <th align="left">Vendor ID</th>
//                                 <th align="right">Revenue (RM)</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {analytics.topVendors.map((vendor) => (
//                                 <tr key={vendor._id}>
//                                     <td>{vendor._id}</td>
//                                     <td align="right">
//                                         {vendor.revenue.toFixed(2)}
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

// export default AdminAnalyticsPage;
