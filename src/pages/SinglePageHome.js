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
  IconButton
} from '@material-ui/core';
import { KeyboardArrowUp, Close, Info } from '@material-ui/icons';

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
  },
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  alternateBackground: {
    backgroundColor: theme.palette.type === 'dark' 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(255, 255, 255, 0.3)',
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontSize: '2.5rem',
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
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 6px 25px ${theme.palette.primary.main}80`,
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
    borderRadius: theme.shape.borderRadius,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[8],
    },
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  },
  projectTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  projectDescription: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
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
    color: theme.palette.primary.light,
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

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
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
        className={`${classes.section} ${classes.alternateBackground}`}
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
              <Box className={classes.projectCard} style={{ borderLeft: `4px solid #4CAF50` }}>
                <Typography variant="h4" style={{ color: '#4CAF50', fontWeight: 700, marginBottom: '8px' }}>
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
                        backgroundColor: theme.palette.type === 'dark' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)',
                        borderRadius: '8px',
                        borderLeft: lab.capstone ? '3px solid #FF9800' : '3px solid #4CAF50'
                      }}>
                        <Typography variant="body2" style={{ fontWeight: 700, color: '#4CAF50', marginBottom: '4px' }}>
                          Week {lab.week}: {lab.title}
                          {lab.capstone && <span style={{ marginLeft: '8px', color: '#FF9800', fontSize: '0.75rem' }}>★ CAPSTONE</span>}
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
              <Box className={classes.projectCard} style={{ borderLeft: `4px solid #FF5722` }}>
                <Typography variant="h4" style={{ color: '#FF5722', fontWeight: 700, marginBottom: '8px' }}>
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
                        backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 87, 34, 0.1)' : 'rgba(255, 87, 34, 0.05)',
                        borderRadius: '8px',
                        borderLeft: lab.capstone ? '3px solid #FF9800' : '3px solid #FF5722'
                      }}>
                        <Typography variant="body2" style={{ fontWeight: 700, color: '#FF5722', marginBottom: '4px' }}>
                          Week {lab.week}: {lab.title}
                          {lab.capstone && <span style={{ marginLeft: '8px', color: '#FF9800', fontSize: '0.75rem' }}>★ CAPSTONE</span>}
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
        className={`${classes.section} ${classes.alternateBackground}`}
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
                      boxShadow: theme.palette.type === 'dark' 
                        ? `0 0 10px ${theme.palette.primary.main}40` 
                        : 'none',
                      '&:hover': {
                        borderWidth: '2px',
                        boxShadow: theme.palette.type === 'dark' 
                          ? `0 0 15px ${theme.palette.primary.main}60` 
                          : 'none',
                        backgroundColor: theme.palette.type === 'dark' 
                          ? `${theme.palette.primary.main}20` 
                          : 'transparent',
                      }
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
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <div>
              <Typography variant="h5" component="div">
                {selectedProject?.title}
              </Typography>
              <Typography variant="subtitle2" color="primary" style={{ marginTop: '4px' }}>
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
          <Button onClick={handleCloseDialog} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
      <section id="about" ref={aboutRef} className={`${classes.section} ${classes.alternateBackground}`}>
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
