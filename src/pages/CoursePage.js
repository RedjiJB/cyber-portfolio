import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Breadcrumbs,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Hidden,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import NoteIcon from '@material-ui/icons/Note';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  courseHeader: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    background: `linear-gradient(135deg, ${theme.palette.primary.main}22 0%, ${theme.palette.secondary.main}22 100%)`,
    borderRadius: theme.spacing(1),
  },
  courseIcon: {
    fontSize: '4rem',
    marginBottom: theme.spacing(2),
  },
  courseTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  courseDescription: {
    fontSize: '1.1rem',
    color: theme.palette.text.secondary,
  },
  modulesGrid: {
    marginTop: theme.spacing(4),
  },
  moduleCard: {
    height: '100%',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[8],
    },
  },
  moduleIcon: {
    fontSize: '2.5rem',
    marginBottom: theme.spacing(1),
  },
  moduleTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  moduleDescription: {
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
  },
  submodulesList: {
    marginTop: theme.spacing(2),
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
  accordionHeading: {
    fontWeight: 600,
  },
  contentPlaceholder: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.spacing(1),
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
}));

const moduleIcons = {
  labs: <AssignmentIcon />,
  notes: <NoteIcon />,
  videos: <VideoLibraryIcon />,
  reflections: <DescriptionIcon />,
  'study-plans': <TrendingUpIcon />,
};

const ModuleCard = ({ module, courseSlug, levelId, classes }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.moduleCard}>
        <CardContent>
          <Box className={classes.moduleIcon}>
            {moduleIcons[module.id] || <FolderIcon />}
          </Box>
          <Typography variant="h6" className={classes.moduleTitle}>
            {module.name}
          </Typography>
          <Typography variant="body2" className={classes.moduleDescription}>
            {module.description}
          </Typography>
          
          {module.submodules && module.submodules.length > 0 && (
            <Box className={classes.submodulesList}>
              <Divider style={{ margin: '16px 0 8px 0' }} />
              <List dense>
                {module.submodules.map((submodule) => (
                  <ListItem
                    key={submodule.id}
                    button
                    component={Link}
                    to={`/curriculum/${levelId}/${courseSlug}/${module.id}/${submodule.id}`}
                  >
                    <ListItemIcon>
                      <FolderIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={submodule.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export const CoursePage = () => {
  const classes = useStyles();
  const { levelId, courseSlug } = useParams();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Find the course data
  const level = curriculumData.curriculum.levels.find(
    (l) => l.id === levelId
  );
  const course = level?.courses.find((c) => c.slug === courseSlug);

  if (!course || !level) {
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" style={{ marginTop: '5rem' }}>
            Course not found
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
            <Typography color="textPrimary">{course.name}</Typography>
          </Breadcrumbs>

          {/* Course Header */}
          <Paper className={classes.courseHeader} elevation={0}>
            <Box className={classes.courseIcon}>{course.icon}</Box>
            <Typography variant="h3" className={classes.courseTitle}>
              {course.name}
            </Typography>
            <Typography variant="body1" className={classes.courseDescription}>
              {course.description}
            </Typography>
            <Box mt={2}>
              <Chip
                label={level.name}
                color="primary"
                size="small"
                style={{ marginRight: 8 }}
              />
              <Chip
                label={`${course.modules.length} Modules`}
                variant="outlined"
                size="small"
              />
            </Box>
          </Paper>

          {/* Back Button */}
          <Box mb={3}>
            <Button
              component={Link}
              to="/curriculum"
              startIcon={<ArrowBackIcon />}
              color="primary"
            >
              Back to Curriculum
            </Button>
          </Box>

          {/* Modules Grid */}
          <Typography variant="h4" gutterBottom style={{ marginBottom: '24px' }}>
            Course Modules
          </Typography>

          <Grid container spacing={3} className={classes.modulesGrid}>
            {course.modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                courseSlug={courseSlug}
                levelId={levelId}
                classes={classes}
              />
            ))}
          </Grid>

          {/* Content Overview (Accordion) */}
          <Box mt={6}>
            <Typography variant="h4" gutterBottom>
              Module Details
            </Typography>
            {course.modules.map((module, index) => (
              <Accordion
                key={module.id}
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
                className={classes.accordion}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Box mr={2}>{moduleIcons[module.id] || <FolderIcon />}</Box>
                    <Typography className={classes.accordionHeading}>
                      {module.name}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box width="100%">
                    <Typography color="textSecondary" paragraph>
                      {module.description}
                    </Typography>
                    
                    {module.submodules && module.submodules.length > 0 ? (
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Content Sections:
                        </Typography>
                        <List>
                          {module.submodules.map((submodule) => (
                            <ListItem
                              key={submodule.id}
                              button
                              component={Link}
                              to={`/curriculum/${levelId}/${courseSlug}/${module.id}/${submodule.id}`}
                            >
                              <ListItemIcon>
                                <FolderIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={submodule.name}
                                secondary={`Path: ${submodule.path}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ) : (
                      <Box className={classes.contentPlaceholder}>
                        <Typography variant="body2">
                          📁 Content for this module will be added here
                        </Typography>
                        <Typography variant="caption" display="block" style={{ marginTop: 8 }}>
                          Path: {module.path}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default CoursePage;
