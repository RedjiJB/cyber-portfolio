import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
  Container, 
  Typography, 
  Hidden,
  Box,
  Fab,
  Zoom,
  useScrollTrigger,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import { KeyboardArrowUp, Close, Info } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';

// Import components
import { LogoLink } from '../components/logo/LogoLink';
import { Content } from '../components/content/Content';
import DisplacementSphere from '../components/background/DisplacementSphere';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { About } from '../components/about/About';
import { Contact } from '../components/contact/Contact';
import { BlogPostCard } from '../components/blog/BlogPostCard';
import { Resume } from '../components/resume/Resume';
import blogData from '../utils/blogData';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(8, 0),
    position: 'relative',
    scrollMarginTop: '80px', // Account for fixed navbar
    '& *': {
      textShadow: theme.palette.type === 'dark'
        ? '0 0 8px rgba(255, 255, 255, 0.15)'
        : '0 0 5px rgba(0, 0, 0, 0.05)',
    },
  },
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontSize: '2.5rem',
    textShadow: theme.palette.type === 'dark'
      ? '0 0 20px rgba(0, 191, 191, 0.5), 0 0 30px rgba(0, 191, 191, 0.3), 0 0 40px rgba(0, 191, 191, 0.2)'
      : '0 0 10px rgba(33, 150, 243, 0.3), 0 0 20px rgba(33, 150, 243, 0.2)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  sectionContent: {
    position: 'relative',
    zIndex: 1,
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    backdropFilter: 'none',
    boxShadow: 'none',
    zIndex: 1000,
    padding: theme.spacing(3, 0),
    borderBottom: 'none',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      gap: theme.spacing(1),
      flexWrap: 'wrap',
    },
  },
  navLinks: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1.5),
    },
  },
  navButton: {
    padding: theme.spacing(0.75, 2),
    cursor: 'pointer',
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    borderRadius: '25px',
    position: 'relative',
    backgroundColor: 'transparent',
    border: theme.palette.type === 'dark' 
      ? `1.5px solid ${theme.palette.primary.main}40`
      : `1px solid transparent`,
    textShadow: theme.palette.type === 'dark'
      ? '0 0 8px rgba(255, 255, 255, 0.2)'
      : 'none',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.type === 'dark' 
        ? 'rgba(0, 191, 191, 0.15)' 
        : 'rgba(0, 191, 191, 0.05)',
      border: theme.palette.type === 'dark'
        ? `1.5px solid ${theme.palette.primary.main}80`
        : `1px solid ${theme.palette.primary.main}40`,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
      textShadow: theme.palette.type === 'dark'
        ? '0 0 15px rgba(0, 191, 191, 0.6), 0 0 25px rgba(0, 191, 191, 0.3)'
        : '0 0 10px rgba(33, 150, 243, 0.4)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5, 1.5),
      fontSize: '0.85rem',
    },
  },
  activeNavButton: {
    color: '#fff',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `0 4px 20px ${theme.palette.primary.main}60`,
    textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 191, 0.4)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 6px 25px ${theme.palette.primary.main}80`,
      textShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 25px rgba(0, 191, 191, 0.5)',
    },
  },
  scrollTopButton: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 999,
  },
  projectCard: {
    padding: theme.spacing(3),
    height: '100%',
    borderRadius: '16px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: theme.palette.type === 'dark' 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: theme.palette.type === 'dark' 
      ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
      : '0 4px 20px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.palette.type === 'dark' 
        ? '0 8px 32px rgba(0, 0, 0, 0.7)' 
        : '0 8px 32px rgba(0, 0, 0, 0.15)',
    },
    borderLeft: theme.palette.type === 'dark'
      ? `3px solid rgba(0, 191, 191, 0.3)`
      : `3px solid rgba(33, 150, 243, 0.3)`,
  },
  projectTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    textShadow: theme.palette.type === 'dark'
      ? '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(0, 191, 191, 0.2)'
      : '0 0 8px rgba(0, 0, 0, 0.1)',
  },
  projectDescription: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
    textShadow: theme.palette.type === 'dark'
      ? '0 0 8px rgba(255, 255, 255, 0.15)'
      : '0 0 5px rgba(0, 0, 0, 0.05)',
  },
  techTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
  techChip: {
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.75rem',
    fontWeight: 500,
    textShadow: theme.palette.type === 'dark'
      ? '0 0 8px rgba(255, 255, 255, 0.2)'
      : '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  blogGrid: {
    marginTop: theme.spacing(4),
  },
  dialogContent: {
    padding: theme.spacing(3),
    maxHeight: '70vh',
    overflow: 'auto',
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(2, 3),
  },
  dialogCourse: {
    color: theme.palette.type === 'dark' 
      ? theme.palette.primary.light 
      : theme.palette.primary.main,
    fontSize: '0.9rem',
    marginTop: theme.spacing(0.5),
  },
  projectDetailsText: {
    whiteSpace: 'pre-wrap',
    lineHeight: 1.8,
    fontSize: '0.95rem',
    '& strong': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
    '& h1, & h2, & h3': {
      color: theme.palette.primary.main,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    '& h1': {
      fontSize: '2rem',
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      paddingBottom: theme.spacing(1),
    },
    '& h2': {
      fontSize: '1.5rem',
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(0.5),
    },
    '& h3': {
      fontSize: '1.25rem',
    },
    '& h4': {
      fontSize: '1.1rem',
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(0.5),
      color: theme.palette.text.primary,
    },
    '& ul, & ol': {
      paddingLeft: theme.spacing(3),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    '& li': {
      marginBottom: theme.spacing(0.5),
    },
    '& code': {
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      padding: '2px 6px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '0.9em',
    },
    '& pre': {
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
      padding: theme.spacing(2),
      borderRadius: '8px',
      overflow: 'auto',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
      '& code': {
        backgroundColor: 'transparent',
        padding: 0,
      },
    },
    '& blockquote': {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      paddingLeft: theme.spacing(2),
      marginLeft: 0,
      fontStyle: 'italic',
      color: theme.palette.text.secondary,
    },
    '& hr': {
      border: 'none',
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(3, 0),
    },
    '& table': {
      borderCollapse: 'collapse',
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    '& th, & td': {
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1),
      textAlign: 'left',
    },
    '& th': {
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
      fontWeight: 600,
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

// Scroll to top component
function ScrollTop({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#home');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation">
        {children}
      </div>
    </Zoom>
  );
}

export const SinglePageHome = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedManual, setSelectedManual] = useState(null);
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [manualContent, setManualContent] = useState('');
  const [loadingManual, setLoadingManual] = useState(false);
  
  // Section refs for intersection observer
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const blogRef = useRef(null);
  const labsRef = useRef(null);
  const curriculumRef = useRef(null);
  const contactRef = useRef(null);

  const sections = [
    { id: 'home', label: 'Home', ref: homeRef },
    { id: 'curriculum', label: 'Curriculum', ref: curriculumRef },
    { id: 'labs', label: 'Labs', ref: labsRef },
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'blog', label: 'Blog', ref: blogRef },
    { id: 'about', label: 'About', ref: aboutRef },
    { id: 'contact', label: 'Contact', ref: contactRef },
  ];

  // Intersection observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Get recent blog posts
  const recentBlogPosts = blogData.posts
    .filter(post => !post.comingSoon)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Projects data
  const projects = [
    {
      title: "Small Office Network Blueprint",
      course: "CST8182 - Networking Fundamentals",
      technologies: ["Network Design", "IP Addressing", "Security Policies", "Cisco Packet Tracer"],
      description: "Design a complete small office network from the ground up. This project encompasses topology design, IP addressing with VLSM, security policies, hardware specifications, and detailed cost analysis.",
      details: `Design and document a complete small office network infrastructure including physical and logical topology diagrams with VLAN segmentation, IPv4 addressing scheme using VLSM for departmental subnets, comprehensive security policies (firewall rules, DMZ, VPN, wireless security), detailed hardware/software specifications (routers, switches, servers, workstations, access points), step-by-step implementation guide with configuration templates, full cost analysis including 3-year TCO and ROI, and professional presentation materials with executive summary and technical documentation for stakeholder approval.`
    },
    {
      title: "Windows Admin Toolkit",
      course: "CST8202 - Windows Desktop Support",
      technologies: ["PowerShell", "Automation", "Windows", "Active Directory", "BitLocker"],
      description: "Develop a PowerShell automation toolkit for Windows administrators. Includes modules for user account management, automated backup systems, and BitLocker encryption tools with comprehensive documentation and error handling.",
      details: `Develop a professional-grade PowerShell toolkit with three core modules: User Management (bulk account creation/modification/deletion, password policy enforcement, group membership, MFA setup, compliance reporting), Backup Automation (scheduled backups with differential/incremental support, compression, cloud integration, VSS support, database backups, encryption, automated rotation and retention policies), and Encryption Tools (BitLocker automation, recovery key management, EFS automation, AES-256 encryption, TPM integration, secure file deletion). Includes comprehensive documentation, GitHub repository with version control best practices, detailed user and administrator guides, and demonstrates PowerShell scripting expertise with real-world enterprise IT automation solutions.`
    },
    {
      title: "Automation Suite",
      course: "CST8207 - GNU/Linux System Support",
      technologies: ["Bash", "Automation", "Linux", "Cron", "System Administration"],
      description: "Create a comprehensive Bash automation suite for Linux systems. Features automated backups with rotation policies, intelligent log analysis with alerting, and cron job management with monitoring and error handling.",
      details: `Create a comprehensive Bash-based automation suite with three core modules: Backup Module (automated full/incremental/differential backups with tar/gzip compression, local and remote destinations via rsync/scp, retention policies, GPG encryption, LVM snapshots, database backup support, and verification/restoration scripts), System Logs Module (automated rotation and compression, intelligent pattern detection, security event identification, customizable alerting via email/Slack/Teams, and statistical analysis with daily/weekly/monthly reports), and Cron Job Manager (template-based job creation, execution monitoring, resource usage tracking, comprehensive error handling with retry logic, heartbeat monitoring, and detailed reporting with success/failure statistics). Includes complete documentation, POSIX-compliant code, minimal dependencies, and demonstrates advanced Bash scripting with production-ready error handling and logging.`
    },
    {
      title: "Linux Process Tracker",
      course: "CST8207 - GNU/Linux System Support",
      technologies: ["Bash", "System Monitoring", "Performance Analysis", "Linux"],
      description: "Build a real-time system monitoring dashboard for Linux. Tracks CPU, memory, disk I/O, and network performance with process-level details, performance analysis, and configurable alerting for resource thresholds.",
      details: `Develop a comprehensive system monitoring tool that provides real-time insights through an auto-refreshing dashboard displaying CPU usage per core, memory utilization (RAM/swap/cache), disk I/O statistics, network traffic, and system load averages. Features detailed process monitoring with PID, user, resource consumption, thread counts, open file descriptors, and process tree visualization. Includes performance analysis for bottleneck identification, memory leak detection, top resource consumers, and anomaly detection. Implements configurable threshold-based alerting for CPU, memory, disk space, and service failures with email and log notifications. Efficiently reads from /proc filesystem with minimal system overhead, provides color-coded terminal output with sortable columns, exports data to CSV/JSON, generates daily/weekly/monthly reports, and demonstrates advanced Bash scripting with POSIX compliance and modular design.`
    }
  ];

  // Lab Manuals data
  const labManuals = [
    {
      title: "Small Office Network Blueprint",
      course: "CST8182 - Networking Fundamentals",
      technologies: ["Packet Tracer", "VLSM", "VLANs", "ACLs", "Network Design"],
      description: "Complete Cisco Packet Tracer implementation guide for designing a small office network. Includes VLSM calculations, security policies, hardware specifications, and cost analysis. Features 28+ required screenshots and full network configuration examples.",
      filePath: "/docs/small-office-network-blueprint.md",
      details: `This comprehensive lab manual guides you through designing and implementing a complete small office network from scratch.

