import React, { useState, useMemo, useCallback } from 'react';
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
    padding: theme.spacing(0.5, 2),
    margin: theme.spacing(0.5),
    transition: 'all 0.2s ease',
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  noResultsMessage: {
    textAlign: 'center',
    padding: theme.spacing(4),
    width: '100%',
    color: theme.palette.text.secondary,
  },
  sectionHeader: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  sectionDescription: {
    color: theme.palette.text.secondary,
    maxWidth: '600px',
    margin: '0 auto',
  },
  categoryButton: {
    borderRadius: theme.shape.borderRadius * 6,
    padding: theme.spacing(1.5, 4),
    margin: theme.spacing(1),
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1.1rem',
    minWidth: '200px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    }
  },
  dCentralButton: {
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(135deg, #c0392b, #a93226)',
    }
  },
  studentButton: {
    background: 'linear-gradient(135deg, #3776ab, #2c5282)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(135deg, #2c5282, #2a4a6b)',
    }
  },
  extracurricularButton: {
    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(135deg, #2ecc71, #58d68d)',
    }
  },
  navigationSection: {
    textAlign: 'center',
    margin: theme.spacing(6, 0),
    padding: theme.spacing(4),
    background: theme.palette.type === 'dark' 
      ? 'rgba(255, 255, 255, 0.02)'
      : 'rgba(0, 0, 0, 0.02)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
  }
}));

export const Blog = () => {
  const classes = useStyles();
  const posts = blogManager.getAllPosts();
  
  // Separate posts by category
  const dCentralPosts = useMemo(() => 
    posts.filter(post => post.category === "D Central"), [posts]);
  const studentPosts = useMemo(() => 
    posts.filter(post => post.category === "Co op Student"), [posts]);
  const extracurricularPosts = useMemo(() => 
    posts.filter(post => post.category === "Extracurricular Projects"), [posts]);
    
  const featuredDCentralPost = dCentralPosts.length > 0 ? dCentralPosts[0] : null;
  const featuredStudentPost = studentPosts.length > 0 ? studentPosts[0] : null;
  const featuredExtracurricularPost = extracurricularPosts.length > 0 ? extracurricularPosts[0] : null;

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
          <Typography variant="h3" component="h1" className={classes.blogHeading} align="center">
            Tech Insights Blog
          </Typography>
          <Typography variant="body1" className={classes.blogSubheading} align="center">
            Explore insights from D Central's security sovereignty research and my co-op student technical projects
          </Typography>

          {/* Category Navigation Section */}
          <Box className={classes.navigationSection}>
            <Typography variant="h4" className={classes.sectionTitle}>
              Explore by Category
            </Typography>
            <Typography variant="body1" className={classes.sectionDescription}>
              Select the content area that interests you most
            </Typography>
            <Box style={{ marginTop: '2rem' }}>
              <Button
                component={Link}
                to="/blog/d-central"
                className={`${classes.categoryButton} ${classes.dCentralButton}`}
                variant="contained"
              >
                D Central Research
                <br />
                <small>Security Sovereignty & Democracy</small>
              </Button>
              <Button
                component={Link}
                to="/blog/student"
                className={`${classes.categoryButton} ${classes.studentButton}`}
                variant="contained"
              >
                Student Projects
                <br />
                <small>Technical Learning & Innovation</small>
              </Button>
              <Button
                component={Link}
                to="/blog/extracurricular"
                className={`${classes.categoryButton} ${classes.extracurricularButton}`}
                variant="contained"
              >
                Extracurricular Projects
                <br />
                <small>Independent Innovation & Development</small>
              </Button>
            </Box>
          </Box>

          {/* D Central Featured Section */}
          {featuredDCentralPost && (
            <>
              <Box className={classes.sectionHeader}>
                <Typography variant="h4" style={{ 
                  color: '#e74c3c',
                  fontWeight: 'bold' 
                }}>
                  D Central Research Highlights
                </Typography>
                <Typography variant="body1" className={classes.sectionDescription}>
                  Community-controlled security technology and democratic governance
                </Typography>
              </Box>
              <BlogFeatured post={featuredDCentralPost} />
              
              {dCentralPosts.length > 1 && (
                <Container className={classes.cardGrid} maxWidth="lg">
                  <Grid container spacing={3}>
                    {dCentralPosts.slice(1, 4).map((post, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <BlogPostCard post={post} />
                      </Grid>
                    ))}
                  </Grid>
                  <Box textAlign="center" style={{ marginTop: '2rem' }}>
                    <Button
                      component={Link}
                      to="/blog/d-central"
                      variant="outlined"
                      color="primary"
                      size="large"
                    >
                      View All D Central Posts ({dCentralPosts.length})
                    </Button>
                  </Box>
                </Container>
              )}
            </>
          )}

          <Divider className={classes.divider} />

          {/* Student Projects Featured Section */}
          {featuredStudentPost && (
            <>
              <Box className={classes.sectionHeader}>
                <Typography variant="h4" style={{ 
                  color: '#3776ab',
                  fontWeight: 'bold' 
                }}>
                  Student Project Showcase
                </Typography>
                <Typography variant="body1" className={classes.sectionDescription}>
                  Technical projects and learning experiences in cybersecurity and networking
                </Typography>
              </Box>
              <BlogFeatured post={featuredStudentPost} />
              
              {studentPosts.length > 1 && (
                <Container className={classes.cardGrid} maxWidth="lg">
                  <Grid container spacing={3}>
                    {studentPosts.slice(1, 4).map((post, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <BlogPostCard post={post} />
                      </Grid>
                    ))}
                  </Grid>
                  <Box textAlign="center" style={{ marginTop: '2rem' }}>
                    <Button
                      component={Link}
                      to="/blog/student"
                      variant="outlined"
                      color="primary"
                      size="large"
                    >
                      View All Student Projects ({studentPosts.length})
                    </Button>
                  </Box>
                </Container>
              )}
            </>
          )}

          <Divider className={classes.divider} />

          {/* Extracurricular Projects Featured Section */}
          {featuredExtracurricularPost && (
            <>
              <Box className={classes.sectionHeader}>
                <Typography variant="h4" style={{ 
                  color: '#27ae60',
                  fontWeight: 'bold' 
                }}>
                  Extracurricular Project Showcase
                </Typography>
                <Typography variant="body1" className={classes.sectionDescription}>
                  Independent innovation and cutting-edge technology development
                </Typography>
              </Box>
              <BlogFeatured post={featuredExtracurricularPost} />
              
              {extracurricularPosts.length > 1 && (
                <Container className={classes.cardGrid} maxWidth="lg">
                  <Grid container spacing={3}>
                    {extracurricularPosts.slice(1, 4).map((post, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <BlogPostCard post={post} />
                      </Grid>
                    ))}
                  </Grid>
                  <Box textAlign="center" style={{ marginTop: '2rem' }}>
                    <Button
                      component={Link}
                      to="/blog/extracurricular"
                      variant="outlined"
                      color="primary"
                      size="large"
                    >
                      View All Extracurricular Projects ({extracurricularPosts.length})
                    </Button>
                  </Box>
                </Container>
              )}
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Blog;