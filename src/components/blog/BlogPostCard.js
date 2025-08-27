import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActionArea, 
  Chip,
  Zoom,
  IconButton
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { BookmarkBorder, Bookmark, Share, ExpandMore } from '@material-ui/icons';

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
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-12px) scale(1.03)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)',
      '& $cardMedia': {
        transform: 'scale(1.08)',
        filter: 'brightness(1.1)',
      },
      '& $hoverOverlay': {
        opacity: 1,
      },
      '& $readingTime': {
        transform: 'translateY(0)',
        opacity: 1,
      },
      '& $actionButtons': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
    '&:active': {
      transform: 'translateY(-8px) scale(1.01)',
    },
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
    position: 'relative',
    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
      pointerEvents: 'none',
      transition: 'opacity 0.3s ease',
    },
  },
  hoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 2,
  },
  readMoreButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius * 2,
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'scale(1.05)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    fontWeight: 600,
    zIndex: 3,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      transform: 'scale(1.05)',
    },
  },
  actionButtons: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    opacity: 0,
    transform: 'translateX(-20px)',
    transition: 'all 0.3s ease',
    zIndex: 3,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: theme.palette.text.primary,
    width: '36px',
    height: '36px',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      transform: 'scale(1.1)',
    },
  },
  readingTime: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: theme.palette.text.primary,
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.8rem',
    fontWeight: 500,
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    zIndex: 3,
  },
  pulseAnimation: {
    animation: '$pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(63, 81, 181, 0.4)',
    },
    '70%': {
      boxShadow: '0 0 0 10px rgba(63, 81, 181, 0)',
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(63, 81, 181, 0)',
    },
  },
}));

export const BlogPostCard = ({ post, featured = false }) => {
  const classes = useStyles();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const mainCategory = post.tags[0]; // Get first tag as primary category
  const isComingSoon = post.comingSoon;
  const readingTime = post.readTime || `${Math.ceil((post.description?.length || 500) / 200)} min read`;

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.origin + `/blog/${post.slug}`,
      });
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  const CardContentComponent = () => (
    <>
      <CardMedia
        className={classes.cardMedia}
        image={`${process.env.PUBLIC_URL}${post.image}`}
        title={post.title}
      >
        <div className={classes.actionButtons}>
          <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <IconButton
              className={classes.actionButton}
              size="small"
              onClick={handleBookmark}
            >
              {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Zoom>
          <Zoom in={true} style={{ transitionDelay: '200ms' }}>
            <IconButton
              className={classes.actionButton}
              size="small"
              onClick={handleShare}
            >
              <Share />
            </IconButton>
          </Zoom>
        </div>
        
        <Chip 
          label={isComingSoon ? "Coming Soon" : mainCategory} 
          className={`${classes.categoryChip} ${featured ? classes.pulseAnimation : ''}`}
          size="small" 
        />
        
        <div className={classes.hoverOverlay}>
          <Typography className={classes.readMoreButton}>
            <ExpandMore style={{ marginRight: '4px' }} />
            Read Article
          </Typography>
        </div>
        
        <div className={classes.readingTime}>
          {readingTime}
        </div>
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
          {post.description}
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
    </>
  );

  return (
    <Card className={classes.card}>
      {isComingSoon ? (
        <div style={{ cursor: 'default' }}>
          <CardContentComponent />
        </div>
      ) : (
        <CardActionArea 
          component={Link} 
          to={`/blog/${post.slug}`}
          onClick={(e) => {
            console.log('BlogPost card clicked:', post.slug, `/blog/${post.slug}`);
          }}
        >
          <CardContentComponent />
        </CardActionArea>
      )}
    </Card>
  );
};

export default BlogPostCard;