**Week 1-2: Network Planning & Design**
• Gather requirements for a 50-user office with 3 departments
• Design physical and logical network topology
• Calculate IP addressing using VLSM (172.16.0.0/16)
• Plan VLAN segmentation (Management, Sales, IT, Guest)
• Screenshot Requirements: Initial topology diagram, VLSM calculation sheet

**Week 3-4: Cisco Packet Tracer Implementation**
• Configure routers (RIP v2, OSPF, static routes)
• Set up managed switches with VLAN trunking
• Implement inter-VLAN routing
• Configure DHCP servers for each department
• Screenshot Requirements: Router configurations, switch port assignments, VLAN database, IP addressing tables, ping tests between VLANs

**Week 5: Security & Services**
• Implement ACLs to restrict traffic between departments
• Configure wireless access points with WPA2-Enterprise
• Set up DMZ for web/email servers
• Implement site-to-site VPN
• Screenshot Requirements: ACL configurations, wireless security settings, firewall rules, VPN tunnel status

**Week 6: Testing & Documentation**
• Perform comprehensive connectivity tests
• Generate network documentation
• Create executive summary and technical specifications
• Calculate 3-year TCO and ROI
• Screenshot Requirements: Complete topology with IP addresses, test results, cost analysis spreadsheet

**Deliverables:**
✓ Packet Tracer .pkt file with fully functional network
✓ 28+ screenshots documenting each configuration step
✓ Network design document (15-20 pages)
✓ Hardware specifications and cost analysis
✓ Implementation guide for future reference

