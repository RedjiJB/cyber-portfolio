import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Hidden,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';

// Material-UI Icons
import {
  Build as BuildIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  InfoOutlined as InfoIcon
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
    display: 'flex',
    flexDirection: 'column',
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
  viewDetailsButton: {
    marginTop: theme.spacing(2),
    borderWidth: '2px',
    borderColor: theme.palette.type === 'dark' 
      ? theme.palette.primary.light 
      : theme.palette.primary.main,
    color: theme.palette.type === 'dark' 
      ? theme.palette.primary.light 
      : theme.palette.primary.main,
    '&:hover': {
      borderWidth: '2px',
      backgroundColor: theme.palette.type === 'dark' 
        ? `${theme.palette.primary.main}20` 
        : 'rgba(42, 78, 147, 0.08)',
    },
  },
  dialogHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(1),
  },
  dialogContent: {
    paddingTop: theme.spacing(2),
  },
  deliverablesList: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  courseChip: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  detailedSection: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  sectionLabel: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    fontSize: '0.875rem',
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  deliverableItem: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    position: 'relative',
    '&:before': {
      content: '"•"',
      position: 'absolute',
      left: theme.spacing(0.5),
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
  },
  learningOutcomeItem: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    position: 'relative',
    '&:before': {
      content: '"✓"',
      position: 'absolute',
      left: theme.spacing(0.5),
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
    },
  },
  expandableSection: {
    flex: 1,
  },
}));

const courseProjects = {
  'CST8182-Networking-Fundamentals': [
    {
      title: "Small Office Network Blueprint",
      course: "CST8182 - Networking Fundamentals",
      description: "Design and document a complete small office network infrastructure including topology, addressing, security, and implementation plan.",
      detailedDescription: "This comprehensive project demonstrates your ability to plan and design a functional small office network from the ground up. You will apply networking fundamentals, subnetting principles, and security best practices to create a professional-grade network design that meets real-world business requirements.",
      technologies: ["Network Design", "Cisco Packet Tracer", "VLSM", "Network Security", "Documentation"],
      deliverables: [
        "Network topology diagram showing all devices and connections",
        "IP addressing plan with proper subnetting and VLSM calculations",
        "Security policies and implementation guidelines",
        "Hardware and software specifications with justifications",
        "Step-by-step implementation guide for deployment",
        "Cost analysis with budget breakdown (optional)",
        "Final presentation demonstrating the complete solution"
      ],
      learningOutcomes: [
        "Apply subnetting and VLSM to real-world scenarios",
        "Design network topologies for business requirements",
        "Implement security best practices in network design",
        "Create professional technical documentation",
        "Present technical solutions effectively"
      ],
      status: "In Progress"
    }
  ],
  'CST8202-Windows-Desktop-Support': [
    {
      title: "Windows Admin Toolkit (PowerShell)",
      course: "CST8202 - Windows Desktop Support",
      description: "Create a comprehensive PowerShell automation toolkit for Windows administration including user management, backup automation, and encryption tools.",
      detailedDescription: "Develop a professional-grade PowerShell toolkit that automates common Windows administration tasks. This project demonstrates your ability to leverage PowerShell for efficient system management, security, and automation. The toolkit will include modular scripts with proper error handling, logging, and documentation.",
      technologies: ["PowerShell", "Windows Server", "Active Directory", "BitLocker", "Automation"],
      deliverables: [
        "User Management Module: Create, modify, delete users; password management and bulk operations",
        "Backup Automation Module: Scheduled backups, compression, integrity verification, and restore procedures",
        "Encryption Tools Module: File/folder encryption, BitLocker automation, and certificate management",
        "Complete documentation including usage guides and examples",
        "GitHub repository with organized code structure",
        "PowerShell help documentation for each function"
      ],
      learningOutcomes: [
        "Master PowerShell scripting and automation",
        "Implement secure Windows administration practices",
        "Develop modular and reusable code",
        "Create professional technical documentation",
        "Apply security best practices in scripting"
      ],
      status: "In Progress"
    }
  ],
  'Linux-System-Support': [
    {
      title: "Automation Suite (Bash)",
      course: "GNU/Linux System Support",
      description: "Build a comprehensive Bash automation suite for Linux system administration covering backups, log management, and cron job automation.",
      detailedDescription: "Create a professional Bash scripting suite that automates critical Linux system administration tasks. This project showcases your ability to write robust shell scripts with proper error handling, logging, and scheduling. The suite will demonstrate best practices in Linux automation and system management.",
      technologies: ["Bash", "Linux", "Cron", "System Administration", "Log Management"],
      deliverables: [
        "Backup Module: File/directory backup with compression, scheduling, and retention policies",
        "System Logs Module: Log rotation, analysis, alert generation, and archiving",
        "Cron Job Manager: Automated task creation, monitoring, error logging, and reporting",
        "Complete technical documentation with usage examples",
        "Installation and configuration scripts"
      ],
      learningOutcomes: [
        "Write professional Bash scripts with best practices",
        "Automate Linux system administration tasks",
        "Implement log management and monitoring",
        "Schedule and manage automated tasks with cron",
        "Handle errors and edge cases in scripts"
      ],
      status: "In Progress"
    }
  ]
};

