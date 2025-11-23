// app.js
const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');

// Set the port
const port = process.env.PORT || 4000;

// Boot the app
const app = express();

// Serve static files
app.use(express.static(__dirname + '/public'));

// Parse JSON bodies
app.use(bodyParser.json());

// CORS middleware
app.use(middleware.cors);

// Product routes
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);

// Order routes
app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder);       // using POST for create
app.put('/orders/:id', api.editOrder);
app.delete('/orders/:id', api.deleteOrder);

// 404 + error handlers
app.use(middleware.notFound);
app.use(middleware.handleError);

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
