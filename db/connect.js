const mongoose = require('mongoose'); // Importing mongoose to interact with MongoDB
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.



const connectDB = (uri)=>{ // Function to connect to the database
    console.log('oh yeah backend is connected to database'); // Log message indicating connection attempt
    
    return mongoose.connect(uri)
}

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose.
// It exports a function `connectDB` that establishes the connection using the provided URI.