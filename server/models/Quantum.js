const mongoose = require('mongoose');

const quantumSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    branch: { type: String, required: true },     // e.g., 'CSE'
    semester: { type: String, required: true },   // e.g., '5'
    pdfUrl: { type: String, required: true },     // Link to the PDF file
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quantum', quantumSchema);