const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// GET all schedules
router.get('/', async (req, res) => {
    try {
        const data = await Timetable.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new schedule
router.post('/', async (req, res) => {
    const entry = new Timetable({
        day: req.body.day,
        subject: req.body.subject,
        time: req.body.time,
        books: req.body.books
    });
    try {
        const newEntry = await entry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a schedule entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await Timetable.findByIdAndDelete(req.params.id);
        if (!deletedEntry) return res.status(404).json({ message: "Entry not found" });
        res.json({ message: "Entry deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;