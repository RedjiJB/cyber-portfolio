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
  CircularProgress,
  Tabs,
  Tab
} from '@material-ui/core';
import { KeyboardArrowUp, Close, Info, ExpandMore, ExpandLess } from '@material-ui/icons';
import DisplacementSphere from '../components/background/DisplacementSphere';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { LogoLink } from '../components/logo/LogoLink';
import { Content } from '../components/content/Content';
import { About } from '../components/about/About';
import { Contact } from '../components/contact/Contact';
import { Resume } from '../components/resume/Resume';
import ReactMarkdown from 'react-markdown';

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
      textShadow: 'none',
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
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
    fontSize: '2.5rem',
    textShadow: 'none',
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
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
    fontWeight: 600,
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    borderRadius: '25px',
    position: 'relative',
    backgroundColor: 'transparent',
    border: theme.palette.type === 'dark'
      ? `1.5px solid ${theme.palette.primary.main}40`
      : `1px solid transparent`,
    textShadow: 'none',
    '&:hover': {
      color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
      backgroundColor: theme.palette.type === 'dark'
        ? 'rgba(0, 191, 191, 0.15)'
        : 'rgba(0, 191, 191, 0.05)',
      border: theme.palette.type === 'dark'
        ? `1.5px solid ${theme.palette.primary.main}80`
        : `1px solid ${theme.palette.primary.main}40`,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
      textShadow: 'none',
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
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
    textShadow: 'none',
  },
  projectDescription: {
    marginBottom: theme.spacing(2),
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
    lineHeight: 1.6,
    textShadow: 'none',
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
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.75rem',
    fontWeight: 500,
    textShadow: 'none',
  },
  levelTabs: {
    marginBottom: theme.spacing(4),
    borderRadius: '18px',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.type === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.04)',
    border: `1px solid ${theme.palette.divider}`,
  },
  curriculumCard: {
    padding: theme.spacing(3),
    borderRadius: '16px',
    backgroundColor: theme.palette.type === 'dark'
      ? 'rgba(0, 0, 0, 0.25)'
      : 'rgba(255, 255, 255, 0.08)',
    boxShadow: theme.palette.type === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.65)'
      : '0 8px 32px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '340px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: theme.palette.type === 'dark'
        ? '0 12px 36px rgba(0, 0, 0, 0.75)'
        : '0 12px 40px rgba(0, 0, 0, 0.18)',
    },
  },
  curriculumInfoRow: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    fontSize: '0.9rem',
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
    lineHeight: 1.5,
  },
  labList: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.25),
  },
  labItem: {
    padding: theme.spacing(1.25, 1.5),
    borderRadius: '12px',
    backgroundColor: theme.palette.type === 'dark'
      ? 'rgba(255, 255, 255, 0.04)'
      : 'rgba(0, 0, 0, 0.03)',
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  },
  labTitle: {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
  },
  labSummary: {
    fontSize: '0.85rem',
    opacity: 0.8,
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
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
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
    fontSize: '0.9rem',
    marginTop: theme.spacing(0.5),
  },
  projectDetailsText: {
    whiteSpace: 'pre-wrap',
    lineHeight: 1.8,
    fontSize: '0.95rem',
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
    '& strong': {
      color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
      fontWeight: 600,
    },
    '& h1, & h2, & h3': {
      color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    '& h1': {
      fontSize: '2rem',
      borderBottom: theme.palette.type === 'dark' ? '2px solid #FFFFFF' : '2px solid #000000',
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
      color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
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
      borderLeft: theme.palette.type === 'dark' ? '4px solid #FFFFFF' : '4px solid #000000',
      paddingLeft: theme.spacing(2),
      marginLeft: 0,
      fontStyle: 'italic',
      color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
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
      color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
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
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedManual, setSelectedManual] = useState(null);
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [manualContent, setManualContent] = useState('');
  const [loadingManual, setLoadingManual] = useState(false);
  const [activeLevel, setActiveLevel] = useState('level1');
  const [expandedCourses, setExpandedCourses] = useState({});

  const handleLevelChange = (event, newValue) => {
    if (newValue) {
      setActiveLevel(newValue);
    }
  };

  const toggleCourseExpansion = (courseCode) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseCode]: !prev[courseCode]
    }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Projects data
  const projects = [
    {
      title: "TERMGAME",
      course: "Terminal Training Platform",
      technologies: ["Python", "Docker", "Cisco IOS", "PowerShell", "Linux"],
      description: "A terminal-based training platform for mastering Linux, Cisco IOS, and PowerShell through interactive missions with progressive difficulty and XP tracking.",
      details: `Built an interactive terminal-based training platform with progressive difficulty missions across Linux, Cisco IOS, and PowerShell environments. Developed 66+ PowerShell missions covering Windows Server administration from fundamentals to Azure cloud integration. Implemented Docker containerized environments (Windows Server Core, Linux) for safe hands-on practice without risking real systems. Created a mission validation system with XP progression tracking and scenario-based assessments. Features structured learning paths from beginner to advanced levels, real-time command validation, and comprehensive feedback on each mission attempt.`
    },
    {
      title: "Linux Automation Suite",
      course: "Bash Automation Scripts",
      technologies: ["Bash", "Cron", "Linux", "GPG", "System Administration"],
      description: "A comprehensive Bash automation suite for Linux system administration featuring automated backups, intelligent log analysis, and cron job management.",
      details: `Developed an automated backup system with full/incremental/differential modes, tar/gzip compression, and GPG encryption for secure data protection. Built an intelligent log analysis tool with pattern detection, security event identification, and customizable alerting via email notifications. Created a cron job manager with template-based scheduling, execution monitoring, and comprehensive error handling with retry logic. All modules feature POSIX-compliant code, minimal dependencies, and production-ready logging for enterprise environments.`
    },
    {
      title: "Windows Admin Toolkit",
      course: "PowerShell Automation Suite",
      technologies: ["PowerShell", "Active Directory", "BitLocker", "AES-256", "Windows Server"],
      description: "A PowerShell automation suite for Windows system administration, streamlining Active Directory management, backup operations, and disk encryption workflows.",
      details: `Developed a user management module for bulk AD account creation, password policy enforcement, group membership management, and automated onboarding/offboarding processes. Built an automated backup system with full/incremental/differential modes, AES-256 encryption, compression, and cloud storage integration for enterprise environments. Implemented BitLocker automation tools with recovery key management, TPM integration, and compliance reporting for organizational security policies. Designed modular architecture with comprehensive error handling, logging, and configuration management for maintainable enterprise-grade scripts.`
    },
    {
      title: "Cyber Portfolio",
      course: "Personal Portfolio Website",
      technologies: ["React", "Material-UI", "JavaScript", "GitHub Pages", "HTML/CSS"],
      description: "A React-based portfolio website showcasing projects, curriculum progress, and an interactive resume with animated UI elements and dark mode support.",
      details: `Built a single-page React application with Material-UI components featuring tabbed navigation across Home, Curriculum, Projects, About, and Contact sections. Implemented an interactive resume with timeline-based experience display, downloadable PDF, and animated text effects. Created a curriculum tracker with expandable weekly topic views for all enrolled courses across multiple semesters. Features a custom animated background with displacement sphere, dark/light theme toggle, social media integration, and responsive design for all screen sizes. Deployed on GitHub Pages with continuous integration.`
    }
  ];

  // Course data for Level 1
  const level1Courses = [
    {
      code: 'CST8202',
      title: 'Windows Desktop Support',
      description: 'Windows operating system configuration, troubleshooting, and desktop support.',
      color: '#1976D2',
      darkColor: '#64B5F6',
      tools: 'VMware, PowerShell, Windows 10/11',
      focus: 'Windows administration, automation, security',
      labs: [
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
      ]
    },
    {
      code: 'CST8207',
      title: 'GNU/Linux System Support',
      description: 'Linux system administration, command line, scripting, and system management.',
      color: '#388E3C',
      darkColor: '#81C784',
      tools: 'Linux terminal, Bash shell, CLI tools',
      focus: 'Linux administration, shell scripting, automation',
      labs: [
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
      ]
    },
    {
      code: 'CST8182',
      title: 'Networking Fundamentals',
      description: 'OSI Model, TCP/IP, routing, switching, and network protocols.',
      color: '#2196F3',
      darkColor: '#2196F3',
      tools: 'Cisco Packet Tracer, Wireshark',
      focus: 'Network design, IP addressing, routing, security',
      labs: [
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
      ]
    }
  ];

  const level2Courses = [
    {
      code: 'CST8200',
      title: 'Windows Domain Administration',
      description: 'Build and operate Active Directory domains, group policies, and identity/security services on modern Windows Server platforms.',
      color: '#0D47A1',
      darkColor: '#90CAF9',
      tools: 'Windows Server, Active Directory, VMware, RSAT, Group Policy',
      focus: 'Domain controllers, DNS/DHCP, GPO, IIS, WSUS',
      labs: [
        { week: 1, title: 'Preparing the Lab Environment', skills: 'VMware, Windows Server installation' },
        { week: 2, title: 'Active Directory & Domain Controllers', skills: 'AD installation, joining computers to domains' },
        { week: 3, title: 'Organizational Units', skills: 'Domain controllers, OU management' },
        { week: 4, title: 'DNS & Working with OUs', skills: 'Domain operations, SID, DNS configuration' },
        { week: 5, title: 'RDP, RSAT, Server Manager & File Shares', skills: 'Remote Desktop, file sharing, DFS' },
        { week: 6, title: 'Group Policy Objects', skills: 'GPO creation, RSOP, midterm review' },
        { week: 7, title: 'Midterm Test & GPO Lab', skills: 'Assessment, GPO implementation' },
        { week: 9, title: 'Logging & Windows Containers', skills: 'Event logs, container basics, firewall' },
        { week: 10, title: 'IIS, NTP & WSUS', skills: 'Web services, time sync, update management' },
        { week: 11, title: 'DHCP, WDS & PXE', skills: 'Dynamic IP, deployment services, network boot' },
        { week: 12, title: 'Advanced DNS & Domain Migration', skills: 'DNS records, domain migration strategies' },
        { week: 13, title: 'Azure AD & Catch Up', skills: 'Cloud directory services, lab catch-up' },
        { week: 14, title: 'Final Exam Review', skills: 'Comprehensive review', capstone: true }
      ]
    },
    {
      code: 'CST8208',
      title: 'PC System Technology',
      description: 'Deep dive into modern hardware, firmware, and peripheral standards to troubleshoot and optimize mixed-device PC fleets.',
      color: '#F06292',
      darkColor: '#F8BBD0',
      tools: 'Hardware diagnostics, BIOS/UEFI, Imaging tools, Power supply tester',
      focus: 'Hardware assembly, RAID, troubleshooting',
      labs: [
        { week: 1, title: 'Course Introduction', skills: 'Motherboards, chipsets, AC Day 1' },
        { week: 2, title: 'Component Identification', skills: 'Hard drives, SSDs, component ID' },
        { week: 3, title: 'Basic System Build', skills: 'RAID, laptop hardware' },
        { week: 4, title: 'Advanced System Build', skills: 'Memory, cooling, overclocking' },
        { week: 5, title: 'Laptop Disassembly/Reassembly', skills: 'Power supplies, power protection' },
        { week: 6, title: 'RAID Configuration', skills: 'Midterm review, RAID setup' },
        { week: 7, title: 'Term Test & Catch Up Lab', skills: 'Assessment, lab catch-up' },
        { week: 9, title: 'SFF & Ethernet Cables', skills: 'Printers, processors, POST, boot process' },
        { week: 10, title: 'UPS and Firmware Flash', skills: 'Display units, optical storage' },
        { week: 11, title: 'System Imaging', skills: 'Internal/external expansion, sound cards' },
        { week: 12, title: 'Troubleshooting & PS Tester', skills: 'E-waste, server hardware, diagnostics' },
        { week: 13, title: 'Final Exam Review & Catch Up', skills: 'Review, lab catch-up' },
        { week: 14, title: 'Final Exam Review Quiz', skills: 'Comprehensive review', capstone: true }
      ]
    },
    {
      code: 'CST8305',
      title: 'GNU/Linux Server Administration',
      description: 'Manage server life cycle, automation, and security for Debian/Ubuntu and Red Hat systems in enterprise datacenters.',
      color: '#43A047',
      darkColor: '#A5D6A7',
      tools: 'Red Hat Enterprise Linux, Podman, SELinux, OpenShift',
      focus: 'Server administration, containerization, security',
      labs: [
        { week: 1, title: 'User and Group Management', skills: 'RH124 Ch.6-7: Users, groups, permissions' },
        { week: 2, title: 'Process Management and Logging', skills: 'RH124 Ch.8-9: Processes, systemd, logs' },
        { week: 3, title: 'Networking and Package Management', skills: 'RH124 Ch.11-12: Network config, DNF/YUM' },
        { week: 4, title: 'Scheduling and Storage', skills: 'RH124 Ch.13 & RH134 Ch.1: Cron, LVM, partitions' },
        { week: 5, title: 'Midterm Review & Advanced Topics', skills: 'RH134 Ch.3-4: Review, automation' },
        { week: 6, title: 'Midterm Exam & Podman Containers', skills: 'Assessment, PA1 demo (Podman)' },
        { week: 7, title: 'SELinux and Performance Tuning', skills: 'RH134 Ch.5-6: Security contexts, tuning' },
        { week: 9, title: 'Filesystems and Advanced Features', skills: 'RH134 Ch.7-8: XFS, Stratis, NFS' },
        { week: 10, title: 'Booting and Firewalls', skills: 'RH134 Ch.10-13: GRUB, firewalld, PA2 demo' },
        { week: 11, title: 'Introduction to Containers', skills: 'DO188 Ch.1-3: Podman, container basics' },
        { week: 12, title: 'Container Images and Volumes', skills: 'DO188 Ch.4-5: Multi-container apps, PA3 demo' },
        { week: 13, title: 'Compose, OpenShift and Kubernetes', skills: 'DO188 Ch.6-8: Orchestration platforms' },
        { week: 14, title: 'OpenShift Server Deployment', skills: 'PA4 demo: Production deployment', capstone: true }
      ]
    },
    {
      code: 'CST8324',
      title: 'Programming Fundamentals',
      description: 'Introduction to programming concepts, logic, and problem-solving using a high-level programming language.',
      color: '#7B1FA2',
      darkColor: '#CE93D8',
      tools: 'Python, Linux VM, VS Code, Git',
      focus: 'Programming logic, data structures, file I/O',
      labs: [
        { week: 1, title: 'Environment Setup', skills: 'Linux VM, Python installation, development tools' },
        { week: 2, title: 'Basic Python Expressions', skills: 'Variables, operators, data types' },
        { week: 3, title: 'Flow Control: Decision & Iteration', skills: 'Conditionals, loops, style guide' },
        { week: 4, title: 'Nested Flow Control & Version Control', skills: 'Nested loops, Git basics' },
        { week: 5, title: 'Functions & Modules', skills: 'Decomposition, parameters, return values' },
        { week: 6, title: 'Midterm Review & Advanced Functions', skills: 'Function design, code organization' },
        { week: 7, title: 'Midterm Exam & VS Code Exploration', skills: 'Assessment, IDE proficiency' },
        { week: 9, title: 'Collection Data Types', skills: 'Lists, dictionaries, data manipulation' },
        { week: 10, title: 'File Operations & Exception Handling', skills: 'Read/write files, error handling' },
        { week: 11, title: 'Data Formats: CSV & JSON', skills: 'File format conversion, data processing' },
        { week: '12-14', title: 'Capstone Project', skills: 'Multi-phase project, demo presentation', capstone: true }
      ]
    },
    {
      code: 'CST8315',
      title: 'Routing and Switching',
      description: 'Enterprise routing and switching with VLANs, STP, EtherChannel, and LAN security in switched networks.',
      color: '#1E88E5',
      darkColor: '#90CAF9',
      tools: 'Cisco IOS, Packet Tracer, Netacad',
      focus: 'VLANs, STP, EtherChannel, LAN security, FHRP',
      labs: [
        { week: 1, title: 'Switch & Router Configuration Review', skills: 'Switch ports, SVIs, router interfaces, cabling' },
        { week: 2, title: 'Routing Concepts & Static Routing', skills: 'Routing tables, static routes, default/floating routes' },
        { week: 3, title: 'Troubleshoot Routes & DHCPv4', skills: 'Static route issues, switching concepts, DHCP config' },
        { week: 4, title: 'VLANs & Trunking', skills: 'VLAN config, trunk ports, DTP, access ports' },
        { week: 5, title: 'InterVLAN Routing', skills: 'ROAS, L3 switching, interVLAN troubleshooting' },
        { week: 6, title: 'Spanning-Tree Protocol', skills: 'STP concepts, redundancy, Rapid-PVST+' },
        { week: 7, title: 'Midterm Exam', skills: 'Assessment covering Weeks 1-6' },
        { week: 9, title: 'SBA #1 & Advanced DHCP', skills: 'Skills-based assessment, DHCP relay, STP recap' },
        { week: 10, title: 'EtherChannel', skills: 'EtherChannel technology and configuration' },
        { week: 11, title: 'LAN Security & Switch Hardening', skills: 'Port security, DHCP snooping, DAI, 802.1X' },
        { week: 12, title: 'FHRP Concepts', skills: 'First hop redundancy protocols' },
        { week: 13, title: 'WLAN Concepts & Configuration', skills: 'Wireless standards, security, channel management' },
        { week: 14, title: 'SBA #2 - Cumulative Assessment', skills: 'Full semester skills-based assessment', capstone: true }
      ]
    }
  ];

  const getCourseAccent = (course) => {
    if (!course) return theme.palette.primary.main;
    return theme.palette.type === 'dark'
      ? (course.darkColor || course.color)
      : course.color;
  };

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
    <div className={classes.root} style={{ height: '100vh', overflow: 'hidden' }}>
      <DisplacementSphere />
      <LogoLink />
      <ThemeToggle />
      <Hidden smDown>
        <SocialIcons />
      </Hidden>
      <Hidden mdUp>
        <SpeedDials />
      </Hidden>

      {/* Tab Navigation */}
      <div className={classes.navbar}>
        <div className={classes.navContainer}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="navigation tabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.palette.primary.main,
                height: '3px',
              }
            }}
          >
            <Tab value="home" label="Home" className={classes.navButton} />
            <Tab value="curriculum" label="Curriculum" className={classes.navButton} />
            <Tab value="projects" label="Projects" className={classes.navButton} />
            <Tab value="about" label="About" className={classes.navButton} />
            <Tab value="contact" label="Contact" className={classes.navButton} />
          </Tabs>
        </div>
      </div>

      {/* Tab Content Container */}
      <Box style={{ height: 'calc(100vh - 80px)', overflow: 'auto', marginTop: '80px' }}>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className={classes.heroSection}>
            <Content />
            <Resume />
          </div>
        )}

        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <div className={classes.section}>
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Curriculum & Labs
          </Typography>
          <Typography
            variant="body1"
            style={{
              textAlign: 'center',
              marginBottom: '2.5rem',
              maxWidth: '800px',
              margin: '0 auto 2.5rem',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              opacity: 0.9
            }}
          >
            Building enterprise-ready skills through hands-on labs in Windows, Linux, and Network administration
          </Typography>

          <Box
            style={{
              marginBottom: '3rem',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Tabs
              value={activeLevel}
              onChange={handleLevelChange}
              indicatorColor="primary"
              textColor="primary"
              variant="standard"
              aria-label="Choose curriculum level"
              TabIndicatorProps={{
                style: {
                  height: '3px',
                  borderRadius: '3px 3px 0 0',
                }
              }}
              style={{
                backgroundColor: theme.palette.type === 'dark'
                  ? 'rgba(0, 0, 0, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '8px',
                minHeight: '56px',
              }}
            >
              <Tab
                value="level1"
                label="Level 1 — Foundations"
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minHeight: '48px',
                  minWidth: '200px',
                }}
              />
              <Tab
                value="level2"
                label="Level 2 — Specializations"
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minHeight: '48px',
                  minWidth: '200px',
                }}
              />
            </Tabs>
          </Box>

          {activeLevel === 'level1' && (
            <>
              <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Level 1 covers the core courses required for day-to-day endpoint, server, and network support. Each technical course includes labs plus a capstone simulation or professional context.
              </Typography>

              <Grid container spacing={3}>
                {level1Courses.map((course) => {
                  const accent = getCourseAccent(course);
                  const hasDetails = course.tools || course.focus;
                  return (
                    <Grid item xs={12} md={6} key={course.code}>
                      <Box
                        className={classes.curriculumCard}
                        style={{ borderLeft: `4px solid ${accent}` }}
                      >
                        <div>
                          <Typography variant="h5" className={classes.projectTitle}>
                            {course.code} – {course.title}
                          </Typography>
                          {hasDetails && (
                            <Box className={classes.curriculumInfoRow} style={{ justifyContent: 'flex-start' }}>
                              {course.tools && <span><strong>Tools:</strong> {course.tools}</span>}
                              {course.focus && <span><strong>Focus:</strong> {course.focus}</span>}
                            </Box>
                          )}
                          {course.labs && course.labs.length > 0 && (
                            <Button
                              onClick={() => toggleCourseExpansion(course.code)}
                              endIcon={expandedCourses[course.code] ? <ExpandLess /> : <ExpandMore />}
                              style={{
                                marginTop: theme.spacing(1),
                                textTransform: 'none',
                                color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
                              }}
                            >
                              {expandedCourses[course.code] ? 'Hide Weekly Topics' : 'Show Weekly Topics'}
                            </Button>
                          )}
                        </div>
                        {course.labs && course.labs.length > 0 && expandedCourses[course.code] && (
                          <Box className={classes.labList}>
                            {course.labs.map((lab, index) => {
                              const labDescription = lab.focus || lab.skills || lab.concepts || lab.summary || 'Hands-on lab work';
                              return (
                                <Box
                                  key={index}
                                  className={classes.labItem}
                                  style={{
                                    borderLeftColor: lab.capstone
                                      ? (theme.palette.type === 'dark' ? '#FFFFFF' : '#000000')
                                      : accent,
                                  }}
                                >
                                  <Typography className={classes.labTitle}>
                                    {lab.week ? `Week ${lab.week}: ` : ''}{lab.title}
                                    {lab.capstone && (
                                      <span
                                        style={{
                                          marginLeft: '8px',
                                          color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
                                          fontSize: '0.8rem',
                                        }}
                                      >
                                        ★ Capstone
                                      </span>
                                    )}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}

          {activeLevel === 'level2' && (
            <>
              <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Level 2 brings advanced lab stacks for specialization tracks in security, cloud automation, and incident response. Each block includes orchestration, detection, and capstone simulations designed for enterprise readiness.
              </Typography>
              <Grid container spacing={3}>
                {level2Courses.map((course) => {
                  const accent = getCourseAccent(course);
                  return (
                    <Grid item xs={12} md={6} key={course.code}>
                      <Box
                        className={classes.curriculumCard}
                        style={{ borderLeft: `4px solid ${accent}` }}
                      >
                        <div>
                          <Typography variant="h5" className={classes.projectTitle}>
                            {course.code} – {course.title}
                          </Typography>
                          <Box className={classes.curriculumInfoRow}>
                            <span><strong>Tools:</strong> {course.tools}</span>
                            <span><strong>Focus:</strong> {course.focus}</span>
                          </Box>
                          {course.labs && (
                            <Button
                              onClick={() => toggleCourseExpansion(course.code)}
                              endIcon={expandedCourses[course.code] ? <ExpandLess /> : <ExpandMore />}
                              style={{
                                marginTop: theme.spacing(1),
                                textTransform: 'none',
                                color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
                              }}
                            >
                              {expandedCourses[course.code] ? 'Hide Weekly Topics' : 'Show Weekly Topics'}
                            </Button>
                          )}
                        </div>
                        {course.labs && expandedCourses[course.code] && (
                          <Box className={classes.labList}>
                            {course.labs.map((lab, index) => (
                              <Box
                                key={index}
                                className={classes.labItem}
                                style={{
                                  borderLeftColor: lab.capstone
                                    ? (theme.palette.type === 'dark' ? '#FFFFFF' : '#000000')
                                    : accent,
                                }}
                              >
                                <Typography className={classes.labTitle}>
                                  {lab.week ? `Week ${lab.week}: ` : ''}{lab.title}
                                  {lab.capstone && (
                                    <span style={{ marginLeft: '8px', color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000', fontSize: '0.8rem' }}>
                                      ★ Capstone
                                    </span>
                                  )}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </Container>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className={classes.section}>
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
                      color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
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
          </div>
        )}


        {/* About Tab */}
        {activeTab === 'about' && (
          <div className={classes.section}>
            <Container maxWidth="lg" className={classes.sectionContent}>
              <Typography variant="h2" className={classes.sectionTitle}>
                About Me
              </Typography>
              <About minimalView={true} showAdditionalSections={false} showExperience={false} />
            </Container>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className={classes.section}>
            <Container maxWidth="lg" className={classes.sectionContent}>
              <Contact />
            </Container>
          </div>
        )}

      </Box>

      {/* Dialogs - These exist outside of tabs */}

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
                  color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
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
            <Typography variant="h6" gutterBottom style={{ color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000', fontWeight: 600 }}>
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
                  color: theme.palette.type === 'dark' ? '#FFFFFF' : '#000000',
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
                      setActiveTab('contact');
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
                    href={`mailto:jean0319@algonquinlive.com?subject=Request for ${selectedManual?.title} Manual`}
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
