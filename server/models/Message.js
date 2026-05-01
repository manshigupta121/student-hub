const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user: { type: String, default: "AKTU Student" },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);