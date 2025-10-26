import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import {
  Container,
  Typography,
  Button,
  Box,
  Breadcrumbs,
  Paper,
  Hidden,
  Chip,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  Grow,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import curriculumData from '../settings/curriculum.json';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  content: {
    marginTop: '5rem',
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },
  breadcrumbs: {
    marginBottom: theme.spacing(3),
  },
  moduleHeader: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    background: `linear-gradient(135deg, ${theme.palette.primary.main}22 0%, ${theme.palette.secondary.main}22 100%)`,
    borderRadius: theme.spacing(1),
  },
  moduleTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  moduleDescription: {
    fontSize: '1.1rem',
    color: theme.palette.text.secondary,
  },
  contentSection: {
    marginTop: theme.spacing(4),
  },
  emptyState: {
    padding: theme.spacing(6),
    textAlign: 'center',
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.spacing(1),
    border: `2px dashed ${theme.palette.divider}`,
  },
  emptyStateIcon: {
    fontSize: '4rem',
    color: theme.palette.text.disabled,
    marginBottom: theme.spacing(2),
  },
  contentList: {
    marginTop: theme.spacing(2),
  },
  contentItem: {
    marginBottom: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  navWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  logoWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  controlsWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  pathInfo: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.action.selected,
    borderRadius: theme.spacing(0.5),
    fontFamily: 'monospace',
    fontSize: '0.875rem',
  },
  weeklyLabsSection: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
  weeklyLabCard: {
    height: '100%',
    transition: 'all 0.3s ease',
    backgroundColor: theme.palette.background.paper,
    borderLeft: '4px solid',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 8px 24px rgba(0,0,0,0.6)' 
        : '0 8px 24px rgba(0,0,0,0.15)',
    },
  },
  weekNumber: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  labTopic: {
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  assignmentDialog: {
    '& .MuiDialog-paper': {
      maxWidth: '900px',
      width: '90%',
    },
  },
  dialogHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(1),
  },
  pdfPreviewContainer: {
    position: 'relative',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    border: `2px solid ${theme.palette.divider}`,
  },
  pdfPreview: {
    width: '100%',
    height: '500px',
    filter: 'blur(8px)',
    pointerEvents: 'none',
  },
  pdfOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(2px)',
  },
  lockIcon: {
    fontSize: '4rem',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
  },
  blurredContent: {
    position: 'relative',
    filter: 'blur(8px)',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)',
    zIndex: 10,
    padding: theme.spacing(4),
  },
  overlayContent: {
    textAlign: 'center',
    maxWidth: '600px',
    color: theme.palette.common.white,
  },
}));

