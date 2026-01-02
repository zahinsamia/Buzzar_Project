const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ✅ CORS MUST COME BEFORE THE PROXY ROUTES
app.use(
  cors({
    origin: true, // reflect the request origin
    // origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    // allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
    credentials: true,
  })
);

// This function tells the proxy to use the *original* URL path
function resolveProxyPath(req) {
  return req.originalUrl;
}

// ----------------------------------------------------
// Define the routes and their targets
// ----------------------------------------------------

app.use('/api/auth', proxy('http://localhost:3001', {
  proxyReqPathResolver: resolveProxyPath
}));

app.use('/api/users', proxy('http://localhost:3001', {
  proxyReqPathResolver: resolveProxyPath
}));


app.use('/api/vendor/products', proxy('http://localhost:3002', {
  proxyReqPathResolver: resolveProxyPath
}));

app.use('/api/products', proxy('http://localhost:3002', {
  proxyReqPathResolver: resolveProxyPath
}));


app.use('/api/cart', proxy('http://localhost:3003', {
  proxyReqPathResolver: resolveProxyPath
}));

app.use('/api/checkout', proxy('http://localhost:3004', {
  proxyReqPathResolver: resolveProxyPath
}));

app.use('/api/vendor/orders', proxy('http://localhost:3004', {
  proxyReqPathResolver: resolveProxyPath
}));

app.use('/api/orders', proxy('http://localhost:3004', {
  proxyReqPathResolver: resolveProxyPath
}));

app.use('/api/analytics', proxy('http://localhost:3005', {
  proxyReqPathResolver: resolveProxyPath
}));

app.use('/api/chat', proxy('http://localhost:3007', {
  proxyReqPathResolver: resolveProxyPath
}));

// A simple "catch-all" or "index" route
app.get('/', (req, res) => {
  res.send('API Gateway is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});






