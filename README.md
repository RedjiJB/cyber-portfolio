# Cyber Security Portfolio - Redji Jean Baptiste

[![Screenshot](/public/portfolio-screenshot.png?raw=true)](https://cyber-portfolio.vercel.app)

[![GitHub license](https://img.shields.io/github/license/RedjiJB/cyber-portfolio.svg)](https://github.com/RedjiJB/cyber-portfolio/blob/main/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/RedjiJB/cyber-portfolio/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

A modern, responsive portfolio website showcasing my expertise in cybersecurity, blockchain, and AI/ML. Built with React and featuring an interactive 3D background animation.

## 🚀 Live Demo

Check out the live portfolio at: [https://redjijb.github.io/cyber-portfolio/](https://redjijb.github.io/cyber-portfolio/)

## 🛠️ Built With

-   **Frontend:** [React](https://reactjs.org) v17
-   **UI Framework:** [Material-UI](https://material-ui.com)
-   **3D Graphics:** [Three.js](https://threejs.org)
-   **Backend:** Express.js + MongoDB
-   **Authentication:** JWT
-   **Deployment:** [Vercel](https://vercel.com)

## ✨ Key Features

-   **Interactive 3D Background** - Dynamic displacement sphere animation using Three.js
-   **Dark/Light Mode** - Theme toggle with local storage persistence
-   **Responsive Design** - Mobile-first approach ensuring great UX across all devices
-   **Project Showcase** - Detailed case studies of cybersecurity, blockchain, and AI/ML projects
-   **Dynamic Content** - All content loaded from JSON configuration files
-   **Contact Form** - Integrated email service for direct communication
-   **Resume Download** - Quick access to downloadable PDF resume

## 🔐 Security Projects Featured

-   **Network Security Auditing Tool** - Python-based vulnerability scanner
-   **AI-Powered Intrusion Detection System** - Machine learning for threat detection
-   **Blockchain Voting System** - Secure, decentralized voting platform
-   **Smart Contract Security Auditor** - Automated vulnerability detection for Solidity
-   **IoT Security Framework** - Comprehensive security solution for IoT devices

## 📁 Project Structure

```
cyber-security-portfolio/
├── public/              # Static assets
├── src/
│   ├── api/            # Backend API (Express + MongoDB)
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── settings/       # JSON configuration files
│   └── utils/          # Utility functions
└── scripts/            # Build and deployment scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RedjiJB/cyber-portfolio.git
cd cyber-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run the development server:
```bash
npm run dev
```

This will start both the React frontend (port 3000) and Express backend (port 5001).

## 🎨 Customization

### Updating Content

All portfolio content is managed through JSON files in the `src/settings/` directory:

- `settings.json` - Basic information (name, title, social links)
- `projects.json` - Project showcase data
- `resume.json` - Professional experience and skills
- `blog.json` - Blog posts and articles

### Theming

The portfolio supports both light and dark themes. Customize the color schemes in:
- `src/components/theme/Themes.js`

### Adding New Projects

Edit `src/settings/projects.json` and add your project following this structure:

```json
{
  "name": "Project Name",
  "description": "Brief description",
  "tags": ["React", "Security", "Blockchain"],
  "image": "path/to/image",
  "links": {
    "github": "https://github.com/...",
    "demo": "https://..."
  }
}
```

## 📦 Available Scripts

### Development
```bash
npm start          # Run React frontend only (port 3000)
npm run api       # Run Express backend only (port 5001)
npm run dev       # Run both frontend and backend concurrently
```

### Production
```bash
npm run build     # Build for production
npm run test      # Run test suite
```

## 🌐 Deployment

This portfolio is configured for easy deployment on Vercel:

1. Fork this repository
2. Sign up for [Vercel](https://vercel.com)
3. Import your forked repository
4. Configure environment variables
5. Deploy!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original React portfolio template by [Jo Lienhoop](https://github.com/JoHoop)
- 3D animations inspired by [Cody Bennett](https://github.com/CodyJasonBennett)
- Icons from [Material-UI](https://material-ui.com/components/material-icons/)

## 📧 Contact

Redji Jean Baptiste - [LinkedIn](https://www.linkedin.com/in/redjijb) - [GitHub](https://github.com/RedjiJB)

Project Link: [https://github.com/RedjiJB/cyber-portfolio](https://github.com/RedjiJB/cyber-portfolio)
