import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  console.log("NAVBAR USER:", user); // 👈 DEBUG LINE

  return (
    <nav
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/products" style={{ marginRight: "1rem" }}>Products</Link>

        {user && (
          <Link to="/cart" style={{ marginRight: "1rem" }}>
            Cart ({cartCount})
          </Link>
        )}
      </div>

      <div>
        {!user && (
          <>
            <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            {user.role === "Vendor" && (
              <><Link to="/vendor/products" style={{ marginRight: "1rem" }}>
                Vendor Panel
              </Link><Link to="/vendor/orders" style={{ marginRight: "1rem" }}>
                  Vendor Orders
                </Link>
                </>
            )}

            <Link to="/orders" style={{ marginRight: "1rem" }}>
              My Orders
            </Link>

            <Link to="/profile" style={{ marginRight: "1rem" }}>
              Profile
            </Link>

            <span style={{ marginRight: "1rem" }}>
              Hello, {user.username}
            </span>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}



      </div>
    </nav>
  );
};

export default Navbar;