**Grading Rubric:**
• Network Design & Topology (20%)
• IP Addressing & VLSM (15%)
• Router & Switch Configuration (25%)
• Security Implementation (20%)
• Documentation & Screenshots (20%)`
    },
    {
      title: "Windows Admin Toolkit",
      course: "CST8202 - Windows Desktop Support",
      technologies: ["PowerShell", "Active Directory", "BitLocker", "Automation", "Windows Server"],
      description: "PowerShell automation development guide with modules for user management, automated backups, and BitLocker encryption. Includes complete code examples, 28+ screenshots, and professional documentation templates.",
      filePath: "/docs/windows-admin-toolkit.md",
      details: `This comprehensive lab manual guides you through developing a professional PowerShell automation toolkit for Windows system administration.

**Week 1-2: PowerShell Fundamentals & Module 1 (User Management)**
• Set up development environment (PowerShell ISE, VS Code)
• Create UserManagement.psm1 module structure
• Implement functions: New-BulkADUser, Set-BulkUserProperties, Remove-BulkADUser
• Add CSV import/export capabilities
• Implement password policy enforcement and MFA setup
• Screenshot Requirements: Module structure, function examples, AD Users & Computers before/after, CSV templates, error handling examples

**Week 2-3: Module 2 (Backup Manager)**
• Create BackupManager.psm1 for automated backup solutions
• Implement Start-SystemBackup with full/incremental/differential modes
• Add compression (ZIP, 7-Zip) and encryption (AES-256)
• Configure cloud integration (OneDrive, Azure Blob Storage)
• Implement rotation policies and retention management
• Screenshot Requirements: Backup configurations, file structure, compression ratios, cloud upload status, rotation logs, scheduled task setup

**Week 3-4: Module 3 (BitLocker Tools)**
• Create BitLockerTools.psm1 for drive encryption automation
• Implement Enable-BulkBitLocker for multiple drives
• Add recovery key management and secure storage
• Implement TPM integration and compliance checking
• Create reporting functions for encryption status
• Screenshot Requirements: BitLocker status, recovery keys, TPM configuration, compliance reports, encrypted drives

**Week 4-5: Integration & Testing**
• Create main toolkit script that imports all modules
• Implement comprehensive error handling and logging
• Add parameter validation and help documentation
• Create test scenarios for each module
• Perform integration testing
• Screenshot Requirements: Help documentation, test results, error logs, integration examples

