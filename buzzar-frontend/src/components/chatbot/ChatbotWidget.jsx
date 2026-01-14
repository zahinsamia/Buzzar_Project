import { useState, useEffect, useRef } from "react";
import axiosClient from "../../api/axiosClient";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔽 Auto-scroll reference
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await axiosClient.post("/api/chat", {
        message: userMessage.text,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.botResponse,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setError("Failed to get response from Buzzar AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🤖 Floating AI Button */}
      <button
        onClick={() => setOpen(!open)}
        title="Buzzar AI Assistant"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        🤖
      </button>

      {/* 💬 Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            height: "420px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "10px",
              backgroundColor: "#2563EB",
              color: "white",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Buzzar AI Assistant
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "#F9FAFB",
            }}
          >
            {messages.length === 0 && (
              <p style={{ fontSize: "0.9rem", color: "#6B7280" }}>
                Ask me about products, prices, or recommendations 🙂
              </p>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "8px",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 10px",
                    borderRadius: "12px",
                    backgroundColor:
                      msg.sender === "user" ? "#2563EB" : "#E5E7EB",
                    color: msg.sender === "user" ? "white" : "black",
                    maxWidth: "90%",
                    fontSize: "0.9rem",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {loading && (
              <p style={{ fontSize: "0.85rem", color: "#6B7280" }}>
                Buzzar AI is typing...
              </p>
            )}

            {error && (
              <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>
            )}

            {/* 🔽 Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: "6px",
            }}
          >
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                padding: "6px",
                fontSize: "0.9rem",
              }}
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;






// import { useState } from "react";
// import axiosClient from "../../api/axiosClient";

// const ChatbotWidget = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = {
//       sender: "user",
//       text: input,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axiosClient.post("/api/chat", {
//         message: userMessage.text,
//       });

//       const botMessage = {
//         sender: "bot",
//         text: res.data.botResponse,
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (err) {
//       console.error("Chatbot error:", err);
//       setError("Failed to get response from Buzzar AI.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           zIndex: 1000,
//           backgroundColor: "#2563EB",
//           color: "white",
//           border: "none",
//           borderRadius: "50%",
//           width: "60px",
//           height: "60px",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//       >
//         💬
//       </button>

//       {/* Chat Window */}
//       {open && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "90px",
//             right: "20px",
//             width: "320px",
//             height: "420px",
//             backgroundColor: "#fff",
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//             display: "flex",
//             flexDirection: "column",
//             zIndex: 1000,
//           }}
//         >
//           {/* Header */}
//           <div
//             style={{
//               padding: "10px",
//               backgroundColor: "#2563EB",
//               color: "white",
//               borderTopLeftRadius: "8px",
//               borderTopRightRadius: "8px",
//               fontWeight: "bold",
//             }}
//           >
//             Buzzar AI Assistant
//           </div>

//           {/* Messages */}
//           <div
//             style={{
//               flex: 1,
//               padding: "10px",
//               overflowY: "auto",
//               backgroundColor: "#F9FAFB",
//             }}
//           >
//             {messages.length === 0 && (
//               <p style={{ fontSize: "0.9rem", color: "#6B7280" }}>
//                 Ask me about products, prices, or recommendations 🙂
//               </p>
//             )}

//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 style={{
//                   marginBottom: "8px",
//                   textAlign: msg.sender === "user" ? "right" : "left",
//                 }}
//               >
//                 <span
//                   style={{
//                     display: "inline-block",
//                     padding: "8px 10px",
//                     borderRadius: "12px",
//                     backgroundColor:
//                       msg.sender === "user" ? "#2563EB" : "#E5E7EB",
//                     color: msg.sender === "user" ? "white" : "black",
//                     maxWidth: "90%",
//                     fontSize: "0.9rem",
//                   }}
//                 >
//                   {msg.text}
//                 </span>
//               </div>
//             ))}

//             {loading && (
//               <p style={{ fontSize: "0.85rem", color: "#6B7280" }}>
//                 Buzzar AI is typing...
//               </p>
//             )}

//             {error && (
//               <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>
//             )}
//           </div>

//           {/* Input */}
//           <div
//             style={{
//               padding: "10px",
//               borderTop: "1px solid #ddd",
//               display: "flex",
//               gap: "6px",
//             }}
//           >
//             <input
//               type="text"
//               value={input}
//               placeholder="Type your message..."
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               style={{
//                 flex: 1,
//                 padding: "6px",
//                 fontSize: "0.9rem",
//               }}
//             />
//             <button onClick={sendMessage} disabled={loading}>
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatbotWidget;
