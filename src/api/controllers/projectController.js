const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
const getProjects = asyncHandler(async (req, res) => {
  // Setup pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  
  // Get total count for pagination data
  const total = await Project.countDocuments({});
  
  // Query with sorting and pagination
  const projects = await Project.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(startIndex);
  
  if (!projects || projects.length === 0) {
    res.status(404);
    throw new Error('No projects found');
  }
  
  res.status(200).json({
    status: 'success',
    count: projects.length,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: projects,
  });
});

/**
 * @desc    Get project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  
  res.status(200).json({
    status: 'success',
    data: project,
  });
});

/**
 * @desc    Get projects by category
 * @route   GET /api/projects/category/:category
 * @access  Public
 */
const getProjectsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  const projects = await Project.find({ category });
  
  if (!projects || projects.length === 0) {
    res.status(404);
    throw new Error(`No projects found in category: ${category}`);
  }
  
  res.status(200).json({
    status: 'success',
    count: projects.length,
    data: projects,
  });
});

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private/Admin
 */
const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    overview,
    problem,
    features,
    image,
    technologies,
    demoUrl,
    githubUrl,
    category
  } = req.body;
  
  // Validate required fields
  if (!title || !overview || !technologies || !category) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  // Create new project
  const project = await Project.create({
    title,
    overview,
    problem,
    features,
    image,
    technologies,
    demoUrl,
    githubUrl,
    category
  });
  
  if (project) {
    res.status(201).json({
      status: 'success',
      data: project,
    });
  } else {
    res.status(400);
    throw new Error('Invalid project data');
  }
});

/**
 * @desc    Update a project
 * @route   PUT /api/projects/:id
 * @access  Private/Admin
 */
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  
  // Update project
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { 
      new: true, 
      runValidators: true 
    }
  );
  
  res.status(200).json({
    status: 'success',
    data: updatedProject,
  });
});

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private/Admin
 */
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  
  await project.remove();
  
  res.status(200).json({
    status: 'success',
    message: 'Project removed',
  });
});

module.exports = {
  getProjects,
  getProjectById,
  getProjectsByCategory,
  createProject,
  updateProject,
  deleteProject
};