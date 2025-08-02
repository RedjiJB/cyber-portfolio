/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Container, 
  Typography, 
  Chip, 
  Button, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions,
  Box,
  Divider,
  Paper,
  Tabs,
  Tab,
  ButtonGroup,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";
import projectsData from "../../settings/projects.json";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GitHubIcon from '@material-ui/icons/GitHub';
import BuildIcon from '@material-ui/icons/Build';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import './Works.css';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "auto",
    padding: theme.spacing(3),
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
  },
  projectCard: {
    padding: theme.spacing(4, 3, 3, 3),
    height: '100%',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    borderLeft: `6px solid ${theme.palette.primary.main}`,
    background: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)',
    marginBottom: theme.spacing(2),
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
      borderLeft: `8px solid ${theme.palette.secondary.main}`,
    },
  },
  projectMedia: {
    height: 220,
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.4s ease',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
      pointerEvents: 'none',
      zIndex: 1,
    },
  },
  projectContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  projectTitle: {
    fontWeight: 800,
    fontSize: '1.35rem',
    marginBottom: theme.spacing(1.5),
    letterSpacing: '0.01em',
    color: theme.palette.primary.main,
  },
  projectOverview: {
    marginBottom: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    fontSize: '1.05rem',
  },
  projectFeatures: {
    marginBottom: theme.spacing(1.5),
  },
  projectProblem: {
    marginBottom: theme.spacing(1.5),
  },
  projectTechStack: {
    marginBottom: theme.spacing(1.5),
    fontWeight: 500,
  },
  projectStatus: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1.5),
  },
  tabContent: {
    padding: theme.spacing(2),
  },
  techChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(2),
    background: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 1.5),
  },
  techChip: {
    margin: theme.spacing(0.5, 0.5, 0.5, 0),
    backgroundColor: theme.palette.primary.main + '20',
    color: theme.palette.primary.main,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '30',
    },
  },
  cardActions: {
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
  projectButton: {
    borderRadius: 20,
    padding: '8px 16px',
    fontWeight: 500,
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1),
    '&:before': {
      content: '"•"',
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  filterButton: {
    borderRadius: theme.shape.borderRadius * 4,
    textTransform: 'none',
    fontWeight: 500,
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0.5),
    transition: 'all 0.2s ease',
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
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
  },
  emptyState: {
    textAlign: 'center',
    padding: theme.spacing(6),
    width: '100%',
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
  }
}));

export const Works = ({ completedProjects, projects }) => {
  const classes = useStyles();
  const [tabValues, setTabValues] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Merge completed and in-progress projects
  const allProjects = useMemo(() => {
    return [...(completedProjects || []), ...(projects || [])];
  }, [completedProjects, projects]);
  
  // Memoize filtered projects to avoid unnecessary recalculations
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return allProjects;
    }
    return allProjects.filter(project => project.category === selectedCategory);
  }, [selectedCategory, allProjects]);
  
  // Memoize categories to avoid recalculation
  const categories = useMemo(() => {
    return ["All", ...new Set(allProjects.map(project => project.category))];
  }, [allProjects]);

  const handleTabChange = useCallback((projectId, newValue) => {
    setTabValues(prev => ({
      ...prev,
      [projectId]: newValue
    }));
  }, []);

  const getTabValue = (projectId) => {
    return tabValues[projectId] || 0;
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`project-tabpanel-${index}`}
        aria-labelledby={`project-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box className={classes.tabContent}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  return (
    <section className={classes.main}>
      <Container maxWidth="lg">
        <div className={classes.header}>
          <Typography variant="h3" className={classes.headerTitle}>
            <TextDecrypt text="Project Portfolio" />
          </Typography>
          <Typography variant="body1" className={classes.headerSubtitle}>
            Explore my recent projects across blockchain, AI, cybersecurity, IoT, and more
          </Typography>
        </div>

        <div className={classes.filterContainer}>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "contained" : "outlined"}
              color="primary"
              className={classes.filterButton}
            >
              {category}
            </Button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <Grid container spacing={3}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={project.id}>
                <Paper elevation={2} className={classes.projectCard}>
                  <Chip 
                    label={project.category} 
                    className={classes.categoryChip} 
                    size="small" 
                  />
                  {project.status && (
                    <Chip
                      label={
                        project.status === 'completed' || project.status === 'Completed'
                          ? 'Completed'
                          : project.status === 'in-progress'
                          ? 'In Progress'
                          : 'Planning'
                      }
                      color={
                        project.status === 'completed' || project.status === 'Completed'
                          ? 'primary'
                          : project.status === 'in-progress'
                          ? 'secondary'
                          : 'default'
                      }
                      style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        zIndex: 2
                      }}
                      icon={
                        project.status === 'completed' || project.status === 'Completed'
                          ? <BuildIcon style={{ fontSize: '1rem' }} />
                          : project.status === 'in-progress'
                          ? <AccessTimeIcon style={{ fontSize: '1rem' }} />
                          : null
                      }
                    />
                  )}
                  <CardContent className={classes.projectContent}>
                    <Typography variant="h6" className={classes.projectTitle}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" className={classes.projectOverview}>
                      {project.overview}
                    </Typography>
                    <Typography variant="body2" className={classes.projectFeatures}>
                      <strong>Features:</strong> {project.features ? project.features.join(', ') : 'N/A'}
                    </Typography>
                    <Typography variant="body2" className={classes.projectProblem}>
                      <strong>Problem:</strong> {project.problem || 'N/A'}
                    </Typography>
                    <Typography variant="body2" className={classes.projectTechStack}>
                      <strong>Tech Stack:</strong> {(project.techStack && project.techStack.join(', ')) || (project.technologies && project.technologies.join(', ')) || 'N/A'}
                    </Typography>
                    <Typography variant="body2" className={classes.projectStatus}>
                      Status: {project.status || 'Completed'}
                    </Typography>
                    
                    <Paper elevation={0}>
                      <Tabs
                        value={getTabValue(project.id)}
                        onChange={(e, newValue) => handleTabChange(project.id, newValue)}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="project details tabs"
                      >
                        <Tab label="Features" />
                        <Tab label="Problem" />
                        <Tab label="Tech Stack" />
                      </Tabs>
                    </Paper>
                    
                    <TabPanel value={getTabValue(project.id)} index={0}>
                      {project.features ? project.features.map((feature, idx) => (
                        <Typography key={idx} variant="body2" className={classes.featureItem}>
                          {feature}
                        </Typography>
                      )) : <Typography variant="body2">No features available.</Typography>}
                    </TabPanel>
                    
                    <TabPanel value={getTabValue(project.id)} index={1}>
                      <Typography variant="body2">
                        {project.problem || 'No problem statement available.'}
                      </Typography>
                    </TabPanel>
                    
                    <TabPanel value={getTabValue(project.id)} index={2}>
                      <div className={classes.techChips}>
                        {(project.techStack || project.technologies) ?
                          (project.techStack || project.technologies).map((tech, idx) => (
                            <Chip 
                              key={idx} 
                              label={tech} 
                              className={classes.techChip} 
                              size="small" 
                            />
                          )) : <Typography variant="body2">No technologies available.</Typography>}
                      </div>
                    </TabPanel>
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
                      Repo
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
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper className={classes.emptyState}>
            <Typography variant="h6" color="textSecondary">
              No projects found in this category.
            </Typography>
          </Paper>
        )}
      </Container>
    </section>
  );
};

export default Works;