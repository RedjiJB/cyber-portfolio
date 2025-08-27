import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container, 
  Typography, 
  Grid, 
  Hidden, 
  Button,
  Box,
  Divider,
  Fade,
  Slide,
  Zoom,
  useScrollTrigger,
  Fab
} from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';
import { BlogPostCard } from '../components/blog/BlogPostCard';
import { BlogFeatured } from '../components/blog/BlogFeatured';
import { BlogCarousel } from '../components/blog/BlogCarousel';
import blogData from '../utils/blogData';

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
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  blogSubheading: {
    color: theme.palette.text.secondary,
    maxWidth: '700px',
    margin: '0 auto',
    marginBottom: theme.spacing(4),
    transition: 'all 0.3s ease',
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
    transition: 'all 0.3s ease',
  },
  categoryButton: {
    borderRadius: theme.shape.borderRadius * 6,
    padding: theme.spacing(1.5, 4),
    margin: theme.spacing(1),
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1.1rem',
    minWidth: '200px',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.6s ease',
    },
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
      '&::before': {
        left: '100%',
      },
    },
    '&:active': {
      transform: 'translateY(-2px) scale(1.01)',
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
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
      backgroundSize: '300% 300%',
      animation: '$gradientShift 6s ease infinite',
      borderRadius: theme.shape.borderRadius * 2,
      zIndex: -1,
    },
  },
  '@keyframes gradientShift': {
    '0%, 100%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
  },
  scrollToTop: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'scale(1.1)',
    },
  },
  animatedSection: {
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'all 0.8s ease-out',
    '&.visible': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  staggeredCard: {
    opacity: 0,
    transform: 'translateY(20px) scale(0.95)',
    transition: 'all 0.6s ease-out',
    '&.visible': {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  },
}));

// Scroll to top component
const ScrollToTop = ({ classes }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        className={classes.scrollToTop}
        size="small"
        onClick={handleClick}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};

// Intersection Observer Hook for animations
const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

