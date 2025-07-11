require('dotenv').config(); // this loads environment variables from a .env file into process.env
const express = require('express');

const app = express(); // this is app of the express framework

const connectDB = require('./db/connect'); // this is the database connection file coming from db/connect.js

const port = process.env.PORT || 5000; // this is the port on which the server will run

// Debug environment variables
console.log('=== Environment Check ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URL defined:', !!process.env.MONGODB_URL);
console.log('MONGODB_URL length:', process.env.MONGODB_URL ? process.env.MONGODB_URL.length : 0);
console.log('========================');

const product_routes = require('./routes/product'); // this is the product routes file

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.get('/', (req, res) => { // this is the root route
  res.json({ 
    message: 'API is running successfully!',
    timestamp: new Date().toISOString(),
    endpoints: {
      products: '/api/products',
      testing: '/api/products/testing'
    }
  });
});

app.use('/api/products', product_routes); // this is where we use the product routes file, it will handle all requests to /api/products

const start = async () => {
    try {
        console.log('=== Starting Application ===');
        
        // Check if MONGODB_URL is defined
        if (!process.env.MONGODB_URL) {
            console.error('❌ MONGODB_URL environment variable is not defined');
            console.error('Please set MONGODB_URL in Railway dashboard or your .env file');
            process.exit(1);
        }
        
        console.log('✅ Environment variables validated');
        console.log('🔄 Attempting to connect to MongoDB...');
        
        await connectDB(process.env.MONGODB_URL); // this connects to the database using the connectDB function from db/connect.js
        
        console.log('✅ MongoDB connected successfully');
        console.log('🚀 Starting server...');
        
        const server = app.listen(port, '0.0.0.0', () => { // Bind to all interfaces for Railway
            console.log(`✅ Server is running on port ${port}`);
            console.log(`🌐 Server URL: http://localhost:${port}`);
            console.log('=== Application Started Successfully ===');
        });
        
        // Handle graceful shutdown
        process.on('SIGTERM', () => {
            console.log('⚠️  SIGTERM received, shutting down gracefully');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        });
        
        process.on('SIGINT', () => {
            console.log('⚠️  SIGINT received, shutting down gracefully');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        });
        
    } catch (error) {
        console.error('❌ Error starting server:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        // Exit with error code
        process.exit(1);
    }
}

start(); // this calls the start function to run the server

