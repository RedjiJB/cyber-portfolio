import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Chip,
  Box,
  Paper,
  Hidden
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  featuredCard: {
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    },
  },
  featuredContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  featuredTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  featuredHeader: {
    marginBottom: theme.spacing(2),
  },
  featuredLabel: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  dateText: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
  },
  summary: {
    marginTop: theme.spacing(2),
    fontSize: '1.1rem',
    lineHeight: 1.6,
    color: theme.palette.text.secondary,
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(3),
  },
  chip: {
    margin: theme.spacing(0.5, 0.5, 0.5, 0),
    backgroundColor: theme.palette.primary.main + '20',
    color: theme.palette.primary.main,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '30',
    },
  },
  mediaContainer: {
    position: 'relative',
    height: 350,
    [theme.breakpoints.down('sm')]: {
      height: 250,
    },
  },
  media: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(6),
  },
  overlayTitle: {
    color: '#fff',
    fontWeight: 700,
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  },
  overlayDate: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.9rem',
  }
}));

export const BlogFeatured = ({ post }) => {
  const classes = useStyles();

  if (!post) return null;

  return (
    <Paper className={classes.featuredCard} elevation={0}>
      <Grid container direction={{ xs: 'column', md: 'row' }}>
        <Grid item xs={12} md={6}>
          <div className={classes.mediaContainer}>
            <CardMedia
              component="img"
              className={classes.media}
              image={`${process.env.PUBLIC_URL}${post.image}`}
              title={post.title}
            />
            <Hidden xsDown>
              <Box className={classes.overlay}>
                <Typography variant="h4" className={classes.overlayTitle}>
                  {post.title}
                </Typography>
                <Typography variant="body2" className={classes.overlayDate}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Box>
            </Hidden>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardActionArea component={Link} to={`/blog/${post.id}`}>
            <CardContent className={classes.featuredContent}>
              <Box className={classes.featuredHeader}>
                <Typography variant="subtitle1" className={classes.featuredLabel}>
                  FEATURED ARTICLE
                </Typography>
                <Hidden smUp>
                  <Typography variant="h4" className={classes.featuredTitle}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" className={classes.dateText}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Hidden>
                <Typography variant="body1" className={classes.summary}>
                  {post.summary}
                </Typography>
              </Box>
              <div className={classes.chipContainer}>
                {post.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    className={classes.chip}
                  />
                ))}
              </div>
            </CardContent>
          </CardActionArea>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlogFeatured;