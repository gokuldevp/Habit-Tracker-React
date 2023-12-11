// Import the 'express' module to create an Express application.
const express = require('express');

// Set the port number to 8000.
const port = process.env.PORT || 8000;

// Create the Express app.
const app = express();

// import mongoose from the mongoose.js file
const db = require('./config/mongoose');

// Import the 'body-parser' middleware for parsing request bodies
const bodyParser = require('body-parser');

// Use 'body-parser' middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to parse incoming request bodies with 'Content-Type: application/x-www-form-urlencoded' format.
app.use(express.urlencoded({extended: true}));

app.use('/', require('./routes'))

app.listen(port, (err) => {
    // Check for any errors that occurred during server startup. If an error occurs, log the error message.
    if(err){
        console.log(`Error while running the server ${err}`);
    }
    // If the server starts successfully, log a success message along with the port number.
    console.log(`Server is running successfully at port ${port}`)
})