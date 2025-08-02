import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Container, Typography, Grid, Paper, Chip } from '@material-ui/core';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';

// Material-UI Icons
import { 
  Build as BuildIcon, 
  Schedule as ScheduleIcon, 
  Security as ShieldIcon, 
  CloudQueue as CloudIcon 
} from '@material-ui/icons';

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
  },
  projectSection: {
    marginBottom: theme.spacing(6),
  },
  sectionTitle: {
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
  projectCard: {
    padding: theme.spacing(3),
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    },
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
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
  },
  statusChip: {
    fontWeight: 'bold',
    minWidth: '90px',
  },
  inProgressChip: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  planningChip: {
    backgroundColor: '#FF9800',
    color: '#fff',
  },
}));

const currentProjects = [
  {
    title: "Subnet Designer & Visualizer",
    description: "Python tool that calculates VLSM subnet schemes and produces a LAN topology diagram. Reinforces OSI/TCP-IP knowledge and IPv4 addressing from CST 8182.",
    technologies: ["Python", "CIDR", "VLSM", "Networking", "Topology"],
    status: "In Progress"
  },
  {
    title: "Windows 11 Secure Build Guide",
    description: "Hardened Windows 11 VM with local GPOs, NTFS permissions and PowerShell scripts for automated baseline deployment. Mirrors skills from CST 8202.",
    technologies: ["Windows", "PowerShell", "GPO", "Security Hardening"],
    status: "In Progress"
  },
  {
    title: "Linux Essentials Lab Book",
    description: "GitHub repo of step-by-step Bash labs that cover user/group management, file permissions and shell-scripting automation—direct output of CST 8207.",
    technologies: ["Linux", "Bash", "Shell Scripting", "System Administration"],
    status: "In Progress"
  },
  {
    title: "Interactive Number-System Converter",
    description: "CLI program that converts binary ↔ decimal ↔ hex and demonstrates Boolean logic routines learned in MAT 8002 and CST 8324.",
    technologies: ["Python", "Binary/Hex", "Boolean Logic", "CLI"],
    status: "In Progress"
  }
];

const upcomingProjects = [
  {
    title: "Mini-Enterprise AD Lab",
    description: "Multi-DC Windows Server domain with OU structure, Group Policy enforcement and PowerShell user-import CSV workflow (upcoming CST 8200).",
    technologies: ["Windows Server", "Active Directory", "Group Policy", "PowerShell"],
    status: "Planning"
  },
  {
    title: "Packet Tracer Campus Network",
    description: "Enterprise LAN simulation featuring VLANs, STP redundancy, inter-VLAN routing and WPA3 wireless (future CST 8315 deliverable).",
    technologies: ["Cisco", "Packet Tracer", "VLANs", "STP", "Wi-Fi"],
    status: "Planning"
  },
  {
    title: "Linux Web & Mail Server Stack",
    description: "Secure Apache/Nginx plus Postfix/Dovecot deployment managed by Ansible, aligned with CST 8305 and CST 8246 coursework.",
    technologies: ["Linux", "Apache", "Postfix", "TLS", "Ansible"],
    status: "Planning"
  },
  {
    title: "Automated Help-Desk Chatbot",
    description: "Flask micro-service that answers ITIL-style queries and integrates with Slack; ties into CST 8206 and Python automation track.",
    technologies: ["Python", "Flask", "Chatbot", "ITIL", "Automation"],
    status: "Planning"
  }
];

const advancedProjects = [
  {
    title: "Blue-Team Home SOC",
    description: "pfSense firewall + Suricata IDS feeding Elastic SIEM with Slack alerts; capstone for upcoming Security+ and CyberOps studies.",
    technologies: ["pfSense", "Suricata", "Elastic Stack", "SIEM", "Incident Response"],
    status: "Planning"
  },
  {
    title: "Cloud VPC & Site-to-Site VPN",
    description: "AWS VPC built with Terraform and IPSec tunnel back to home lab—demonstrates hybrid-cloud networking and IaC principles.",
    technologies: ["AWS", "Terraform", "VPC", "IPSec VPN", "Cloud Networking"],
    status: "Planning"
  },
  {
    title: "Network Automation Pipeline",
    description: "CI/CD pipeline that runs Ansible compliance checks against lab routers via GitHub Actions, producing pass/fail badges.",
    technologies: ["Ansible", "GitHub Actions", "Automation", "Networking", "CI/CD"],
    status: "Planning"
  },
  {
    title: "Zero-Trust Reference Architecture",
    description: "Blueprint for identity-centric segmentation using Okta, Tailscale and NIST 800-207 guidelines; long-term security-architect showcase.",
    technologies: ["Zero Trust", "NIST 800-207", "Okta", "Tailscale", "Security Architecture"],
    status: "Planning"
  }
];

const ProjectCard = ({ project, classes }) => (
  <Grid item xs={12} md={6}>
    <Paper elevation={2} className={classes.projectCard}>
      <div className={classes.projectHeader}>
        <Typography variant="h6" className={classes.projectTitle}>
          {project.title}
        </Typography>
        <Chip 
          label={project.status}
          size="small"
          className={`${
            project.status === 'In Progress' 
              ? classes.inProgressChip 
              : classes.planningChip
          } ${classes.statusChip}`}
        />
      </div>
      <Typography variant="body2" className={classes.projectDescription}>
        {project.description}
      </Typography>
      <div className={classes.techTags}>
        {project.technologies.map((tech, index) => (
          <Chip
            key={index}
            label={tech}
            size="small"
            variant="outlined"
            color="primary"
          />
        ))}
      </div>
    </Paper>
  </Grid>
);

export const Projects = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LogoLink />
      <ThemeToggle />
      <Hidden smDown>
        <SocialIcons />
      </Hidden>
      <Hidden mdUp>
        <SpeedDials />
      </Hidden>
      <TopNavbar />
      
      <div className={classes.content}>
        <Container maxWidth="lg">
          {/* Currently Building Projects */}
          <div className={classes.projectSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              <BuildIcon />
              Currently Building (Fall 2025)
            </Typography>
            <Grid container spacing={3}>
              {currentProjects.map((project, index) => (
                <ProjectCard key={index} project={project} classes={classes} />
              ))}
            </Grid>
          </div>

          {/* Upcoming Projects */}
          <div className={classes.projectSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              <ScheduleIcon />
              Next Semester & Beyond (Winter 2026+)
            </Typography>
            <Grid container spacing={3}>
              {upcomingProjects.map((project, index) => (
                <ProjectCard key={index} project={project} classes={classes} />
              ))}
            </Grid>
          </div>

          {/* Advanced Security & Cloud Projects */}
          <div className={classes.projectSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              <ShieldIcon />
              Advanced Security & Cloud Projects
            </Typography>
            <Grid container spacing={3}>
              {advancedProjects.map((project, index) => (
                <ProjectCard key={index} project={project} classes={classes} />
              ))}
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Projects;