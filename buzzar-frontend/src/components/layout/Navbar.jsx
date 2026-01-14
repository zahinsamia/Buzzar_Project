import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

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

  console.log("NAVBAR USER:", user); // 👈 DEBUG LINE (kept intentionally)

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}
          >
            Buzzar
          </Typography>

          <Button component={Link} to="/products" color="inherit">
            Products
          </Button>

          {user && (
            <Button component={Link} to="/cart" color="inherit">
              <Badge badgeContent={cartCount} color="primary">
                Cart
              </Badge>
            </Button>
          )}
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!user && (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained">
                Register
              </Button>
            </>
          )}

          {user && user.role === "Admin" && (
            <>
              <Button component={Link} to="/admin/users" color="inherit">
                Admin Panel
              </Button>
              <Button component={Link} to="/admin/analytics" color="inherit">
                Admin Analytics
              </Button>
            </>
          )}

          {user && user.role === "Vendor" && (
            <>
              <Button component={Link} to="/vendor/products" color="inherit">
                Vendor Panel
              </Button>
              <Button component={Link} to="/vendor/orders" color="inherit">
                Vendor Orders
              </Button>
              <Button component={Link} to="/vendor/analytics" color="inherit">
                Vendor Analytics
              </Button>
            </>
          )}

          {user && (
            <>
              <Button component={Link} to="/orders" color="inherit">
                My Orders
              </Button>
              <Button component={Link} to="/profile" color="inherit">
                Profile
              </Button>

              <Typography variant="body2" sx={{ mx: 1 }}>
                Hello, {user.username}
              </Typography>

              <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;























// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useCart } from "../../context/CartContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const cartCount =
//     cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

//   console.log("NAVBAR USER:", user); // 👈 DEBUG LINE

//   return (
//     <nav
//       style={{
//         padding: "1rem",
//         borderBottom: "1px solid #ddd",
//         display: "flex",
//         justifyContent: "space-between",
//       }}
//     >
//       <div>
//         <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
//         <Link to="/products" style={{ marginRight: "1rem" }}>Products</Link>

//         {user && (
//           <Link to="/cart" style={{ marginRight: "1rem" }}>
//             Cart ({cartCount})
//           </Link>
//         )}
//       </div>

//       <div>
//         {!user && (
//           <>
//             <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}

//         {/* {user && (
//           user.role === "Admin" && (
//             <Link to="/admin/users" style={{ marginRight: "1rem" }}>
//               Admin Panel
//             </Link>
//           )
//         )} */}

//         {user && user.role === "Admin" && (
//           <>
//             <Link to="/admin/users" style={{ marginRight: "1rem" }}>
//               Admin Panel
//             </Link>

//             <Link to="/admin/analytics" style={{ marginRight: "1rem" }}>
//               Admin Analytics
//             </Link>
//           </>
//         )}




//         {user && (
//           <>
//             {user.role === "Vendor" && (
//               <><Link to="/vendor/products" style={{ marginRight: "1rem" }}>
//                 Vendor Panel
//               </Link><Link to="/vendor/orders" style={{ marginRight: "1rem" }}>
//                   Vendor Orders
//                 </Link>
//                 <Link to="/vendor/analytics" style={{ marginRight: "1rem" }}>
//                   Vendor Analytics
//                 </Link>
//               </>
//             )}

//             <Link to="/orders" style={{ marginRight: "1rem" }}>
//               My Orders
//             </Link>

//             <Link to="/profile" style={{ marginRight: "1rem" }}>
//               Profile
//             </Link>

//             <span style={{ marginRight: "1rem" }}>
//               Hello, {user.username}
//             </span>

//             <button onClick={handleLogout}>Logout</button>
//           </>
//         )}



//       </div>
//     </nav>
//   );
// };

// export default Navbar;


