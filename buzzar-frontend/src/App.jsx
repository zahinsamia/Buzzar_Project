import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductList from "./pages/products/ProductList";
import ProductDetails from "./pages/products/ProductDetails";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrderTrackingPage from "./pages/orders/OrderTracking";
import MyOrdersPage from "./pages/orders/MyOrdersPage";
import ProfilePage from "./pages/profile/ProfilePage";
import VendorRoute from "./components/guards/VendorRoute";
import VendorProductsPage from "./pages/vendor/VendorProductsPage";
import AddProductPage from "./pages/vendor/AddProductPage";
import EditProductPage from "./pages/vendor/EditProductPage.jsx";
import VendorOrdersPage from "./pages/vendor/VendorOrdersPage";





function App() {
  return (
    <>
      {/* Global Navigation */}
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Shopping */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Customer Orders */}
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/orders/:id" element={<OrderTrackingPage />} />

        {/* Profile */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Vendor Routes */}
        <Route
          path="/vendor/products"
          element={
            <VendorRoute>
              <VendorProductsPage />
            </VendorRoute>
          }
        />

        <Route
          path="/vendor/products/new"
          element={
            <VendorRoute>
              <AddProductPage />
            </VendorRoute>
          }
        />


        <Route
          path="/vendor/orders"
          element={
            <VendorRoute>
              <VendorOrdersPage />
            </VendorRoute>
          }
        />


        <Route
  path="/vendor/products/:id/edit"
  element={
    <VendorRoute>
      <EditProductPage />
    </VendorRoute>
  }
/>

      </Routes>
    </>
  );
}

export default App;



// function App() {
//   return (
//     <>

//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />

//         {/* Auth */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Vendor routes */}
//         <Route
//           path="/vendor/products"
//           element={
//             <VendorRoute>
//               <VendorProductsPage />
//             </VendorRoute>
//           }

          
//         />
//         {/* add: products, cart, checkout, etc. */}
//         <Route path="/products" element={<ProductList />} />
//         <Route path="/products/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/checkout" element={<CheckoutPage />} />
//         <Route path="/orders" element={<MyOrdersPage />} />
//         <Route path="/orders/:id" element={<OrderTrackingPage />} />
//         <Route path="/profile" element={<ProfilePage />} />





//       </Routes>
//     </>
//   );
// }


// export default App;
