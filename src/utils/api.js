import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Projects API
export const projectsApi = {
  getAll: (page = 1, limit = 10) => api.get(`/projects?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/projects/${id}`),
  getByCategory: (category) => api.get(`/projects/category/${category}`),
  create: (projectData) => api.post('/projects', projectData),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Blog API
export const blogApi = {
  getAll: (page = 1, limit = 10) => api.get(`/blog?page=${page}&limit=${limit}`),
  getFeatured: () => api.get('/blog/featured'),
  getById: (id) => api.get(`/blog/${id}`),
  getByCategory: (category) => api.get(`/blog/category/${category}`),
  create: (blogData) => api.post('/blog', blogData),
  update: (id, blogData) => api.put(`/blog/${id}`, blogData),
  delete: (id) => api.delete(`/blog/${id}`),
};

// Contact API
export const contactApi = {
  sendMessage: (contactData) => api.post('/contact', contactData),
  getAll: (page = 1, limit = 20) => api.get(`/contact?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/contact/${id}`),
  update: (id, data) => api.put(`/contact/${id}`, data),
  delete: (id) => api.delete(`/contact/${id}`),
};

// Resume API
export const resumeApi = {
  getData: () => api.get('/resume'),
  update: (resumeData) => api.put('/resume', resumeData),
  trackDownload: (data) => api.post('/resume/download-track', data),
};

// Auth API
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
};

export default {
  projectsApi,
  blogApi,
  contactApi,
  resumeApi,
  authApi,
};