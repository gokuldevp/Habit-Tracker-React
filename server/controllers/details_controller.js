// // Import required models and libraries
// const Habit = require('../models/habits');
// const HabitStatus = require('../models/habitStatus');

// // An array representing the days of the week
// const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// // Controller to render the details view for a specific day
// module.exports.detailsView = async (req, res) => {
//     // Define navigation links
//     const navlinks = [{ itemName: 'Add Task', link: '/details/add-habit' }, { itemName: 'Weekly View', link: '/details/weekly-view' }];

//     // Extract the date from the URL parameter (dayName)
//     const date = req.params['dayName'].slice(1);

//     // Fetch all habits and habit statuses for the given date
//     const habits = await Habit.find({});
//     const habitStatus = await HabitStatus.find({ date });

//     // Create a variables object to pass data to the view
//     let variables = {
//         title: date + " Habits",
//         navLinks: navlinks,
//         Habit: habits,
//         habitStatus: habitStatus,
//     };

//     // Render the 'details' view with the data
//     return res.status(200).json(variables);
// };

// // Controller to render the add habit view
// module.exports.addHabit = async (req, res) => {
//     // Define navigation links
//     const navlinks = [{ itemName: 'Weekly View', link: '/details/weekly-view' }];

//     // Create a variables object to pass data to the view
//     let variables = {
//         title: "Add Habit",
//         navLinks: navlinks
//     };

//     // Render the 'addHabit' view with the data
//     return res.render('addHabit', variables);
// };

// // Controller to render the weekly view
// module.exports.weeklyView = async (req, res) => {
//     // Define navigation links
//     const navlinks = [{ itemName: 'Add Task', link: '/details/add-habit' }];

//     // Count the total number of habits in the database
//     const totalhabits = await Habit.countDocuments();

//     // Array to store the days where all habits are marked as 'Done'
//     let doneWeeks = [];

//     // Iterate over the days of the week and check if all habits are done for each day
//     for (const day of daysOfWeek) {
//         let count = 0;
//         const habitlist = await HabitStatus.find({ date: day });
//         habitlist.forEach((habit) => {
//             if (habit.status === 'Done') {
//                 count++;
//             }
//         });

//         if (count == totalhabits) {
//             doneWeeks.push(day);
//         }
//     }

//     // Create a variables object to pass data to the view
//     let variables = {
//         title: "Weekly View",
//         navLinks: navlinks,
//         daysOfWeek: daysOfWeek,
//         done: doneWeeks
//     };

//     // Render the 'week' view with the data
//     return res.render('week', variables);
// };

// // Controller to create a new habit
// module.exports.createHabit = async (req, res) => {
//     // Check if the habit with the given name already exists
//     Habit.findOne({ name: req.body.name })
//         .exec()
//         .then((habit) => {
//             if (!habit) {
//                 // If habit does not exist, create it
//                 Habit.create(req.body)
//                     .then((habit) => {
//                         // For each day of the week, create a new HabitStatus entry with the habit details
//                         daysOfWeek.forEach((day) => {
//                             HabitStatus.create({
//                                 name: habit.name,
//                                 time: habit.time,
//                                 habit: habit._id,
//                                 date: day,
//                                 status: 'None',
//                             })
//                                 .then((habitStatus) => {
//                                     // Successfully created HabitStatus entry
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error creating HabitStatus:', error);
//                                 });
//                         });
//                         // Redirect to the weekly view after successful creation
//                         return res.redirect('/details/weekly-view');
//                     })
//                     .catch((err) => {
//                         console.log("Error while creating details!");
//                         return;
//                     });

//             } else {
//                 // Habit already exists, redirect to the weekly view
//                 console.log("Habit already exists");
//                 return res.redirect('/details/weekly-view');
//             }
//         })
//         .catch((err) => {
//             console.log("Error in finding Habit!");
//             return;
//         });
// };

