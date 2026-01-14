// src/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register({ name, email, password, role });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="vendor">Vendor</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;


































// // src/pages/auth/Register.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Register = () => {
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "Customer", // default
//   });
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     try {
//       await register(form); // auto-login inside context
//       navigate("/");        // go to home
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "2rem auto" }}>
//       <h2>Register</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "1rem" }}>
//           <label>Username</label>
//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             required
//             style={{ width: "100%" }}
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             style={{ width: "100%" }}
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             style={{ width: "100%" }}
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Role</label>
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             style={{ width: "100%" }}
//           >
//             <option value="Customer">Customer</option>
//             <option value="Vendor">Vendor</option>
//           </select>
//         </div>

//         <button type="submit" disabled={submitting}>
//           {submitting ? "Creating account..." : "Register"}
//         </button>
//       </form>

//       <p style={{ marginTop: "1rem" }}>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;
