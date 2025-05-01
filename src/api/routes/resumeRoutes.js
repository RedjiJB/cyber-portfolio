const express = require('express');
const router = express.Router();
const { 
  getResumeData, 
  updateResumeData,
  trackResumeDownload
} = require('../controllers/resumeController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getResumeData);
router.post('/download-track', trackResumeDownload);

// Protected admin routes
router.put('/', protect, admin, updateResumeData);

module.exports = router;