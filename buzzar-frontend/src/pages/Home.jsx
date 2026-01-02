import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "4rem auto", 
      padding: "2rem", 
      textAlign: "center" 
    }}>
      {/* Main Title - Dark and readable */}
      <h1 style={{ color: "#1F2937", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        Welcome to Buzzar
      </h1>
      
      <p style={{ color: "#4B5563", fontSize: "1.1rem", marginBottom: "2rem" }}>
        Your one-stop shop for local and international brands.
      </p>

      {user ? (
        // LOGGED IN STATE
        <div style={{ 
          marginTop: "2rem", 
          padding: "2rem", 
          backgroundColor: "#FFFFFF", // White card background
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
          borderRadius: "12px",
          display: "inline-block",
          border: "1px solid #E5E7EB"
        }}>
          {/* Success Badge - Light Green BG with DARK Green Text */}
          <div style={{
            backgroundColor: "#D1FAE5",
            color: "#065F46", // Dark green text for readability
            padding: "0.5rem 1rem",
            borderRadius: "99px",
            display: "inline-block",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>
            ✅ You are logged in!
          </div>

          <p style={{ color: "#374151", marginBottom: "1.5rem" }}>
            Role: <strong style={{ color: "#2563EB" }}>{user.role}</strong>
          </p>
          
          <button 
            onClick={logout} 
            style={{ 
              padding: "0.75rem 1.5rem", 
              cursor: "pointer", 
              backgroundColor: "#EF4444", // Red for logout
              color: "white", 
              border: "none", 
              borderRadius: "6px",
              fontSize: "1rem"
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        // GUEST STATE
        <div style={{ marginTop: "2rem" }}>
          <Link to="/login">
            <button style={{ 
              padding: "0.75rem 2rem", 
              cursor: "pointer", 
              backgroundColor: "#2563EB", // Blue for primary action
              color: "white", 
              border: "none", 
              borderRadius: "6px",
              fontSize: "1.1rem",
              boxShadow: "0 4px 6px rgba(37, 99, 235, 0.3)"
            }}>
              Login Now
            </button>
          </Link>
          <p style={{ marginTop: "1rem", color: "#6B7280" }}>
            Please login to start shopping.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;











// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Welcome to Buzzar</h1>
      
//       {user ? (
//         <div style={{ padding: "1rem", backgroundColor: "#e0f7fa" }}>
//           <h3>✅ You are logged in!</h3>
//           <p>Role: <strong>{user.role}</strong></p>
//           <button onClick={logout} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p>You are browsing as a guest.</p>
//           <Link to="/login">
//             <button style={{ padding: "0.5rem 1rem" }}>Login Now</button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;