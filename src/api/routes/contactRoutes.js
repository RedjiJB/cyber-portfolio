const express = require('express');
const router = express.Router();
const { 
  sendContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage 
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', sendContactMessage);

// Protected admin routes
router.get('/', protect, admin, getContactMessages);
router.get('/:id', protect, admin, getContactMessageById);
router.put('/:id', protect, admin, updateContactMessage);
router.delete('/:id', protect, admin, deleteContactMessage);

module.exports = router;