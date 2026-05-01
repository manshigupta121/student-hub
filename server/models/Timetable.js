const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    day: { type: String, required: true },
    subject: { type: String, required: true },
    time: { type: String, required: true },
    books: { type: String, required: true }, // The "Don't Forget" list
});

module.exports = mongoose.model('Timetable', TimetableSchema);