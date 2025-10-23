# 🗂️ Portfolio Directory Structure

Complete directory structure and file organization for the Cybersecurity Portfolio project.

**Last Updated:** October 2025  
**Project:** cyber-portfolio  
**Author:** Redji Jean Baptiste

---

## 📋 Table of Contents

1. [Root Directory](#root-directory)
2. [Source Directory (`src/`)](#source-directory-src)
3. [Public Assets (`public/`)](#public-assets-public)
4. [Content Management (`content/`)](#content-management-content)
5. [Configuration Files](#configuration-files)
6. [Docker Setup](#docker-setup)
7. [Project Structure Overview](#project-structure-overview)

---

## Root Directory

```
cyber-portfolio/
├── README.md                      # Main project documentation
├── README-BLOG.md                 # Blog system documentation
├── README-image-generation.md     # Image generation guide
├── CHANGELOG.md                   # Version history and changes
├── CONTRIBUTING.md                # Contribution guidelines
├── LICENSE                        # MIT License
├── package.json                   # Node.js dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── Dockerfile                     # Docker container configuration
├── docker-compose.yml             # Multi-container Docker setup
├── docker-dev.sh                  # Docker development helper script
└── projects-list.md               # Project inventory document
```

### Key Root Files

| File | Purpose | Notes |
|------|---------|-------|
| `README.md` | Primary documentation with setup instructions | User-facing documentation |
| `package.json` | NPM dependencies, scripts, and metadata | Run `npm install` to setup |
| `Dockerfile` | Multi-stage Docker build configuration | Development + Production stages |
| `docker-compose.yml` | Container orchestration for dev environment | Frontend (3000) + API (5000) |
| `docker-dev.sh` | Helper script for Docker commands | Executable shell script |

---

## Source Directory (`src/`)

The main application source code organized by functionality.

### 📁 `src/` Structure

```
src/
├── index.js                       # Application entry point
├── index.css                      # Global styles
├── server.js                      # Development server configuration
├── app/                           # Core application setup
├── pages/                         # Page-level components
├── components/                    # Reusable UI components
├── api/                           # Backend Express.js API
├── utils/                         # Utility functions
├── hooks/                         # Custom React hooks
├── settings/                      # Configuration JSON files
└── assets/                        # Static assets (images, etc.)
```

---

### 🎯 `src/app/` - Application Core

**Purpose:** Core application configuration and routing setup.

```
src/app/
├── App.js                         # Main app component with React Router
└── HelmetMeta.js                  # SEO meta tags configuration
```

**Key Components:**
- **App.js**: Router configuration, lazy loading, route definitions
- **HelmetMeta.js**: Dynamic meta tags for SEO optimization

---

### 📄 `src/pages/` - Page Components

**Purpose:** Top-level page components representing different routes.

```
src/pages/
├── Home.js                        # Landing page (/)
├── Projects.js                    # Projects showcase (/projects)
├── Labs.js                        # Experimental labs page (/labs)
├── AboutPage.js                   # About page (/about)
├── ContactPage.js                 # Contact page (/contact)
├── Resume.js                      # Resume page (/resume)
├── Blog.js                        # Main blog page (/blog)
├── BlogPost.js                    # Individual blog post (/blog/:slug)
├── DCentralBlog.js                # D Central category (/blog/d-central)
├── StudentBlog.js                 # Student projects (/blog/student)
├── ExtracurricularBlog.js         # Extracurricular (/blog/extracurricular)
└── PageNotFound.js                # 404 error page
```

**Page Breakdown:**

| Page | Route | Purpose | Key Features |
|------|-------|---------|--------------|
| Home | `/` | Landing page | 3D background, hero section, navigation |
| Projects | `/projects` | Project showcase | Completed + planned projects, filtering |
| Labs | `/labs` | Experimental work | Prototypes, research, experimental projects |
| About | `/about` | Personal info | Biography, skills, experience |
| Contact | `/contact` | Contact form | EmailJS integration, social links |
| Resume | `/resume` | Interactive resume | Tabbed interface, download options |
| Blog | `/blog` | Blog home | Featured posts, carousel, categories |
| BlogPost | `/blog/:slug` | Individual post | Markdown rendering, metadata |

---

### 🧩 `src/components/` - UI Components

**Purpose:** Reusable React components organized by feature.

```
src/components/
├── about/                         # About page components
│   ├── About.js
│   └── About.css
├── background/                    # 3D animated background
│   ├── DisplacementSphere.js
│   ├── DisplacementSphere.css
│   ├── sphereFragShader.js
│   └── sphereVertShader.js
├── blog/                          # Blog system components
│   ├── BlogCarousel.js            # Animated post carousel
│   ├── BlogFeatured.js            # Featured post display
│   ├── BlogPost.js                # Single post component
│   └── BlogPostCard.js            # Post preview card
├── contact/                       # Contact form components
│   ├── Contact.js
│   ├── Contact.css
│   └── SocialLinks.js
├── content/                       # Homepage content
│   ├── Content.js                 # Main hero content
│   ├── ResumeButton.js            # Resume download button
│   ├── SocialIcons.js             # Social media links
│   ├── TextDecrypt.js             # Animated text effect
│   └── Today.js                   # Dynamic greeting
├── logo/                          # Logo components
│   ├── Logo.js
│   └── LogoLink.js
├── nav/                           # Navigation components
│   ├── TopNavbar.js               # Main top navigation
│   ├── SideNavbar.js              # Side navigation (deprecated)
│   └── SideNavbar.css
├── resume/                        # Resume components
│   └── Resume.js
├── speedDial/                     # Mobile floating action button
│   └── SpeedDial.js
├── theme/                         # Theme system
│   ├── ThemeProvider.js           # Theme context provider
│   ├── ThemeToggle.js             # Light/dark toggle
│   └── Themes.js                  # Theme definitions
└── works/                         # Project components
    ├── Works.js                   # Main works component
    ├── Works.css
    └── RecentProjects.js          # Recent projects display
```

**Component Categories:**

| Category | Components | Purpose |
|----------|-----------|---------|
| **Navigation** | TopNavbar, SideNavbar, SpeedDial | Site navigation (desktop + mobile) |
| **Blog** | BlogCarousel, BlogFeatured, BlogPostCard | Blog content display |
| **Content** | Content, TextDecrypt, SocialIcons | Homepage hero section |
| **Theme** | ThemeProvider, ThemeToggle, Themes | Dark/light mode system |
| **Background** | DisplacementSphere, Shaders | 3D animated sphere |
| **Works** | Works, RecentProjects | Project showcase |

---

### 🔌 `src/api/` - Backend API

**Purpose:** Express.js backend API for database operations and services.

```
src/api/
├── index.js                       # API entry point
├── server.js                      # Express server configuration
├── package.json                   # API-specific dependencies
├── controllers/                   # Request handlers
│   ├── authController.js
│   ├── blogController.js
│   ├── contactController.js
│   ├── projectController.js
│   └── resumeController.js
├── models/                        # MongoDB schemas
│   ├── userModel.js
│   ├── blogModel.js
│   ├── contactModel.js
│   ├── projectModel.js
│   ├── resumeModel.js
│   └── downloadTrackerModel.js
├── routes/                        # API route definitions
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   ├── contactRoutes.js
│   ├── projectRoutes.js
│   └── resumeRoutes.js
├── middleware/                    # Express middleware
│   ├── authMiddleware.js          # JWT authentication
│   └── errorMiddleware.js         # Error handling
└── utils/                         # API utilities
    ├── connectDB.js               # MongoDB connection
    ├── emailService.js            # Email sending (nodemailer)
    └── seeder.js                  # Database seeding
```

**API Structure:**

| Component | Purpose | Technology |
|-----------|---------|------------|
| **Controllers** | Business logic for each resource | Express handlers |
| **Models** | Database schemas and validation | Mongoose |
| **Routes** | API endpoint definitions | Express Router |
| **Middleware** | Authentication, error handling | JWT, custom |
| **Utils** | Database, email, seeding | MongoDB, Nodemailer |

**API Endpoints:**

- `/api/auth` - Authentication (login, register)
- `/api/blog` - Blog CRUD operations
- `/api/contact` - Contact form submissions
- `/api/projects` - Project management
- `/api/resume` - Resume data and downloads

---

### 🛠️ `src/utils/` - Utility Functions

**Purpose:** Helper functions and utilities used across the application.

```
src/utils/
├── api.js                         # API request utilities
├── blogData.js                    # Blog data management
├── blogManager.js                 # Blog content management
├── getName.js                     # Name utility functions
├── logCredits.js                  # Console credits display
├── style.js                       # Style utilities
├── three.js                       # Three.js helpers
└── transition.js                  # Page transition utilities
```

**Utility Breakdown:**

| File | Purpose |
|------|---------|
| `api.js` | Axios configuration, API request helpers |
| `blogData.js` | Blog post data structure and exports |
| `blogManager.js` | Blog filtering, sorting, categorization |
| `three.js` | Three.js setup and helpers |
| `transition.js` | Page transition animations |

---

### 🪝 `src/hooks/` - Custom React Hooks

**Purpose:** Reusable React hooks for common functionality.

```
src/hooks/
├── useInViewport.js               # Detect element visibility
└── usePrefersReducedMotion.js    # Accessibility motion detection
```

---

### ⚙️ `src/settings/` - Configuration Files

**Purpose:** JSON configuration files for content management.

```
src/settings/
├── settings.json                  # Site-wide settings
├── projects.json                  # Project data (completed + planned)
├── resume.json                    # Resume data
├── resume_new.json                # Updated resume format
├── blog.json                      # Legacy blog configuration
└── posts/                         # Markdown blog posts
    └── subnet-designer-project-start.md
```

**Configuration Files:**

| File | Content | Usage |
|------|---------|-------|
| `settings.json` | Personal info, social links, site metadata | Global config |
| `projects.json` | Completed and planned projects | Projects page |
| `resume.json` | Work experience, education, skills | Resume page |
| `blog.json` | Blog configuration (legacy) | Blog system |

---

### 🖼️ `src/assets/` - Source Assets

**Purpose:** Images and assets used by the React application.

```
src/assets/
├── dodecahedron.png               # 3D shape image
├── profile.JPG                    # Profile picture
└── recentprojects/                # Project thumbnails
    ├── README.md
    ├── ai-soc-project.svg
    ├── malware-analysis.svg
    ├── pentest-framework.svg
    ├── threat-intel.svg
    ├── vulnerability-scanner.svg
    └── [other project images]
```

---

## Public Assets (`public/`)

**Purpose:** Static files served directly by the web server.

```
public/
├── index.html                     # HTML entry point
├── manifest.json                  # PWA manifest
├── robots.txt                     # SEO crawler instructions
├── sitemap.xml                    # SEO sitemap
├── favicon.ico                    # Site favicon
├── portfolio-screenshot.png       # Portfolio preview image
├── social-image.png               # Social media preview
├── assets/                        # Public static assets
│   ├── blog/                      # Blog images
│   ├── profile.JPG                # Profile picture
│   └── recentprojects/            # Project images
├── content/                       # Public content
│   └── blog/                      # Blog content
│       ├── images/                # Blog post images
│       └── posts/                 # Markdown posts
├── interactive-resume/            # Standalone resume
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   └── assets/                    # Resume assets
│       ├── downloadresume.pdf
│       ├── profile-picture.png
│       └── [icons]
├── project-images/                # Auto-generated project images
├── resume/                        # Resume PDFs and LaTeX
│   ├── downloadresume.pdf
│   ├── downloadresume.tex
│   └── Resume-4.pdf
└── [various image files]
```

**Public Directory Structure:**

| Directory | Purpose | Access |
|-----------|---------|--------|
| `assets/` | Static images and media | Direct URL access |
| `content/blog/` | Blog markdown files and images | Rendered by app |
| `interactive-resume/` | Standalone HTML resume | `/interactive-resume/` |
| `project-images/` | Auto-generated project previews | Projects page |
| `resume/` | PDF resumes and LaTeX source | Download links |

---

## Content Management (`content/`)

**Purpose:** Content storage separate from public assets.

```
content/
└── blog/
    ├── README.md                  # Blog system documentation
    ├── config.json                # Blog configuration
    ├── images/                    # Blog post images
    │   ├── Accountability Mechanisms.png
    │   ├── Community Intelligence.png
    │   ├── Economic Flywheel.png
    │   └── [35+ blog images]
    └── posts/                     # Markdown blog posts
        ├── blog_post_1.md
        ├── blog_post_2.md
        ├── blog_post_3.md
        ├── drone-zoe-platform.md
        ├── subnet-designer-project-start.md
        └── [15+ blog posts]
```

---

## Configuration Files

### Root Configuration Files

```
cyber-portfolio/
├── package.json                   # NPM configuration
├── .dockerignore                  # Docker build exclusions
├── .gitignore                     # Git exclusions
├── docker-compose.yml             # Docker services
└── Dockerfile                     # Container build
```

**Configuration Breakdown:**

#### `package.json`
```json
{
  "name": "react-portfolio",
  "version": "0.1.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "api": "node src/api/index.js",
    "dev": "concurrently \"npm run start\" \"npm run api\"",
    "deploy": "gh-pages -d build"
  }
}
```

**Key Scripts:**
- `npm start` - React development server (port 3000)
- `npm run api` - Express API server (port 5000)
- `npm run dev` - Both frontend + backend concurrently
- `npm run build` - Production build
- `npm run deploy` - Deploy to GitHub Pages

---

## Docker Setup

### Docker Files

```
cyber-portfolio/
├── Dockerfile                     # Multi-stage build
├── docker-compose.yml             # Service orchestration
├── docker-dev.sh                  # Helper script
└── .dockerignore                  # Build exclusions
```

### Docker Services

**docker-compose.yml** defines three services:

1. **frontend** - React dev server only (port 3000)
2. **api** - Express API only (port 5000)
3. **dev** - Both frontend + API (ports 3000 + 5000)

**Usage:**
```bash
# Build and start development environment
./docker-dev.sh build
./docker-dev.sh start-bg

# View logs
./docker-dev.sh logs

# Stop all services
./docker-dev.sh stop
```

---

## Project Structure Overview

### Directory Tree Summary

```
cyber-portfolio/
├── 📄 Root Config Files          # Package.json, Docker, README
├── 📁 src/                       # Source code
│   ├── 📁 app/                   # App core (routing, SEO)
│   ├── 📁 pages/                 # Page components (12 pages)
│   ├── 📁 components/            # UI components (9 categories)
│   ├── 📁 api/                   # Backend Express API
│   ├── 📁 utils/                 # Helper functions
│   ├── 📁 hooks/                 # Custom React hooks
│   ├── 📁 settings/              # JSON configurations
│   └── 📁 assets/                # Source images
├── 📁 public/                    # Static assets
│   ├── 📁 assets/                # Public images
│   ├── 📁 content/               # Public content
│   ├── 📁 interactive-resume/    # Standalone resume
│   ├── 📁 project-images/        # Generated images
│   └── 📁 resume/                # PDF resumes
├── 📁 content/                   # Content management
│   └── 📁 blog/                  # Blog system
├── 📁 interactive-resume-repo/   # Resume development
├── 📁 scripts/                   # Build scripts
├── 📁 Updated/                   # Project archives
└── 📁 app/                       # Next.js app (experimental)
```

---

## File Count Summary

| Category | Count | Description |
|----------|-------|-------------|
| **Total Files** | 286 | All files in project |
| **JavaScript Files** | ~90 | React components, API, utils |
| **JSON Files** | ~10 | Configuration files |
| **CSS Files** | ~8 | Component styles |
| **Markdown Files** | ~20 | Blog posts, documentation |
| **Image Files** | ~100 | SVG, PNG, JPG assets |
| **HTML Files** | ~5 | Public pages, resume |

---

## Key Directories by Purpose

### 🎨 Frontend Development
- `src/components/` - UI components
- `src/pages/` - Page components
- `src/hooks/` - Custom hooks
- `src/utils/` - Frontend utilities

### 🔧 Backend Development
- `src/api/` - Complete Express API
- `src/api/models/` - Database schemas
- `src/api/controllers/` - Business logic
- `src/api/routes/` - API endpoints

### 📝 Content Management
- `content/blog/` - Blog posts and images
- `src/settings/` - JSON configurations
- `public/content/` - Public content

### 🚀 Deployment
- `public/` - Static assets
- `build/` - Production build (generated)
- Docker files - Container deployment

### 🧪 Development
- `scripts/` - Build and generation scripts
- `Updated/` - Project archives
- Root config files

---

## Navigation Flow

```
User Access
    ↓
index.html (public/)
    ↓
index.js (src/)
    ↓
App.js (src/app/)
    ↓
Router → Pages (src/pages/)
    ↓
Components (src/components/)
    ↓
API Calls (src/api/)
    ↓
Database (MongoDB)
```

---

## Component Relationships

```
App.js
├── Home.js
│   ├── DisplacementSphere
│   ├── Content
│   ├── TopNavbar
│   └── ThemeToggle
├── Projects.js
│   ├── TopNavbar
│   └── Works
├── Labs.js
│   ├── TopNavbar
│   └── Lab Cards
├── Blog.js
│   ├── TopNavbar
│   ├── BlogFeatured
│   ├── BlogCarousel
│   └── BlogPostCard
└── [Other Pages]
    ├── TopNavbar
    └── [Page-specific components]
```

---

## Data Flow

```
Configuration Files (src/settings/)
    ↓
    ├── settings.json → Site metadata, personal info
    ├── projects.json → Projects page data
    ├── resume.json → Resume page data
    └── blogData.js → Blog system data
    ↓
Components consume configuration
    ↓
Render to user
```

---

## Build Process

```
Development:
npm start → React Dev Server (3000) + Hot Reload
npm run api → Express API (5000)
npm run dev → Both concurrently

Production:
npm run build → Creates /build directory
npm run deploy → Deploy to GitHub Pages

Docker:
docker-compose up → Containerized development
```

---

## Quick Reference

### Most Important Files

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `src/settings/settings.json` | Personal info | Medium |
| `src/settings/projects.json` | Projects data | High |
| `src/utils/blogData.js` | Blog posts | High |
| `content/blog/posts/` | Blog content | High |
| `src/pages/*.js` | Page components | Medium |
| `src/components/` | UI components | Medium |
| `public/assets/` | Static images | Low |

### Common Tasks

| Task | Files to Edit |
|------|---------------|
| **Add a blog post** | `src/utils/blogData.js`, `content/blog/posts/` |
| **Add a project** | `src/settings/projects.json`, add project image |
| **Update resume** | `src/settings/resume.json`, `public/resume/` |
| **Change theme** | `src/components/theme/Themes.js` |
| **Update personal info** | `src/settings/settings.json` |
| **Add a page** | `src/pages/`, `src/app/App.js` (routes) |

---

## Additional Resources

### Related Documentation
- [README.md](README.md) - Main project documentation
- [README-BLOG.md](README-BLOG.md) - Blog system guide
- [README-image-generation.md](README-image-generation.md) - Image generation
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
- [CHANGELOG.md](CHANGELOG.md) - Version history

### External Dependencies
- React 17.0.0
- Material-UI 4.11.0
- Three.js 0.125.0
- Express 4.17.1
- MongoDB (via Mongoose 5.13.5)

---

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Maintained by:** Redji Jean Baptiste

For questions or updates, please refer to the [Contributing Guide](CONTRIBUTING.md) or open an issue on GitHub.
