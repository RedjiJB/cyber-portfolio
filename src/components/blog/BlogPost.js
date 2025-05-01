import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container, 
  Typography, 
  Paper, 
  Chip, 
  Button, 
  Divider,
  Box
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import blogData from '../../settings/blog.json';
import { LogoLink } from '../logo/LogoLink';
import { ThemeToggle } from '../theme/ThemeToggle';
import { SocialIcons } from '../content/SocialIcons';
import { SpeedDials } from '../speedDial/SpeedDial';
import { TopNavbar } from '../nav/TopNavbar';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    position: 'relative',
  },
  contentWrapper: {
    marginTop: '6rem',
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 1,
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  postContainer: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(4),
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: theme.shape.borderRadius,
  },
  headerImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    marginBottom: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
  },
  postTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  metadata: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  content: {
    marginTop: theme.spacing(4),
    whiteSpace: 'pre-line',
    lineHeight: 1.8,
    fontSize: '1.1rem',
  },
  backButton: {
    marginTop: theme.spacing(4),
    borderRadius: 25,
    padding: '10px 20px',
    fontWeight: 'bold',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(4),
    gap: theme.spacing(1),
  },
  tag: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(8, 0),
  }
}));

export const BlogPost = () => {
  const classes = useStyles();
  const { id } = useParams();
  const post = blogData.posts.find(post => post.id === parseInt(id));

  if (!post) {
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
        
        <div className={classes.contentWrapper}>
          <Container maxWidth="md" className={classes.errorContainer}>
            <Typography variant="h4" gutterBottom>Post not found</Typography>
            <Typography variant="body1" paragraph>
              Sorry, the blog post you're looking for doesn't exist or has been removed.
            </Typography>
            <Button 
              component={Link} 
              to="/blog" 
              startIcon={<ArrowBack />}
              variant="contained"
              color="primary"
              className={classes.backButton}
            >
              Back to Blog
            </Button>
          </Container>
        </div>
      </div>
    );
  }

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
      
      <div className={classes.contentWrapper}>
        <Container maxWidth="lg">
          <Typography variant="h3" className={classes.pageTitle}>
            Blog
          </Typography>
          
          <Container component={Paper} maxWidth="md" className={classes.postContainer}>
            <img src={post.image} alt={post.title} className={classes.headerImage} />
            <Typography variant="h3" component="h1" className={classes.postTitle}>
              {post.title}
            </Typography>
            
            <Box className={classes.metadata}>
              <Typography variant="body2">
                By {post.author} | {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>
            
            <Divider className={classes.divider} />
            
            <Typography variant="body1" component="div" className={classes.content}>
              {post.content}
            </Typography>
            
            <div className={classes.tagsContainer}>
              {post.tags.map((tag, index) => (
                <Chip key={index} label={tag} className={classes.tag} />
              ))}
            </div>
            
            <Button 
              component={Link} 
              to="/blog" 
              startIcon={<ArrowBack />}
              className={classes.backButton}
              color="primary"
              variant="contained"
            >
              Back to Blog
            </Button>
          </Container>
        </Container>
      </div>
    </div>
  );
}; 