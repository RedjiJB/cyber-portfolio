const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');

/**
 * @desc    Get all blog posts
 * @route   GET /api/blog
 * @access  Public
 */
const getBlogs = asyncHandler(async (req, res) => {
  // Setup pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  
  // Get total count for pagination data
  const total = await Blog.countDocuments({});
  
  // Query with sorting and pagination
  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(startIndex);
  
  if (!blogs || blogs.length === 0) {
    res.status(404);
    throw new Error('No blog posts found');
  }
  
  res.status(200).json({
    status: 'success',
    count: blogs.length,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: blogs,
  });
});

/**
 * @desc    Get featured blog posts
 * @route   GET /api/blog/featured
 * @access  Public
 */
const getFeaturedBlogs = asyncHandler(async (req, res) => {
  const featuredBlogs = await Blog.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(3);
  
  if (!featuredBlogs || featuredBlogs.length === 0) {
    res.status(404);
    throw new Error('No featured blog posts found');
  }
  
  res.status(200).json({
    status: 'success',
    count: featuredBlogs.length,
    data: featuredBlogs,
  });
});

/**
 * @desc    Get blog post by ID
 * @route   GET /api/blog/:id
 * @access  Public
 */
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  
  res.status(200).json({
    status: 'success',
    data: blog,
  });
});

/**
 * @desc    Get blog posts by category
 * @route   GET /api/blog/category/:category
 * @access  Public
 */
const getBlogsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  const blogs = await Blog.find({ categories: category })
    .sort({ createdAt: -1 });
  
  if (!blogs || blogs.length === 0) {
    res.status(404);
    throw new Error(`No blog posts found in category: ${category}`);
  }
  
  res.status(200).json({
    status: 'success',
    count: blogs.length,
    data: blogs,
  });
});

/**
 * @desc    Create a new blog post
 * @route   POST /api/blog
 * @access  Private/Admin
 */
const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    excerpt,
    coverImage,
    categories,
    featured
  } = req.body;
  
  // Validate required fields
  if (!title || !content || !excerpt) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  // Create new blog post
  const blog = await Blog.create({
    title,
    content,
    excerpt,
    coverImage,
    categories,
    featured: featured || false,
    author: req.user.id
  });
  
  if (blog) {
    res.status(201).json({
      status: 'success',
      data: blog,
    });
  } else {
    res.status(400);
    throw new Error('Invalid blog data');
  }
});

/**
 * @desc    Update a blog post
 * @route   PUT /api/blog/:id
 * @access  Private/Admin
 */
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  
  // Update blog post
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { 
      new: true, 
      runValidators: true 
    }
  );
  
  res.status(200).json({
    status: 'success',
    data: updatedBlog,
  });
});

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/blog/:id
 * @access  Private/Admin
 */
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  
  await blog.remove();
  
  res.status(200).json({
    status: 'success',
    message: 'Blog post removed',
  });
});

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
  getFeaturedBlogs
};