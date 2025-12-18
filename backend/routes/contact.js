const express = require('express');
const Contact = require('../models/Contact');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Submit contact form
router.post('/submit', auth, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const contact = new Contact({
      user: req.user.id,
      name,
      email,
      phone,
      subject,
      message
    });

    await contact.save();
    res.json({ message: 'Message submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's messages
router.get('/my-messages', auth, async (req, res) => {
  try {
    const messages = await Contact.find({ user: req.user.id })
      .populate('adminReply.repliedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: Get all messages
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const messages = await Contact.find()
      .populate('user', 'name email')
      .populate('adminReply.repliedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: Reply to message
router.put('/reply/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { replyMessage } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status: 'replied',
        adminReply: {
          message: replyMessage,
          repliedBy: req.user.id,
          repliedAt: new Date()
        }
      },
      { new: true }
    ).populate('user', 'name email').populate('adminReply.repliedBy', 'name');

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;