import React, { useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";
import projectsData from "../../settings/projects.json";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GitHubIcon from '@material-ui/icons/GitHub';
import BuildIcon from '@material-ui/icons/Build';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.background.default,
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
  headerTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerSubtitle: {
    maxWidth: '600px',
    margin: '0 auto',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  projectCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    borderRadius: theme.shape.borderRadius * 3,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      '& $projectMedia': {
        transform: 'scale(1.05)',
      },
    },
  },
  projectMedia: {
    height: 200,
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.4s ease',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
      pointerEvents: 'none',
    },
  },
  projectContent: {
    flexGrow: 1,
    padding: theme.spacing(2.5),
  },
  projectTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    fontSize: '1.25rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  projectDescription: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    fontSize: '0.95rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  techChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1.5),
  },
  techChip: {
    backgroundColor: theme.palette.primary.main + '20',
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: '0.75rem',
    height: 24,
  },
  cardActions: {
    padding: theme.spacing(2, 2.5),
    borderTop: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-between',
  },
  projectButton: {
    borderRadius: 20,
    padding: '6px 16px',
    fontWeight: 500,
    textTransform: 'none',
    fontSize: '0.875rem',
    borderWidth: '2px',
    '&.MuiButton-outlined': {
      borderColor: theme.palette.type === 'dark' 
        ? theme.palette.primary.light 
        : theme.palette.primary.main,
      color: theme.palette.type === 'dark' 
        ? theme.palette.primary.light 
        : theme.palette.primary.main,
    },
  },
  categoryChip: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    fontWeight: 600,
    zIndex: 1,
    fontSize: '0.75rem',
  },
  statusBadge: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: theme.spacing(0.5, 1.5),
    borderRadius: theme.shape.borderRadius * 4,
    fontWeight: 600,
    fontSize: '0.75rem',
    zIndex: 1,
    '&.in-progress': {
      backgroundColor: 'rgba(76, 175, 80, 0.9)',
    },
    '&.planning': {
      backgroundColor: 'rgba(255, 152, 0, 0.9)',
    },
  },
  viewAllButton: {
    marginTop: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 4,
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
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
}));

export const RecentProjects = ({ maxProjects = 6 }) => {
  const classes = useStyles();
  const { projects } = projectsData;
  
  // Get most recent projects (in-progress first, then by ID descending)
  const recentProjects = useMemo(() => {
    return projects
      .sort((a, b) => {
        // Prioritize in-progress projects
        if (a.status === 'in-progress' && b.status !== 'in-progress') return -1;
        if (b.status === 'in-progress' && a.status !== 'in-progress') return 1;
        // Then sort by ID descending (newer projects first)
        return b.id - a.id;
      })
      .slice(0, maxProjects);
  }, [projects, maxProjects]);

  return (
    <section className={classes.section}>
      <Container maxWidth="lg">
        <div className={classes.header}>
          <Typography variant="h3" className={classes.headerTitle}>
            <TextDecrypt text="Recent Projects" />
          </Typography>
          <Typography variant="body1" className={classes.headerSubtitle}>
            Explore my latest work in cybersecurity, AI, blockchain, and more
          </Typography>
        </div>

        <Grid container spacing={3}>
          {recentProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card className={classes.projectCard}>
                <CardMedia
                  className={classes.projectMedia}
                  component="img"
                  image={project.image}
                  alt={project.title}
                  title={project.title}
                  loading="lazy"
                />
                <Chip 
                  label={project.category} 
                  className={classes.categoryChip} 
                  size="small" 
                />
                {project.status && (
                  <Tooltip title={project.status === 'in-progress' ? 'Active Development' : 'Planning Phase'}>
                    <div className={`${classes.statusBadge} ${project.status}`}>
                      {project.status === 'in-progress' ? 
                        <BuildIcon style={{ fontSize: '0.875rem' }} /> : 
                        <AccessTimeIcon style={{ fontSize: '0.875rem' }} />
                      }
                      {project.status === 'in-progress' ? 'In Progress' : 'Planning'}
                    </div>
                  </Tooltip>
                )}
                <CardContent className={classes.projectContent}>
                  <Typography variant="h6" className={classes.projectTitle}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" className={classes.projectDescription}>
                    {project.overview}
                  </Typography>
                  
                  <div className={classes.techChips}>
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <Chip 
                        key={idx} 
                        label={tech} 
                        className={classes.techChip} 
                        size="small" 
                      />
                    ))}
                    {project.technologies.length > 3 && (
                      <Chip 
                        label={`+${project.technologies.length - 3}`} 
                        className={classes.techChip} 
                        size="small" 
                        variant="outlined"
                      />
                    )}
                  </div>
                </CardContent>
                
                <CardActions className={classes.cardActions}>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.projectButton}
                    startIcon={<GitHubIcon />}
                    size="small"
                  >
                    Code
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.projectButton}
                    startIcon={<OpenInNewIcon />}
                    size="small"
                  >
                    Demo
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to="/projects"
            className={classes.viewAllButton}
          >
            View All Projects
          </Button>
        </Box>
      </Container>
    </section>
  );
};

export default RecentProjects;