import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    border: `1px solid transparent`,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.type === 'dark' 
        ? 'rgba(0, 191, 191, 0.1)' 
        : 'rgba(0, 191, 191, 0.05)',
      border: `1px solid ${theme.palette.primary.main}40`,
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
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'about', label: 'About', ref: aboutRef },
    { id: 'blog', label: 'Blog', ref: blogRef },
    { id: 'labs', label: 'Labs', ref: labsRef },
    { id: 'curriculum', label: 'Curriculum', ref: curriculumRef },
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
      details: `
**Project Overview:**
Design and document a complete small office network infrastructure that meets modern business requirements while maintaining security, scalability, and cost-effectiveness.

**Key Deliverables:**

1. **Network Topology Diagram**
   - Physical and logical network layouts
   - Device placement and interconnections
   - Cable runs and infrastructure planning
   - Redundancy and failover paths
   - Network segmentation (VLANs)

2. **IP Addressing Plan with Subnetting**
   - IPv4 addressing scheme using VLSM
   - Subnet calculations for different departments
   - IP allocation tables and documentation
   - DHCP scope planning
   - Reserved addresses for critical infrastructure
   - Future expansion considerations

3. **Security Policies and Implementation**
   - Firewall rules and ACLs
   - Network segmentation strategy
   - DMZ configuration for public-facing services
   - VPN implementation for remote access
   - Wireless security (WPA3, authentication)
   - Physical security measures
   - Password policies and user authentication
   - Intrusion detection/prevention strategies

4. **Hardware/Software Specifications**
   - Router and switch requirements
   - Server specifications (file, print, DHCP, DNS)
   - Workstation requirements
   - Network attached storage (NAS)
   - Wireless access points
   - Firewall/security appliances
   - Backup solutions
   - Software licensing requirements

5. **Implementation Guide**
   - Step-by-step deployment procedures
   - Configuration templates
   - Testing and validation procedures
   - Rollback procedures
   - Timeline and milestones
   - Resource allocation

6. **Cost Analysis**
   - Hardware costs breakdown
   - Software licensing costs
   - Installation and labor costs
   - Ongoing maintenance costs
   - 3-year TCO (Total Cost of Ownership)
   - ROI analysis

7. **Final Presentation**
   - Executive summary for stakeholders
   - Technical documentation
   - Network diagrams and schematics
   - Implementation timeline
   - Risk assessment and mitigation

**Learning Outcomes:**
- Network design principles and best practices
- IP addressing and subnetting expertise
- Security-first approach to network architecture
- Project documentation and presentation skills
- Cost-benefit analysis in IT infrastructure
`
    },
    {
      title: "Network Troubleshooting Playbook",
      course: "CST8182 - Networking Fundamentals",
      technologies: ["Wireshark", "Troubleshooting", "Network Analysis", "ICMP", "TCP/IP"],
      description: "Build a professional troubleshooting playbook documenting common network problems and their solutions. Features Wireshark packet analysis case studies, systematic OSI-layer diagnostics, and root cause analysis procedures.",
      details: `
**Project Overview:**
Create a professional network troubleshooting playbook that documents common network issues, analysis techniques, and resolution procedures using industry-standard tools.

**Key Components:**

1. **Wireshark Case Studies**
   - Packet capture and analysis techniques
   - Protocol analysis (HTTP, HTTPS, DNS, DHCP, ARP)
   - Network performance issues identification
   - Security incident investigation
   - Bandwidth utilization analysis
   - Latency and jitter troubleshooting
   - Malware traffic detection
   - Network scanning identification

   **Example Cases:**
   - DNS resolution failures
   - Duplicate IP addresses (ARP conflicts)
   - Slow network performance
   - Intermittent connectivity issues
   - Application-layer problems
   - Network congestion analysis
   - Security breach investigation

2. **Common Troubleshooting Procedures**
   - OSI model layer-by-layer approach
   - Physical layer troubleshooting (cables, ports, lights)
   - Data link layer issues (MAC addressing, switching)
   - Network layer diagnostics (IP, routing, ICMP)
   - Transport layer analysis (TCP/UDP, ports)
   - Application layer debugging
   - Wireless network troubleshooting
   - VPN connectivity issues
   - DHCP and DNS problems
   - Network printer issues

3. **Root Cause Analysis Documentation**
   - Problem identification methodology
   - Information gathering techniques
   - Hypothesis formulation
   - Testing and validation procedures
   - Elimination process
   - Root cause determination
   - Impact assessment
   - Lessons learned documentation

4. **Fix Procedures and Best Practices**
   - Step-by-step resolution guides
   - Configuration templates
   - Verification procedures
   - Documentation requirements
   - Escalation procedures
   - Preventive measures
   - Monitoring and alerting setup
   - Post-incident reviews

**Troubleshooting Tools:**
- Wireshark (packet analysis)
- ping (connectivity testing)
- traceroute/tracert (path analysis)
- nslookup/dig (DNS troubleshooting)
- ipconfig/ifconfig (interface configuration)
- netstat (connection monitoring)
- arp (address resolution)
- Network monitoring tools

**Learning Outcomes:**
- Systematic troubleshooting methodology
- Packet analysis expertise
- Network protocol understanding
- Problem-solving and critical thinking
- Technical documentation skills
- Real-world IT support experience
`
    },
    {
      title: "Windows Admin Toolkit",
      course: "CST8202 - Windows Desktop Support",
      technologies: ["PowerShell", "Automation", "Windows", "Active Directory", "BitLocker"],
      description: "Develop a PowerShell automation toolkit for Windows administrators. Includes modules for user account management, automated backup systems, and BitLocker encryption tools with comprehensive documentation and error handling.",
      details: `
**Project Overview:**
Develop a professional-grade PowerShell toolkit that automates common Windows administration tasks, improves efficiency, and ensures consistent security practices.

**Module 1: User Management Module**

**Features:**
- Create new user accounts with standardized settings
- Modify existing user properties (name, email, department)
- Delete user accounts with proper archival
- Bulk user operations from CSV files
- Password generation and complexity enforcement
- Password reset with mandatory change on next login
- Account lockout investigation and unlock
- Group membership management
- User access rights auditing
- Account expiration date management
- Disabled account reporting
- New hire onboarding automation
- Offboarding checklist execution

**Security Features:**
- Password policy enforcement
- Multi-factor authentication setup
- Privileged account management
- Audit logging of all operations
- Email notifications for account changes
- Compliance reporting

**Module 2: Backup Automation Module**

**Features:**
- Scheduled automatic backups (daily, weekly, monthly)
- Differential and incremental backup support
- File and folder selection with include/exclude filters
- Compression with configurable levels (ZIP, 7z)
- Backup verification and integrity checking
- Automated backup rotation and retention policies
- Failed backup notification and logging
- Backup restoration procedures
- Network share backup support
- Cloud storage integration (OneDrive, Azure)
- Disaster recovery planning
- Backup catalog and indexing

**Advanced Features:**
- VSS (Volume Shadow Copy) integration
- Database backup support (SQL Server)
- Application-aware backups
- Bandwidth throttling
- Encryption of backup files
- Deduplication support

**Module 3: Encryption Tools Module**

**Features:**
- File and folder encryption/decryption
- BitLocker drive encryption automation
- BitLocker recovery key management
- Encrypted file system (EFS) automation
- Certificate-based encryption
- Secure file deletion (overwrite)
- Encryption compliance reporting
- Key escrow and recovery procedures
- Removable media encryption enforcement
- Pre-boot authentication setup

**Security Standards:**
- AES-256 encryption
- FIPS compliance mode
- TPM integration
- Secure key storage
- Audit trail maintenance

**Additional Features:**

4. **Documentation and Usage Guide**
   - Comprehensive user manual
   - Administrator guide
   - PowerShell cmdlet reference
   - Configuration file examples
   - Troubleshooting guide
   - FAQ section
   - Video tutorials (optional)
   - Quick start guide

5. **GitHub Repository**
   - Well-organized code structure
   - README with installation instructions
   - Version control best practices
   - Issue tracking
   - Release management
   - Code commenting and standards
   - MIT/Apache license
   - Contributing guidelines

**Learning Outcomes:**
- PowerShell scripting expertise
- Windows administration automation
- Security best practices implementation
- Version control and collaboration
- Professional documentation skills
- Real-world enterprise IT solutions
`
    },
    {
      title: "Automation Suite",
      course: "CST8207 - GNU/Linux System Support",
      technologies: ["Bash", "Automation", "Linux", "Cron", "System Administration"],
      description: "Create a comprehensive Bash automation suite for Linux systems. Features automated backups with rotation policies, intelligent log analysis with alerting, and cron job management with monitoring and error handling.",
      details: `
**Project Overview:**
Create a comprehensive Bash-based automation suite that handles critical system administration tasks, improves reliability, and reduces manual intervention in Linux environments.

**Module 1: Backup Module**

**Core Features:**
- Automated file and directory backups
- Full, incremental, and differential backup modes
- Compression using tar, gzip, bzip2, or xz
- Local and remote backup destinations (rsync, scp, NFS)
- Backup scheduling with cron integration
- Retention policies (days, weeks, months to keep)
- Automatic cleanup of old backups
- Backup verification and integrity checking
- Failed backup notification (email, SNMP)
- Backup restoration scripts
- Database backup support (MySQL, PostgreSQL)
- Configuration backup (system files, configs)

**Advanced Features:**
- Snapshot-based backups (LVM, Btrfs)
- Encryption support (GPG, OpenSSL)
- Bandwidth throttling for network transfers
- Resume capability for interrupted transfers
- Backup rotation strategies (grandfather-father-son)
- Parallel backup processing
- Pre and post-backup hooks
- Backup catalog and inventory

**Module 2: System Logs Module**

**Log Management Features:**
- Automated log rotation based on size or time
- Compression of rotated logs
- Log retention policy enforcement
- Log archival to remote storage
- Intelligent log analysis and pattern detection
- Alert generation for critical events
- Error and warning extraction
- Log forwarding to centralized syslog
- Report generation (daily, weekly, monthly)

**Analysis Capabilities:**
- Failed login attempt detection
- Disk space warnings
- Service failure alerts
- Security event identification
- Performance anomaly detection
- Error trend analysis
- Custom regex pattern matching
- Statistical summaries

**Alert System:**
- Email notifications
- SMS alerts (via gateway)
- Slack/Teams integration
- Dashboard integration
- Severity-based escalation
- Alert throttling to prevent spam
- On-call rotation support

**Module 3: Cron Job Manager**

**Job Management:**
- Create cron jobs from templates
- Modify existing cron schedules
- Delete and disable jobs
- List all user cron jobs
- Backup crontab configurations
- Restore crontab from backups
- Job dependency management
- Parallel vs sequential execution control

**Monitoring Features:**
- Real-time job execution monitoring
- Job completion status tracking
- Execution duration logging
- Resource usage monitoring (CPU, memory)
- Failed job detection and alerting
- Stdout/stderr capture and logging
- Job retry logic for failures
- Heartbeat monitoring

**Error Handling:**
- Comprehensive error logging
- Stack trace capture
- Email alerts on failures
- Automatic retry mechanisms
- Fallback procedures
- Dead letter queue for failed jobs
- Root cause analysis data collection

**Reporting:**
- Job execution history reports
- Success/failure rate statistics
- Performance metrics and trends
- Resource utilization reports
- SLA compliance reporting
- Customizable report formats (HTML, PDF, CSV)
- Scheduled report delivery

**Additional Features:**

4. **Complete Documentation**
   - Installation and setup guide
   - Configuration reference
   - Usage examples and tutorials
   - Troubleshooting guide
   - Best practices document
   - Security considerations
   - Performance tuning tips
   - API reference (if applicable)

**System Requirements:**
- Bash 4.0 or higher
- Standard Linux utilities (tar, gzip, find, grep)
- Cron daemon
- Mail transfer agent (for notifications)
- Optional: rsync, GPG, openssh

**Learning Outcomes:**
- Advanced Bash scripting
- Linux system administration
- Automation and orchestration
- Error handling and logging
- Security best practices
- Production-ready code development
`
    },
    {
      title: "Linux Process Tracker",
      course: "CST8207 - GNU/Linux System Support",
      technologies: ["Bash", "System Monitoring", "Performance Analysis", "Linux"],
      description: "Build a real-time system monitoring dashboard for Linux. Tracks CPU, memory, disk I/O, and network performance with process-level details, performance analysis, and configurable alerting for resource thresholds.",
      details: `
**Project Overview:**
Develop a comprehensive system monitoring and process tracking tool that provides real-time insights into Linux system performance, resource utilization, and process behavior.

**Core Features:**

1. **Real-time System Resource Dashboard**
   - CPU usage per core and overall
   - Memory utilization (RAM, swap, cache)
   - Disk I/O statistics (read/write rates, IOPS)
   - Network traffic monitoring (bandwidth, packets)
   - System load averages (1, 5, 15 minutes)
   - Active user sessions
   - System uptime and boot time
   - Kernel version and system information

2. **Process Monitoring**
   - Process list with PID, user, CPU, memory
   - Process tree visualization
   - Thread count and status
   - Process state monitoring (running, sleeping, zombie)
   - Open file descriptors per process
   - Network connections by process
   - Process priority and nice values
   - Parent-child process relationships

3. **Performance Analysis**
   - CPU bottleneck identification
   - Memory leak detection
   - Disk I/O wait analysis
   - Network saturation detection
   - Top resource consumers (CPU, memory, disk, network)
   - Historical performance trends
   - Performance baselines and anomaly detection
   - Capacity planning data

4. **Advanced Monitoring**
   - Service status monitoring (systemd/init)
   - Log file monitoring and alerting
   - Process resource limits (ulimit)
   - SELinux/AppArmor status
   - Firewall status and rules
   - Container monitoring (Docker, Podman)
   - Virtual memory statistics
   - Interrupt and context switch rates

**Display Features:**
   - Color-coded output (warnings, critical)
   - Auto-refreshing dashboard (configurable interval)
   - Sortable columns
   - Process filtering and search
   - Export to CSV/JSON
   - Historical data graphing
   - Customizable views and layouts
   - Terminal-based UI (ncurses optional)

**Alerting System:**
   - Configurable threshold alerts
   - CPU usage alerts
   - Memory pressure warnings
   - Disk space alerts
   - Process crash detection
   - Service failure notifications
   - Custom metric alerting
   - Email and log-based notifications

**Data Collection:**
   - Reads from /proc filesystem
   - Parses system utilities (top, ps, vmstat, iostat)
   - Integration with system monitoring tools
   - Data sampling at configurable intervals
   - Efficient data aggregation
   - Minimal system overhead

**Reporting Features:**
   - Daily/weekly/monthly reports
   - Performance summaries
   - Resource usage trends
   - Top processes by various metrics
   - System health scorecards
   - Capacity planning reports
   - Incident history

**Use Cases:**
   - Server performance monitoring
   - Troubleshooting system issues
   - Capacity planning
   - Security incident investigation
   - Application performance tuning
   - Resource allocation optimization
   - SLA compliance monitoring

**Technical Implementation:**
   - Bash scripting with minimal dependencies
   - POSIX-compliant for portability
   - Efficient parsing and data processing
   - Signal handling for graceful shutdown
   - Configuration file support
   - Modular design for extensibility
   - Error handling and recovery
   - Logging and audit trail

**Learning Outcomes:**
   - Linux process management
   - System performance analysis
   - Shell scripting expertise
   - /proc filesystem understanding
   - Real-time data processing
   - System administration skills
   - Performance optimization
`
    },
    {
      title: "Math for Engineers Toolkit",
      course: "MAT8002 - Numeracy and Logic",
      technologies: ["Python", "Excel", "Mathematics", "NumPy", "Pandas"],
      description: "Develop a Python-based mathematical toolkit for IT professionals. Automates base conversions, Boolean algebra evaluation, statistical analysis, and engineering calculations with CSV/Excel integration and report generation.",
      details: `
**Project Overview:**
Create a professional mathematical toolkit that automates complex calculations, conversions, and analyses commonly needed in IT and engineering fields.

**Module 1: Base Conversion Tool**

**Supported Conversions:**
   - Decimal (base 10)
   - Binary (base 2)
   - Octal (base 8)
   - Hexadecimal (base 16)
   - Any arbitrary base (2-36)

**Features:**
   - Instant multi-base conversion
   - Batch conversion from CSV files
   - Two's complement for negative binary numbers
   - Floating-point representation
   - Binary coded decimal (BCD)
   - IEEE 754 floating-point format
   - IPv4 address to binary conversion
   - Subnet mask calculations
   - MAC address format conversion
   - Color code conversion (RGB, Hex)

**Module 2: Boolean Algebra Evaluator**

**Capabilities:**
   - Truth table generation
   - Boolean expression evaluation
   - Logic gate simulation (AND, OR, NOT, NAND, NOR, XOR, XNOR)
   - Karnaugh map solver
   - Boolean expression simplification
   - Sum of Products (SOP) form
   - Product of Sums (POS) form
   - De Morgan's theorem application
   - Logic circuit design
   - Digital circuit optimization

**Applications:**
   - Digital logic design
   - Computer architecture understanding
   - Programming logic validation
   - Network access control list (ACL) design

**Module 3: Statistical Analysis Tool**

**Descriptive Statistics:**
   - Mean, median, mode calculation
   - Standard deviation and variance
   - Range, quartiles, percentiles
   - Coefficient of variation
   - Skewness and kurtosis
   - Frequency distribution
   - Histogram generation
   - Box plot data

**Advanced Statistics:**
   - Probability distributions (normal, binomial, Poisson)
   - Hypothesis testing (t-test, chi-square)
   - Confidence intervals
   - Correlation analysis
   - Regression analysis (linear, polynomial)
   - ANOVA (Analysis of Variance)
   - Time series analysis
   - Outlier detection

**IT-Specific Applications:**
   - Network performance statistics
   - Server response time analysis
   - Bandwidth utilization trends
   - Error rate calculations
   - SLA compliance metrics
   - Capacity planning data analysis

**Module 4: Engineering Mathematics Tools**

**Calculations:**
   - Unit conversions (length, weight, temperature, data)
   - Electrical calculations (Ohm's law, power)
   - Network calculations (throughput, latency)
   - Data rate conversions (Mbps, MBps, etc.)
   - Storage calculations (KB, MB, GB, TB, PB)
   - Binary prefixes vs decimal prefixes
   - RAID storage calculator
   - Subnet calculator with VLSM
   - Cable length and attenuation
   - Signal-to-noise ratio (SNR)

**Data Analysis:**
   - CSV file import/export
   - Excel integration
   - Data visualization (charts, graphs)
   - Report generation
   - Batch processing
   - Data validation and cleaning

**User Interface:**
   - Command-line interface
   - Menu-driven system
   - Interactive prompts
   - Input validation
   - Error handling and helpful messages
   - Help documentation
   - Optional GUI (Tkinter)
   - Optional web interface (Flask)

**Output Formats:**
   - Console output
   - CSV export
   - Excel spreadsheet
   - PDF reports
   - JSON data
   - HTML reports
   - LaTeX format (for academic use)

**Practical Applications:**
   - Network engineering calculations
   - System design and planning
   - Performance analysis
   - Troubleshooting and diagnostics
   - Academic assignments and labs
   - Professional certification exam preparation
   - Real-world IT problem-solving

**Learning Outcomes:**
   - Mathematical problem-solving
   - Python programming skills
   - Data analysis expertise
   - Excel automation
   - Technical tool development
   - IT mathematics applications
`
    },
    {
      title: "Network Reliability Calculator",
      course: "MAT8002 - Numeracy and Logic",
      technologies: ["Python", "Probability", "Statistics", "Network Engineering"],
      description: "Create an advanced network reliability analysis tool using probability and statistics. Calculates MTBF/MTTR, models uptime scenarios, performs cost-benefit analysis, and generates comprehensive infrastructure reliability reports.",
      details: `
**Project Overview:**
Develop a sophisticated network reliability calculator that uses probability theory and statistical analysis to model, predict, and improve network infrastructure reliability and availability.

**Core Calculations:**

1. **Network Uptime Modeling Using Probability**

**Concepts:**
   - Series reliability (all components must work)
   - Parallel reliability (redundancy, at least one must work)
   - Mixed series-parallel systems
   - K-out-of-N reliability (minimum working components)
   - Fault tolerance modeling
   - Redundancy optimization

**Calculations:**
   - Component reliability (R = e^(-λt))
   - System reliability for series: R_sys = R1 × R2 × ... × Rn
   - System reliability for parallel: R_sys = 1 - (1-R1) × (1-R2) × ... × (1-Rn)
   - Network path reliability
   - End-to-end availability
   - Probability of failure
   - Availability percentage (99.9%, 99.99%, 99.999%)

2. **MTBF (Mean Time Between Failures)**

**Analysis:**
   - Calculate MTBF from failure history
   - Predict future failure rates
   - Component-level MTBF
   - System-level MTBF
   - Bathtub curve modeling (infant mortality, useful life, wear-out)
   - Weibull distribution analysis
   - Exponential distribution modeling
   - Reliability growth models

**Applications:**
   - Hardware replacement planning
   - Warranty period determination
   - Maintenance scheduling
   - Spare parts inventory management
   - Vendor comparison and selection
   - Budget forecasting

3. **MTTR (Mean Time To Repair)**

**Metrics:**
   - Average repair time calculation
   - Repair time distribution
   - Median vs mean repair time
   - Repair time variance
   - Service level agreements (SLAs)
   - First call resolution rate
   - Escalation rates

**Factors Affecting MTTR:**
   - Spare parts availability
   - Technician skill level
   - Documentation quality
   - Diagnostic tool effectiveness
   - Vendor support responsiveness
   - Physical access time
   - Complexity of repair

**Optimization:**
   - Reduce MTTR strategies
   - Preventive maintenance impact
   - Staff training effectiveness
   - Tool and resource allocation
   - Process improvement opportunities

4. **Uptime Calculation**

**Availability Formula:**
   - Availability = MTBF / (MTBF + MTTR)
   - Uptime percentage = (Total Time - Downtime) / Total Time × 100%
   - Downtime calculation in hours/minutes per year
   - SLA compliance calculation

**Service Level Tiers:**
   - 99% uptime = 3.65 days downtime/year
   - 99.9% uptime (Three Nines) = 8.76 hours/year
   - 99.99% uptime (Four Nines) = 52.56 minutes/year
   - 99.999% uptime (Five Nines) = 5.26 minutes/year
   - 99.9999% uptime (Six Nines) = 31.5 seconds/year

5. **IT Infrastructure Reliability Analysis**

**Component Analysis:**
   - Router reliability assessment
   - Switch redundancy evaluation
   - Server cluster availability
   - Storage system reliability (RAID levels)
   - Power supply redundancy (UPS, generators)
   - Network link availability
   - Internet service provider (ISP) uptime
   - Data center infrastructure

**Network Topology Analysis:**
   - Single point of failure identification
   - Redundant path analysis
   - Mesh network reliability
   - Ring topology reliability
   - Star topology reliability
   - Hybrid topology optimization
   - Failover mechanism effectiveness

**Advanced Features:**

**Monte Carlo Simulation:**
   - Simulate thousands of failure scenarios
   - Generate probability distributions
   - Identify worst-case scenarios
   - Optimize redundancy investment
   - Risk assessment

**Cost-Benefit Analysis:**
   - Reliability improvement costs
   - Downtime cost calculation
   - ROI for redundancy investments
   - TCO (Total Cost of Ownership)
   - Break-even analysis
   - Budget optimization

**Reporting and Visualization:**
   - Reliability block diagrams
   - Fault tree analysis diagrams
   - Availability heat maps
   - Trend analysis graphs
   - Failure rate charts
   - Uptime/downtime calendars
   - Executive summary reports
   - Technical detailed reports

**Input Data:**
   - Historical failure logs
   - Component specifications
   - Vendor reliability data
   - Network topology maps
   - Maintenance records
   - SLA requirements
   - Business criticality ratings

**Output Reports:**
   - Current reliability assessment
   - Predicted availability
   - Improvement recommendations
   - Risk analysis
   - Investment prioritization
   - Compliance status
   - Trend forecasts

**Real-World Applications:**
   - Data center design and planning
   - Disaster recovery planning
   - Business continuity management
   - SLA negotiation and validation
   - Vendor selection and comparison
   - Infrastructure upgrade justification
   - Insurance and risk management
   - Regulatory compliance (HIPAA, SOX, etc.)

**Use Cases:**
   - Enterprise network planning
   - Cloud infrastructure design
   - ISP network optimization
   - Critical infrastructure (hospitals, finance)
   - E-commerce platform reliability
   - Telecommunication networks
   - Industrial control systems

**Technical Implementation:**
   - Python with NumPy and SciPy
   - Statistical libraries (statsmodels)
   - Data visualization (Matplotlib, Seaborn)
   - Pandas for data manipulation
   - Excel integration for reports
   - Optional web interface
   - Database for historical data
   - Export to multiple formats

**Learning Outcomes:**
   - Probability and statistics application
   - Reliability engineering principles
   - Network design optimization
   - Risk assessment and management
   - Business case development
   - Professional reporting skills
   - Industry standard methodologies
`
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
        <Resume />
        <ThemeToggle />
        <Hidden smDown>
          <SocialIcons />
        </Hidden>
        <Hidden mdUp>
          <SpeedDials />
        </Hidden>
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
                    style={{ marginTop: '16px', textTransform: 'none' }}
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

      {/* About Section */}
      <section id="about" ref={aboutRef} className={classes.section}>
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            About Me
          </Typography>
          <About />
        </Container>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        ref={blogRef}
        className={`${classes.section} ${classes.alternateBackground}`}
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

      {/* Labs Section */}
      <section id="labs" ref={labsRef} className={classes.section}>
        <Container maxWidth="lg" className={classes.sectionContent}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Labs & Tutorials
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Hands-on labs and tutorials for cybersecurity, networking, and system administration.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className={classes.projectCard}>
                <Typography variant="h5" className={classes.projectTitle}>
                  Network Configuration Labs
                </Typography>
                <Typography variant="body2" className={classes.projectDescription}>
                  Step-by-step guides for configuring routers, switches, and network protocols.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={classes.projectCard}>
                <Typography variant="h5" className={classes.projectTitle}>
                  Security Hardening Labs
                </Typography>
                <Typography variant="body2" className={classes.projectDescription}>
                  Practical labs for securing systems, implementing policies, and vulnerability testing.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
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
