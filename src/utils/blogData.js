// Blog data for client-side usage
export const blogConfig = {
  blog: {
    title: "Cybersecurity & Development Blog",
    description: "Insights into cybersecurity, network analysis, and development projects",
    author: "Redji Jean Baptiste",
    baseUrl: "/blog",
    postsPerPage: 6,
    featuredPosts: 3
  },
  categories: [
    "D Central",
    "Co op Student",
    "Extracurricular Projects"
  ],
  tags: {
    featured: ["Python", "Cybersecurity", "Networking", "International Development", "Community Security"],
    colors: {
      // Category colors
      "D Central": "#e74c3c",
      "Co op Student": "#3776ab",
      "Extracurricular Projects": "#27ae60",
      // Tag colors
      "Python": "#3776ab",
      "Cybersecurity": "#ff4757",
      "Networking": "#2ed573",
      "Analysis": "#ffa726",
      "VLSM": "#42a5f5",
      "Project Planning": "#ab47bc",
      "International Development": "#e74c3c",
      "Community Security": "#f39c12",
      "Technology Governance": "#9b59b6",
      "Security": "#ff6b7a",
      "Haiti": "#e74c3c",
      "Policy Analysis": "#fd7e14",
      "Digital Economics": "#6f42c1",
      "Token Systems": "#795548",
      "Community Governance": "#28a745",
      "Democratic Control": "#17a2b8",
      "Network Effects": "#ffc107",
      "Federation Strategy": "#dc3545",
      "Intelligence Analysis": "#343a40",
      "Implementation Strategy": "#007bff",
      "Drones": "#27ae60",
      "AI": "#9b59b6",
      "IoT": "#f39c12",
      "Autonomous Systems": "#e67e22",
      "Open Source": "#2ecc71",
      "Community Development": "#16a085"
    }
  }
};

export const blogPosts = [
  {
    id: "drone-zoe-platform",
    slug: "drone-zoe-platform",
    title: "Project Zoe: Democratizing Drone Technology Through Community Cooperation - Part 1",
    date: "2025-08-22",
    author: "Redji Jean Baptiste",
    category: "Extracurricular Projects",
    tags: ["Drones", "AI", "Security", "IoT", "Autonomous Systems", "Open Source", "Community Development"],
    description: "The first entry in our development series introducing Project Zoe - an ambitious vision for community-owned, technologically sovereign drone operations. All features are prospective and in early development phases.",
    image: "/content/blog/images/drone-zoe-platform-website.png",
    readingTime: 20,
    featured: true
  },
  {
    id: "subnet-designer-project-start",
    slug: "subnet-designer-project-start",
    title: "Subnet Designer & Visualizer: A Comprehensive VLSM Tool",
    date: "2025-08-08",
    author: "Redji Jean Baptiste",
    category: "Co op Student",
    tags: ["Python", "VLSM", "Networking", "CST8182", "Project Planning", "Network Design"],
    description: "Developing a comprehensive Python application that calculates VLSM subnet schemes and generates professional network topology diagrams for educational and practical use",
    image: "/content/blog/images/Subnet-Designer-Visualizer.png",
    readingTime: 15,
    featured: true
  },
  {
    id: "haiti-security-missions",
    slug: "haiti-security-missions", 
    title: "The $600 Million Question: Why Foreign Security Missions Keep Failing in Haiti",
    date: "2025-08-08",
    author: "Redji Jean Baptiste",
    category: "D Central",
    tags: ["International Development", "Security", "Haiti", "Policy Analysis"],
    description: "Coming soon - Every year, international donors spend hundreds of millions on security missions that pack up and leave when funding ends. There's a better way.",
    image: "/content/blog/images/The Dependency Cycle.png",
    readingTime: 8,
    featured: true,
    comingSoon: true
  }
];

export default {
  config: blogConfig,
  posts: blogPosts
};