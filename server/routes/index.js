// Import the 'express' library to create and manage routes
const express = require('express');

// Create an instance of the Express router
const router = express.Router();

// Import the 'detailsController' to handle different route actions related to details
const detailsController = require('../controllers/details_controller');

// Route to handle GET requests for the homepage and display the weekly view
router.get('/', detailsController.weeklyView);

// Route to handle requests for URLs starting with '/details' and delegate to 'details_router'
router.use('/details', require('./details_router'));

// Export the router to be used in the main application
module.exports = router;