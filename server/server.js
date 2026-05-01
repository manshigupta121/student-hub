const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import Models
const User = require('./models/User');
const Message = require('./models/Message');
const Resource = require('./models/Resource');

// --- NEW: Schedule Model ---
const scheduleSchema = new mongoose.Schema({
    day: String,
    subject: String,
    time: String,
    books: String
});
const Schedule = mongoose.model('Schedule', scheduleSchema);

const app = express(); // App initialized FIRST

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/test', (req, res) => {
    res.send("Server is alive and recognizing routes!");
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "your_mongodb_atlas_connection_string_here";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- API ROUTES ---

// 1. Resources (SelectionFlow)
app.get('/api/resources', async (req, res) => {
    const { branch, semester, subject } = req.query;
    try {
        const resources = await Resource.find({ branch, semester, subject });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/resources', async (req, res) => {
    try {
        const newResource = new Resource(req.body);
        await newResource.save();
        res.status(201).json(newResource);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. Community Messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const newMessage = new Message({
            user: req.body.user || "Anonymous",
            text: req.body.text
        });
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- UPDATED: SCHEDULER ROUTES ---

// GET Schedule
app.get('/api/schedule', async (req, res) => {
    try {
        const schedule = await Schedule.find();
        res.json(schedule);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST New Lecture
app.post('/api/schedule', async (req, res) => {
    try {
        const newLecture = new Schedule(req.body);
        await newLecture.save();
        res.status(201).json(newLecture);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE Lecture
app.delete('/api/schedule/:id', async (req, res) => {
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.json({ message: "Lecture deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- AUTH ROUTES ---

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        
        console.log(`👤 New user registered: ${email}`);
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        console.error("❌ Registration Error:", err);
        res.status(500).json({ error: err.message || "Registration failed" });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "No user found with this email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Wrong password. Try again." });

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || "SUPER_SECRET_KEY_123", 
            { expiresIn: '7d' } 
        );
        
        console.log(`🔑 User logged in: ${email}`);
        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error("❌ Login Error:", err);
        res.status(500).json({ error: "Server login error" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});