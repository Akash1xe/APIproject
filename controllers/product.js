const Product = require('../models/product');  // Importing the Product model to interact with the database this will give us so many methods like find, create, update, delete etc

const getAllProducts = async (req, res) => {

  const {company} = req.query; // Destructuring the query parameters from the request object
  // This will give us the query parameters like ?company=apple&featured=true&name=iphone&sort=price&fields=name,price&numericFilters=price[gte]=100

  const queryObject = {}; // Initializing an empty object to build the query

  if(company){
    queryObject.company = company; // If company is present in the query parameters, add it to the query object 
  }

  // const myData= await Product.find(req.query); // This will find all the products in the database empty curly braces means no filter means all products

  const myData = await Product.find(queryObject); // This will find all the products in the sdatabase based on the queryObject

  res.status(200).json({myData }); // Sending the response with status code 200 and the data this will show allthe product in data base to api route /products in localhost also now product display in postman
}

const getAllProductsTesting = async(req, res) => {
  const {company, featured, name,sort ,select } = req.query; // Destructuring the query parameters from the request object

  const queryObject = {}; // Initializing an empty object to build the query

  if(company){
    queryObject.company = company; // If company is present in the query parameters, add it to the query object 
  }

  if(featured){
    queryObject.featured = featured === 'true' ? true : false; // Convert string to boolean
  }

  if(name){
    queryObject.name = { $regex: name, $options: 'i' }; // Case-insensitive partial match for name
  }

  let apiData = Product.find(queryObject); // Initializing the query with the queryObject

  if(sort){
    const sortList = sort.split(',').join(' '); // Convert comma-separated string to space-separated string for sorting
    apiData = apiData.sort(sortList); // Apply sorting based on the query parameters
  }

  if(select){
    const selectList = select.split(',').join(' '); // Convert comma-separated string to space-separated string for selecting fields
    apiData = apiData.select(selectList); // Apply field selection based on the query parameters
  }

  let page = Number(req.query.page) || 1; // Default to page 1 if not provided
  let limit = Number(req.query.limit) || 3; // Default to 3 items per page if not provided

  let skip = (page - 1) * limit; // Calculate the number of items to skip based on the page and limit
  apiData = apiData.skip(skip).limit(limit); // Apply pagination to the query

  const myData = await apiData; // Execute the query

  res.status(200).json({myData ,nbHits: myData.length }); // Sending the response with status code 200 and the data this will show allthe product in data base to api route /products in localhost also now product display in postman
} // nbHits is the number of products returned this is shown in the response to indicate how many products matched the query

module.exports = {getAllProducts,getAllProductsTesting };

// This file defines the product controller with two functions:
// 1. `getAllProducts`: Responds with a message indicating retrieval of all products
// 2. `getAllProductsTesting`: Responds with a message indicating retrieval of all products for testing 
