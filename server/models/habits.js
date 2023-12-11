// Import the 'mongoose' library to use with MongoDB
const mongoose = require('mongoose');

// Define the 'habitSchema' to represent the structure of a habit document in the collection
const habitSchema = mongoose.Schema({
    // The 'name' field is of type 'String', required, and must be unique (no duplicate names allowed)
    name: { type: String, required: true, unique: true },

    // The 'time' field is of type 'String' and is required
    time: { type: String, required: true },
}, { timestamps: true });

// Create a Mongoose model named 'Habit' based on the 'habitSchema'
const Habit = mongoose.model('Habit', habitSchema);

// Export the 'Habit' model to be used in other parts of the application
module.exports = Habit;