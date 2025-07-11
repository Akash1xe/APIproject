require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./db/connect'); // Importing the database connection function
const Product = require('./models/product'); // Importing the Product model from the models directory

const ProductJson = require('./products.json'); // Importing the product data from a JSON file

const start = async () => {  //  this is connection to the database
    try {
        await connectDB(process.env.MONGODB_URL); // connect to the database using the URI from environment variables
        await Product.deleteMany(); // Clear the existing products in the database
       
        
        await Product.create(ProductJson); // Create products in the database using the data from the JSON file
        console.log("sucess");
        console.log("Products added successfully");
        process.exit(0); // Exit the process successfully
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit with error
    }
};

start();