export const Blog = () => {
  const classes = useStyles();
  const posts = blogData.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Refs for intersection observer
  const heroRef = useRef(null);
  const carouselRef = useRef(null);
  const dCentralRef = useRef(null);
  const studentRef = useRef(null);
  const extracurricularRef = useRef(null);
  
  // Intersection observer hooks
  const isHeroVisible = useIntersectionObserver(heroRef, { threshold: 0.3 });
  const isCarouselVisible = useIntersectionObserver(carouselRef, { threshold: 0.2 });
  const isDCentralVisible = useIntersectionObserver(dCentralRef, { threshold: 0.2 });
  const isStudentVisible = useIntersectionObserver(studentRef, { threshold: 0.2 });
  const isExtracurricularVisible = useIntersectionObserver(extracurricularRef, { threshold: 0.2 });
  
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
          <div ref={heroRef} className={`${classes.animatedSection} ${isHeroVisible ? 'visible' : ''}`}>
            <Slide direction="down" in={isHeroVisible} timeout={800}>
              <Typography variant="h3" component="h1" className={classes.blogHeading} align="center">
                Tech Insights Blog
              </Typography>
            </Slide>
            <Fade in={isHeroVisible} timeout={1200}>
              <Typography variant="body1" className={classes.blogSubheading} align="center">
                Explore insights from D Central's security sovereignty research and my co-op student technical projects
              </Typography>
            </Fade>
          </div>

          {/* Category Navigation Section */}
          <Zoom in={isHeroVisible} timeout={1000}>
            <Box className={classes.navigationSection}>
              <Slide direction="up" in={isHeroVisible} timeout={1200}>
                <div>
                  <Typography variant="h4" className={classes.sectionTitle}>
                    Explore by Category
                  </Typography>
                  <Typography variant="body1" className={classes.sectionDescription}>
                    Select the content area that interests you most
                  </Typography>
                </div>
              </Slide>
              <Box style={{ marginTop: '2rem' }}>
                <Zoom in={isHeroVisible} style={{ transitionDelay: '400ms' }}>
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
                </Zoom>
                <Zoom in={isHeroVisible} style={{ transitionDelay: '600ms' }}>
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
                </Zoom>
                <Zoom in={isHeroVisible} style={{ transitionDelay: '800ms' }}>
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
                </Zoom>
              </Box>
            </Box>
          </Zoom>
          
          {/* Interactive Blog Carousel */}
          <div ref={carouselRef} className={`${classes.animatedSection} ${isCarouselVisible ? 'visible' : ''}`}>
            <Fade in={isCarouselVisible} timeout={800}>
              <div>
                <BlogCarousel 
                  posts={posts.slice(0, 6)} 
                  title="Latest Articles" 
                  autoplay={true}
                  autoplayInterval={4000}
                  slidesToShow={3}
                />
              </div>
            </Fade>
          </div>

          {/* D Central Featured Section */}
          {featuredDCentralPost && (
            <div ref={dCentralRef} className={`${classes.animatedSection} ${isDCentralVisible ? 'visible' : ''}`}>
              <Slide direction="left" in={isDCentralVisible} timeout={800}>
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
              </Slide>
              <Fade in={isDCentralVisible} timeout={1000}>
                <div>
                  <BlogFeatured post={featuredDCentralPost} />
                </div>
              </Fade>
              
              {dCentralPosts.length > 1 && (
                <Container className={classes.cardGrid} maxWidth="lg">
                  <Grid container spacing={3}>
                    {dCentralPosts.slice(1, 4).map((post, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <div 
                          className={`${classes.staggeredCard} ${isDCentralVisible ? 'visible' : ''}`}
                          style={{ transitionDelay: `${index * 200}ms` }}
                        >
                          <BlogPostCard post={post} featured={index === 0} />
                        </div>
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
            </div>
          )}

          <Divider className={classes.divider} />

          {/* Student Projects Featured Section */}
          {featuredStudentPost && (
            <div ref={studentRef} className={`${classes.animatedSection} ${isStudentVisible ? 'visible' : ''}`}>
              <Slide direction="right" in={isStudentVisible} timeout={800}>
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
              </Slide>
              <Fade in={isStudentVisible} timeout={1000}>
                <div>
                  <BlogFeatured post={featuredStudentPost} />
                </div>
              </Fade>
              
              {studentPosts.length > 1 && (
                <Container className={classes.cardGrid} maxWidth="lg">
                  <Grid container spacing={3}>
                    {studentPosts.slice(1, 4).map((post, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <div 
                          className={`${classes.staggeredCard} ${isStudentVisible ? 'visible' : ''}`}
                          style={{ transitionDelay: `${index * 200}ms` }}
                        >
                          <BlogPostCard post={post} featured={index === 0} />
                        </div>
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
            </div>
          )}

          <Divider className={classes.divider} />

          {/* Extracurricular Projects Featured Section */}
          {featuredExtracurricularPost && (
            <div ref={extracurricularRef} className={`${classes.animatedSection} ${isExtracurricularVisible ? 'visible' : ''}`}>
              <Slide direction="left" in={isExtracurricularVisible} timeout={800}>
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
              </Slide>
              <Fade in={isExtracurricularVisible} timeout={1000}>
                <div>
                  <BlogFeatured post={featuredExtracurricularPost} />
                </div>
              </Fade>
              
              {extracurricularPosts.length > 1 && (
                <Container className={classes.cardGrid} maxWidth="lg">
                  <Grid container spacing={3}>
                    {extracurricularPosts.slice(1, 4).map((post, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <div 
                          className={`${classes.staggeredCard} ${isExtracurricularVisible ? 'visible' : ''}`}
                          style={{ transitionDelay: `${index * 200}ms` }}
                        >
                          <BlogPostCard post={post} featured={index === 0} />
                        </div>
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
            </div>
          )}
        </Container>
        
        <ScrollToTop classes={classes} />
      </div>
    </div>
  );
};

export default Blog;