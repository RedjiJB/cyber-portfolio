# Contributing to Cybersecurity Portfolio

Thank you for your interest in contributing to this project! This guide provides comprehensive information about the project structure, development workflow, and how to add new features and content.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Development Environment](#development-environment)
- [Adding New Content](#adding-new-content)
- [Component Structure](#component-structure)
- [Interactive Resume System](#interactive-resume-system)
- [Blog System](#blog-system)
- [Project Showcase](#project-showcase)
- [Theme and Styling](#theme-and-styling)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Deployment](#deployment)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Git** for version control
- **MongoDB** (optional, for backend features)
- **Code editor** (VS Code recommended)

### Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/cyber-portfolio.git
cd cyber-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development server**
```bash
npm run dev  # Both frontend and backend
# OR
npm start    # Frontend only
```

## Project Architecture

### Directory Structure

```
cyber-portfolio/
├── public/                          # Static assets
│   ├── interactive-resume/          # Standalone resume
│   └── content/blog/               # Blog content and images
├── src/                            # React application
│   ├── api/                        # Express.js backend
│   ├── app/                        # Core app setup
│   ├── components/                 # Reusable components
│   ├── pages/                      # Page components
│   ├── settings/                   # Configuration files
│   ├── utils/                      # Utility functions
│   └── assets/                     # React assets
├── content/                        # Content management
└── interactive-resume-repo/        # Resume development
```

### Core Technologies

- **Frontend**: React 17, Material-UI 4, Three.js
- **Backend**: Express.js, MongoDB, JWT
- **Build**: Create React App
- **Deployment**: GitHub Pages

## Development Environment

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one"
  ]
}
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database (optional)
MONGO_URI=mongodb://localhost:27017/cyber-portfolio

# Email Service (EmailJS)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_USER_ID=your_user_id

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Environment
NODE_ENV=development
```

## Adding New Content

### 1. Adding Projects

Projects are managed in `src/settings/projects.json`. Add a new project:

```json
{
  "id": "unique-project-id",
  "name": "Project Name",
  "description": "Detailed project description explaining the purpose, challenges solved, and impact.",
  "image": "/assets/recentprojects/project-image.png",
  "tags": ["React", "Security", "Blockchain"],
  "category": "Cybersecurity",
  "links": {
    "github": "https://github.com/username/repo",
    "demo": "https://demo-url.com",
    "documentation": "https://docs-url.com"
  },
  "featured": true,
  "technologies": ["React", "Node.js", "MongoDB"],
  "date": "2025-08-22",
  "status": "completed"
}
```

**Project Categories:**
- `Cybersecurity` - Security tools, auditing, incident response
- `Blockchain` - Smart contracts, DeFi, Web3 applications  
- `AI/ML` - Machine learning models, data analysis
- `Networking` - Infrastructure, automation, monitoring
- `Web Development` - Full-stack applications, APIs

### 2. Adding Blog Posts

Blog posts are managed through the `src/utils/blogData.js` system:

#### Step 1: Add Post Metadata

Add to the `blogPosts` array in `src/utils/blogData.js`:

```javascript
{
  id: "post-slug",
  slug: "post-slug", 
  title: "Your Blog Post Title",
  date: "2025-08-22",
  author: "Your Name",
  category: "Student Projects", // "D Central", "Student Projects", or "Extracurricular Projects"
  tags: ["Technology", "Security", "Innovation"],
  description: "Brief description that will appear in previews and cards",
  image: "/content/blog/images/your-post-image.jpg",
  readingTime: 10, // Estimated reading time in minutes
  featured: true // Whether to feature on main blog page
}
```

#### Step 2: Create Markdown File

Create `content/blog/posts/post-slug.md`:

```markdown
# Your Blog Post Title

*Brief introduction or hook for the post*

![Featured Image](https://your-image-url.com/image.png)

---

## Introduction

Your content here...

## Main Content

### Subsection

More content with:
- Bullet points
- Code examples
- Images
- Tables

### Code Examples

\`\`\`javascript
function example() {
  console.log("Hello, world!");
}
\`\`\`

## Conclusion

Wrap up your post...

---

*Published on [date] by [author]*
```

#### Step 3: Update Blog Manager

Add the slug mapping in `src/utils/blogManager.js`:

```javascript
this.slugToFileMap = {
  // ... existing mappings
  'your-post-slug': 'post-slug.md'
};
```

### 3. Blog Categories

The portfolio has three distinct blog categories:

#### D Central Research (Red Theme: #e74c3c)
- Focus: Security sovereignty, democratic technology, governance
- Page: `/blog/d-central`
- Component: `DCentralBlog.js`

#### Student Projects (Blue Theme: #3776ab)  
- Focus: Academic projects, technical learning, coursework
- Page: `/blog/student`
- Component: `StudentBlog.js`

#### Extracurricular Projects (Green Theme: #27ae60)
- Focus: Independent innovation, personal projects, advanced tech
- Page: `/blog/extracurricular` 
- Component: `ExtracurricularBlog.js`

## Component Structure

### Core Components

#### 1. Layout Components

**TopNavbar** (`src/components/nav/TopNavbar.js`)
- Main navigation bar
- Responsive design with mobile hamburger menu
- Route-based active state highlighting

**SideNavbar** (`src/components/nav/SideNavbar.js`)
- Desktop side navigation
- Social media links
- Theme toggle integration

**SpeedDials** (`src/components/speedDial/SpeedDial.js`)
- Mobile floating action button navigation
- Quick access to main sections

#### 2. Content Components

**BlogFeatured** (`src/components/blog/BlogFeatured.js`)
- Large featured blog post display
- Used on category pages and main blog

**BlogPostCard** (`src/components/blog/BlogPostCard.js`)
- Individual blog post preview cards
- Displays metadata, tags, and excerpt

**RecentProjects** (`src/components/works/RecentProjects.js`)
- Project showcase grid
- Filtering and categorization
- Hover effects and animations

#### 3. Theme System

**ThemeProvider** (`src/components/theme/ThemeProvider.js`)
- Global theme management
- Dark/light mode switching
- Theme persistence in localStorage

**Themes.js** (`src/components/theme/Themes.js`)
- Theme definitions and color schemes
- Material-UI theme configuration

### Creating New Components

Follow this structure for new components:

```javascript
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // Component styles
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  // Additional styles...
}));

export const YourComponent = ({ prop1, prop2 }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4">
        Your Component Content
      </Typography>
    </Box>
  );
};

export default YourComponent;
```

## Interactive Resume System

The interactive resume is a comprehensive standalone HTML/CSS/JS application located in `public/interactive-resume/`. It features modern design, responsive layout, animations, and dark/light theme switching.

### File Structure

```
public/interactive-resume/
├── index.html              # Main resume HTML structure
├── styles.css             # Complete styling system
├── script.js              # Interactive functionality
└── assets/                # Resume assets and downloads
    ├── downloadresume.pdf # PDF version of resume
    ├── profile-picture.png# Profile image
    ├── resume.tex         # LaTeX source
    └── rjb_*.png          # Various icon sizes
```

### Architecture Overview

The interactive resume is built as a single-page application using:

- **HTML5**: Semantic structure with Bootstrap 5 grid system
- **CSS3**: Custom properties, animations, responsive design
- **Vanilla JavaScript**: Interactive functionality and animations
- **Particles.js**: Dynamic background animation
- **Bootstrap 5**: Grid system and responsive utilities
- **Font Awesome**: Icon system for visual elements

### Core Features

#### 1. **Theme System**
- **Dark Mode** (default): Professional dark background with cyan accents
- **Light Mode**: Clean light background with adjusted contrast
- **Theme Persistence**: Uses localStorage to remember user preference
- **Smooth Transitions**: Animated theme switching
- **Dynamic Particles**: Particle colors adapt to theme

#### 2. **Navigation System**
- **Tabbed Interface**: Section-based navigation
- **Active States**: Visual feedback for current section
- **Smooth Transitions**: Fade animations between sections
- **Mobile Responsive**: Adaptive navigation for smaller screens

#### 3. **Interactive Elements**
- **Hover Effects**: Card animations and color changes
- **Scroll Animations**: Elements fade in as they come into view
- **Progress Bars**: Animated skill level indicators
- **Particle Background**: Interactive particle system

#### 4. **Content Organization**
- **Skills**: Current, in-progress, and planned skills
- **Experience**: Open source contributions timeline
- **Education**: Academic background and program details
- **Research**: Carousel of research papers
- **Projects**: Current and planned technical projects

### Resume Sections Detail

#### 1. Header Section
```html
<header class="mb-5">
  <div class="row align-items-center">
    <div class="col-md-8">
      <!-- Personal Info -->
      <h1 class="name">Redji Jean Baptiste</h1>
      <h2 class="role mb-3">Student</h2>
      <p class="lead mb-3"><!-- Professional summary --></p>
      
      <!-- Contact Links -->
      <div class="d-flex contact-links mb-3">
        <!-- Social media icons -->
      </div>
      
      <!-- Location and Actions -->
      <div class="location mb-3">
        <i class="fas fa-map-marker-alt me-2"></i> Ottawa, Canada
      </div>
      
      <!-- Download and Theme Toggle -->
      <a href="assets/downloadresume.pdf" class="pdf-download-btn">
        <i class="fas fa-file-pdf me-2"></i> Download Technical Resume
      </a>
      
      <button id="theme-toggle" class="theme-toggle-btn ms-3">
        <i class="fas fa-moon"></i>
      </button>
    </div>
    
    <div class="col-md-4 text-md-end mt-4 mt-md-0">
      <!-- Profile Image -->
      <div class="profile-image-container">
        <div class="profile-image"></div>
      </div>
    </div>
  </div>
</header>
```

#### 2. Navigation System
```html
<nav class="resume-nav mb-5">
  <ul class="nav nav-pills" id="resumeNav">
    <li class="nav-item">
      <a class="nav-link active" data-section="skills">Skills</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-section="experience">Open Source</a>
    </li>
    <!-- Additional nav items -->
  </ul>
</nav>
```

#### 3. Skills Section Architecture
The skills section uses a three-tier system:

```html
<!-- Current Skills (Level 1) -->
<h3 class="section-title">Current Skills (Level 1)</h3>
<div class="row">
  <div class="col-md-4 mb-4">
    <div class="skill-card">
      <div class="skill-icon">
        <i class="fas fa-network-wired"></i>
      </div>
      <h4>Networking Fundamentals</h4>
      <div class="skill-level beginner"></div>
      <div class="skill-tags">
        <span class="skill-tag">OSI</span>
        <span class="skill-tag">TCP/IP</span>
        <!-- More tags -->
      </div>
    </div>
  </div>
</div>

<!-- In-Progress Skills (Level 2) -->
<h3 class="section-title mt-5">In-Progress Skills (Level 2, Winter 2026)</h3>
<!-- Similar structure with .in-progress status -->

<!-- Planned Certifications -->
<h3 class="section-title mt-5">Planned Certifications & Advanced Tracks</h3>
<div class="certification-timeline">
  <!-- Certification roadmap -->
</div>
```

#### 4. Projects Section Structure
```html
<!-- In Progress Projects -->
<div class="project-category mb-5">
  <h4 class="project-category-title">
    <i class="fas fa-hammer me-2"></i>Currently Building (Fall 2025)
  </h4>
  <div class="row">
    <div class="col-md-6 mb-4">
      <div class="project-card">
        <div class="project-header">
          <h5>Subnet Designer & Visualizer</h5>
          <span class="project-status in-progress">In Progress</span>
        </div>
        <p class="project-description"><!-- Description --></p>
        <div class="project-tech">
          <span class="tech-tag">Python</span>
          <span class="tech-tag">VLSM</span>
          <!-- More tech tags -->
        </div>
      </div>
    </div>
  </div>
</div>
```

#### 5. Research Papers Carousel
```html
<div id="papersCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <!-- Indicator buttons -->
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="paper-card">
        <h4>Blockchain for Economic Development</h4>
        <p class="paper-abstract"><!-- Abstract --></p>
        <a href="#" class="paper-link">Read Full Paper <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
  <!-- Navigation controls -->
</div>
```

### CSS Architecture

#### 1. **CSS Custom Properties (Variables)**
```css
:root {
  /* Color Scheme */
  --primary-color: #00bfbf;
  --secondary-color: #171c28;
  --light-bg: #f8f9fa;
  --dark-bg: #171c28;
  
  /* Layout */
  --border-radius: 10px;
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
  
  /* Card System */
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-bg-hover: rgba(255, 255, 255, 0.08);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

#### 2. **Theme System**
```css
/* Light Theme Overrides */
.light-theme {
  --secondary-color: #f8f9fa;
  --dark-bg: #f8f9fa;
  --text-color: #333;
  --card-bg: rgba(0, 0, 0, 0.05);
  --card-bg-hover: rgba(0, 0, 0, 0.08);
  --border-color: rgba(0, 0, 0, 0.1);
}
```

#### 3. **Component Classes**

**Skill Cards:**
```css
.skill-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  height: 100%;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  background-color: var(--card-bg-hover);
}
```

**Progress Bars:**
```css
.skill-level {
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
  position: relative;
  border-radius: 2px;
}

.skill-level::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 2px;
}

.skill-level.expert::before { width: 95%; }
.skill-level.advanced::before { width: 85%; }
.skill-level.intermediate::before { width: 75%; }
```

**Timeline System:**
```css
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 2px;
  background-color: var(--border-color);
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 191, 191, 0.2);
}
```

#### 4. **Responsive Design**
```css
@media (max-width: 768px) {
  .resume-container {
    padding: 2rem;
  }
  
  .name {
    font-size: 2.5rem;
  }
  
  .profile-image-container {
    margin: 0 auto 2rem;
  }
  
  .education-item {
    flex-direction: column;
  }
}

@media (max-width: 576px) {
  .resume-container {
    padding: 1.5rem;
  }
  
  .name {
    font-size: 2rem;
  }
  
  .nav-pills .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
```

### JavaScript Functionality

#### 1. **Theme Management System**
```javascript
// Theme toggling functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;
const storedTheme = localStorage.getItem('theme');

// Initialize theme based on stored preference
if (storedTheme === 'light') {
  body.classList.add('light-theme');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
} else {
  localStorage.setItem('theme', 'dark');
}

// Toggle theme event listener
themeToggle.addEventListener('click', function() {
  body.classList.toggle('light-theme');
  
  if (body.classList.contains('light-theme')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
    
    // Update particles color for light theme
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.color.value = '#00bfbf';
      window.pJSDom[0].pJS.particles.line_linked.color = '#00bfbf';
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});
```

#### 2. **Navigation System**
```javascript
// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove active class from all links
    navLinks.forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to clicked link
    this.classList.add('active');
    
    // Hide all sections
    const sections = document.querySelectorAll('.resume-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Show the target section
    const targetSection = document.getElementById(this.getAttribute('data-section'));
    targetSection.classList.add('active');
  });
});
```

#### 3. **Particles.js Configuration**
```javascript
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#00bfbf'
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.5,
      random: false
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#00bfbf',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});
```

#### 4. **Animation System**
```javascript
// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Apply animations to cards
const cards = document.querySelectorAll('.skill-card, .project-card, .interest-card, .education-item');
cards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});
```

### Content Management

#### Adding New Skills
1. **Edit the HTML structure** in `index.html`:
```html
<div class="col-md-4 mb-4">
  <div class="skill-card">
    <div class="skill-icon">
      <i class="fas fa-your-icon"></i>
    </div>
    <h4>Skill Name</h4>
    <div class="skill-level beginner"></div> <!-- or intermediate, advanced, expert -->
    <div class="skill-tags">
      <span class="skill-tag">Tag 1</span>
      <span class="skill-tag">Tag 2</span>
      <span class="skill-tag">Tag 3</span>
    </div>
  </div>