**Week 5-6: Documentation & Deployment**
• Create README.md with installation instructions
• Write user guide with examples
• Document all functions with comment-based help
• Create deployment package
• Screenshot Requirements: GitHub repository, documentation pages, deployment guide

**Deliverables:**
✓ 3 PowerShell modules (.psm1 files) with 500+ lines total
✓ Main toolkit script with menu interface
✓ 28+ screenshots documenting development and testing
✓ Complete documentation (README, user guide, admin guide)
✓ GitHub repository with version control history

**Grading Rubric:**
• Code Quality & PowerShell Best Practices (25%)
• Module Functionality & Features (30%)
• Error Handling & Logging (15%)
• Documentation & Screenshots (20%)
• Testing & Validation (10%)`
    },
    {
      title: "Linux Automation Suite",
      course: "CST8207 - GNU/Linux System Support",
      technologies: ["Bash", "Cron", "Log Analysis", "System Admin", "Automation"],
      description: "Comprehensive Bash scripting guide with automated backup systems, log analysis tools, and cron job management. Features 500+ line scripts, rotation policies, alerting systems, and 25+ required screenshots.",
      filePath: "/docs/linux-automation-suite.md",
      details: `This comprehensive lab manual guides you through creating a production-ready Bash automation suite for Linux system administration.

**Week 1-2: Backup Module Development**
• Create backup_manager.sh with modular design
• Implement full, incremental, and differential backup modes
• Add tar/gzip compression and GPG encryption
• Configure local and remote destinations (rsync, scp)
• Implement rotation policies and verification
• Screenshot Requirements: Script structure, backup modes, compression examples, remote sync, rotation logs, verification output

**Week 2-3: Log Analysis Module**
• Create log_analyzer.sh for intelligent log processing
• Implement pattern detection for common issues
• Add security event identification (failed logins, sudo usage)
• Create alerting system (email, Slack, Teams webhooks)
• Generate HTML/PDF reports with statistics
• Screenshot Requirements: Pattern matches, security alerts, email notifications, report examples, cron configuration

**Week 3-4: Cron Job Management**
• Create cron_manager.sh with template system
• Implement job monitoring and health checks
• Add resource usage tracking
• Create error handling with retry logic
• Implement heartbeat monitoring
• Screenshot Requirements: Cron templates, job status, resource graphs, error logs, heartbeat confirmations

**Week 4-5: Integration & Testing**
• Integrate all modules with central configuration
• Implement comprehensive error handling
• Add logging with severity levels
• Create test suite for all functions
• Performance optimization
• Screenshot Requirements: Configuration file, integrated tests, error handling examples, performance metrics

**Week 5-6: Documentation & Deployment**
• Create detailed README.md
• Write installation and usage guides
• Document all functions and variables
• Create troubleshooting guide
• Screenshot Requirements: Documentation pages, installation steps, usage examples

**Deliverables:**
✓ 3 main Bash scripts (500+ lines total)
✓ Configuration files and templates
✓ 25+ screenshots documenting functionality
✓ Complete documentation package
✓ Cron job configurations

**Grading Rubric:**
• Script Functionality & Features (30%)
• Code Quality & POSIX Compliance (20%)
• Error Handling & Logging (15%)
• Documentation & Screenshots (20%)
• Testing & Validation (15%)`
    },
    {
      title: "Linux Process Tracker",
      course: "CST8207 - GNU/Linux System Support",
      technologies: ["Bash", "System Monitoring", "Performance", "Dashboard", "Real-time"],
      description: "Real-time system monitoring dashboard implementation guide. Track CPU, memory, disk I/O, and network performance with an 800+ line interactive Bash dashboard. Includes alerting, historical tracking, and ASCII visualization.",
      filePath: "/docs/linux-process-tracker.md",
      details: `This comprehensive lab manual guides you through building an advanced real-time system monitoring dashboard entirely in Bash.

**Week 1-2: Core Monitoring Engine**
• Create process_tracker.sh with modular architecture
• Implement /proc filesystem parsing
• Build CPU monitoring (per-core utilization, load averages)
• Add memory tracking (RAM, swap, cache, buffers)
• Implement disk I/O statistics
• Screenshot Requirements: Dashboard layout, CPU graphs, memory utilization, disk stats, code structure

**Week 2-3: Process Management Features**
• Add detailed process information (PID, user, CPU%, memory%)
• Implement process tree visualization
• Track thread counts and file descriptors
• Add process filtering and sorting
• Create process kill/priority management
• Screenshot Requirements: Process list, tree view, filtering examples, resource sorting, management actions

**Week 3-4: Performance Analysis**
• Implement bottleneck detection algorithms
• Add memory leak detection
• Create top resource consumer reports
• Implement anomaly detection
• Add historical data collection
• Screenshot Requirements: Bottleneck alerts, memory trends, top consumers, anomaly detection, historical graphs

**Week 4-5: Alerting & Visualization**
• Configure threshold-based alerting
• Implement email notifications
• Create log-based alerts
• Add color-coded terminal output
• Implement ASCII graphs and progress bars
• Screenshot Requirements: Alert configurations, email examples, colored output, ASCII visualizations, progress indicators

**Week 5-6: Reporting & Documentation**
• Generate daily/weekly/monthly reports
• Export data to CSV and JSON
• Create executive summary reports
• Add performance optimization
• Screenshot Requirements: Report examples, CSV exports, JSON data, summary dashboards

