import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Hidden,
  Paper
} from '@material-ui/core';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';
import SchoolIcon from '@material-ui/icons/School';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
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
  pageTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  pageDescription: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: theme.palette.text.secondary,
    maxWidth: '800px',
    margin: '0 auto',
    marginBottom: theme.spacing(6),
  },
  levelSection: {
    marginBottom: theme.spacing(6),
  },
  levelHeader: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    background: `linear-gradient(135deg, ${theme.palette.primary.main}22 0%, ${theme.palette.secondary.main}22 100%)`,
    borderRadius: theme.spacing(1),
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  },
  levelTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  levelDescription: {
    color: theme.palette.text.secondary,
  },
  courseCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.shadows[12],
    },
  },
  courseCardContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2),
  },
  courseIcon: {
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
  },
  courseTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  courseDescription: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  moduleChip: {
    margin: theme.spacing(0.5),
  },
  modulesSection: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  modulesLabel: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  colorStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  statsBox: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  statLabel: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
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

const CourseCard = ({ course, level, classes }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.courseCard}>
        <Box
          className={classes.colorStrip}
          style={{ backgroundColor: course.color }}
        />
        <CardContent className={classes.courseCardContent}>
          <Box className={classes.courseIcon}>{course.icon}</Box>
          <Typography variant="h5" className={classes.courseTitle}>
            {course.name}
          </Typography>
          <Typography variant="body2" className={classes.courseDescription}>
            {course.description}
          </Typography>
          
          <Box className={classes.modulesSection}>
            <Typography className={classes.modulesLabel}>
              Content Modules:
            </Typography>
            <Box>
              {course.modules.map((module) => (
                <Chip
                  key={module.id}
                  label={module.name}
                  size="small"
                  variant="outlined"
                  className={classes.moduleChip}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/curriculum/${level.id}/${course.slug}`}
            color="primary"
            endIcon={<ArrowForwardIcon />}
            fullWidth
          >
            View Course
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export const Curriculum = () => {
  const classes = useStyles();
  const curriculum = curriculumData.curriculum;

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
            <SchoolIcon style={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '1rem' }} />
            {curriculum.title}
          </Typography>

          <Typography variant="body1" className={classes.pageDescription}>
            {curriculum.description}
          </Typography>

          {/* Levels and Courses */}
          {curriculum.levels.map((level) => (
            <Box key={level.id} className={classes.levelSection}>
              <Paper className={classes.levelHeader} elevation={0}>
                <Typography variant="h4" className={classes.levelTitle}>
                  {level.name}
                </Typography>
                <Typography variant="body1" className={classes.levelDescription}>
                  {level.description}
                </Typography>
              </Paper>

              <Grid container spacing={3}>
                {level.courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    level={level}
                    classes={classes}
                  />
                ))}
              </Grid>
            </Box>
          ))}

          {/* Call to Action */}
          <Box textAlign="center" mt={6}>
            <Typography variant="h5" gutterBottom>
              Ready to Start Learning?
            </Typography>
            <Typography variant="body1" paragraph color="textSecondary">
              Explore comprehensive course materials including labs, notes, videos, and more.
            </Typography>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Curriculum;
