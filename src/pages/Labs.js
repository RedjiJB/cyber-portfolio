import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Hidden, 
  Container, 
  Typography, 
  Grid, 
  Chip, 
  Button,
  Box,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';

// Material-UI Icons
import BuildIcon from '@material-ui/icons/Build';
import CodeIcon from '@material-ui/icons/Code';
import SearchIcon from '@material-ui/icons/Search';

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
  pageTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  description: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: theme.palette.text.secondary,
    maxWidth: '800px',
    margin: '0 auto',
    marginBottom: theme.spacing(6),
  },
  labSection: {
    marginBottom: theme.spacing(6),
  },
  sectionTitle: {
    marginBottom: theme.spacing(3),
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  labCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[8],
    },
  },
  labCardContent: {
    flexGrow: 1,
  },
  labTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  labDescription: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  statusChip: {
    marginBottom: theme.spacing(2),
  },
  experimentalChip: {
    backgroundColor: '#ff9800',
    color: 'white',
  },
  prototypeChip: {
    backgroundColor: '#2196f3',
    color: 'white',
  },
  researchChip: {
    backgroundColor: '#9c27b0',
    color: 'white',
  },
  techTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
  },
  actionButton: {
    margin: theme.spacing(0.5),
  },
  iconStyle: {
    fontSize: '2rem',
    color: theme.palette.primary.main,
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
  }
}));

// Sample labs data - you can move this to a separate JSON file later
const labsData = {
  experimental: [
    {
      id: 'quantum-crypto',
      title: 'Quantum Cryptography Simulator',
      description: 'Experimental implementation of quantum key distribution protocols using classical computing simulation.',
      status: 'Experimental',
      technologies: ['Python', 'Qiskit', 'Cryptography', 'Quantum Computing'],
      links: {
        github: 'https://github.com/RedjiJB/quantum-crypto-sim',
        demo: null,
        documentation: 'https://docs.quantum-crypto.dev'
      }
    },
    {
      id: 'ai-threat-detection',
      title: 'AI-Powered Threat Detection',
      description: 'Machine learning model for real-time network anomaly detection using deep learning techniques.',
      status: 'Experimental',
      technologies: ['TensorFlow', 'Python', 'Scikit-learn', 'Network Security'],
      links: {
        github: 'https://github.com/RedjiJB/ai-threat-detection',
        demo: 'https://threat-detection-demo.netlify.app',
        documentation: null
      }
    }
  ],
  prototypes: [
    {
      id: 'blockchain-voting',
      title: 'Decentralized Voting Platform',
      description: 'Prototype blockchain-based voting system ensuring transparency and immutability.',
      status: 'Prototype',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      links: {
        github: 'https://github.com/RedjiJB/blockchain-voting',
        demo: 'https://voting-prototype.vercel.app',
        documentation: 'https://voting-docs.gitbook.io'
      }
    },
    {
      id: 'secure-chat',
      title: 'End-to-End Encrypted Chat',
      description: 'Prototype secure messaging application with perfect forward secrecy.',
      status: 'Prototype',
      technologies: ['Node.js', 'Socket.io', 'Cryptography', 'React'],
      links: {
        github: 'https://github.com/RedjiJB/secure-chat',
        demo: null,
        documentation: null
      }
    }
  ],
  research: [
    {
      id: 'privacy-ml',
      title: 'Privacy-Preserving Machine Learning',
      description: 'Research into federated learning and differential privacy for secure AI model training.',
      status: 'Research',
      technologies: ['Python', 'TensorFlow', 'Differential Privacy', 'Federated Learning'],
      links: {
        github: null,
        demo: null,
        documentation: 'https://privacy-ml-research.notion.site'
      }
    },
    {
      id: 'zero-knowledge',
      title: 'Zero-Knowledge Authentication',
      description: 'Research and implementation of zero-knowledge proof systems for authentication.',
      status: 'Research',
      technologies: ['Cryptography', 'Zero-Knowledge Proofs', 'Mathematics'],
      links: {
        github: 'https://github.com/RedjiJB/zk-auth-research',
        demo: null,
        documentation: 'https://zk-auth.research.dev'
      }
    }
  ]
};

const LabCard = ({ lab, classes }) => {
  const getStatusChipClass = (status) => {
    switch (status) {
      case 'Experimental':
        return classes.experimentalChip;
      case 'Prototype':
        return classes.prototypeChip;
      case 'Research':
        return classes.researchChip;
      default:
        return '';
    }
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={classes.labCard}>
        <CardContent className={classes.labCardContent}>
          <Typography variant="h6" className={classes.labTitle}>
            {lab.title}
          </Typography>
          <Chip
            label={lab.status}
            size="small"
            className={`${classes.statusChip} ${getStatusChipClass(lab.status)}`}
          />
          <Typography variant="body2" className={classes.labDescription}>
            {lab.description}
          </Typography>
          <Box className={classes.techTags}>
            {lab.technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
          </Box>
        </CardContent>
        <CardActions>
          {lab.links.github && (
            <Button
              size="small"
              href={lab.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.actionButton}
            >
              GitHub
            </Button>
          )}
          {lab.links.demo && (
            <Button
              size="small"
              href={lab.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.actionButton}
              color="primary"
            >
              Demo
            </Button>
          )}
          {lab.links.documentation && (
            <Button
              size="small"
              href={lab.links.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.actionButton}
            >
              Docs
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export const Labs = () => {
  const classes = useStyles();

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
          <Typography variant="h3" className={classes.pageTitle}>
            Labs & Experiments
          </Typography>
          
          <Typography variant="body1" className={classes.description}>
            Welcome to my cybersecurity laboratory - a collection of experimental projects, 
            prototypes, and research initiatives exploring cutting-edge security technologies, 
            blockchain innovations, and emerging threat detection methodologies.
          </Typography>

          {/* Experimental Projects */}
          <Box className={classes.labSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              <BuildIcon className={classes.iconStyle} />
              Experimental Projects
            </Typography>
            <Grid container spacing={3}>
              {labsData.experimental.map((lab) => (
                <LabCard key={lab.id} lab={lab} classes={classes} />
              ))}
            </Grid>
          </Box>

          {/* Prototypes */}
          <Box className={classes.labSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              <CodeIcon className={classes.iconStyle} />
              Prototypes
            </Typography>
            <Grid container spacing={3}>
              {labsData.prototypes.map((lab) => (
                <LabCard key={lab.id} lab={lab} classes={classes} />
              ))}
            </Grid>
          </Box>

          {/* Research */}
          <Box className={classes.labSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              <SearchIcon className={classes.iconStyle} />
              Research
            </Typography>
            <Grid container spacing={3}>
              {labsData.research.map((lab) => (
                <LabCard key={lab.id} lab={lab} classes={classes} />
              ))}
            </Grid>
          </Box>

          {/* Call to Action */}
          <Box textAlign="center" mt={6}>
            <Typography variant="h5" gutterBottom>
              Interested in Collaboration?
            </Typography>
            <Typography variant="body1" paragraph>
              These experimental projects represent ongoing research and development in cybersecurity. 
              If you're interested in collaborating or have questions about any of these projects, 
              feel free to reach out!
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              href="/contact"
            >
              Get In Touch
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Labs;