// Weekly labs data for each course
const weeklyLabsData = {
  'networking-fundamentals': {
    totalWeeks: 14,
    color: '#2ecc71',
    weeks: [
      { 
        week: 1, 
        topic: 'Network Topology Exploration', 
        slug: 'week01',
        description: 'Explore different network topologies including star, bus, ring, and mesh configurations. Learn to identify topology types and understand their advantages and use cases.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week01/assignment.pdf'
      },
      { 
        week: 2, 
        topic: 'Protocols and OSI Model', 
        slug: 'week02',
        description: 'Deep dive into the OSI model layers and understand how network protocols operate at each layer. Practice identifying protocol data units and their functions.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week02/assignment.pdf'
      },
      { 
        week: 3, 
        topic: 'Ethernet and ARP', 
        slug: 'week03',
        description: 'Learn Ethernet frame structure and the Address Resolution Protocol (ARP). Capture and analyze ARP traffic to understand MAC-to-IP address mapping.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week03/assignment.pdf'
      },
      { 
        week: 4, 
        topic: 'Router Configuration & Default Gateway', 
        slug: 'week04',
        description: 'Configure basic router settings and establish default gateway connectivity. Practice initial router setup and basic interface configuration.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week04/assignment.pdf'
      },
      { 
        week: 5, 
        topic: 'IPv4 & IPv6 Addressing', 
        slug: 'week05',
        description: 'Master IPv4 and IPv6 address structures, classes, and notation. Practice converting between binary and decimal IP addresses.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week05/assignment.pdf'
      },
      { 
        week: 6, 
        topic: 'Subnetting & VLSM', 
        slug: 'week06',
        description: 'Learn subnetting calculations and Variable Length Subnet Masking (VLSM). Practice creating efficient subnet designs for various network requirements.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week06/assignment.pdf'
      },
      { 
        week: 7, 
        topic: 'Static Routing Configuration', 
        slug: 'week07',
        description: 'Configure static routes on routers to enable inter-network communication. Understand routing tables and next-hop addresses.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week07/assignment.pdf'
      },
      { 
        week: 8, 
        topic: 'Dynamic Routing (RIP & OSPF)', 
        slug: 'week08',
        description: 'Implement dynamic routing protocols including RIPv2 and OSPF. Compare routing protocol behaviors and convergence times.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week08/assignment.pdf'
      },
      { 
        week: 9, 
        topic: 'VLAN Configuration & Trunking', 
        slug: 'week09',
        description: 'Create and configure VLANs on switches. Set up trunk links using 802.1Q encapsulation for inter-switch VLAN communication.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week09/assignment.pdf'
      },
      { 
        week: 10, 
        topic: 'Inter-VLAN Routing', 
        slug: 'week10',
        description: 'Enable communication between VLANs using router-on-a-stick or Layer 3 switching. Configure subinterfaces and VLAN interfaces.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week10/assignment.pdf'
      },
      { 
        week: 11, 
        topic: 'DHCP & DNS Services', 
        slug: 'week11',
        description: 'Configure DHCP server and DNS services. Implement dynamic IP address allocation and name resolution in a network environment.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week11/assignment.pdf'
      },
      { 
        week: 12, 
        topic: 'Access Control Lists (ACLs)', 
        slug: 'week12',
        description: 'Create and apply standard and extended ACLs for network traffic filtering. Practice permit/deny rule configuration and placement.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week12/assignment.pdf'
      },
      { 
        week: 13, 
        topic: 'NAT & PAT Configuration', 
        slug: 'week13',
        description: 'Configure Network Address Translation (NAT) and Port Address Translation (PAT). Enable private networks to access the internet using public IP addresses.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week13/assignment.pdf'
      },
      { 
        week: 14, 
        topic: 'Network Security & Best Practices', 
        slug: 'week14',
        description: 'Implement network security measures including port security, DHCP snooping, and SSH configuration. Apply security best practices to network devices.',
        pdfPath: '/content/curriculum/level1/networking-fundamentals/labs/week14/assignment.pdf'
      },
    ]
  },
  'windows-desktop-support': {
    totalWeeks: 14,
    color: '#9b59b6',
    weeks: [
      { 
        week: 1, 
        topic: 'Windows Installation & Setup', 
        slug: 'week01',
        description: 'Perform a clean Windows installation and configure initial system settings. Learn about different Windows editions and installation methods.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week01/assignment.pdf'
      },
      { 
        week: 2, 
        topic: 'User Account Management', 
        slug: 'week02',
        description: 'Create and manage local and domain user accounts. Configure user permissions, groups, and account policies for secure access control.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week02/assignment.pdf'
      },
      { 
        week: 3, 
        topic: 'File System & Permissions', 
        slug: 'week03',
        description: 'Understand NTFS permissions and file system structure. Practice configuring share and NTFS permissions for secure file access.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week03/assignment.pdf'
      },
      { 
        week: 4, 
        topic: 'Disk Management & Storage', 
        slug: 'week04',
        description: 'Manage disks, partitions, and volumes using Disk Management. Create and configure basic and dynamic disks, and implement RAID configurations.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week04/assignment.pdf'
      },
      { 
        week: 5, 
        topic: 'Windows Registry & Group Policy', 
        slug: 'week05',
        description: 'Navigate the Windows Registry and implement Group Policy Objects (GPOs). Configure system settings and apply policies across domains.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week05/assignment.pdf'
      },
      { 
        week: 6, 
        topic: 'Network Configuration & Sharing', 
        slug: 'week06',
        description: 'Configure TCP/IP settings, network sharing, and HomeGroup/WorkGroup settings. Set up network printers and shared resources.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week06/assignment.pdf'
      },
      { 
        week: 7, 
        topic: 'Windows Update & Patch Management', 
        slug: 'week07',
        description: 'Configure Windows Update settings and manage system patches. Implement WSUS for enterprise patch management and update scheduling.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week07/assignment.pdf'
      },
      { 
        week: 8, 
        topic: 'Device Drivers & Hardware', 
        slug: 'week08',
        description: 'Install, update, and troubleshoot device drivers. Use Device Manager to diagnose hardware issues and configure device properties.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week08/assignment.pdf'
      },
      { 
        week: 9, 
        topic: 'Performance Monitoring & Optimization', 
        slug: 'week09',
        description: 'Use Performance Monitor, Task Manager, and Resource Monitor to analyze system performance. Identify and resolve performance bottlenecks.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week09/assignment.pdf'
      },
      { 
        week: 10, 
        topic: 'Backup & Recovery', 
        slug: 'week10',
        description: 'Implement backup strategies using Windows Backup and third-party tools. Practice system restore, file recovery, and disaster recovery procedures.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week10/assignment.pdf'
      },
      { 
        week: 11, 
        topic: 'Windows Security Features', 
        slug: 'week11',
        description: 'Configure Windows Defender, Windows Firewall, and BitLocker encryption. Implement security policies and user access controls.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week11/assignment.pdf'
      },
      { 
        week: 12, 
        topic: 'PowerShell Basics', 
        slug: 'week12',
        description: 'Learn PowerShell cmdlets, scripting basics, and automation techniques. Create scripts for system administration tasks and bulk operations.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week12/assignment.pdf'
      },
      { 
        week: 13, 
        topic: 'Remote Desktop & Administration', 
        slug: 'week13',
        description: 'Configure Remote Desktop Protocol (RDP) and remote management tools. Practice remote troubleshooting and administration techniques.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week13/assignment.pdf'
      },
      { 
        week: 14, 
        topic: 'Troubleshooting Methodologies', 
        slug: 'week14',
        description: 'Apply systematic troubleshooting approaches to Windows issues. Use diagnostic tools and event logs to identify and resolve common problems.',
        pdfPath: '/content/curriculum/level1/windows-desktop-support/labs/week14/assignment.pdf'
      },
    ]
  },
  'linux-essentials': {
    totalWeeks: 14,
    color: '#e74c3c',
    weeks: [
      { 
        week: 1, 
        topic: 'Linux Installation & Boot Process', 
        slug: 'week01',
        description: 'Install a Linux distribution and understand the boot sequence. Learn about GRUB bootloader, init systems, and runlevels.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week01/assignment.pdf'
      },
      { 
        week: 2, 
        topic: 'File System Hierarchy & Navigation', 
        slug: 'week02',
        description: 'Navigate the Linux file system hierarchy and understand directory structure. Practice using commands like cd, ls, pwd, and tree.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week02/assignment.pdf'
      },
      { 
        week: 3, 
        topic: 'User & Group Management', 
        slug: 'week03',
        description: 'Create and manage user accounts and groups. Configure user permissions, sudo access, and password policies.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week03/assignment.pdf'
      },
      { 
        week: 4, 
        topic: 'File Permissions & Ownership', 
        slug: 'week04',
        description: 'Master Linux file permissions using chmod, chown, and chgrp. Understand octal notation and symbolic permission modes.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week04/assignment.pdf'
      },
      { 
        week: 5, 
        topic: 'Text Editors (vi/vim, nano)', 
        slug: 'week05',
        description: 'Learn to edit files using vi/vim and nano editors. Practice basic editing, searching, and saving in both editors.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week05/assignment.pdf'
      },
      { 
        week: 6, 
        topic: 'Package Management (apt, yum)', 
        slug: 'week06',
        description: 'Install, update, and remove software packages using apt (Debian/Ubuntu) and yum/dnf (RHEL/CentOS). Manage package repositories.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week06/assignment.pdf'
      },
      { 
        week: 7, 
        topic: 'Process Management & Services', 
        slug: 'week07',
        description: 'Manage running processes using ps, top, kill, and nice. Start, stop, and enable system services with systemctl.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week07/assignment.pdf'
      },
      { 
        week: 8, 
        topic: 'Shell Scripting Basics', 
        slug: 'week08',
        description: 'Write bash scripts using variables, conditionals, and loops. Create automated tasks and understand script execution permissions.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week08/assignment.pdf'
      },
      { 
        week: 9, 
        topic: 'Network Configuration & Tools', 
        slug: 'week09',
        description: 'Configure network interfaces and troubleshoot connectivity. Use tools like ip, ifconfig, ping, traceroute, and netstat.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week09/assignment.pdf'
      },
      { 
        week: 10, 
        topic: 'System Logging & Monitoring', 
        slug: 'week10',
        description: 'Examine system logs using journalctl and traditional log files in /var/log. Monitor system resources and set up log rotation.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week10/assignment.pdf'
      },
      { 
        week: 11, 
        topic: 'Cron Jobs & Task Scheduling', 
        slug: 'week11',
        description: 'Schedule automated tasks using cron and anacron. Create and manage crontab entries for recurring jobs.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week11/assignment.pdf'
      },
      { 
        week: 12, 
        topic: 'SSH & Remote Access', 
        slug: 'week12',
        description: 'Configure SSH for secure remote access. Set up SSH keys, customize SSH configuration, and use SCP/SFTP for file transfers.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week12/assignment.pdf'
      },
      { 
        week: 13, 
        topic: 'Firewall & Security (iptables)', 
        slug: 'week13',
        description: 'Configure firewall rules using iptables and firewalld. Implement basic security measures and access controls.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week13/assignment.pdf'
      },
      { 
        week: 14, 
        topic: 'Backup Strategies & Disaster Recovery', 
        slug: 'week14',
        description: 'Implement backup solutions using tar, rsync, and dd. Create disaster recovery plans and practice system restoration.',
        pdfPath: '/content/curriculum/level1/linux-essentials/labs/week14/assignment.pdf'
      },
    ]
  },
  'communications-I': {
    totalWeeks: 15,
    color: '#3498db',
    weeks: [
      { 
        week: 1, 
        topic: 'Introduction to Technical Communication', 
        slug: 'week01',
        description: 'Learn the fundamentals of technical communication and explore how clear, effective writing is essential in technology fields. This assignment introduces key concepts and best practices.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week01/assignment.pdf'
      },
      { 
        week: 2, 
        topic: 'Audience Analysis', 
        slug: 'week02',
        description: 'Develop skills in analyzing your target audience to tailor communication effectively. Understand how different audiences require different approaches and terminology.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week02/assignment.pdf'
      },
      { 
        week: 3, 
        topic: 'Technical Writing Fundamentals', 
        slug: 'week03',
        description: 'Master the core principles of technical writing including clarity, conciseness, and accuracy. Practice writing clear instructions and technical descriptions.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week03/assignment.pdf'
      },
      { 
        week: 4, 
        topic: 'Document Design & Formatting', 
        slug: 'week04',
        description: 'Learn professional document design principles and formatting techniques. Create visually appealing, well-organized technical documents that enhance readability.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week04/assignment.pdf'
      },
      { 
        week: 5, 
        topic: 'Email & Business Correspondence', 
        slug: 'week05',
        description: 'Develop professional email writing skills and learn proper business correspondence etiquette. Practice crafting clear, concise professional messages.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week05/assignment.pdf'
      },
      { 
        week: 6, 
        topic: 'Technical Reports & Proposals', 
        slug: 'week06',
        description: 'Create comprehensive technical reports and proposals. Learn how to structure complex information and present recommendations effectively.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week06/assignment.pdf'
      },
      { 
        week: 7, 
        topic: 'Research & Citations', 
        slug: 'week07',
        description: 'Master research methodologies and proper citation practices. Learn to find credible sources and integrate them into your technical writing.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week07/assignment.pdf'
      },
      { 
        week: 8, 
        topic: 'Presentations & Public Speaking', 
        slug: 'week08',
        description: 'Develop presentation skills and overcome public speaking anxiety. Create engaging technical presentations that inform and persuade.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week08/assignment.pdf'
      },
      { 
        week: 9, 
        topic: 'Visual Communication & Graphics', 
        slug: 'week09',
        description: 'Learn to create effective charts, diagrams, and infographics. Understand when and how to use visual elements to enhance technical communication.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week09/assignment.pdf'
      },
      { 
        week: 10, 
        topic: 'Instructions & Procedures', 
        slug: 'week10',
        description: 'Write clear, step-by-step instructions and standard operating procedures. Practice creating user-friendly documentation that prevents errors.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week10/assignment.pdf'
      },
      { 
        week: 11, 
        topic: 'Collaborative Writing', 
        slug: 'week11',
        description: 'Work effectively in team writing projects. Learn collaboration tools, version control, and techniques for coordinating multi-author documents.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week11/assignment.pdf'
      },
      { 
        week: 12, 
        topic: 'Revision & Editing Strategies', 
        slug: 'week12',
        description: 'Master self-editing and peer review processes. Learn systematic approaches to revising technical documents for clarity and accuracy.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week12/assignment.pdf'
      },
      { 
        week: 13, 
        topic: 'Prompt Engineering & AI Tools', 
        slug: 'week13',
        description: 'Explore AI-assisted writing tools and prompt engineering techniques. Learn ethical use of AI in technical communication.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week13/assignment.pdf'
      },
      { 
        week: 14, 
        topic: 'Professional Portfolio Development', 
        slug: 'week14',
        description: 'Build a professional portfolio showcasing your technical writing samples. Learn to present your communication skills to potential employers.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week14/assignment.pdf'
      },
      { 
        week: 15, 
        topic: 'Final Presentation & Review', 
        slug: 'week15',
        description: 'Deliver a comprehensive final presentation that demonstrates your technical communication skills. Reflect on your growth throughout the course.',
        pdfPath: '/content/curriculum/level1/communications-I/labs/week15/assignment.pdf'
      },
    ]
  },
  'numeracy-logic': {
    totalWeeks: 14,
    color: '#f39c12',
    weeks: [
      { 
        week: 1, 
        topic: 'Number Systems & Conversions', 
        slug: 'week01',
        description: 'Master conversions between decimal, binary, octal, and hexadecimal number systems. Practice arithmetic operations in different bases.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week01/assignment.pdf'
      },
      { 
        week: 2, 
        topic: 'Binary & Hexadecimal Math', 
        slug: 'week02',
        description: 'Perform mathematical operations in binary and hexadecimal. Learn signed number representations and two\'s complement notation.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week02/assignment.pdf'
      },
      { 
        week: 3, 
        topic: 'Boolean Algebra Fundamentals', 
        slug: 'week03',
        description: 'Study Boolean algebra laws, theorems, and expressions. Practice simplifying Boolean expressions using algebraic manipulation.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week03/assignment.pdf'
      },
      { 
        week: 4, 
        topic: 'Logic Gates & Truth Tables', 
        slug: 'week04',
        description: 'Analyze basic and universal logic gates (AND, OR, NOT, NAND, NOR, XOR). Create truth tables for complex gate combinations.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week04/assignment.pdf'
      },
      { 
        week: 5, 
        topic: 'Karnaugh Maps & Simplification', 
        slug: 'week05',
        description: 'Use Karnaugh maps (K-maps) to simplify Boolean expressions. Practice grouping and minimizing logic circuits.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week05/assignment.pdf'
      },
      { 
        week: 6, 
        topic: 'Combinational Circuits', 
        slug: 'week06',
        description: 'Design and analyze combinational logic circuits including adders, subtractors, multiplexers, and decoders.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week06/assignment.pdf'
      },
      { 
        week: 7, 
        topic: 'Sequential Circuits & Flip-Flops', 
        slug: 'week07',
        description: 'Understand sequential logic and memory elements. Study SR, D, JK, and T flip-flops and their characteristic tables.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week07/assignment.pdf'
      },
      { 
        week: 8, 
        topic: 'Counters & Registers', 
        slug: 'week08',
        description: 'Design synchronous and asynchronous counters. Build shift registers and understand their applications in digital systems.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week08/assignment.pdf'
      },
      { 
        week: 9, 
        topic: 'Algebra & Linear Equations', 
        slug: 'week09',
        description: 'Solve linear equations and systems of equations. Apply algebraic methods to technical problem-solving scenarios.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week09/assignment.pdf'
      },
      { 
        week: 10, 
        topic: 'Statistics & Probability', 
        slug: 'week10',
        description: 'Calculate statistical measures including mean, median, mode, and standard deviation. Apply probability concepts to technical scenarios.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week10/assignment.pdf'
      },
      { 
        week: 11, 
        topic: 'Data Analysis & Interpretation', 
        slug: 'week11',
        description: 'Analyze datasets and create meaningful visualizations. Interpret statistical results and identify trends in technical data.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week11/assignment.pdf'
      },
      { 
        week: 12, 
        topic: 'Graph Theory Basics', 
        slug: 'week12',
        description: 'Study graph theory fundamentals including vertices, edges, and paths. Apply graph concepts to network topology analysis.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week12/assignment.pdf'
      },
      { 
        week: 13, 
        topic: 'Algorithm Complexity', 
        slug: 'week13',
        description: 'Understand Big O notation and algorithm efficiency. Analyze time and space complexity of common algorithms.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week13/assignment.pdf'
      },
      { 
        week: 14, 
        topic: 'Problem Solving Strategies', 
        slug: 'week14',
        description: 'Apply systematic problem-solving approaches to technical challenges. Practice decomposition, pattern recognition, and algorithm design.',
        pdfPath: '/content/curriculum/level1/numeracy-logic/labs/week14/assignment.pdf'
      },
    ]
  },
  'achieving-success': {
    totalWeeks: 14,
    color: '#1abc9c',
    weeks: [
      { 
        week: 1, 
        topic: 'Academic Success Strategies', 
        slug: 'week01',
        description: 'Develop effective study habits and learning strategies for academic success. Set personal goals and create action plans for achievement.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week01/assignment.pdf'
      },
      { 
        week: 2, 
        topic: 'Time Management & Organization', 
        slug: 'week02',
        description: 'Master time management techniques and organizational tools. Create schedules, prioritize tasks, and maintain work-life balance.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week02/assignment.pdf'
      },
      { 
        week: 3, 
        topic: 'Goal Setting & Planning', 
        slug: 'week03',
        description: 'Learn SMART goal-setting methodology. Create short-term and long-term career and academic goals with actionable steps.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week03/assignment.pdf'
      },
      { 
        week: 4, 
        topic: 'Study Techniques & Note-Taking', 
        slug: 'week04',
        description: 'Explore various note-taking methods (Cornell, mind mapping, outline). Practice active reading and information retention techniques.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week04/assignment.pdf'
      },
      { 
        week: 5, 
        topic: 'Test Preparation & Exam Strategies', 
        slug: 'week05',
        description: 'Develop effective test preparation strategies and exam-taking techniques. Manage test anxiety and maximize performance.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week05/assignment.pdf'
      },
      { 
        week: 6, 
        topic: 'Critical Thinking Skills', 
        slug: 'week06',
        description: 'Enhance critical thinking and analytical skills. Practice evaluating information, identifying biases, and making informed decisions.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week06/assignment.pdf'
      },
      { 
        week: 7, 
        topic: 'Communication & Teamwork', 
        slug: 'week07',
        description: 'Develop effective communication and collaboration skills. Practice active listening, giving feedback, and working in diverse teams.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week07/assignment.pdf'
      },
      { 
        week: 8, 
        topic: 'Stress Management & Wellness', 
        slug: 'week08',
        description: 'Learn stress management techniques and wellness practices. Develop healthy coping mechanisms and self-care routines.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week08/assignment.pdf'
      },
      { 
        week: 9, 
        topic: 'Financial Literacy Basics', 
        slug: 'week09',
        description: 'Understand personal finance fundamentals including budgeting, saving, and credit. Make informed financial decisions.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week09/assignment.pdf'
      },
      { 
        week: 10, 
        topic: 'Career Exploration & Planning', 
        slug: 'week10',
        description: 'Explore career paths in technology and related fields. Conduct self-assessment and create a career development plan.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week10/assignment.pdf'
      },
      { 
        week: 11, 
        topic: 'Resume & Cover Letter Writing', 
        slug: 'week11',
        description: 'Craft professional resumes and compelling cover letters. Tailor application materials to specific job opportunities.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week11/assignment.pdf'
      },
      { 
        week: 12, 
        topic: 'Interview Skills & Networking', 
        slug: 'week12',
        description: 'Prepare for job interviews and develop networking strategies. Practice answering common interview questions professionally.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week12/assignment.pdf'
      },
      { 
        week: 13, 
        topic: 'Professional Development', 
        slug: 'week13',
        description: 'Build a professional online presence and personal brand. Develop continuous learning habits and stay current in your field.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week13/assignment.pdf'
      },
      { 
        week: 14, 
        topic: 'Transition to Workplace', 
        slug: 'week14',
        description: 'Prepare for workplace culture and professional expectations. Understand workplace ethics, professionalism, and career advancement.',
        pdfPath: '/content/curriculum/level1/achieving-success/labs/week14/assignment.pdf'
      },
    ]
  },
};