</div>
```

2. **Skill Level Classes**:
- `.beginner` - Shows 75% progress
- `.intermediate` - Shows 75% progress  
- `.advanced` - Shows 85% progress
- `.expert` - Shows 95% progress

3. **Icons**: Use Font Awesome classes for consistent iconography

#### Adding Projects
1. **Determine project category**:
   - `Currently Building` - Active development projects
   - `Next Semester & Beyond` - Planned future projects
   - `Advanced Security & Cloud Projects` - Complex future initiatives

2. **Add project HTML**:
```html
<div class="col-md-6 mb-4">
  <div class="project-card">
    <div class="project-header">
      <h5>Project Name</h5>
      <span class="project-status in-progress">In Progress</span>
    </div>
    <p class="project-description">Detailed project description explaining goals and current status.</p>
    <div class="project-tech">
      <span class="tech-tag">Technology 1</span>
      <span class="tech-tag">Technology 2</span>
      <span class="tech-tag">Technology 3</span>
    </div>
  </div>
</div>
```

3. **Project Status Options**:
   - `.in-progress` - Green badge for active projects
   - `.planning` - Orange badge for planned projects

#### Adding Research Papers
1. **Add to carousel** in the papers section:
```html
<div class="carousel-item">
  <div class="paper-card">
    <h4>Paper Title</h4>
    <p class="paper-abstract">Brief abstract describing the research topic and findings.</p>
    <a href="#" class="paper-link">Read Full Paper <i class="fas fa-arrow-right"></i></a>
  </div>
