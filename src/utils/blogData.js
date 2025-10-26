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
    id: "msi-thin-15-experience",
    slug: "msi-thin-15-experience",
    title: "My Experience with the MSI Thin 15",
    date: "2025-08-27",
    author: "Redji Jean Baptiste",
    category: "Co op Student",
    tags: ["Hardware", "Linux", "Development", "Setup", "Cybersecurity"],
    description: "A detailed review of setting up the MSI Thin 15 laptop for cybersecurity studies, including the challenges of dual-booting with Linux Mint and configuring the complete development environment.",
    image: "/blog-images/msi-thin-15/desktop_setup.png",
    readingTime: 12,
    featured: true
  },
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
    featured: false
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
    featured: false
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
  },
  {
    id: "networking-fundamentals-journey",
    slug: "networking-fundamentals-journey",
    title: "Mastering the Backbone — My Journey Through Networking Fundamentals",
    date: "2025-10-26",
    author: "Redji Jean Baptiste",
    category: "Co op Student",
    tags: ["Networking", "CST8182", "Cisco", "Wireshark", "OSI Model", "TCP/IP", "Network Design"],
    description: "Learning how networks communicate taught me to see the digital world as interconnected systems. A deep dive into CST8182 labs, projects, and the systems thinking that networking fundamentals taught me.",
    image: "/content/blog/images/networking-journey.png",
    readingTime: 15,
    featured: true
  },
  {
    id: "windows-linux-system-mastery",
    slug: "windows-linux-system-mastery",
    title: "Automation, Control, and Command — From Windows to Linux System Mastery",
    date: "2025-10-25",
    author: "Redji Jean Baptiste",
    category: "Co op Student",
    tags: ["Windows", "Linux", "PowerShell", "Bash", "System Administration", "CST8202", "CST8207", "Automation"],
    description: "Moving from GUI to CLI showed me that true control lies beneath the interface. A semester of dual learning across Windows and Linux system administration.",
    image: "/content/blog/images/system-mastery.png",
    readingTime: 18,
    featured: true
  },
  {
    id: "logic-to-leadership",
    slug: "logic-to-leadership",
    title: "From Logic to Leadership — Building Analytical and Adaptive Intelligence",
    date: "2025-10-24",
    author: "Redji Jean Baptiste",
    category: "Co op Student",
    tags: ["Mathematics", "Logic", "Leadership", "MAT8002", "CST8300", "Soft Skills", "Professional Development"],
    description: "Real success in tech comes from combining analytical precision with emotional adaptability. How numeracy and success skills create dual intelligence.",
    image: "/content/blog/images/logic-leadership.png",
    readingTime: 12,
    featured: false
  },
  {
    id: "communicating-technical-mastery",
    slug: "communicating-technical-mastery",
    title: "Communicating the Invisible — Turning Technical Mastery into Clear Human Stories",
    date: "2025-10-23",
    author: "Redji Jean Baptiste",
    category: "Co op Student",
    tags: ["Communication", "Technical Writing", "ENL1813T", "Professional Development", "Presentation Skills"],
    description: "Writing is the bridge between understanding something and making it matter. How communication skills transform technical expertise into accessible knowledge.",
    image: "/content/blog/images/communication.png",
    readingTime: 10,
    featured: false
  }
];

const blogData = {
  config: blogConfig,
  posts: blogPosts
};

export default blogData;