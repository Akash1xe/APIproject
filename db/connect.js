const mongoose = require('mongoose'); // Importing mongoose to interact with MongoDB
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.



const connectDB = async (uri) => { // Function to connect to the database
    try {
        console.log('🔄 Connecting to MongoDB...');
        
        if (!uri) {
            throw new Error('Database URI is required');
        }
        
        // Log partial URI for debugging (hide credentials)
        const safeUri = uri.replace(/\/\/.*@/, '//***:***@');
        console.log('🔗 Database URI:', safeUri);
        
        const connection = await mongoose.connect(uri);
        
        console.log('✅ MongoDB connected successfully');
        console.log('📍 Database:', connection.connection.db.databaseName);
        console.log('🌐 Host:', connection.connection.host);
        
        return connection;
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
        // Re-throw the error to be handled by the caller
        throw error;
    }
}

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose.
// It exports a function `connectDB` that establishes the connection using the provided URI.