</div>
```

2. **Update carousel indicators** to match the number of papers

#### Updating Contact Information
1. **Social media links** in the header section
2. **Email address** in the contact links
3. **Location** information
4. **PDF download link** for resume

### Customization Guidelines

#### Color Scheme Modification
1. **Update CSS variables** in `:root` and `.light-theme`
2. **Primary color** affects accents, buttons, and highlights
3. **Background colors** set the overall theme tone
4. **Ensure sufficient contrast** for accessibility

#### Layout Modifications
1. **Bootstrap grid system** for responsive layouts
2. **CSS Flexbox** for component alignment
3. **CSS Grid** for complex layouts (if needed)
4. **Maintain mobile responsiveness**

#### Animation Customization
1. **Transition timing** in `--transition` variable
2. **Hover effects** on cards and interactive elements
3. **Scroll animations** using Intersection Observer
4. **Particle system** configuration in JavaScript

### Performance Considerations

#### Optimization Techniques
1. **CSS minification** for production
2. **Image optimization** for faster loading
3. **JavaScript bundling** if adding more scripts
4. **Font loading optimization**

#### Loading Performance
1. **External libraries** loaded from CDN
2. **Lazy loading** for non-critical content
3. **Critical CSS** inlined for faster rendering
4. **Resource preloading** for key assets

### Accessibility Features

#### WCAG Compliance
1. **Semantic HTML** structure
2. **Keyboard navigation** support
3. **Screen reader** compatibility
4. **Color contrast** compliance
5. **Focus indicators** for interactive elements

#### Responsive Design
1. **Mobile-first** approach
2. **Touch-friendly** interface elements
3. **Readable text** at all screen sizes
4. **Accessible navigation** on mobile devices

### Maintenance and Updates

#### Regular Updates
1. **Skills progression** - Update current/in-progress/planned skills
2. **Project status** - Update project completion status
3. **Contact information** - Keep links and details current
4. **PDF resume** - Update downloadable version to match

#### Version Control
1. **Backup before changes** - Always backup working version
2. **Test on multiple devices** - Ensure compatibility
3. **Version numbering** - Track major changes
4. **Documentation updates** - Keep docs current with changes

This comprehensive interactive resume system provides a professional, modern, and highly customizable platform for showcasing technical skills, projects, and academic progress in a visually appealing and interactive format.

## Blog System

### Architecture Overview

The blog system uses a hybrid approach:

1. **Metadata Management**: `src/utils/blogData.js`
2. **Content Storage**: Markdown files in `content/blog/posts/`
3. **Content Loading**: `src/utils/blogManager.js`
4. **Display Components**: Category-specific blog pages

### Blog Data Structure

```javascript
// src/utils/blogData.js
export const blogPosts = [
  {
    id: "unique-id",
    slug: "url-slug",
    title: "Post Title",
    date: "2025-08-22",
    author: "Author Name",
    category: "Student Projects", // or "D Central" or "Extracurricular Projects"
    tags: ["Tag1", "Tag2"],
    description: "Post excerpt",
    image: "/content/blog/images/image.jpg",
    readingTime: 10,
    featured: true,
    comingSoon: false // Optional: for upcoming posts
  }
];
```

### Category System

Each blog category has its own:

- **Color Scheme**: Defined in `blogData.js` colors object
- **Page Component**: Dedicated React component
- **Route**: URL path for category
- **Featured Posts**: Category-specific featured content

### Adding New Blog Categories

1. **Update blogData.js**:
```javascript
categories: [
  "D Central",
  "Student Projects", 
  "Extracurricular Projects",
  "Your New Category"
],
// Add color in colors object
"Your New Category": "#your-color"
```

2. **Create Category Page**:
```javascript
// src/pages/YourNewCategoryBlog.js
export const YourNewCategoryBlog = () => {
  const posts = blogManager.getAllPosts();
  const categoryPosts = useMemo(() => 
    posts.filter(post => post.category === "Your New Category"), [posts]);
  
  // Component implementation...
};
```

3. **Add Routing**:
```javascript
// src/app/App.js
<Route path="/blog/your-category" exact component={YourNewCategoryBlog} />
```

4. **Update Main Blog Page**:
Add navigation button and featured section to `src/pages/Blog.js`

## Project Showcase

### Project Management

Projects are stored in `src/settings/projects.json` and displayed through:

- **Projects Page**: Full project showcase at `/projects`
- **Home Page**: Featured projects section
- **Category Filtering**: Filter by technology and category

### Project Data Structure

```json
{
  "id": "unique-identifier",
  "name": "Display Name",
  "description": "Detailed description",
  "image": "/assets/recentprojects/image.png",
  "tags": ["Technology", "Category"],
  "category": "Project Category",
  "links": {
    "github": "Repository URL",
    "demo": "Live Demo URL",
    "documentation": "Docs URL"
  },
  "featured": true,
  "technologies": ["Tech Stack"],
  "date": "2025-08-22",
  "status": "completed"
}
```

### Project Categories

- **Cybersecurity**: Security tools, auditing, vulnerability assessment
- **Blockchain**: Smart contracts, DeFi, cryptocurrency
- **AI/ML**: Machine learning, data analysis, automation
- **Networking**: Infrastructure, monitoring, automation
- **Web Development**: Full-stack applications, APIs

### Adding Project Images

1. **Add image file** to `src/assets/recentprojects/`
2. **Recommended formats**: PNG, SVG, or high-quality JPEG
3. **Dimensions**: 400x300px recommended
4. **Naming**: Use descriptive, kebab-case filenames

## Theme and Styling

### Theme Structure

The portfolio uses Material-UI's theming system with custom modifications:

```javascript
// src/components/theme/Themes.js
export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: { main: '#007BFF' },
    secondary: { main: '#6C757D' },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
});
```

### Category Color Schemes

Each blog category has its own color scheme defined in `blogData.js`:

```javascript
colors: {
  // Category colors
  "D Central": "#e74c3c",
  "Student Projects": "#3776ab", 
  "Extracurricular Projects": "#27ae60",
  
  // Tag colors
  "Python": "#3776ab",
  "Cybersecurity": "#ff4757",
  "Networking": "#2ed573"
}
```

### CSS-in-JS with Material-UI

Use the `makeStyles` hook for component styling:

```javascript
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    }
  },
  title: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2)
  }
}));
```

### Responsive Design

The portfolio uses Material-UI's breakpoint system:

- **xs**: 0px and up (extra small devices)
- **sm**: 600px and up (small devices)  
- **md**: 960px and up (medium devices)
- **lg**: 1280px and up (large devices)
- **xl**: 1920px and up (extra large devices)

## Code Style Guidelines

### JavaScript/React

- **ESLint**: Follow the Create React App ESLint configuration
- **Prettier**: Automatic code formatting
- **Naming**: Use camelCase for variables, PascalCase for components
- **Imports**: Group imports by type (React, libraries, local components)

```javascript
import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ComponentName } from '../components/ComponentName';
import { utilityFunction } from '../utils/utilities';
```

### File Organization

- **Components**: PascalCase filenames (`BlogPost.js`)
- **Utilities**: camelCase filenames (`blogManager.js`)
- **Pages**: PascalCase filenames (`AboutPage.js`)
- **Assets**: kebab-case filenames (`project-image.png`)

### Component Patterns

#### Functional Components with Hooks
```javascript
export const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  const classes = useStyles();
  
  useEffect(() => {
    // Side effects
  }, [dependency]);
  
  return (
    <Box className={classes.root}>
      {/* Component JSX */}
    </Box>
  );
};
```

#### Custom Hooks
```javascript
export const useCustomHook = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  
  const updateValue = useCallback((newValue) => {
    setValue(newValue);
  }, []);
  
  return { value, updateValue };
};
```

### CSS Guidelines

- **Use Material-UI theming** for consistent styling
- **Responsive design** with breakpoint-based styles
- **CSS-in-JS** preferred over external stylesheets
- **Semantic class names** that describe purpose, not appearance

## Testing

### Running Tests

```bash
npm test              # Run test suite
npm test -- --watch   # Run tests in watch mode
npm test -- --coverage # Run with coverage report
```

### Testing Guidelines

#### Component Testing
```javascript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

