const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Prescription = require('../models/Prescription');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = 'uploads/prescriptions/';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for prescription uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `prescription_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'));
    }
  }
});

// Upload prescription
router.post('/upload', auth, upload.single('prescription'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { doctorName, patientName, hospitalName, medicines } = req.body;

    const prescription = new Prescription({
      user: req.user.id,
      prescriptionImage: req.file.path,
      doctorName,
      patientName,
      hospitalName,
      medicines: JSON.parse(medicines || '[]')
    });

    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    console.error('Prescription upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user prescriptions
router.get('/my', auth, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all prescriptions
router.get('/all', adminAuth, async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Verify prescription
router.put('/verify/:id', adminAuth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status, notes, verifiedBy: req.user.id },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;