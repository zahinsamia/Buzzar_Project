import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { logout } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get("/api/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading profile...</p>;
  }

  if (error) {
    return (
      <p style={{ padding: "2rem", color: "red" }}>
        {error}
      </p>
    );
  }

  if (!user) {
    return <p style={{ padding: "2rem" }}>No user data.</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2>My Profile</h2>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>

      <p>
        <strong>Member Since:</strong>{" "}
        {new Date(user.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={logout}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
