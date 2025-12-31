const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/categories.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'categories.html'));
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// API endpoint to get products (optional)
app.get('/api/products', (req, res) => {
    res.json({ message: 'Products endpoint' });
});

// Handle all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Mont Sion Boutique server is running on port ${PORT}`);
    console.log(`📱 Access the website at: http://localhost:${PORT}`);
    console.log(`👨‍💻 Developed by: sossou Kouamé appolinaire développeur web`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    app.close(() => {
        console.log('HTTP server closed');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    app.close(() => {
        console.log('HTTP server closed');
    });
});