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
    id: "os-sentinel-initiative",
    slug: "os-sentinel-initiative",
    title: "Innovation Proposal: The OS-SENTINEL Initiative",
    date: "2025-12-14",
    author: "Redji Jean Baptiste",
    category: "Extracurricular Projects",
    tags: ["Cybersecurity", "Open Source", "AI", "Networking", "Project Planning"],
    description: "Transforming Iron Horse Security from Service Provider to Technology Leader",
    image: "/content/blog/images/os-sentinel-initiative.png",
    readingTime: 25,
    featured: true
  },
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
    title: "Mastering the Backbone — My 14-Week Journey Through Networking Fundamentals",
    date: "2025-10-25",
    author: "Redji Jean Baptiste",
    category: "Co op Student",
    tags: ["Networking", "CST8182", "Cisco", "Wireshark", "OSI Model", "TCP/IP", "Network Design"],
    description: "Learning how networks communicate taught me to see the digital world as interconnected systems. A deep dive into CST8182 labs, projects, and the systems thinking that networking fundamentals taught me.",
    summary: "Learning how networks communicate taught me to see the digital world as a single connected system. CST8182 gave me the confidence to architect the OpenSecure suite across edge, hybrid-cloud, and resilient security zones.",
    image: "/content/blog/images/Gemini_Generated_Image_363ykq363ykq363y.png",
    readingTime: 22,
    featured: true,
    customLayout: true,
    heroStats: [
      { label: 'Semester', value: 'Fall 2025' },
      { label: 'Duration', value: '14 Weeks' },
      { label: 'Projects', value: 'OpenSecure Suite' }
    ],
    heroBadge: 'Networking Fundamentals',
    phaseHighlights: [
      {
        title: 'Phase 1: The Foundational Layer',
        duration: 'Weeks 1-4',
        essence: 'OSI/TCP basics and the transport imperative',
        bullets: [
          'OSI Model mastery (segmentation of Layer 2 vs Layer 3 traffic).',
          'TCP/IP stack decisions for reliability (OS-GUARDIAN uploads) vs speed (OS-PATROL GPS feeds).',
          'Encapsulation/Decapsulation inspection with Wireshark to verify protocols and data integrity.'
        ]
      },
      {
        title: 'Phase 2: Mastering the Edge & Connectivity',
        duration: 'Weeks 5-8',
        essence: 'Cisco CLI, Wireshark, and hybrid networking resilience',
        bullets: [
          'Cisco CLI configuration management, ACL hardening, and least privilege enforcement at gateways.',
          'Wireshark became a forensic tool to prove TLS 1.3 + WireGuard tunnels and payload integrity.',
          'Hybrid Cloud/On-prem comparisons influenced resilience, RTO planning, and edge computing for OS-PACS.'
        ]
      },
      {
        title: 'Phase 3: Scaling, Security, & Forward Planning',
        duration: 'Weeks 9-14',
        essence: 'Zero-trust architecture, cryptographic integrity, and scalable recovery',
        bullets: [
          'VLAN segmentation, ACL zoning, and SIEMing every critical event (OS-SENTINEL, OS-PATROL, OS-GUARDIAN).',
          'Database HA with Patroni + synchronous replication for zero data loss and sub-30s failover.',
          'Object Storage (MinIO) with erasure coding and QoS-aware telemetry for cellular latency-sensitive workloads.'
        ]
      }
    ],
    content: `Learning how networks communicate taught me to see the digital world as a single connected system. A deep dive into CST8182 labs, projects, and the systems thinking that networking fundamentals taught me. This course didn’t just teach me how to configure a router; it taught me how to architect an entire digital ecosystem, a skill I immediately applied to the OpenSecure suite of projects.

## Overview: The Shift from Theory to Architecture

The Fall 2025 semester, spanning 14 weeks, was a sprint to mastery in Networking Fundamentals (CST8182). When I started, I didn’t have much background or knowledge on networking, or their devices. By week 14, I saw them as nodes in a larger, distributed system. This perspective helped me immensely as I continued to design my personal projects and platforms like D-Central and Open Defender.

### Phase 1: The Foundational Layer (Weeks 1-4)

The initial weeks grounded us in the immutable laws of data transfer: the OSI Model and TCP/IP.

#### CST8182 Core Concept

- **OSI Model (7 Layers)** – Troubleshooting and segmentation: knowing that Layer 2 handles MAC addresses while Layer 3 handles IP addressing allowed us to design precise VLAN segmentation. In OS-PACS, we isolated the door controllers (Layer 2 traffic) from the Management VLAN to prevent lateral attacks.

- **TCP/IP Stack** – Reliability vs. speed: understanding that TCP guarantees ordered delivery (critical for OS-GUARDIAN’s evidence uploads) while UDP favors speed (ideal for OS-PATROL’s high-frequency GPS updates) informed our architecture choices.

- **Encapsulation/Decapsulation & Protocol Inspection** – Using Wireshark to see how packets are built and disassembled helped us confirm that Layer 7 protocols matched the intended transport layer behavior.

#### Diving Deeper into Layer 4: The Transport Imperative

Moving beyond definitions, we explored how the Transport Layer dictates application behavior:

- **TCP for Core Operations** – PostgreSQL (port 5432) and internal APIs use TCP to guarantee every packet arrives intact.
- **MQTT over TCP for IoT** – For OS-PACS, door controllers use MQTT over TCP (port 1883) so every access event is reliably logged and synchronized.
- **Port-Based Security** – ACLs based on ports (e.g., allowing 5432 only from the Application VLAN) mirrored the Security Zone rules in OpenSecure topology documents.

### Phase 2: Mastering the Edge and Connectivity (Weeks 5-8)

This phase introduced Cisco equipment and the challenge of secure data transfer over mobile/IoT networks.

- **Cisco CLI & ACLs** – CLI mastery let us enforce least privilege. For example, SSH (port 22) is permitted from the IT Management VLAN to the NVR servers on VLAN 20 while all other traffic is explicitly denied.
- **Wireshark as Forensic Tool** – Wireshark verified that OS-GUARDIAN uploads were wrapped in TLS 1.3 and WireGuard VPN tunnels, ensuring no unencrypted evidence leaked on the local segment.

### The Decentralization / Hybrid Cloud Paradigm

Comparing traditional on-premise networking with cloud infrastructure shaped the OpenSecure design’s focus on resilience and Recovery Time Objectives (RTO).

- **Decentralization & Edge Computing** – Subnetting mastery enabled device independence. OS-PACS door controllers cache credentials locally (SQLite), allowing offline operation and <50ms response times even when the WAN is down.
- **Hybrid Networking** – VPNs/Tunneling connected isolated networks securely. OS-CONCIERGE and OS-PATROL deploy hybrid models where on-premise kiosks and vehicle units tunnel to cloud services via WireGuard as documented in the topology docs.

### Phase 3: Scaling, Security, and Forward Planning (Weeks 9-14)

The final weeks emphasized building secure, reliable, and scalable architectures.

- **Network Security Posture** – VLANs isolate traffic (e.g., Cameras VLAN 10, NVRs VLAN 20, Management VLAN 30). ACLs enforce least privilege (PostgreSQL 5432 only from the Application tier).
- **Cryptographic Integrity** – OS-GUARDIAN encrypts evidence with AES-256 at rest and in transit, storing master keys in an HSM within a protected security zone and logging every access event on a blockchain ledger.
- **Auditability & SIEM** – Every denied swipe (OS-PACS) and LPR hit (OS-PATROL) streams to a central SIEM for anomaly detection.

## Scaling, Redundancy, and High Availability

- **Database HA** – PostgreSQL/TimescaleDB with Patroni synchronous streaming replication provides zero data loss (RPO=0) and <30s failover (RTO).
- **Storage Scalability** – Video systems (OS-GUARDIAN, OS-SENTINEL) pair MinIO with erasure coding (EC 6+4) so four nodes can fail without downtime.
- **Bandwidth Optimization & QoS** – OS-PATROL tags traffic to prioritize critical alerts over cellular while delaying bulk video until opportunistic WiFi is available.

## 🔗 Project Documentation Synthesis

| Project | Core Networking Focus | Key Implementation Detail (from Docs) |
| --- | --- | --- |
| OS-CONCIERGE | Multi-Tenant Segmentation | Each property uses a dedicated /16 subnet (10.100.0.0/16, 10.101.0.0/16, etc.) and connects to the cloud through WireGuard tunnels to keep resources isolated yet centrally managed. |
| OS-PACS | Edge Resilience & Low Latency | Door controllers use local SQLite caches and MQTT, ensuring <50ms access decisions without WAN dependency. |
| OS-PATROL | Mobile Connectivity & QoS | Intelligent upload algorithm prioritizes LPR hot-list alerts over 4G while deferring video uploads until WiFi is available, reducing cellular expense. |
| OS-SENTINEL | Bandwidth Optimization & AI Segmentation | Multi-stream camera feeds leverage GPU-accelerated NVR servers so only metadata and alerts (not raw footage) traverse the WAN. |

## Conclusion: The Architect's Perspective

CST8182 didn’t just give me answers; it taught me to ask the right questions: Where is the data processed? How is it secured? Can the system survive a link failure? This journey, anchored by the OpenSecure architectural documents, prepared me to design and defend digital infrastructures. From defining a 4-hour RTO for backups to justifying blockchain-protected Chain of Custody logs, the semester sharpened my ability to blend operations, security, and scalability.

This draft is scaled and detailed to match the complexity of the OS projects. Let me know if you’d like to dive deeper into OS-GUARDIAN’s blockchain ledger or OS-PATROL’s cellular failover strategy!`
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