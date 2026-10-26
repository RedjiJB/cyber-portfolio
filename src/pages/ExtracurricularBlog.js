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
    color: theme.palette.type === 'dark' ? '#58d68d' : '#27ae60',
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
    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(135deg, #2ecc71, #58d68d)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(39, 174, 96, 0.3)',
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
      ? 'rgba(88, 214, 141, 0.05)'
      : 'rgba(39, 174, 96, 0.05)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
  projectInfo: {
    background: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    marginBottom: theme.spacing(4),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
  }
}));

export const ExtracurricularBlog = () => {
  const classes = useStyles();
  const posts = blogManager.getAllPosts();
  
  // Filter Extracurricular Projects posts
  const extracurricularPosts = useMemo(() => 
    posts.filter(post => post.category === "Extracurricular Projects"), [posts]);
    
  const featuredPost = extracurricularPosts.length > 0 ? extracurricularPosts[0] : null;

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
              Extracurricular Projects
            </Typography>
            <Typography variant="h6" className={classes.blogSubheading} align="center">
              Innovation & Independent Technical Development
            </Typography>
          </Box>

          <Box className={classes.projectInfo}>
            <Typography variant="h5" gutterBottom style={{ 
              color: theme => theme.palette.type === 'dark' ? '#58d68d' : '#27ae60',
              fontWeight: 'bold' 
            }}>
              Personal Innovation Portfolio
            </Typography>
            <Typography variant="body1" paragraph>
              This section showcases my independent technical projects and innovative solutions developed 
              outside of formal academic or professional requirements. These projects demonstrate creative 
              problem-solving, emerging technology exploration, and personal passion for cybersecurity innovation.
            </Typography>
            <Typography variant="body2" style={{ color: '#666' }}>
              <strong>Focus Areas:</strong> Autonomous systems, AI-powered security solutions, IoT integration, 
              drone technology, mesh networking, and cutting-edge cybersecurity platforms that push the boundaries 
              of traditional security approaches.
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
              {extracurricularPosts.map((post, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <BlogPostCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Container>
          
          {extracurricularPosts.length === 0 && (
            <Typography variant="h6" align="center" style={{ padding: '2rem', color: '#666' }}>
              No extracurricular project posts available.
            </Typography>
          )}
        </Container>
      </div>
    </div>
  );
};

export default ExtracurricularBlog;