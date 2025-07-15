import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Container, Typography, Grid, Paper } from '@material-ui/core';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';
import { Works } from '../components/works/Works';
import projectsData from '../settings/projects.json';

// Material-UI Icons
import { 
  Link as LinkIcon, 
  Psychology as BrainIcon, 
  Security as ShieldIcon, 
  Language as GlobeIcon, 
  PhoneAndroid as MobileIcon, 
  Sync as SyncIcon 
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
  },
  expertiseSection: {
    padding: theme.spacing(6, 3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    marginBottom: theme.spacing(6),
  },
  expertiseTitle: {
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  expertiseDescription: {
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  domainCard: {
    padding: theme.spacing(3),
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    },
  },
  domainTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  domainIcon: {
    fontSize: 40,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

const expertiseDomains = [
  {
    title: "Blockchain & Web3",
    description: "Smart contracts, DeFi protocols, NFTs, and decentralized governance systems.",
    icon: LinkIcon
  },
  {
    title: "Artificial Intelligence",
    description: "Machine learning models, NLP systems, and computer vision applications.",
    icon: BrainIcon
  },
  {
    title: "Cybersecurity",
    description: "Vulnerability assessment, penetration testing, and secure system design.",
    icon: ShieldIcon
  },
  {
    title: "Networking",
    description: "Network automation, traffic analysis, and infrastructure optimization.",
    icon: GlobeIcon
  },
  {
    title: "IoT & Edge Computing",
    description: "Sensor networks, real-time data processing, and connected devices.",
    icon: MobileIcon
  },
  {
    title: "Cross-Disciplinary",
    description: "Projects that integrate multiple domains for innovative solutions.",
    icon: SyncIcon
  }
];

export const Projects = () => {
  const classes = useStyles();
  const { completedProjects, projects } = projectsData;

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
          <Paper elevation={0} className={classes.expertiseSection}>
            <Typography variant="h4" align="center" className={classes.expertiseTitle}>
              Technical Domains & Expertise
            </Typography>
            <Typography variant="body1" align="center" className={classes.expertiseDescription}>
              My project portfolio spans multiple technical domains, reflecting my versatile skill set
              and passion for solving complex problems at the intersection of emerging technologies.
            </Typography>
            
            <Grid container spacing={3}>
              {expertiseDomains.map((domain, index) => {
                const IconComponent = domain.icon;
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper elevation={2} className={classes.domainCard}>
                      <IconComponent className={classes.domainIcon} />
                      <Typography variant="h6" className={classes.domainTitle}>
                        {domain.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {domain.description}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Container>
        
        <Works completedProjects={completedProjects} projects={projects} />
      </div>
    </div>
  );
};

export default Projects;