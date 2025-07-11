const express = require('express'); // to create routes we need express

const router = express.Router(); // create a new router instance

const{getAllProducts,  getAllProductsTesting} = require('../controllers/product'); // import the functions from the controller

router.route('/').get(getAllProducts); // this is the route to get all products getAllProducts written in controller
router.route('/testing').get(getAllProductsTesting); // this is the route to create a new product and this one for testing in postman

module.exports = router; // export the router so that it can be used in other files
