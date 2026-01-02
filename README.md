# Buzzar – Microservices-Based E-Commerce Platform

Buzzar is a full-stack e-commerce platform developed as a Final Year Project (FYP).  
The system is designed using a **microservices architecture** to ensure scalability, modularity, and secure role-based access.

## 🚀 Project Overview

Buzzar enables customers to browse products, manage carts, place orders, and track purchases, while vendors can manage their own products and orders through a dedicated vendor panel.  
The system also includes an AI-powered chatbot to assist users with product-related queries.

## 🛠️ Technologies Used

**Frontend**
- React.js (Vite)
- Axios

**Backend**
- Node.js
- Express.js
- RESTful APIs
- JSON Web Tokens (JWT)

**Database**
- MongoDB

**Architecture**
- Microservices Architecture
- API Gateway for request routing

**Tools**
- Git & GitHub
- Postman
- VS Code

## 🔐 Key Features

### Customer Features
- User registration and secure login
- Product browsing and search
- Shopping cart management
- Checkout and payment processing (Stripe – test mode)
- Order tracking
- AI chatbot for product assistance

### Vendor Features
- Vendor registration and authentication
- Vendor-specific product management
- Vendor-specific order management
- Order status updates (Pending, Shipped, Delivered)
- Ownership enforcement (vendors can only manage their own products)

### System Features
- Role-based access control (Customer, Vendor, Admin)
- Secure authentication using JWT
- Backend ownership validation
- Cross-service communication via API Gateway

## 🧠 AI Chatbot Integration

The AI chatbot is implemented using **Google Gemini API**.  
The chatbot **does not directly access the database**. Instead:
- It retrieves real-time product data through backend APIs
- Responses are generated using live inventory data
- Ensures consistency and security of system data

## 🧩 Microservices Overview

- **Auth Service** – User authentication and authorization
- **Inventory Service** – Product and stock management
- **Cart Service** – Cart operations and subtotal calculation
- **Order / Checkout Service** – Order creation, payment, and tracking
- **Chatbot Service** – AI-powered customer assistance
- **API Gateway** – Centralized request routing and access control

## 🧪 Testing

- Black-box testing for functional validation
- White-box testing for backend logic and security
- User testing for usability and workflow validation

## 📌 Project Status

This project is actively developed as part of the Final Year Project requirements.

## 👩‍💻 Author

**Samia Zahin**  
Bachelor of Computer Science (Software Engineering)  
Universiti Teknologi Malaysia (UTM)

---