**Deliverables:**
✓ Single comprehensive Bash script (800+ lines)
✓ Configuration file for thresholds and alerts
✓ 25+ screenshots documenting features
✓ Complete user and admin documentation
✓ Sample reports and exported data

**Grading Rubric:**
• Monitoring Accuracy & Features (30%)
• Code Quality & Performance (20%)
• User Interface & Visualization (15%)
• Alerting System (15%)
• Documentation & Screenshots (20%)`
    }
  ];

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
  };

  const handleOpenManualDialog = async (manual) => {
    setSelectedManual(manual);
    setOpenManualDialog(true);
    setLoadingManual(true);
    setManualContent('');
    
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}${manual.filePath}`);
      if (!response.ok) {
        throw new Error('Failed to load manual');
      }
      const text = await response.text();
      setManualContent(text);
    } catch (error) {
      console.error('Error loading manual:', error);
      setManualContent('# Error Loading Manual\n\nSorry, we could not load this manual. Please try again later or download it directly.');
    } finally {
      setLoadingManual(false);
    }
  };

  const handleCloseManualDialog = () => {
    setOpenManualDialog(false);
    setSelectedManual(null);
    setManualContent('');
  };

  return (
    <div className={classes.root}>
      {/* Fixed Navigation Bar */}
      <div className={classes.navbar}>
        <div className={classes.navContainer}>
          <div className={classes.navLinks}>
            {sections.filter(s => s.id !== 'home').map(({ id, label }) => (
              <div
                key={id}
                className={`${classes.navButton} ${activeSection === id ? classes.activeNavButton : ''}`}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Home Section */}
      <section id="home" ref={homeRef} className={classes.heroSection}>
        <DisplacementSphere />
        <LogoLink />
        <Content />
        {activeSection === 'home' && <Resume />}
        <ThemeToggle />
        <Hidden smDown>
          <SocialIcons />
        </Hidden>
        <Hidden mdUp>
          <SpeedDials />
        </Hidden>
      </section>

      {/* Curriculum Section */}
      <section
        id="curriculum"
        ref={curriculumRef}
        className={classes.section}
      >
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Learning Curriculum - Level 1
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Computer Systems Technician Level 1 courses covering essential IT and cybersecurity fundamentals.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Box className={classes.projectCard}>
                <Typography variant="h5" className={classes.projectTitle}>
                  CST8202 – Windows Desktop Support
                </Typography>
                <Typography variant="body2" className={classes.projectDescription}>
                  Windows operating system configuration, troubleshooting, and desktop support.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className={classes.projectCard}>
                <Typography variant="h5" className={classes.projectTitle}>
                  CST8207 – GNU/Linux System Support
                </Typography>
                <Typography variant="body2" className={classes.projectDescription}>
                  Linux system administration, command line, scripting, and system management.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className={classes.projectCard}>
                <Typography variant="h5" className={classes.projectTitle}>
                  CST8182 – Networking Fundamentals
                </Typography>
                <Typography variant="body2" className={classes.projectDescription}>
                  OSI Model, TCP/IP, routing, switching, and network protocols.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className={classes.projectCard}>
                <Typography variant="h5" className={classes.projectTitle}>
                  CST8300 – Achieving Success
                </Typography>
                <Typography variant="body2" className={classes.projectDescription}>
                  Professional skills, teamwork, and career development strategies.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className={classes.projectCard}>
                <Typography variant="h5" className={classes.projectTitle}>
                  ENL1813 – Communications
                </Typography>
                <Typography variant="body2" className={classes.projectDescription}>
                  Technical writing, presentations, and professional communication skills.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className={classes.projectCard}>
                <Typography variant="h5" className={classes.projectTitle}>
                  MAT8002 – Numeracy & Logic
                </Typography>
                <Typography variant="body2" className={classes.projectDescription}>
                  Mathematical reasoning, problem-solving, and logical thinking skills.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Labs Section */}
      <section id="labs" ref={labsRef} className={classes.section}>
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Labs & Tutorials
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
            Hands-on technical labs covering networking, Windows administration, and Linux system support. Each course includes 9 weekly labs plus a comprehensive capstone project.
          </Typography>
          
          <Grid container spacing={4}>
            {/* CST8182: Networking Fundamentals */}
            <Grid item xs={12}>
              <Box className={classes.projectCard} style={{ borderLeft: `4px solid #2196F3` }}>
                <Typography variant="h4" style={{ color: '#2196F3', fontWeight: 700, marginBottom: '8px' }}>
                  CST8182: Networking Fundamentals
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '16px', fontStyle: 'italic', opacity: 0.9 }}>
                  <strong>Primary Tools:</strong> Cisco Packet Tracer, Wireshark | <strong>Focus:</strong> Network design, IP addressing, routing, security
                </Typography>
                <Grid container spacing={2} style={{ marginTop: '16px' }}>
                  {[
                    { week: 1, title: 'Network Topology Exploration', focus: 'Bus, star, ring, mesh, hybrid topologies' },
                    { week: 2, title: 'OSI vs TCP/IP Deep Dive', focus: 'Protocol stack analysis, packet flow' },
                    { week: 3, title: 'Subnetting Scenarios', focus: 'Subnet mapping, IP ranges, masks' },
                    { week: 4, title: 'Router Configuration', focus: 'Routing tables, VLANs, gateways' },
                    { week: 5, title: 'DHCP & DNS Setup', focus: 'Dynamic allocation, DNS resolution' },
                    { week: 6, title: 'Network Security Basics', focus: 'ACLs, traffic control' },
                    { week: 7, title: 'Midterm Review & Topology Optimization', focus: 'Network redesign, performance tuning' },
                    { week: 8, title: 'Packet Flow Analysis', focus: 'Wireshark protocol troubleshooting' },
                    { week: 9, title: 'IPv6 Integration', focus: 'IPv4 to IPv6 dual-stack transition' },
                    { week: '10-14', title: 'LAN-WAN Design Project', focus: 'Multi-site network capstone', capstone: true }
                  ].map((lab, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box style={{ 
                        padding: '12px 16px', 
                        backgroundColor: theme.palette.type === 'dark' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.05)',
                        borderRadius: '8px',
                        borderLeft: lab.capstone ? '3px solid #FF9800' : '3px solid #2196F3'
                      }}>
                        <Typography variant="body2" style={{ fontWeight: 700, color: '#2196F3', marginBottom: '4px' }}>
                          Week {lab.week}: {lab.title}
                          {lab.capstone && <span style={{ marginLeft: '8px', color: '#FF9800', fontSize: '0.75rem' }}>★ CAPSTONE</span>}
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                          {lab.focus}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* CST8202: Windows Desktop Support */}
            <Grid item xs={12}>
              <Box className={classes.projectCard} style={{ 
                borderLeft: `4px solid ${theme.palette.type === 'dark' ? '#64B5F6' : '#1976D2'}`
              }}>
                <Typography variant="h4" style={{ 
                  color: theme.palette.type === 'dark' ? '#64B5F6' : '#1976D2', 
                  fontWeight: 700, 
                  marginBottom: '8px' 
                }}>
                  CST8202: Windows Desktop Support
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '16px', fontStyle: 'italic', opacity: 0.9 }}>
                  <strong>Primary Tools:</strong> VMware, PowerShell, Windows 10/11 | <strong>Focus:</strong> Windows administration, automation, security
                </Typography>
                <Grid container spacing={2} style={{ marginTop: '16px' }}>
                  {[
                    { week: 1, title: 'VM Setup & File Organization', skills: 'VMware configuration, system snapshots' },
                    { week: 2, title: 'Windows Installation', skills: 'OS deployment, user accounts, partitioning' },
                    { week: 3, title: 'File Systems & Backup', skills: 'NTFS permissions, File History recovery' },
                    { week: 4, title: 'PowerShell Basics', skills: 'Cmdlets (Get-Service, Stop-Process)' },
                    { week: 5, title: 'Local User & Group Policy', skills: 'Custom GPOs, security restrictions' },
                    { week: 6, title: 'Midterm Review & System Imaging', skills: 'Recovery media, backup images' },
                    { week: 7, title: 'Windows Security Tools', skills: 'BitLocker, Windows Defender' },
                    { week: 8, title: 'Software Deployment', skills: 'PowerShell deployment, Group Policy' },
                    { week: 9, title: 'Remote Desktop & Networking', skills: 'RDP configuration, Firewall rules' },
                    { week: '10-14', title: 'Enterprise Support Simulation', skills: 'Incident tickets, root-cause analysis', capstone: true }
                  ].map((lab, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box style={{ 
                        padding: '12px 16px', 
                        backgroundColor: theme.palette.type === 'dark' ? 'rgba(100, 181, 246, 0.1)' : 'rgba(25, 118, 210, 0.05)',
                        borderRadius: '8px',
                        borderLeft: lab.capstone ? `3px solid ${theme.palette.type === 'dark' ? '#FFB74D' : '#F57C00'}` : `3px solid ${theme.palette.type === 'dark' ? '#64B5F6' : '#1976D2'}`
                      }}>
                        <Typography variant="body2" style={{ 
                          fontWeight: 700, 
                          color: theme.palette.type === 'dark' ? '#64B5F6' : '#1976D2', 
                          marginBottom: '4px' 
                        }}>
                          Week {lab.week}: {lab.title}
                          {lab.capstone && <span style={{ marginLeft: '8px', color: theme.palette.type === 'dark' ? '#FFB74D' : '#F57C00', fontSize: '0.75rem' }}>★ CAPSTONE</span>}
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                          {lab.skills}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* CST8207: GNU/Linux System Support */}
            <Grid item xs={12}>
              <Box className={classes.projectCard} style={{ 
                borderLeft: `4px solid ${theme.palette.type === 'dark' ? '#81C784' : '#388E3C'}`
              }}>
                <Typography variant="h4" style={{ 
                  color: theme.palette.type === 'dark' ? '#81C784' : '#388E3C', 
                  fontWeight: 700, 
                  marginBottom: '8px' 
                }}>
                  CST8207: GNU/Linux System Support
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '16px', fontStyle: 'italic', opacity: 0.9 }}>
                  <strong>Primary Tools:</strong> Linux terminal, Bash shell, CLI tools | <strong>Focus:</strong> Linux administration, shell scripting, automation
                </Typography>
                <Grid container spacing={2} style={{ marginTop: '16px' }}>
                  {[
                    { week: 1, title: 'Command Line Orientation', concepts: 'man, ls, grep, navigation' },
                    { week: 2, title: 'File Permissions', concepts: 'chmod, chown, umask' },
                    { week: 3, title: 'Redirection and Pipes', concepts: 'grep, sort, uniq, piping' },
                    { week: 4, title: 'User & Group Management', concepts: 'User/group creation, privileges' },
                    { week: 5, title: 'Shell Variables & .bashrc', concepts: 'Variables, aliases, profile customization' },
                    { week: 6, title: 'Midterm Review & File System Deep Dive', concepts: '/proc, /dev, mount points' },
                    { week: 7, title: 'Cron & Process Scheduling', concepts: 'Job scheduling, CPU monitoring' },
                    { week: 8, title: 'Shell Scripting Basics', concepts: 'Loops, conditionals, functions' },
                    { week: 9, title: 'Regular Expressions & Text Parsing', concepts: 'awk, sed, regex, log analysis' },
                    { week: '10-14', title: 'Linux Service Suite', concepts: 'Backup, monitoring, logging tool', capstone: true }
                  ].map((lab, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box style={{ 
                        padding: '12px 16px', 
                        backgroundColor: theme.palette.type === 'dark' ? 'rgba(129, 199, 132, 0.1)' : 'rgba(56, 142, 60, 0.05)',
                        borderRadius: '8px',
                        borderLeft: lab.capstone ? `3px solid ${theme.palette.type === 'dark' ? '#FFB74D' : '#F57C00'}` : `3px solid ${theme.palette.type === 'dark' ? '#81C784' : '#388E3C'}`
                      }}>
                        <Typography variant="body2" style={{ 
                          fontWeight: 700, 
                          color: theme.palette.type === 'dark' ? '#81C784' : '#388E3C', 
                          marginBottom: '4px' 
                        }}>
                          Week {lab.week}: {lab.title}
                          {lab.capstone && <span style={{ marginLeft: '8px', color: theme.palette.type === 'dark' ? '#FFB74D' : '#F57C00', fontSize: '0.75rem' }}>★ CAPSTONE</span>}
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                          {lab.concepts}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={projectsRef} 
        className={classes.section}
      >
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Projects
          </Typography>
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Box className={classes.projectCard}>
                  <Typography variant="h5" className={classes.projectTitle}>
                    {project.title}
                  </Typography>
                  <Typography 
                    variant="subtitle2" 
                    style={{ 
                      color: '#00bfbf', 
                      marginBottom: '12px',
                      fontWeight: 600 
                    }}
                  >
                    {project.course}
                  </Typography>
                  <Typography variant="body2" className={classes.projectDescription}>
                    {project.description}
                  </Typography>
                  <div className={classes.techTags}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} className={classes.techChip}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<Info />}
                    onClick={() => handleOpenDialog(project)}
                    style={{ 
                      marginTop: '16px', 
                      textTransform: 'none',
                      borderWidth: '2px',
                      fontWeight: 600,
                      borderRadius: '8px',
                      borderColor: theme.palette.type === 'dark' 
                        ? theme.palette.primary.light 
                        : theme.palette.primary.main,
                      color: theme.palette.type === 'dark' 
                        ? theme.palette.primary.light 
                        : theme.palette.primary.main,
                      boxShadow: theme.palette.type === 'dark' 
                        ? `0 0 10px ${theme.palette.primary.main}60` 
                        : 'none',
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Project Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <div>
              <Typography variant="h5" component="div">
                {selectedProject?.title}
              </Typography>
              <Typography 
                variant="subtitle2" 
                style={{ 
                  marginTop: '4px',
                  color: theme.palette.type === 'dark' 
                    ? theme.palette.primary.light 
                    : theme.palette.primary.main,
                }}
              >
                {selectedProject?.course}
              </Typography>
            </div>
            <IconButton onClick={handleCloseDialog} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          {selectedProject?.description && (
            <Typography variant="body1" paragraph style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
              {selectedProject.description}
            </Typography>
          )}
          <Typography variant="body1" className={classes.projectDetailsText}>
            {selectedProject?.details}
          </Typography>
          <Box mt={3}>
            <Typography variant="h6" gutterBottom style={{ color: '#00bfbf', fontWeight: 600 }}>
              Technologies & Tools:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {selectedProject?.technologies.map((tech, i) => (
                <span key={i} className={classes.techChip}>
                  {tech}
                </span>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog} 
            color="primary" 
            variant="contained"
            style={{ borderRadius: '8px' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Lab Manual Details Dialog */}
      <Dialog 
        open={openManualDialog} 
        onClose={handleCloseManualDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <div>
              <Typography variant="h5" component="div">
                {selectedManual?.title}
              </Typography>
              <Typography 
                variant="subtitle2" 
                style={{ 
                  marginTop: '4px',
                  color: theme.palette.type === 'dark' 
                    ? theme.palette.primary.light 
                    : theme.palette.primary.main,
                }}
              >
                {selectedManual?.course}
              </Typography>
            </div>
            <IconButton onClick={handleCloseManualDialog} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          {loadingManual ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
            </Box>
          ) : (
            <Box position="relative">
              {/* Blurred Manual Content */}
              <Box 
                className={classes.projectDetailsText}
                style={{ 
                  filter: 'blur(5px)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  maxHeight: '400px',
                  overflow: 'hidden'
                }}
              >
                <ReactMarkdown>
                  {manualContent}
                </ReactMarkdown>
              </Box>
              
              {/* Overlay with Contact Button */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                style={{
                  background: theme.palette.type === 'dark' 
                    ? 'rgba(0, 0, 0, 0.7)' 
                    : 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <Typography 
                  variant="h4" 
                  align="center" 
                  gutterBottom
                  style={{ 
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                  }}
                >
                  Full Manual Available
                </Typography>
                <Typography 
                  variant="body1" 
                  align="center" 
                  paragraph
                  style={{ 
                    maxWidth: '500px',
                    marginBottom: theme.spacing(3),
                    fontWeight: 500,
                  }}
                >
                  This comprehensive lab manual includes detailed implementation guides, 
                  code examples, screenshot requirements, and grading rubrics.
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      handleCloseManualDialog();
                      scrollToSection('contact');
                    }}
                    style={{
                      textTransform: 'none',
                      fontWeight: 600,
                      padding: '12px 32px',
                      fontSize: '1.1rem',
                      borderRadius: '12px',
                    }}
                  >
                    Contact for Full Manual
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    component="a"
                    href={`mailto:redji.jeanbaptiste@mail.utoronto.ca?subject=Request for ${selectedManual?.title} Manual`}
                    style={{
                      textTransform: 'none',
                      fontWeight: 600,
                      padding: '12px 32px',
                      fontSize: '1.1rem',
                      borderWidth: '2px',
                      borderRadius: '12px',
                    }}
                  >
                    Email Request
                  </Button>
                </Box>
                <Typography 
                  variant="caption" 
                  align="center"
                  style={{ 
                    marginTop: theme.spacing(3),
                    color: theme.palette.text.secondary,
                  }}
                >
                  Available for academic review and collaboration
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseManualDialog} 
            color="primary" 
            variant="contained"
            style={{ borderRadius: '8px' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Lab Manuals Section */}
      <section 
        id="lab-manuals" 
        ref={(el) => { /* Add ref if needed for navigation */ }} 
        className={classes.section}
      >
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Lab Manuals & Documentation
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '900px', margin: '0 auto 3rem' }}>
            Comprehensive project manuals with step-by-step implementation guides, Cisco Packet Tracer integration, screenshot requirements, and complete documentation templates.
          </Typography>
          
          <Grid container spacing={4}>
            {labManuals.map((manual, index) => {
              return (
                <Grid item xs={12} md={6} key={index}>
                  <Box 
                    className={classes.projectCard} 
                    style={{ 
                      borderRadius: '16px',
                      boxShadow: theme.palette.type === 'dark' 
                        ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
                        : '0 4px 20px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography variant="h4" style={{ fontWeight: 700, marginBottom: '8px', color: theme.palette.text.primary }}>
                      {manual.title}
                    </Typography>
                    <Typography variant="subtitle1" style={{ marginBottom: '12px', fontWeight: 600, color: theme.palette.primary.main, opacity: 0.8 }}>
                      {manual.course}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '16px', lineHeight: 1.6 }}>
                      {manual.description}
                    </Typography>
                    <div className={classes.techTags}>
                      {manual.technologies.map((tech, i) => (
                        <span key={i} className={classes.techChip}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      onClick={() => handleOpenManualDialog(manual)}
                      style={{ 
                        marginTop: '16px', 
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '8px',
                      }}
                    >
                      View Manual
                    </Button>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          {/* Documentation Overview */}
          <Box mt={6} p={4} style={{ 
            background: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
            borderRadius: '20px',
            border: `1px solid ${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            boxShadow: theme.palette.type === 'dark' 
              ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}>
            <Typography variant="h5" gutterBottom style={{ fontWeight: 600, color: theme.palette.text.primary }}>
              What's Included in Each Manual
            </Typography>
            <Grid container spacing={3} style={{ marginTop: '16px' }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '8px' }}>
                  Implementation Guides
                </Typography>
                <Typography variant="body2">
                  Week-by-week breakdown with detailed steps, complete code examples, and configuration templates
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '8px' }}>
                  Screenshot Requirements
                </Typography>
                <Typography variant="body2">
                  Specific capture points (25-28 screenshots per project) with best practices and naming conventions
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '8px' }}>
                  Deliverables Checklist
                </Typography>
                <Typography variant="body2">
                  Complete list of required files, documentation, testing procedures, and grading rubrics
                </Typography>
              </Grid>
            </Grid>
            <Box mt={3} textAlign="center">
              <Button
                variant="outlined"
                size="large"
                component="a"
                href={`${process.env.PUBLIC_URL}/docs/README.md`}
                download="lab-manuals-README.md"
                style={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  borderWidth: '1.5px',
                  borderRadius: '12px',
                  padding: '12px 32px',
                }}
              >
                Download Complete Documentation Guide
              </Button>
            </Box>
          </Box>
        </Container>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        ref={blogRef}
        className={classes.section}
      >
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Latest Blog Posts
          </Typography>
          <Grid container spacing={4} className={classes.blogGrid}>
            {recentBlogPosts.map((post) => (
              <Grid item xs={12} md={6} lg={4} key={post.id}>
                <BlogPostCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className={classes.section}>
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            About Me
          </Typography>
          <About />
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className={classes.section}>
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Get In Touch
          </Typography>
          <Contact />
        </Container>
      </section>

      {/* Scroll to top button */}
      <ScrollTop>
        <Fab 
          color="primary" 
          size="small" 
          aria-label="scroll back to top"
          className={classes.scrollTopButton}
        >
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </div>
  );
};

export default SinglePageHome;
