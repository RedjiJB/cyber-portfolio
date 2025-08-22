import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container, 
  Typography, 
  Grid, 
  Hidden, 
  Button,
  Box,
  Divider
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';
import { BlogPostCard } from '../components/blog/BlogPostCard';
import { BlogFeatured } from '../components/blog/BlogFeatured';
import blogManager from '../utils/blogManager';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  blogContainer: {
    padding: theme.spacing(8, 0, 6),
    marginTop: '2rem',
  },
  blogHeading: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.type === 'dark' ? '#5a9fd4' : '#3776ab',
  },
  blogSubheading: {
    color: theme.palette.text.secondary,
    maxWidth: '700px',
    margin: '0 auto',
    marginBottom: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  content: {
    marginTop: '5rem',
  },
  backButton: {
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 3,
    padding: theme.spacing(1, 3),
    fontWeight: 600,
    textTransform: 'none',
    background: 'linear-gradient(135deg, #3776ab, #2c5282)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(135deg, #2c5282, #2a4a6b)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(55, 118, 171, 0.3)',
    }
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    background: theme.palette.type === 'dark' 
      ? 'rgba(90, 159, 212, 0.05)'
      : 'rgba(55, 118, 171, 0.05)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
  academicInfo: {
    background: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    marginBottom: theme.spacing(4),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
  }
}));

export const StudentBlog = () => {
  const classes = useStyles();
  const posts = blogManager.getAllPosts();
  
  // Filter Student posts
  const studentPosts = useMemo(() => 
    posts.filter(post => post.category === "Co op Student"), [posts]);
    
  const featuredPost = studentPosts.length > 0 ? studentPosts[0] : null;

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
        <Container maxWidth="lg" className={classes.blogContainer}>
          <Button
            component={Link}
            to="/blog"
            startIcon={<ArrowBack />}
            className={classes.backButton}
          >
            Back to Blog
          </Button>
          
          <Box className={classes.headerSection}>
            <Typography variant="h2" component="h1" className={classes.blogHeading} align="center">
              Student Projects
            </Typography>
            <Typography variant="h6" className={classes.blogSubheading} align="center">
              Technical Learning & Innovation Journey
            </Typography>
          </Box>

          <Box className={classes.academicInfo}>
            <Typography variant="h5" gutterBottom style={{ 
              color: theme => theme.palette.type === 'dark' ? '#5a9fd4' : '#3776ab',
              fontWeight: 'bold' 
            }}>
              Co-op Student Technical Portfolio
            </Typography>
            <Typography variant="body1" paragraph>
              This section showcases my technical projects and learning experiences as a co-op student 
              in the Computer Systems Technician - Networking program at Algonquin College. 
              Each project demonstrates practical application of theoretical concepts and hands-on problem solving.
            </Typography>
            <Typography variant="body2" style={{ color: '#666' }}>
              <strong>Focus Areas:</strong> Network design, cybersecurity implementation, automation tools, 
              infrastructure projects, and innovative solutions that bridge academic learning with real-world applications.
            </Typography>
          </Box>

          {featuredPost && (
            <>
              <BlogFeatured post={featuredPost} />
              <Divider className={classes.divider} />
            </>
          )}
          
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={3}>
              {studentPosts.map((post, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <BlogPostCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Container>
          
          {studentPosts.length === 0 && (
            <Typography variant="h6" align="center" style={{ padding: '2rem', color: '#666' }}>
              No student project posts available.
            </Typography>
          )}
        </Container>
      </div>
    </div>
  );
};

export default StudentBlog;