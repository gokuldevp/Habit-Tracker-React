// Import the 'express' library to create and manage routes
const express = require('express');

// Create an instance of the Express router
const router = express.Router();

// Import the 'detailsController' to handle different route actions
const detailsController = require('../controllers/details_controller');

// Route to handle GET requests for viewing details of a specific day
router.get('/day:dayName', detailsController.detailsView);

// Route to handle GET requests for adding a new habit
router.get('/add-habit', detailsController.addHabit);

// Route to handle GET requests for the weekly view
router.get('/weekly-view', detailsController.weeklyView);

// Route to handle POST requests for creating a new habit
router.post('/create-habit', detailsController.createHabit);

// Route to handle POST requests for updating the status of a habit
router.post('/update-status', detailsController.updateStatus);

// Export the router to be used in the main application
module.exports = router;