const ProjectCard = ({ project, classes, onViewDetails }) => (
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
      <Chip
        label={project.course}
        size="small"
        color="primary"
        className={classes.courseChip}
      />

      <div className={classes.expandableSection}>
        <Typography variant="body2" className={classes.projectDescription}>
          {project.detailedDescription}
        </Typography>

        {/* Key Deliverables Preview */}
        <div className={classes.detailedSection}>
          <Typography className={classes.sectionLabel}>
            Key Deliverables ({project.deliverables.length} total)
          </Typography>
          {project.deliverables.slice(0, 3).map((deliverable, index) => (
            <Typography key={index} className={classes.deliverableItem}>
              {deliverable}
            </Typography>
          ))}
          {project.deliverables.length > 3 && (
            <Typography
              variant="caption"
              style={{ paddingLeft: '16px', fontStyle: 'italic', color: '#666' }}
            >
              +{project.deliverables.length - 3} more deliverables...
            </Typography>
          )}
        </div>

        {/* Learning Outcomes Preview */}
        <div className={classes.detailedSection}>
          <Typography className={classes.sectionLabel}>
            Learning Outcomes
          </Typography>
          {project.learningOutcomes.slice(0, 3).map((outcome, index) => (
            <Typography key={index} className={classes.learningOutcomeItem}>
              {outcome}
            </Typography>
          ))}
          {project.learningOutcomes.length > 3 && (
            <Typography
              variant="caption"
              style={{ paddingLeft: '16px', fontStyle: 'italic', color: '#666' }}
            >
              +{project.learningOutcomes.length - 3} more outcomes...
            </Typography>
          )}
        </div>

        {/* Technologies */}
        <div className={classes.detailedSection}>
          <Typography className={classes.sectionLabel}>
            Technologies & Tools
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
        </div>
      </div>

      <Button
        variant="outlined"
        color="primary"
        size="small"
        className={classes.viewDetailsButton}
        startIcon={<InfoIcon />}
        onClick={() => onViewDetails(project)}
        fullWidth
      >
        View Full Details
      </Button>
    </Paper>
  </Grid>
);

export const Projects = () => {
  const classes = useStyles();
  const [selectedProject, setSelectedProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

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
          <Typography variant="h3" gutterBottom style={{ marginBottom: '2rem', fontWeight: 700 }}>
            Course Projects
          </Typography>

          {/* CST8182 - Networking Fundamentals */}
          <div className={classes.projectSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              <BuildIcon />
              CST8182 - Networking Fundamentals
            </Typography>
            <Grid container spacing={3}>
              {courseProjects['CST8182-Networking-Fundamentals'].map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  classes={classes}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </Grid>
          </div>

          {/* CST8202 - Windows Desktop Support */}
          <div className={classes.projectSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              <BuildIcon />
              CST8202 - Windows Desktop Support
            </Typography>
            <Grid container spacing={3}>
              {courseProjects['CST8202-Windows-Desktop-Support'].map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  classes={classes}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </Grid>
          </div>

          {/* GNU/Linux System Support */}
          <div className={classes.projectSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              <BuildIcon />
              GNU/Linux System Support
            </Typography>
            <Grid container spacing={3}>
              {courseProjects['Linux-System-Support'].map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  classes={classes}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </Grid>
          </div>
        </Container>
      </div>

      {/* Project Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle disableTypography className={classes.dialogHeader}>
          <Typography variant="h5">
            {selectedProject?.title}
          </Typography>
          <IconButton aria-label="close" onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers className={classes.dialogContent}>
          {selectedProject && (
            <>
              <Chip
                label={selectedProject.course}
                color="primary"
                style={{ marginBottom: '16px' }}
              />

              <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
                Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedProject.detailedDescription}
              </Typography>

              <Divider style={{ margin: '24px 0' }} />

              <Typography variant="h6" gutterBottom>
                Project Deliverables
              </Typography>
              <List className={classes.deliverablesList}>
                {selectedProject.deliverables.map((deliverable, index) => (
                  <ListItem key={index} dense>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={deliverable} />
                  </ListItem>
                ))}
              </List>

              <Divider style={{ margin: '24px 0' }} />

              <Typography variant="h6" gutterBottom>
                Learning Outcomes
              </Typography>
              <List className={classes.deliverablesList}>
                {selectedProject.learningOutcomes.map((outcome, index) => (
                  <ListItem key={index} dense>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={outcome} />
                  </ListItem>
                ))}
              </List>

              <Divider style={{ margin: '24px 0' }} />

              <Typography variant="h6" gutterBottom>
                Technologies & Tools
              </Typography>
              <div className={classes.techTags} style={{ marginTop: '12px' }}>
                {selectedProject.technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </div>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Projects;