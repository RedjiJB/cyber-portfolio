const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./connectDB');
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const Blog = require('../models/blogModel');
const Resume = require('../models/resumeModel');

// Load existing data
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Read data files
const projectsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../settings/projects.json'), 'utf-8')
).projects;

const blogData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../settings/blog.json'), 'utf-8')
).posts;

const resumeData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../settings/resume.json'), 'utf-8')
);

// Import data into DB
const importData = async () => {
  try {
    // Create admin user
    const adminUser = await User.create({
      name: 'Redji Jean Baptiste',
      email: process.env.ADMIN_EMAIL,
      password: 'Admin123!',
      isAdmin: true
    });

    console.log('Admin user created'.green.inverse);

    // Add projects
    const formattedProjects = projectsData.map((project, index) => ({
      ...project,
      _id: undefined, // Let MongoDB generate IDs
      author: adminUser._id
    }));

    await Project.insertMany(formattedProjects);
    console.log(`${formattedProjects.length} projects imported`.green.inverse);

    // Add blog posts
    const formattedBlogs = blogData.map((post) => ({
      title: post.title,
      content: post.content || 'Content placeholder',
      excerpt: post.excerpt || post.title,
      coverImage: post.image || '/assets/blog/default-cover.jpg',
      categories: post.categories || ['Web Development'],
      featured: post.featured || false,
      author: adminUser._id,
    }));

    await Blog.insertMany(formattedBlogs);
    console.log(`${formattedBlogs.length} blog posts imported`.green.inverse);

    // Add resume data
    await Resume.create({
      basics: {
        name: resumeData.basics.name,
        label: resumeData.basics.label,
        email: "jredji429@gmail.com",
        phone: resumeData.basics.phone,
        website: resumeData.basics.website,
        summary: resumeData.basics.summary,
        location: resumeData.basics.location,
        profiles: [
          {
            network: "Email",
            username: "jredji429@gmail.com",
            url: "mailto:jredji429@gmail.com",
            icon: "fas fa-envelope"
          },
          {
            network: "Discord",
            username: "uncleruckus9003",
            url: "https://discord.com/users/uncleruckus9003",
            icon: "fab fa-discord"
          },
          {
            network: "Telegram",
            username: "RedjiJB",
            url: "https://t.me/RedjiJB",
            icon: "fab fa-telegram"
          },
          {
            network: "LinkedIn",
            username: "redji-jean-baptiste",
            url: "https://www.linkedin.com/in/redji-jean-baptiste-25b0471b7",
            icon: "fab fa-linkedin"
          },
          {
            network: "GitHub",
            username: "RedjiJB",
            url: "https://github.com/RedjiJB",
            icon: "fab fa-github"
          },
          {
            network: "GitLab",
            username: "RedjiJB",
            url: "https://gitlab.com/RedjiJB",
            icon: "fab fa-gitlab"
          }
        ]
      },
      work: resumeData.work,
      education: resumeData.education,
      skills: resumeData.skills.map(skill => ({
        name: skill.name,
        level: skill.level,
        category: skill.category || 'Other'
      })),
      languages: resumeData.languages,
      interests: resumeData.interests
    });
    console.log('Resume data imported'.green.inverse);

    console.log('Data Import Complete!'.green.bold);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Delete all data from DB
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await Blog.deleteMany();
    await Resume.deleteMany();

    console.log('Data Destroyed!'.red.bold);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command line args to determine action
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}