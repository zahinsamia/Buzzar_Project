import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const VendorRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user || user.role !== "Vendor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
