const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    branch: { type: String, required: true },    // e.g., 'CSE'
    semester: { type: String, required: true },  // e.g., '5'
    subject: { type: String, required: true },   // e.g., 'DBMS'
    type: { type: String, required: true },      // e.g., 'quantum', 'pyqs', 'syllabus'
    fileUrl: { type: String, required: true },   // The link to the PDF
    uploadedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Resource', ResourceSchema);