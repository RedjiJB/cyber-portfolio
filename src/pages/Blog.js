import React, { useState, useEffect } from 'react';
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
import blogData from '../settings/blog.json';

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
  }
}));

export const Blog = () => {
  const classes = useStyles();
  const { posts } = blogData;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  
  // Extract unique categories from post tags
  const allTags = posts.reduce((tags, post) => [...tags, ...post.tags], []);
  const uniqueTags = ["All", ...new Set(allTags)];

  // Filter posts when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.tags.includes(selectedCategory)));
    }
  }, [selectedCategory, posts]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : posts[0];

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
            Explore my technical articles across AI, blockchain, cybersecurity, networking, and IoT
          </Typography>

          <Box className={classes.filterContainer}>
            {uniqueTags.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "contained" : "outlined"}
                color="primary"
                className={classes.filterButton}
                size="small"
              >
                {category}
              </Button>
            ))}
          </Box>
          
          {filteredPosts.length > 0 ? (
            <>
              {/* Featured post */}
              <BlogFeatured post={featuredPost} />
              
              {filteredPosts.length > 1 && (
                <>
                  <Divider className={classes.divider} />
                  
                  {/* Blog posts grid */}
                  <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={4}>
                      {filteredPosts.slice(1).map((post, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                          <BlogPostCard post={post} />
                        </Grid>
                      ))}
                    </Grid>
                  </Container>
                </>
              )}
            </>
          ) : (
            <Typography variant="h6" className={classes.noResultsMessage}>
              No articles found for this category.
            </Typography>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Blog;