export const ModuleContentPage = () => {
  const classes = useStyles();
  const { levelId, courseSlug, moduleId, submoduleId } = useParams();
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  // UI animation flags (controls animated entrance)
  const [showGrid, setShowGrid] = useState(false);
  const [showMarkdown, setShowMarkdown] = useState(false);
  // Assignment dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  // Respect user preference for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Find the course and module data
  const level = curriculumData.curriculum.levels.find(
    (l) => l.id === levelId
  );
  const course = level?.courses.find((c) => c.slug === courseSlug);
  const module = course?.modules.find((m) => m.id === moduleId);
  const submodule = submoduleId
    ? module?.submodules?.find((sm) => sm.id === submoduleId)
    : null;

  // Determine the content path
  const contentPath = submodule ? submodule.path : module?.path;

  useEffect(() => {
    // Load the README.md content for this module
    if (contentPath) {
      setLoading(true);
      // Use process.env.PUBLIC_URL to get the correct base path
      const readmePath = `${process.env.PUBLIC_URL}/content/curriculum/${contentPath}/README.md`;
      
      fetch(readmePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`README not found: ${response.status}`);
          }
          return response.text();
        })
        .then(content => {
          
          // Verify we didn't get HTML
          if (content.trim().startsWith('<!DOCTYPE') || content.trim().startsWith('<html')) {
            throw new Error('Received HTML instead of markdown');
          }
          setMarkdownContent(content);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading README:', error);
          setMarkdownContent(`# ${module?.name}\n\nContent for this module is being developed.\n\nPath: ${contentPath}`);
          setLoading(false);
        });
    }
  }, [contentPath, module]);

  // Animate grid on module/page change
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowGrid(true);
      return;
    }
    setShowGrid(false);
    const t = setTimeout(() => setShowGrid(true), 120);
    return () => clearTimeout(t);
  }, [courseSlug, moduleId, prefersReducedMotion]);

  // Show markdown content when it's loaded and the weekly grid is not visible
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowMarkdown(!loading && !(moduleId === 'labs' && weeklyLabsData[courseSlug]));
      return;
    }
    if (!loading && !(moduleId === 'labs' && weeklyLabsData[courseSlug])) {
      const t = setTimeout(() => setShowMarkdown(true), 80);
      return () => clearTimeout(t);
    }
    setShowMarkdown(false);
  }, [loading, moduleId, courseSlug, prefersReducedMotion]);

  // Handler to open assignment dialog
  const handleOpenAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setDialogOpen(true);
  };

  // Handler to close assignment dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAssignment(null);
  };

  // Handler to navigate to contact with assignment request
  const handleRequestAssignment = () => {
    handleCloseDialog();
    // Scroll to contact section or navigate to contact page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on same page, navigate to home with contact hash
      window.location.href = '/#contact';
    }
  };

  // Handler to navigate to contact for notes access
  const handleRequestNotes = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  if (!course || !level || !module) {
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" style={{ marginTop: '5rem' }}>
            Module not found
          </Typography>
          <Box textAlign="center" mt={3}>
            <Button
              component={Link}
              to="/curriculum"
              startIcon={<ArrowBackIcon />}
              variant="contained"
              color="primary"
            >
              Back to Curriculum
            </Button>
          </Box>
        </Container>
      </div>
    );
  }

  const displayTitle = submodule ? `${module.name} - ${submodule.name}` : module.name;
  const displayDescription = submodule ? `${module.description}` : module.description;

  return (
    <div className={classes.root}>
      <div className={classes.logoWrapper}>
        <LogoLink />
      </div>
      <div className={classes.controlsWrapper}>
        <ThemeToggle />
        <Hidden smDown>
          <SocialIcons />
        </Hidden>
        <Hidden mdUp>
          <SpeedDials />
        </Hidden>
      </div>
      <div className={classes.navWrapper}>
        <TopNavbar />
      </div>

      <div className={classes.content}>
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            className={classes.breadcrumbs}
          >
            <Link to="/curriculum" style={{ textDecoration: 'none' }}>
              <Typography color="primary">Curriculum</Typography>
            </Link>
            <Link to="/curriculum" style={{ textDecoration: 'none' }}>
              <Typography color="primary">{level.name}</Typography>
            </Link>
            <Link
              to={`/curriculum/${levelId}/${courseSlug}`}
              style={{ textDecoration: 'none' }}
            >
              <Typography color="primary">{course.name}</Typography>
            </Link>
            {submodule ? (
              <>
                <Typography color="textPrimary">{module.name}</Typography>
                <Typography color="textPrimary">{submodule.name}</Typography>
              </>
            ) : (
              <Typography color="textPrimary">{module.name}</Typography>
            )}
          </Breadcrumbs>

          {/* Module Header */}
          <Paper className={classes.moduleHeader} elevation={0}>
            <Box display="flex" alignItems="center" mb={2}>
              <FolderOpenIcon style={{ fontSize: '3rem', marginRight: '1rem' }} />
              <Box>
                <Typography variant="h3" className={classes.moduleTitle}>
                  {displayTitle}
                </Typography>
                <Chip
                  label={course.name}
                  size="small"
                  color="primary"
                  style={{ marginRight: 8 }}
                />
                <Chip
                  label={module.name}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
            <Typography variant="body1" className={classes.moduleDescription}>
              {displayDescription}
            </Typography>

            {/* Path Info */}
            <Box className={classes.pathInfo}>
              <Typography variant="caption" display="block" gutterBottom>
                <strong>Content Path:</strong>
              </Typography>
              <Typography variant="body2">
                content/curriculum/{contentPath}/
              </Typography>
            </Box>
          </Paper>

          {/* Back Button */}
          <Box mb={3}>
            <Button
              component={Link}
              to={`/curriculum/${levelId}/${courseSlug}`}
              startIcon={<ArrowBackIcon />}
              color="primary"
            >
              Back to Course
            </Button>
          </Box>

          {/* Weekly Labs Grid - Only show for labs module */}
          {moduleId === 'labs' && weeklyLabsData[courseSlug] && (
            <Box className={classes.weeklyLabsSection}>
              <Fade in={showGrid} timeout={350}>
                <Paper 
                  elevation={0}
                  style={{ 
                    padding: '24px',
                    marginBottom: '32px',
                    background: `linear-gradient(135deg, ${weeklyLabsData[courseSlug].color}15 0%, ${weeklyLabsData[courseSlug].color}05 100%)`,
                    border: `1px solid ${weeklyLabsData[courseSlug].color}40`
                  }}
                >
                  <Typography variant="h4" gutterBottom style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700 }}>
                    <AssignmentIcon style={{ fontSize: '2.5rem', color: weeklyLabsData[courseSlug].color }} />
                    {courseSlug === 'communications-I' ? 'Weekly Assignments' : 'Weekly Lab Exercises'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph style={{ marginLeft: '44px' }}>
                    {weeklyLabsData[courseSlug].totalWeeks} {courseSlug === 'communications-I' ? 'writing and communication assignments' : 'hands-on laboratory exercises'} covering all course topics. 
                    Each {courseSlug === 'communications-I' ? 'assignment' : 'lab'} includes objectives, tasks, and deliverables designed to build practical skills.
                  </Typography>
                </Paper>
              </Fade>

              <Grid container spacing={3} style={{ marginBottom: '48px' }}>
                {weeklyLabsData[courseSlug].weeks.map((weekLab, idx) => (
                  <Grow in={showGrid} style={{ transformOrigin: '0 0 0', transitionDelay: `${idx * 80}ms` }} timeout={300} key={weekLab.week}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Card 
                        className={classes.weeklyLabCard}
                        style={{ borderLeftColor: weeklyLabsData[courseSlug].color }}
                        elevation={2}
                      >
                        <CardContent>
                          <Typography className={classes.weekNumber}>
                            Week {weekLab.week}
                          </Typography>
                          <Typography className={classes.labTopic}>
                            {weekLab.topic}
                          </Typography>
                          <Chip 
                            label={courseSlug === 'communications-I' ? 'Assignment' : 'Lab Exercise'}
                            size="small"
                            style={{ 
                              marginTop: '8px',
                              backgroundColor: `${weeklyLabsData[courseSlug].color}20`,
                              color: weeklyLabsData[courseSlug].color,
                              fontWeight: 600
                            }}
                          />
                        </CardContent>
                        <CardActions>
                          <Button 
                            size="small" 
                            style={{ color: weeklyLabsData[courseSlug].color }}
                            onClick={() => handleOpenAssignment(weekLab)}
                          >
                            {courseSlug === 'communications-I' ? 'View Assignment' : 'View Labs'}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grow>
                ))}
              </Grid>
            </Box>
          )}

          {/* Content Section - Only show if NOT displaying weekly labs grid */}
          {!(moduleId === 'labs' && weeklyLabsData[courseSlug]) && (
          <Box className={classes.contentSection} style={{ position: 'relative' }}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress />
              </Box>
            ) : (
              <Fade in={showMarkdown} timeout={300}>
                <Box style={{ position: 'relative' }}>
                  <Paper 
                    elevation={3} 
                    className={(moduleId === 'notes' || moduleId === 'reflections' || moduleId === 'study-plans' || moduleId === 'videos') ? classes.blurredContent : ''}
                    style={{ 
                      padding: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'inherit'
                    }}
                  >
                    <div style={{ color: 'inherit' }}>
                    <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <Typography variant="h3" gutterBottom style={{color: 'inherit'}} {...props} />,
                      h2: ({node, ...props}) => <Typography variant="h4" gutterBottom style={{marginTop: '24px', color: 'inherit'}} {...props} />,
                      h3: ({node, ...props}) => <Typography variant="h5" gutterBottom style={{marginTop: '20px', color: 'inherit'}} {...props} />,
                      h4: ({node, ...props}) => <Typography variant="h6" gutterBottom style={{marginTop: '16px', color: 'inherit'}} {...props} />,
                      p: ({node, ...props}) => <Typography variant="body1" paragraph style={{color: 'inherit', opacity: 0.9}} {...props} />,
                      li: ({node, ...props}) => <Typography variant="body1" component="li" style={{color: 'inherit', opacity: 0.9}} {...props} />,
                      ul: ({node, ...props}) => <ul style={{marginLeft: '24px', marginBottom: '16px'}} {...props} />,
                      ol: ({node, ...props}) => <ol style={{marginLeft: '24px', marginBottom: '16px'}} {...props} />,
                      code: ({node, inline, ...props}) => (
                        inline 
                          ? <code style={{backgroundColor: 'rgba(0, 188, 212, 0.15)', color: '#00e5ff', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace'}} {...props} />
                          : <pre style={{backgroundColor: 'rgba(0, 188, 212, 0.1)', padding: '16px', borderRadius: '4px', overflow: 'auto', fontFamily: 'monospace', border: '1px solid rgba(0, 188, 212, 0.3)'}}><code style={{color: 'inherit'}} {...props} /></pre>
                      ),
                      blockquote: ({node, ...props}) => (
                        <Paper 
                          elevation={0} 
                          style={{
                            borderLeft: '4px solid #00bcd4',
                            padding: '8px 16px',
                            margin: '16px 0',
                            backgroundColor: 'rgba(0, 188, 212, 0.1)'
                          }}
                        >
                          <Typography variant="body1" style={{color: 'inherit', opacity: 0.9}} {...props} />
                        </Paper>
                      ),
                      table: ({node, ...props}) => (
                        <Box style={{overflowX: 'auto', margin: '16px 0'}}>
                          <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(255, 255, 255, 0.12)'}} {...props} />
                        </Box>
                      ),
                      th: ({node, ...props}) => (
                        <th style={{border: '1px solid rgba(255, 255, 255, 0.12)', padding: '12px', backgroundColor: 'rgba(0, 188, 212, 0.15)', textAlign: 'left', color: 'inherit', fontWeight: 600}} {...props} />
                      ),
                      td: ({node, ...props}) => (
                        <td style={{border: '1px solid rgba(255, 255, 255, 0.12)', padding: '12px', color: 'inherit', opacity: 0.9}} {...props} />
                      ),
                      strong: ({node, ...props}) => <strong style={{color: 'inherit', fontWeight: 600}} {...props} />,
                      em: ({node, ...props}) => <em style={{color: 'inherit'}} {...props} />,
                      hr: ({node, ...props}) => <hr style={{border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.12)', margin: '24px 0'}} {...props} />,
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </div>
                </Paper>

                {/* Blur Overlay for Notes Module */}
                {moduleId === 'notes' && (
                  <Box className={classes.contentOverlay}>
                    <Box className={classes.overlayContent}>
                      <LockIcon className={classes.lockIcon} />
                      <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
                        Complete Course Notes Available
                      </Typography>
                      <Typography variant="body1" paragraph style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
                        Access my comprehensive course notes, study guides, and reference materials. These notes represent hours of learning, research, and practical application. Contact me to request access to the full documentation.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        onClick={handleRequestNotes}
                        style={{ padding: '12px 32px', fontSize: '1.1rem' }}
                      >
                        Request Access to Notes
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Blur Overlay for Reflections Module */}
                {moduleId === 'reflections' && (
                  <Box className={classes.contentOverlay}>
                    <Box className={classes.overlayContent}>
                      <LockIcon className={classes.lockIcon} />
                      <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
                        Personal Learning Reflections
                      </Typography>
                      <Typography variant="body1" paragraph style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
                        Explore my personal insights, challenges overcome, and growth throughout this course. These reflections document my learning journey, breakthrough moments, and professional development. Contact me to read the complete reflections.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        onClick={handleRequestNotes}
                        style={{ padding: '12px 32px', fontSize: '1.1rem' }}
                      >
                        Request Access to Reflections
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Blur Overlay for Study Plans Module */}
                {moduleId === 'study-plans' && (
                  <Box className={classes.contentOverlay}>
                    <Box className={classes.overlayContent}>
                      <LockIcon className={classes.lockIcon} />
                      <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
                        Structured Study Plans
                      </Typography>
                      <Typography variant="body1" paragraph style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
                        Access my detailed study schedules, learning strategies, and time management plans. These study plans show how I organize my learning, set goals, and track progress throughout the program. Contact me to view the complete study planning materials.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        onClick={handleRequestNotes}
                        style={{ padding: '12px 32px', fontSize: '1.1rem' }}
                      >
                        Request Access to Study Plans
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Blur Overlay for Videos Module */}
                {moduleId === 'videos' && (
                  <Box className={classes.contentOverlay}>
                    <Box className={classes.overlayContent}>
                      <LockIcon className={classes.lockIcon} />
                      <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
                        Course Videos & Demonstrations
                      </Typography>
                      <Typography variant="body1" paragraph style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
                        Watch my recorded demonstrations, walkthroughs, and explanations of key concepts. These videos showcase practical implementations, problem-solving approaches, and hands-on technical skills. Contact me to access the video library.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        onClick={handleRequestNotes}
                        style={{ padding: '12px 32px', fontSize: '1.1rem' }}
                      >
                        Request Access to Videos
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
              </Fade>
            )}
          </Box>
          )}

          {/* Assignment / Lab Preview Dialog (opened when user clicks a weekly card) */}
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="assignment-dialog-title"
            className={classes.assignmentDialog}
          >
            <DialogTitle disableTypography className={classes.dialogHeader} id="assignment-dialog-title">
              <Typography variant="h6">{selectedAssignment ? `${courseSlug === 'communications-I' ? 'Assignment' : 'Lab'} — Week ${selectedAssignment.week}: ${selectedAssignment.topic}` : 'Preview'}</Typography>
              <IconButton aria-label="close" onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              {selectedAssignment && selectedAssignment.description && (
                <Typography variant="body1" paragraph>
                  {selectedAssignment.description}
                </Typography>
              )}

              {/* PDF preview container: show blurred iframe when pdf exists, otherwise a placeholder */}
              <div className={classes.pdfPreviewContainer}>
                {selectedAssignment && selectedAssignment.pdfPath ? (
                  <>
                    <iframe
                      title="assignment-preview"
                      src={`${process.env.PUBLIC_URL}${selectedAssignment.pdfPath}`}
                      className={classes.pdfPreview}
                    />
                    <div className={classes.pdfOverlay}>
                      <LockIcon className={classes.lockIcon} />
                      <Typography variant="h6" style={{ color: '#fff', textAlign: 'center', maxWidth: 600 }}>
                        Preview available. To download the full {courseSlug === 'communications-I' ? 'assignment' : 'lab'}, request it via the contact section.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleRequestAssignment}>
                          View {courseSlug === 'communications-I' ? 'Assignment' : 'Lab'}
                        </Button>
                      </Box>
                    </div>
                  </>
                ) : (
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ padding: '48px' }}>
                    <LockIcon style={{ fontSize: 48, marginBottom: 16 }} />
                    <Typography variant="body1" paragraph>
                      A preview for this {courseSlug === 'communications-I' ? 'assignment' : 'lab'} is not available.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleRequestAssignment}>
                      Request {courseSlug === 'communications-I' ? 'Assignment' : 'Lab'}
                    </Button>
                  </Box>
                )}
              </div>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseDialog} color="default">
                Close
              </Button>
              <Button onClick={handleRequestAssignment} color="primary" variant="contained">
                {courseSlug === 'communications-I' ? 'Request Assignment' : 'Request Lab'}
              </Button>
            </DialogActions>
          </Dialog>

        </Container>
      </div>
    </div>
  );
};

export default ModuleContentPage;
