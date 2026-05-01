const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Quantum = require('./models/Quantum');
const Notification = require('./models/Notification');
const scrapeAKTU = require('./scraper');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const scheduleRoute = require('./routes/schedule');
app.use('/api/schedule', scheduleRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to Database!"))
    .catch((err) => console.log("DB Connection Error:", err));

// 1. Route to get all Quantums based on selection
app.get('/api/quantums/:branch/:semester', async (req, res) => {
  const { branch, semester } = req.params;
  const data = await Quantum.find({ branch, semester });
  res.json(data);
});

// 2. Route to get Scraped AKTU Notifications
app.get('/api/aktu-notifications', async (req, res) => {
  // We run the scraper every time this is called, or you can use a timer
  await scrapeAKTU(); 
  const notifications = await Notification.find().sort({ _id: -1 }).limit(10);
  res.json(notifications);
});    

// 1. Where to store the PDFs
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// 2. Make the uploads folder accessible to the browser
app.use('/uploads', express.static('uploads'));

// 3. Upload Route
app.post('/api/upload-quantum', upload.single('pdf'), async (req, res) => {
  const { subjectName, branch, semester } = req.body;
  const newQuantum = new Quantum({
    subjectName,
    branch,
    semester,
    pdfUrl: `http://localhost:5000/uploads/${req.file.filename}`
  });
  await newQuantum.save();
  res.json({ message: "Uploaded successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));