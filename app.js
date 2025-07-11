require('dotenv').config(); // this loads environment variables from a .env file into process.env
const express = require('express');

const app = express(); // this is app of the express framework

const connectDB = require('./db/connect'); // this is the database connection file coming from db/connect.js

const port = process.env.PORT || 5000; // this is the port on which the server will run

const product_routes = require('./routes/product'); // this is the product routes file

app.get('/', (req, res) => { // this is the root route
  res.send('hi i am live'); // this is the response to the root route
});

app.use('/api/products', product_routes); // this is where we use the product routes file, it will handle all requests to /api/products

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL); // this connects to the database using the connectDB function from db/connect.js
        app.listen(port, () => { // this is where the server starts listening on the specified port
            console.log(`Server is running on port ${port}`); // this logs the port on which the server is running
        });
        
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

start(); // this calls the start function to run the server

