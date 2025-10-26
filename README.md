# Cybersecurity Portfolio - Redji Jean Baptiste

[![Screenshot](/public/portfolio-screenshot.png?raw=true)](https://redjijb.github.io/cyber-portfolio/)

[![GitHub license](https://img.shields.io/github/license/RedjiJB/cyber-portfolio.svg)](https://github.com/RedjiJB/cyber-portfolio/blob/main/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/RedjiJB/cyber-portfolio/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-17.0.0-blue.svg)](https://reactjs.org/)

A comprehensive, modern portfolio website showcasing cybersecurity expertise, networking projects, and innovative technology solutions. Built with React, Material-UI, and featuring an interactive 3D background, blog system, and standalone interactive resume.

## 🚀 Live Demo

Check out the live portfolio at: [https://redjijb.github.io/cyber-portfolio/](https://redjijb.github.io/cyber-portfolio/)

## 🛠️ Built With

### Frontend Stack
-   **Framework:** [React](https://reactjs.org) v17.0.0
-   **UI Library:** [Material-UI](https://material-ui.com) v4.11.0
-   **3D Graphics:** [Three.js](https://threejs.org) v0.125.0
-   **Routing:** React Router DOM v5.2.0
-   **Animations:** Popmotion v8.7.3
-   **Markdown:** React Markdown v8.0.7

### Backend & Services
-   **Backend API:** Express.js v4.17.1
-   **Database:** MongoDB with Mongoose v5.13.5
-   **Authentication:** JWT + bcryptjs
-   **Email Service:** EmailJS v3.6.2
-   **Security:** Helmet, rate limiting, input sanitization

### Development & Deployment
-   **Build Tool:** Create React App v5.0.1
-   **Package Manager:** npm
-   **Deployment:** GitHub Pages
-   **Version Control:** Git with conventional commits

## ✨ Key Features

### 🎨 Frontend Experience
-   **Interactive 3D Background** - Dynamic displacement sphere animation using Three.js
-   **Dark/Light Mode** - Theme toggle with local storage persistence
-   **Responsive Design** - Mobile-first approach ensuring great UX across all devices
-   **Smooth Animations** - Page transitions and interactive elements
-   **Progressive Web App** - Optimized for mobile and desktop

### 📝 Content Management
-   **Interactive Blog Carousel** - Smooth carousel navigation with autoplay and manual controls
-   **Multi-Category Blog System** - Three distinct blog categories with filtering
-   **Project Showcase** - Detailed case studies with live demos and source code
-   **Dynamic Content** - All content managed through JSON configuration files
-   **Markdown Support** - Blog posts written in Markdown with syntax highlighting
-   **SEO Optimized** - React Helmet for meta tags and search engine optimization

### 🔧 Technical Features
-   **RESTful API** - Express.js backend with MongoDB integration
-   **Contact Form** - Integrated email service with form validation
-   **Resume System** - Both React-based and standalone interactive resume
-   **Blog Management** - Full CRUD operations for blog posts
-   **Error Handling** - Comprehensive error boundaries and API error handling

## 🏗️ Architecture Overview

### Blog System
The portfolio features a sophisticated blog system with three distinct categories:

1. **D Central Research** - Security sovereignty and democratic technology research
2. **Student Projects** - Technical learning and academic project showcases  
3. **Extracurricular Projects** - Independent innovation and advanced technology development

### Resume System
-   **React Resume Component** - Integrated portfolio resume page
-   **Standalone Interactive Resume** - Independent HTML/CSS/JS resume at `/interactive-resume/`
-   **PDF Download** - Downloadable resume versions

### Project Showcase
-   **Cybersecurity Projects** - Network security, vulnerability assessment, incident response
-   **Blockchain & Web3** - Smart contracts, DeFi applications, governance systems
-   **AI/ML Applications** - Machine learning models, natural language processing
-   **Networking Solutions** - Infrastructure design, automation tools

## 📁 Project Structure

```
cyber-portfolio/
├── public/                          # Static assets and interactive resume
│   ├── interactive-resume/          # Standalone HTML resume
│   │   ├── index.html              # Interactive resume main page
│   │   ├── styles.css              # Resume styling
│   │   ├── script.js               # Resume interactivity
│   │   └── assets/                 # Resume assets (PDFs, images)
│   └── content/                    # Static blog content and images
├── src/                            # React application source
│   ├── api/                        # Express.js backend
│   │   ├── controllers/            # API route handlers
│   │   ├── models/                 # MongoDB schemas
│   │   ├── routes/                 # API route definitions
│   │   ├── middleware/             # Custom middleware
│   │   └── utils/                  # Backend utilities
│   ├── app/                        # Core React app setup
│   │   ├── App.js                  # Main app component with routing
│   │   └── HelmetMeta.js           # SEO meta tags
│   ├── components/                 # Reusable React components
│   │   ├── about/                  # About section components
│   │   ├── background/             # 3D background components
│   │   ├── blog/                   # Blog system components
│   │   ├── contact/                # Contact form components
│   │   ├── content/                # Content display components
│   │   ├── logo/                   # Logo and branding
│   │   ├── nav/                    # Navigation components
│   │   ├── resume/                 # Resume page components
│   │   ├── speedDial/              # Mobile navigation
│   │   ├── theme/                  # Theme system components
│   │   └── works/                  # Project showcase components
│   ├── pages/                      # Page-level components
│   │   ├── Blog.js                 # Main blog page
│   │   ├── BlogPost.js             # Individual blog post page
│   │   ├── DCentralBlog.js         # D Central research blog
│   │   ├── StudentBlog.js          # Student projects blog
│   │   ├── ExtracurricularBlog.js  # Extracurricular projects blog
│   │   ├── Projects.js             # Projects showcase page
│   │   ├── AboutPage.js            # About page
│   │   ├── ContactPage.js          # Contact page
│   │   ├── Resume.js               # Resume page
│   │   ├── Home.js                 # Landing page
│   │   └── PageNotFound.js         # 404 error page
│   ├── settings/                   # Configuration files
│   │   ├── blog.json               # Legacy blog configuration
│   │   ├── projects.json           # Projects data
│   │   ├── resume.json             # Resume data
│   │   ├── settings.json           # Site-wide settings
│   │   └── posts/                  # Markdown blog posts
│   ├── utils/                      # Utility functions
│   │   ├── blogData.js             # Blog data management
│   │   ├── blogManager.js          # Blog content management
│   │   ├── api.js                  # API utilities
│   │   └── various helpers...      # Other utility functions
│   └── assets/                     # React app assets
├── content/                        # Content management
│   └── blog/                       # Blog content and images
│       ├── posts/                  # Markdown blog posts
│       └── images/                 # Blog post images
└── interactive-resume-repo/        # Resume development files
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (optional, for backend API functionality)
- **Git** for version control

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/RedjiJB/cyber-portfolio.git
cd cyber-portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm start
```

The portfolio will open at `http://localhost:3000`

### Full Development Setup (with Backend)

1. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string and email service config
```

2. **Start both frontend and backend:**
```bash
npm run dev
```

This starts:
- React frontend on `http://localhost:3000`
- Express backend API on `http://localhost:5001`

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/cyber-portfolio

# Email Service (EmailJS)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_USER_ID=your_user_id

# JWT
JWT_SECRET=your_jwt_secret_here

# Node Environment
NODE_ENV=development
```

## 🎨 Customization

### Content Management

The portfolio uses a hybrid content management system:

#### 1. JSON Configuration Files (`src/settings/`)
- **`settings.json`** - Personal info, social links, site metadata
- **`projects.json`** - Project showcase data with categories and filtering
- **`resume.json`** - Professional experience, skills, education
- **`blog.json`** - Legacy blog configuration (deprecated)

#### 2. Blog System (`src/utils/blogData.js`)
- **Categories:** D Central Research, Student Projects, Extracurricular Projects
- **Posts:** Managed in `blogData.js` with markdown file references
- **Content:** Markdown files in `content/blog/posts/`

#### 3. Interactive Resume (`public/interactive-resume/`)
- **Standalone HTML/CSS/JS** - Independent of React app
- **Direct editing** of HTML content for quick updates
- **PDF downloads** managed in assets folder

### Theme Customization

The portfolio features a comprehensive theming system:

```javascript
// src/components/theme/Themes.js
export const lightTheme = {
  palette: {
    primary: { main: '#007BFF' },
    secondary: { main: '#6C757D' },
    // ... customize colors
  }
};
```

**Color scheme categories:**
- D Central Research: Red (`#e74c3c`)
- Student Projects: Blue (`#3776ab`) 
- Extracurricular Projects: Green (`#27ae60`)

### Adding New Content

#### Projects
Edit `src/settings/projects.json`:

```json
{
  "id": "unique-id",
  "name": "Project Name",
  "description": "Detailed description",
  "image": "/assets/recentprojects/project-image.png",
  "tags": ["React", "Security", "Blockchain"],
  "category": "Cybersecurity",
  "links": {
    "github": "https://github.com/username/repo",
    "demo": "https://demo-url.com",
    "documentation": "https://docs-url.com"
  },
  "featured": true,
  "technologies": ["React", "Node.js", "MongoDB"]
}
```

#### Blog Posts
Add to `src/utils/blogData.js`:

```javascript
{
  id: "post-slug",
  slug: "post-slug",
  title: "Post Title",
  date: "2025-08-22",
  author: "Your Name",
  category: "Student Projects", // or "D Central" or "Extracurricular Projects"
  tags: ["Technology", "Security"],
  description: "Post excerpt",
  image: "/content/blog/images/post-image.jpg",
  readingTime: 10,
  featured: true
}
```

Then create the markdown file in `content/blog/posts/post-slug.md`

## 📦 Available Scripts

### Development
```bash
npm start                 # Run React frontend only (port 3000)
npm run api              # Run Express backend only (port 5001)  
npm run dev              # Run both frontend and backend concurrently
npm test                 # Run test suite
```

### Build & Deployment
```bash
npm run build            # Build React app for production
npm run predeploy        # Pre-deployment build
npm run deploy           # Deploy to GitHub Pages
```

### Utilities
```bash
npm run eject            # Eject from Create React App (irreversible)
```

## 🌐 Deployment Options

### GitHub Pages (Current Setup)
The portfolio is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch.

### Manual Deployment Steps
1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings
3. **Set source to gh-pages branch**
4. **Configure custom domain** (optional)
5. **Run deployment** with `npm run deploy`

### Alternative Deployment Platforms

#### Vercel
1. Sign up for [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables
4. Deploy automatically on push

#### Netlify
1. Sign up for [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`

#### Docker Deployment
```dockerfile
# Use official Node.js runtime
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! See our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on:

- Setting up the development environment
- Project architecture and components
- Adding new features and content
- Code style and conventions
- Submitting pull requests

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes, new features, and improvements.

## 🐛 Known Issues

- **Interactive Resume Mobile**: Some animations may not work optimally on older mobile devices
- **3D Background Performance**: Reduced animation quality on low-end devices (intentional optimization)
- **Blog Search**: Search functionality is currently client-side only

## 🗺️ Roadmap

### Upcoming Features
- [ ] **Admin Panel** - Content management interface
- [ ] **Comments System** - Blog post comments and discussions
- [ ] **Analytics Dashboard** - Visitor statistics and engagement metrics
- [ ] **CMS Integration** - Headless CMS for easier content management
- [ ] **PWA Features** - Service worker and offline functionality
- [ ] **Multi-language Support** - Internationalization (i18n)

### Performance & UX
- [ ] **Image Optimization** - WebP support and lazy loading
- [ ] **Bundle Splitting** - Code splitting for better load times
- [ ] **Accessibility** - WCAG 2.1 AA compliance
- [ ] **SEO Enhancement** - Structured data and meta optimization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Inspiration & Credits
- **Original Portfolio Template** - [Jo Lienhoop](https://github.com/JoHoop)
- **3D Animations** - Inspired by [Cody Bennett](https://github.com/CodyJasonBennett)
- **UI Components** - [Material-UI](https://material-ui.com/) team
- **3D Graphics** - [Three.js](https://threejs.org/) community

### Dependencies & Tools
- **React Ecosystem** - React team and community contributors
- **Build Tools** - Create React App team
- **Markdown Processing** - React Markdown and related plugins
- **Email Service** - EmailJS for contact form functionality

## 📧 Contact & Support

### Author
**Redji Jean Baptiste**
- **Portfolio:** [https://redjijb.github.io/cyber-portfolio/](https://redjijb.github.io/cyber-portfolio/)
- **LinkedIn:** [https://www.linkedin.com/in/redji-jean-baptiste-25b0471b7](https://www.linkedin.com/in/redji-jean-baptiste-25b0471b7)
- **GitHub:** [https://github.com/RedjiJB](https://github.com/RedjiJB)
- **Email:** jredji429@gmail.com

### Project Links
- **Repository:** [https://github.com/RedjiJB/cyber-portfolio](https://github.com/RedjiJB/cyber-portfolio)
- **Issues:** [https://github.com/RedjiJB/cyber-portfolio/issues](https://github.com/RedjiJB/cyber-portfolio/issues)
- **Discussions:** [https://github.com/RedjiJB/cyber-portfolio/discussions](https://github.com/RedjiJB/cyber-portfolio/discussions)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Redji Jean Baptiste](https://github.com/RedjiJB)

</div>
