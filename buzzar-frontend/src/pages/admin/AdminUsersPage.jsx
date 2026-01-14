// src/pages/admin/AdminUsersPage.jsx
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
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosClient.get("/api/users");
        //         const res = await axiosClient.get("/api/users");

        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosClient.put(`/api/users/${userId}/role`, {
        role: newRole,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, role: newRole } : u
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update user role.");
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/api/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
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

      {/* Users Table */}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Select
                      size="small"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Vendor">Vendor</MenuItem>
                      <MenuItem value="Customer">Customer</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDelete(user._id)}
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

export default AdminUsersPage;



































// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";

// const AdminUsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axiosClient.get("/api/users");
//         setUsers(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load users.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (userId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await axiosClient.delete(`/api/users/${userId}`);
//       setUsers(users.filter((u) => u._id !== userId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete user.");
//     }
//   };

//   const handleRoleChange = async (userId, newRole) => {
//     const confirmChange = window.confirm(
//       `Are you sure you want to change this user's role to ${newRole}?`
//     );
//     if (!confirmChange) return;

//     try {
//       await axiosClient.put(`/api/users/${userId}/role`, {
//         role: newRole,
//       });

//       // Update UI immediately
//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u._id === userId ? { ...u, role: newRole } : u
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update user role.");
//     }
//   };

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Admin – Manage Users</h2>

//       <table width="100%" border="1" cellPadding="8">
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id}>
//               <td>{u.username}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//               <td>
//                 {/* Role management */}
//                 {u.role === "Customer" && (
//                   <button
//                     onClick={() => handleRoleChange(u._id, "Vendor")}
//                     style={{ marginRight: "8px" }}
//                   >
//                     Make Vendor
//                   </button>
//                 )}

//                 {u.role === "Vendor" && (
//                   <button
//                     onClick={() => handleRoleChange(u._id, "Customer")}
//                     style={{ marginRight: "8px" }}
//                   >
//                     Remove Vendor
//                   </button>
//                 )}

//                 {/* Admin should not be modified */}
//                 {u.role !== "Admin" && (
//                   <button
//                     onClick={() => handleDelete(u._id)}
//                     style={{ color: "red" }}
//                   >
//                     Delete
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUsersPage;
