const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject,
  getProjectsByCategory
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProjects);
router.get('/category/:category', getProjectsByCategory);
router.get('/:id', getProjectById);

// Protected admin routes
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);

module.exports = router;