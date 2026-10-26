const asyncHandler = require('express-async-handler');
const Resume = require('../models/resumeModel');
const DownloadTracker = require('../models/downloadTrackerModel');

/**
 * @desc    Get resume data
 * @route   GET /api/resume
 * @access  Public
 */
const getResumeData = asyncHandler(async (req, res) => {
  // Find the latest resume data
  const resumeData = await Resume.findOne().sort({ updatedAt: -1 });
  
  if (!resumeData) {
    res.status(404);
    throw new Error('Resume data not found');
  }
  
  res.status(200).json({
    status: 'success',
    data: resumeData,
  });
});

/**
 * @desc    Update resume data
 * @route   PUT /api/resume
 * @access  Private/Admin
 */
const updateResumeData = asyncHandler(async (req, res) => {
  const resumeData = await Resume.findOne().sort({ updatedAt: -1 });
  
  // If no resume data exists, create it
  if (!resumeData) {
    const newResumeData = await Resume.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: newResumeData,
    });
    return;
  }
  
  // Update the resume data
  const updatedResumeData = await Resume.findByIdAndUpdate(
    resumeData._id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.status(200).json({
    status: 'success',
    data: updatedResumeData,
  });
});

/**
 * @desc    Track resume downloads
 * @route   POST /api/resume/download-track
 * @access  Public
 */
const trackResumeDownload = asyncHandler(async (req, res) => {
  const { source, referrer } = req.body;
  
  // Create download record
  await DownloadTracker.create({
    documentType: 'resume',
    source: source || 'website',
    referrer: referrer || '',
    ipAddress: req.ip,
    userAgent: req.get('User-Agent') || ''
  });
  
  res.status(200).json({
    status: 'success',
    message: 'Download tracked',
  });
});

module.exports = {
  getResumeData,
  updateResumeData,
  trackResumeDownload
};