test('renders component correctly', () => {
  render(<ComponentName prop="value" />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

#### Integration Testing
```javascript
test('blog post navigation works correctly', () => {
  render(<MemoryRouter><Blog /></MemoryRouter>);
  
  const categoryButton = screen.getByText('Student Projects');
  fireEvent.click(categoryButton);
  
  expect(screen.getByText('Student Project Showcase')).toBeInTheDocument();
});
```

### Test Coverage

Maintain test coverage for:
- **Critical user flows**: Navigation, content loading
- **Core components**: Blog system, project showcase
- **Utility functions**: Blog manager, API utilities
- **Error boundaries**: Error handling and fallbacks

## Deployment

### GitHub Pages (Current)

The portfolio is deployed to GitHub Pages automatically:

```bash
npm run deploy  # Build and deploy to gh-pages branch
```

### Deployment Process

1. **Build the application**:
```bash
npm run build
```

2. **Deploy to GitHub Pages**:
```bash
npm run deploy
```

3. **Verify deployment** at your GitHub Pages URL

### Alternative Deployment Options

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push

## Pull Request Process

### Before Submitting

1. **Update from main branch**:
```bash
git checkout main
git pull origin main
git checkout your-branch
git rebase main
```

2. **Run tests**:
```bash
npm test
npm run build  # Ensure build succeeds
```

3. **Check code style**:
```bash
npm run lint   # If available
```

### PR Guidelines

#### PR Title Format
- `feat: add new blog category system`
- `fix: resolve mobile navigation issue` 
- `docs: update contributing guidelines`
- `style: improve project card animations`

#### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)
Include before/after screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes or properly documented
```

### Review Process

1. **Automated checks** must pass (if configured)
2. **Manual review** by maintainer
3. **Testing** of new functionality
4. **Documentation** review if applicable
5. **Merge** after approval

### After Merge

1. **Delete feature branch**:
```bash
git branch -d your-branch
git push origin --delete your-branch
```

2. **Update local main**:
```bash
git checkout main
git pull origin main
```

## Support and Questions

### Getting Help

- **Documentation**: Check README.md and this guide first
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact jredji429@gmail.com for urgent issues

### Issue Templates

#### Bug Report
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome, Firefox]
- Version: [e.g., 22]
```

#### Feature Request
```markdown
**Feature Description**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this work?

**Alternative Solutions**
Other approaches considered

**Additional Context**
Any other relevant information
```

## Conclusion

This guide provides a comprehensive overview of contributing to the Cybersecurity Portfolio project. The codebase is designed to be modular, maintainable, and extensible. 

Key principles:
- **Component-based architecture** for reusability
- **Separation of concerns** between content and presentation
- **Responsive design** for all device types
- **Performance optimization** for fast loading
- **Accessibility** for inclusive design

Thank you for contributing to this project! Your efforts help make this portfolio a better showcase of cybersecurity expertise and technical innovation.

---

**Happy coding!** 🚀

For any questions not covered in this guide, please don't hesitate to reach out through GitHub issues or email.