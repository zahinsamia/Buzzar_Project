// src/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Customer", // default
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form); // auto-login inside context
      navigate("/");        // go to home
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
