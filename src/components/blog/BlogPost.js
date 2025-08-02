import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container, 
  Typography, 
  Paper, 
  Chip, 
  Button, 
  Box,
  Avatar
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
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
  hero: {
    padding: theme.spacing(4),
    background: `linear-gradient(90deg, #00bfbf 0%, #0077b6 100%)`,
    color: '#fff',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  headerImage: {
    width: '100%',
    height: 'auto',
    maxHeight: 400,
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    display: 'block',
    margin: '0 auto',
  },
  meta: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tag: {
    margin: theme.spacing(0.5),
    background: '#fff',
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  content: {
    padding: theme.spacing(3),
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    fontSize: '1.1rem',
    lineHeight: 1.8,
    '& h1, & h2, & h3': {
      color: theme.palette.primary.main,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    '& blockquote': {
      borderLeft: '4px solid #00bfbf',
      background: '#f0f7fa',
      padding: theme.spacing(1, 2),
      margin: theme.spacing(2, 0),
      fontStyle: 'italic',
    },
    '& pre': {
      background: '#222',
      color: '#fff',
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      overflowX: 'auto',
    },
    '& ul, & ol': {
      marginLeft: theme.spacing(3),
    },
    '& img': {
      maxWidth: '100%',
      borderRadius: theme.shape.borderRadius,
    },
  },
  backButton: {
    marginTop: theme.spacing(4),
    borderRadius: 25,
    padding: '10px 20px',
    fontWeight: 'bold',
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
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    if (post && post.markdown) {
      import(`../../settings/posts/${post.markdown}`)
        .then(module => fetch(module.default).then(res => res.text()))
        .then(setMarkdownContent);
    }
  }, [post]);

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
          <Paper className={classes.hero} elevation={3}>
            <Typography variant="h3" component="h1" gutterBottom>
              {post.title}
            </Typography>
            <div className={classes.meta}>
              <Avatar alt={post.author} src="/assets/profile.JPG" />
              <Typography variant="subtitle1">{post.author}</Typography>
              <Typography variant="subtitle2">{new Date(post.date).toLocaleDateString()}</Typography>
              {post.tags && post.tags.map((tag) => (
                <Chip key={tag} label={tag} className={classes.tag} />
              ))}
            </div>
            {post.image && (
              <Box style={{ textAlign: 'center', marginBottom: '16px' }}>
                <img src={`${process.env.PUBLIC_URL}${post.image}`} alt={post.title} className={classes.headerImage} />
              </Box>
            )}
            <Typography variant="h6">{post.summary}</Typography>
          </Paper>
          <Paper className={classes.content} elevation={1}>
            <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
              {markdownContent}
            </ReactMarkdown>
          </Paper>
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
      </div>
    </div>
  );
};

export default BlogPost; 