// // Controller to update the status of a habit
// module.exports.updateStatus = async (req, res) => {
//     // Extract the habitId and status from the request body
//     const habitId = req.body.habitId;
//     const status = req.body.status;

//     // Find the HabitStatus document by its ID and update the status field
//     await HabitStatus.findByIdAndUpdate({ _id: habitId }, { status: status });

//     // Redirect back to the previous page
//     res.redirect('back');
// };

// Import required models and libraries
const Habit = require('../models/habits');
const HabitStatus = require('../models/habitStatus');

// An array representing the days of the week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Controller to render the details view for a specific day
module.exports.detailsView = async (req, res) => {
    // Extract the date from the URL parameter (dayName)
    const date = req.params['dayName'].slice(1);

    // Fetch all habits and habit statuses for the given date
    const habits = await Habit.find({});
    const habitStatus = await HabitStatus.find({ date });

    // Create a variables object to pass data to the view
    let variables = {
        title: date + " Habits",
        Habit: habits,
        habitStatus: habitStatus,
    };

    // Return JSON response instead of rendering the view
    return res.status(200).json(variables);
};

// Controller to render the add habit view
module.exports.addHabit = async (req, res) => {
    // Return JSON response indicating that this endpoint is not applicable for JSON response
    return res.status(400).json({ message: 'This endpoint is for rendering views and does not support JSON response.' });
};

// Controller to render the weekly view
module.exports.weeklyView = async (req, res) => {
    // Count the total number of habits in the database
    const totalhabits = await Habit.countDocuments();

    // Array to store the days where all habits are marked as 'Done'
    let doneWeeks = [];

    // Iterate over the days of the week and check if all habits are done for each day
    for (const day of daysOfWeek) {
        let count = 0;
        const habitlist = await HabitStatus.find({ date: day });
        habitlist.forEach((habit) => {
            if (habit.status === 'Done') {
                count++;
            }
        });

        if (count == totalhabits) {
            doneWeeks.push(day);
        }
    }

    // Create a variables object to pass data to the view
    let variables = {
        title: "Weekly View",
        daysOfWeek: daysOfWeek,
        done: doneWeeks
    };

    // Return JSON response instead of rendering the view
    return res.status(200).json(variables);
};

// Controller to create a new habit
module.exports.createHabit = async (req, res) => {
    // Check if the habit with the given name already exists
    Habit.findOne({ name: req.body.name })
        .exec()
        .then((habit) => {
            if (!habit) {
                // If habit does not exist, create it
                Habit.create(req.body)
                    .then((habit) => {
                        // For each day of the week, create a new HabitStatus entry with the habit details
                        daysOfWeek.forEach((day) => {
                            HabitStatus.create({
                                name: habit.name,
                                time: habit.time,
                                habit: habit._id,
                                date: day,
                                status: 'None',
                            })
                                .then((habitStatus) => {
                                    // Successfully created HabitStatus entry
                                })
                                .catch((error) => {
                                    console.error('Error creating HabitStatus:', error);
                                });
                        });
                        // Return success response after successful creation
                        return res.status(201).json({ message: 'Habit created successfully.' });
                    })
                    .catch((err) => {
                        console.error('Error while creating habit:', err);
                        return res.status(500).json({ message: 'Internal Server Error.' });
                    });

            } else {
                // Habit already exists, return conflict response
                return res.status(409).json({ message: 'Habit already exists.' });
            }
        })
        .catch((err) => {
            console.error('Error in finding Habit:', err);
            return res.status(500).json({ message: 'Internal Server Error.' });
        });
};

// Controller to update the status of a habit
module.exports.updateStatus = async (req, res) => {
    // Extract the habitId and status from the request body
    const habitId = req.body.habitId;
    const status = req.body.status;

    // Find the HabitStatus document by its ID and update the status field
    await HabitStatus.findByIdAndUpdate({ _id: habitId }, { status: status });

    // Return success response after updating the status
    return res.status(200).json({ message: 'Habit status updated successfully.' });
};
