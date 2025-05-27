import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActionArea, 
  Chip,
  Box
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    borderRadius: theme.shape.borderRadius * 3,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      '& $cardMedia': {
        transform: 'scale(1.05)',
      },
    },
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
    position: 'relative',
    transition: 'transform 0.4s ease',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
      pointerEvents: 'none',
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(2),
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
  dateText: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    fontSize: '1.25rem',
    lineHeight: 1.3,
    color: theme.palette.text.primary,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  summary: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.5),
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  categoryChip: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    fontWeight: 600,
    zIndex: 1,
  }
}));

export const BlogPostCard = ({ post }) => {
  const classes = useStyles();
  const mainCategory = post.tags[0]; // Get first tag as primary category

  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={`/blog/${post.id}`}>
        <CardMedia
          className={classes.cardMedia}
          image={`${process.env.PUBLIC_URL}${post.image}`}
          title={post.title}
        >
          <Chip 
            label={mainCategory} 
            className={classes.categoryChip} 
            size="small" 
          />
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography variant="body2" className={classes.dateText}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {post.title}
          </Typography>
          <Typography variant="body2" className={classes.summary}>
            {post.summary}
          </Typography>
          <div className={classes.chipContainer}>
            {post.tags.slice(1, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                className={classes.chip}
              />
            ))}
            {post.tags.length > 3 && (
              <Chip
                label={`+${post.tags.length - 3}`}
                size="small"
                variant="outlined"
              />
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};