// Import the 'mongoose' library to use with MongoDB
const mongoose = require('mongoose');

// Define the 'habitStatusSchema' to represent the structure of a habit status document in the collection
const habitStatusSchema = new mongoose.Schema({
    // The 'name' field is of type 'String', required, and must be unique (no duplicate names allowed)
    name: { type: String, required: true },

    // The 'time' field is of type 'String' and is required
    time: { type: String, required: true },

    // The 'habit' field is of type 'ObjectId' and references the 'Habit' model, making it required
    habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },

    // The 'date' field is of type 'String' and is required
    date: { type: String, required: true },

    // The 'status' field is of type 'String' and has a default value of 'None'
    status: { type: String, default: 'None' },
}, { timestamps: true });

// Create a Mongoose model named 'HabitStatus' based on the 'habitStatusSchema'
const HabitStatus = mongoose.model('HabitStatus', habitStatusSchema);

// Export the 'HabitStatus' model to be used in other parts of the application
module.exports = HabitStatus;