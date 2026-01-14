import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Still checking auth state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  // Authorized admin
  return children;
};

export default AdminRoute;
