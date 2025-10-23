import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Button,
  Box,
  Breadcrumbs,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Hidden,
  Chip
} from '@material-ui/core';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddIcon from '@material-ui/icons/Add';
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
}));

export const ModuleContentPage = () => {
  const classes = useStyles();
  const { levelId, courseSlug, moduleId, submoduleId } = useParams();
  const [contentFiles, setContentFiles] = useState([]);

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
    // In a real implementation, you would fetch the content files from the file system
    // For now, we'll show a placeholder
    // Example: fetch(`/api/curriculum/content?path=${contentPath}`)
    //   .then(res => res.json())
    //   .then(data => setContentFiles(data.files))
    setContentFiles([]);
  }, [contentPath]);

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

          {/* Content Section */}
          <Box className={classes.contentSection}>
            <Typography variant="h4" gutterBottom>
              Content Files
            </Typography>

            {contentFiles.length === 0 ? (
              <Card className={classes.emptyState} elevation={0}>
                <CardContent>
                  <DescriptionIcon className={classes.emptyStateIcon} />
                  <Typography variant="h5" gutterBottom>
                    No Content Yet
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    This module doesn't have any content files yet. Add markdown files,
                    documents, or other learning materials to this directory:
                  </Typography>
                  <Paper
                    elevation={0}
                    style={{
                      padding: '16px',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      marginTop: '16px',
                    }}
                  >
                    content/curriculum/{contentPath}/
                  </Paper>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    className={classes.addButton}
                  >
                    Add Content
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Paper>
                <List className={classes.contentList}>
                  {contentFiles.map((file, index) => (
                    <React.Fragment key={index}>
                      <ListItem button className={classes.contentItem}>
                        <ListItemIcon>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary={file.date}
                        />
                      </ListItem>
                      {index < contentFiles.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          {/* Instructions */}
          <Box mt={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📚 How to Add Content
                </Typography>
                <Typography variant="body2" paragraph>
                  To add content to this module, create files in the following directory:
                </Typography>
                <Paper
                  elevation={0}
                  style={{
                    padding: '12px',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    marginBottom: '16px',
                  }}
                >
                  /workspaces/cyber-portfolio/content/curriculum/{contentPath}/
                </Paper>
                <Typography variant="body2">
                  Supported formats:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="• Markdown files (.md) - For notes and documentation" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• PDF files (.pdf) - For reports and study materials" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Images (.png, .jpg) - For diagrams and screenshots" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Code files - For labs and tutorials" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default ModuleContentPage;
