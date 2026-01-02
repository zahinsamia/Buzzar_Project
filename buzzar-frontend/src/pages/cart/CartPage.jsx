import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CartPage = () => {
  const { cart, loading, addToCart } = useCart();
  const navigate = useNavigate();

  // Track selected items for checkout (manual selection only)
  const [selectedIds, setSelectedIds] = useState(new Set());

  if (loading) return <p style={{ padding: "2rem" }}>Loading cart...</p>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/products">Go shopping</Link>
      </div>
    );
  }

  // Selected items only
  const selectedItems = cart.items.filter((item) =>
    selectedIds.has(item.productId)
  );

  const selectedSubtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h2>Your Cart</h2>

      <table style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Select</th>
            <th align="left">Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th align="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.productId}>
              <td align="center">
                <input
                  type="checkbox"
                  checked={selectedIds.has(item.productId)}
                  onChange={() => {
                    setSelectedIds((prev) => {
                      const next = new Set(prev);
                      if (next.has(item.productId)) {
                        next.delete(item.productId);
                      } else {
                        next.add(item.productId);
                      }
                      return next;
                    });
                  }}
                />
              </td>

              <td>{item.name}</td>

              <td align="center">${item.price.toFixed(2)}</td>

              <td align="center">
                <button
                  onClick={() =>
                    addToCart(
                      {
                        _id: item.productId,
                        name: item.name,
                        price: item.price,
                      },
                      -1
                    )
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span style={{ margin: "0 0.5rem" }}>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    addToCart(
                      {
                        _id: item.productId,
                        name: item.name,
                        price: item.price,
                      },
                      1
                    )
                  }
                >
                  +
                </button>
              </td>

              <td align="right">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: "1.5rem" }}>
        Subtotal (Selected): ${selectedSubtotal.toFixed(2)}
      </h3>

      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <button
          onClick={() => {
            if (selectedItems.length === 0) {
              alert("Please select at least one item to checkout.");
              return;
            }

            navigate("/checkout", {
              state: {
                items: selectedItems,
                totalPrice: selectedSubtotal,
              },
            });
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;




// import { useCart } from "../../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const CartPage = () => {
//   const { cart, loading, addToCart } = useCart();
//   const navigate = useNavigate();

//   // Track selected items for checkout
//   const [selectedIds, setSelectedIds] = useState(new Set());

//   // Auto-select all items when cart loads
//   useEffect(() => {
//     if (cart?.items) {
//       setSelectedIds(new Set(cart.items.map(item => item.productId)));
//     }
//   }, [cart]);

//   if (loading) return <p style={{ padding: "2rem" }}>Loading cart...</p>;

//   if (!cart || !cart.items || cart.items.length === 0) {
//     return (
//       <div style={{ padding: "2rem" }}>
//         <h2>Your Cart</h2>
//         <p>Your cart is empty.</p>
//         <Link to="/products">Go shopping</Link>
//       </div>
//     );
//   }

//   // Selected items only
//   const selectedItems = cart.items.filter(item =>
//     selectedIds.has(item.productId)
//   );

//   const selectedSubtotal = selectedItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
//       <h2>Your Cart</h2>

//       <table style={{ width: "100%", marginTop: "1rem" }}>
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th align="left">Product</th>
//             <th>Price</th>
//             <th>Qty</th>
//             <th align="right">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.items.map((item) => (
//             <tr key={item.productId}>
//               <td align="center">
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.has(item.productId)}
//                   onChange={() => {
//                     setSelectedIds(prev => {
//                       const next = new Set(prev);
//                       if (next.has(item.productId)) {
//                         next.delete(item.productId);
//                       } else {
//                         next.add(item.productId);
//                       }
//                       return next;
//                     });
//                   }}
//                 />
//               </td>

//               <td>{item.name}</td>

//               <td align="center">${item.price.toFixed(2)}</td>

//               <td align="center">
//                 <button
//                   onClick={() =>
//                     addToCart(
//                       {
//                         _id: item.productId,
//                         name: item.name,
//                         price: item.price,
//                       },
//                       -1
//                     )
//                   }
//                   disabled={item.quantity <= 1}
//                 >
//                   -
//                 </button>

//                 <span style={{ margin: "0 0.5rem" }}>
//                   {item.quantity}
//                 </span>

//                 <button
//                   onClick={() =>
//                     addToCart(
//                       {
//                         _id: item.productId,
//                         name: item.name,
//                         price: item.price,
//                       },
//                       1
//                     )
//                   }
//                 >
//                   +
//                 </button>
//               </td>

//               <td align="right">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h3 style={{ textAlign: "right", marginTop: "1.5rem" }}>
//         Subtotal (Selected): ${selectedSubtotal.toFixed(2)}
//       </h3>

//       <div style={{ textAlign: "right", marginTop: "1rem" }}>
//         <button
//           onClick={() => {
//             if (selectedItems.length === 0) {
//               alert("Please select at least one item to checkout.");
//               return;
//             }

//             navigate("/checkout", {
//               state: {
//                 items: selectedItems,
//                 totalPrice: selectedSubtotal,
//               },
//             });
//           }}
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;







