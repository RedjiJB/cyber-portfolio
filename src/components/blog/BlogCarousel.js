import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  IconButton, 
  Typography, 
  Paper,
  Container,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, PlayArrow, Pause } from '@material-ui/icons';
import { BlogPostCard } from './BlogPostCard';

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    position: 'relative',
    margin: theme.spacing(4, 0),
    padding: theme.spacing(2),
    background: theme.palette.type === 'dark' 
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.05) 100%)',
    borderRadius: theme.shape.borderRadius * 3,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      borderRadius: '2px',
    }
  },
  carouselHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  carouselTitle: {
    fontWeight: 700,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.5rem',
  },
  carouselControls: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  controlButton: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
    '&.Mui-disabled': {
      opacity: 0.3,
      transform: 'none',
    }
  },
  autoplayButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  },
  carouselTrack: {
    display: 'flex',
    transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
    gap: theme.spacing(2),
    padding: theme.spacing(1, 0),
  },
  carouselSlide: {
    minWidth: '300px',
    maxWidth: '350px',
    flex: '0 0 auto',
    [theme.breakpoints.down('sm')]: {
      minWidth: '280px',
      maxWidth: '280px',
    },
  },
  indicators: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    gap: theme.spacing(0.5),
  },
  indicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: theme.palette.divider,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      transform: 'scale(1.2)',
      boxShadow: `0 0 8px ${theme.palette.primary.main}`,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      transform: 'scale(1.1)',
    }
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.1s ease',
    borderRadius: '0 3px 0 0',
    opacity: 0.8,
  }
}));

export const BlogCarousel = ({ 
  posts = [], 
  title = "Featured Posts",
  autoplay = false,
  autoplayInterval = 5000,
  slidesToShow = 3
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const visibleSlides = isMobile ? 1 : isTablet ? 2 : slidesToShow;
  const maxIndex = Math.max(0, posts.length - visibleSlides);

  useEffect(() => {
    if (isAutoPlaying && posts.length > visibleSlides) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isAutoPlaying, posts.length, visibleSlides]);

  const startAutoplay = () => {
    stopAutoplay();
    let progressValue = 0;
    
    progressIntervalRef.current = setInterval(() => {
      progressValue += (100 / (autoplayInterval / 50));
      setProgress(progressValue);
    }, 50);

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev >= maxIndex ? 0 : prev + 1;
        setProgress(0);
        return nextIndex;
      });
    }, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
    if (isAutoPlaying) {
      setProgress(0);
      startAutoplay();
    }
  };

  const nextSlide = () => {
    goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  };

  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  const translateX = -(currentIndex * (100 / visibleSlides));

  return (
    <Container maxWidth="lg">
      <Paper className={classes.carouselContainer} elevation={0}>
        {isAutoPlaying && (
          <div 
            className={classes.progressBar} 
            style={{ width: `${progress}%` }}
          />
        )}
        
        <div className={classes.carouselHeader}>
          <Typography variant="h4" className={classes.carouselTitle}>
            {title}
          </Typography>
          <div className={classes.carouselControls}>
            <IconButton
              className={`${classes.controlButton} ${isAutoPlaying ? classes.autoplayButton : ''}`}
              onClick={toggleAutoplay}
              size="small"
            >
              {isAutoPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              className={classes.controlButton}
              onClick={prevSlide}
              disabled={currentIndex === 0 && !isAutoPlaying}
              size="small"
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              className={classes.controlButton}
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex && !isAutoPlaying}
              size="small"
            >
              <ArrowForwardIos />
            </IconButton>
          </div>
        </div>

        <Box style={{ overflow: 'hidden', borderRadius: theme.shape.borderRadius }}>
          <div 
            className={classes.carouselTrack}
            style={{
              transform: `translateX(${translateX}%)`,
              width: `${(posts.length / visibleSlides) * 100}%`
            }}
          >
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className={classes.carouselSlide}
                style={{ width: `${100 / posts.length}%` }}
              >
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
        </Box>

        {posts.length > visibleSlides && (
          <div className={classes.indicators}>
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <div
                key={index}
                className={`${classes.indicator} ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default BlogCarousel;