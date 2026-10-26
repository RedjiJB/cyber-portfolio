const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const { sendEmail } = require('../utils/emailService');

/**
 * @desc    Send a contact message
 * @route   POST /api/contact
 * @access  Public
 */
const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validate input
  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please provide name, email, and message');
  }
  
  // Create contact message record
  const contactMessage = await Contact.create({
    name,
    email,
    subject: subject || 'No Subject',
    message,
    status: 'unread'
  });
  
  if (contactMessage) {
    // Send email notification
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Message: ${subject || 'No Subject'}`,
        text: `You have received a new contact message from ${name} (${email}):\n\n${message}`,
        html: `
          <h3>New Contact Message</h3>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      });
    } catch (error) {
      // Log email error but don't fail the request
      console.error('Failed to send notification email:', error);
    }
    
    res.status(201).json({
      status: 'success',
      message: 'Your message has been sent successfully!'
    });
  } else {
    res.status(400);
    throw new Error('Failed to send message');
  }
});

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private/Admin
 */
const getContactMessages = asyncHandler(async (req, res) => {
  // Setup pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const startIndex = (page - 1) * limit;
  
  // Filter options
  const status = req.query.status;
  const filterQuery = status ? { status } : {};
  
  // Get total count for pagination data
  const total = await Contact.countDocuments(filterQuery);
  
  // Query with sorting and pagination
  const messages = await Contact.find(filterQuery)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(startIndex);
    
  res.status(200).json({
    status: 'success',
    count: messages.length,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: messages,
  });
});

/**
 * @desc    Get contact message by ID
 * @route   GET /api/contact/:id
 * @access  Private/Admin
 */
const getContactMessageById = asyncHandler(async (req, res) => {
  const message = await Contact.findById(req.params.id);
  
  if (!message) {
    res.status(404);
    throw new Error('Contact message not found');
  }
  
  // If message is unread, mark as read
  if (message.status === 'unread') {
    message.status = 'read';
    await message.save();
  }
  
  res.status(200).json({
    status: 'success',
    data: message,
  });
});

/**
 * @desc    Update contact message (e.g., mark as read/archived)
 * @route   PUT /api/contact/:id
 * @access  Private/Admin
 */
const updateContactMessage = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  
  const message = await Contact.findById(req.params.id);
  
  if (!message) {
    res.status(404);
    throw new Error('Contact message not found');
  }
  
  // Update fields
  if (status) message.status = status;
  if (adminNotes) message.adminNotes = adminNotes;
  
  const updatedMessage = await message.save();
  
  res.status(200).json({
    status: 'success',
    data: updatedMessage,
  });
});

/**
 * @desc    Delete contact message
 * @route   DELETE /api/contact/:id
 * @access  Private/Admin
 */
const deleteContactMessage = asyncHandler(async (req, res) => {
  const message = await Contact.findById(req.params.id);
  
  if (!message) {
    res.status(404);
    throw new Error('Contact message not found');
  }
  
  await message.remove();
  
  res.status(200).json({
    status: 'success',
    message: 'Contact message removed',
  });
});

module.exports = {
  sendContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage
};