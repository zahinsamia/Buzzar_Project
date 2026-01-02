// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/"); // go to home on success
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
