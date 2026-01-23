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
  Avatar,
  Grid
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { defaultSchema } from 'hast-util-sanitize';
import blogData from '../../utils/blogData';
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
    backgroundColor: theme.palette.type === 'dark' ? '#050914' : '#f5f6fb',
    color: theme.palette.text.primary,
    position: 'relative',
  },
  contentWrapper: {
    marginTop: '6rem',
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(0, 2),
  },
  hero: {
    padding: theme.spacing(5),
    borderRadius: theme.shape.borderRadius * 2,
    marginBottom: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    boxShadow: theme.shadows[8],
    color: '#fff',
  },
  heroLayer: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 60%)',
    opacity: 0.35,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
  },
  heroBadge: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    borderRadius: '999px',
    padding: theme.spacing(0.5, 2),
    backgroundColor: 'rgba(255,255,255,0.15)',
    border: `1px solid rgba(255,255,255,0.4)`,
    fontWeight: 700,
    letterSpacing: '0.08em',
    fontSize: '0.8rem',
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
    gap: theme.spacing(1.5),
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tag: {
    margin: theme.spacing(0.5),
    background: 'rgba(255,255,255,0.18)',
    color: '#fff',
    fontWeight: 600,
  },
  heroStats: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
  },
  heroStat: {
    minWidth: 140,
    padding: theme.spacing(1.25, 2.5),
    borderRadius: 999,
    background: 'rgba(255,255,255,0.12)',
    border: `1px solid rgba(255,255,255,0.3)`,
    textAlign: 'center',
  },
  heroStatLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    opacity: 0.8,
  },
  heroStatValue: {
    fontSize: '1rem',
    fontWeight: 700,
    marginTop: theme.spacing(0.25),
  },
  phaseGrid: {
    marginBottom: theme.spacing(4),
  },
  phaseCard: {
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 1.2,
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[4],
    minHeight: 220,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
  phaseDuration: {
    fontSize: '0.85rem',
    color: theme.palette.text.secondary,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  phaseTitle: {
    fontWeight: 700,
    fontSize: '1.1rem',
  },
  phaseEssence: {
    fontSize: '0.95rem',
    color: theme.palette.text.secondary,
  },
  phaseBullet: {
    fontSize: '0.9rem',
    lineHeight: 1.6,
  },
  contentPanel: {
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 1.5,
    background: theme.palette.type === 'dark' ? '#0b111f' : '#ffffff',
    boxShadow: theme.shadows[4],
    border: `1px solid ${theme.palette.divider}`,
  },
  markdownContent: {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    color: theme.palette.text.primary,
    '& h1, & h2, & h3': {
      color: theme.palette.primary.main,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    '& a': {
      color: theme.palette.primary.light,
      textDecoration: 'none',
      borderBottom: `1px dashed ${theme.palette.primary.light}55`,
    },
    '& a:hover': {
      textDecoration: 'underline',
    },
    '& blockquote': {
      borderLeft: `4px solid ${theme.palette.secondary.main}`,
      background: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      padding: theme.spacing(1, 2),
      margin: theme.spacing(2, 0),
      fontStyle: 'italic',
    },
    '& pre': {
      background: theme.palette.type === 'dark' ? '#111' : '#f5f5f5',
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      overflowX: 'auto',
    },
    '& code': {
      background: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      padding: '0.2em 0.4em',
      borderRadius: 4,
    },
    '& ul, & ol': {
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    '& img': {
      maxWidth: '100%',
      borderRadius: theme.shape.borderRadius,
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      margin: theme.spacing(2, 0),
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      border: `1px solid ${theme.palette.divider}`,
    },
    '& th': {
      backgroundColor: theme.palette.type === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.08)',
      padding: theme.spacing(1.5),
      textAlign: 'left',
      fontWeight: 600,
      borderBottom: `2px solid ${theme.palette.divider}`,
      color: theme.palette.text.primary,
    },
    '& td': {
      padding: theme.spacing(1.5),
      borderBottom: `1px solid ${theme.palette.divider}`,
      color: theme.palette.text.primary,
    },
    '& tr:nth-child(even)': {
      backgroundColor: theme.palette.type === 'dark'
        ? 'rgba(255, 255, 255, 0.02)'
        : 'rgba(0, 0, 0, 0.02)',
    },
    '& tr:hover': {
      backgroundColor: theme.palette.type === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.05)',
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
  const { slug } = useParams();
  // Find post by slug
  const post = blogData.posts.find(p => p.slug === slug || p.id === slug);
  
  // Add loadContent flag for posts with markdown files using useMemo
  const postWithFlags = React.useMemo(() => {
    const postsWithMarkdown = [
      'msi-thin-15-experience',
      'subnet-designer-project-start', 
      'haiti-security-missions',
      'drone-zoe-platform',
      'os-sentinel-initiative'
    ];
    
    return post && postsWithMarkdown.includes(post.slug) 
      ? { ...post, loadContent: true }
      : post;
  }, [post]);
  const [markdownContent, setMarkdownContent] = useState('');
  
  // Extend sanitize schema to allow GFM tables, images, and code classes
  const sanitizeSchema = React.useMemo(() => {
    const schema = { ...defaultSchema };
    schema.tagNames = [
      ...(defaultSchema.tagNames || []),
      'table',
      'thead',
      'tbody',
      'tr',
      'td',
      'th',
      'del',
      'input',
      'sup',
      'sub',
      'section',
      'hr'
    ];
    schema.attributes = {
      ...(defaultSchema.attributes || {}),
      table: [
        ...((defaultSchema.attributes && defaultSchema.attributes.table) || []),
        'className'
      ],
      td: [
        ...((defaultSchema.attributes && defaultSchema.attributes.td) || []),
        'colspan',
        'rowspan',
        'align'
      ],
      input: [
        'type',
        'checked',
        'disabled'
      ],
      th: [
        ...((defaultSchema.attributes && defaultSchema.attributes.th) || []),
        'colspan',
        'rowspan',
        'align'
      ],
      img: [
        ...((defaultSchema.attributes && defaultSchema.attributes.img) || []),
        'src',
        'alt',
        'title',
        'width',
        'height'
      ],
      code: [
        ...((defaultSchema.attributes && defaultSchema.attributes.code) || []),
        ['className', /^language-/]
      ]
    };
    return schema;
  }, []);

  useEffect(() => {
    const slugToFileMap = {
      'msi-thin-15-experience': 'msi-thin-15-experience.md',
      'subnet-designer-project-start': 'subnet-designer-project-start.md', 
      'haiti-security-missions': 'blog_post_1.md',
      'drone-zoe-platform': 'drone-zoe-platform.md',
      'os-sentinel-initiative': 'os-sentinel-initiative.md'
    };

    const loadContent = async () => {
      if (postWithFlags) {
        if (postWithFlags.loadContent) {
          try {
            // If the post is coming soon, return placeholder
            if (postWithFlags.comingSoon) {
              setMarkdownContent(`# ${postWithFlags.title}

**Coming Soon**

This article is currently being written and will be available soon. Check back later for the full content.`);
              return;
            }
            
            const filename = slugToFileMap[postWithFlags.slug];
            if (filename) {
              const response = await fetch(`${process.env.PUBLIC_URL}/content/blog/posts/${filename}`);
              if (response.ok) {
                const content = await response.text();
                setMarkdownContent(content);
              } else {
                throw new Error('Failed to fetch content');
              }
            } else {
              throw new Error('No file mapping found');
            }
          } catch (error) {
            console.error('Error loading post content:', error);
            setMarkdownContent(`# Error Loading Content

Sorry, we couldn't load this blog post. Please try again later.`);
          }
        } else if (postWithFlags.content) {
          setMarkdownContent(postWithFlags.content);
        } else {
          // Generate placeholder content
          setMarkdownContent(`# ${postWithFlags.title}

${postWithFlags.description}

## Overview

This is a comprehensive article about ${postWithFlags.title.toLowerCase()}. The content covers key concepts and practical insights related to ${postWithFlags.tags.join(', ')}.

## Key Topics

${postWithFlags.tags.map(tag => `- **${tag}**: Detailed exploration of ${tag.toLowerCase()} concepts and applications`).join('\n')}

## Conclusion

This article provides valuable insights into ${postWithFlags.category.toLowerCase()} and related technologies, offering both theoretical understanding and practical guidance.

---

*Published on ${new Date(postWithFlags.date).toLocaleDateString()} by ${postWithFlags.author}*`);
        }
      }
    };

    loadContent();
  }, [postWithFlags]);

  if (!postWithFlags) {
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

  const heroStats = postWithFlags.heroStats || [
    { label: 'Category', value: postWithFlags.category },
    { label: 'Reading Time', value: `${postWithFlags.readingTime || 10} min read` },
    { label: 'Published', value: new Date(postWithFlags.date).toLocaleDateString() }
  ];
  const phaseHighlights = postWithFlags.phaseHighlights || [];
  const heroSummary = postWithFlags.summary || postWithFlags.description;

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
            <div className={classes.heroLayer} />
            <div className={classes.heroContent}>
              <Typography variant="h3" component="h1" gutterBottom>
                {postWithFlags.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {heroSummary}
              </Typography>
              <div className={classes.meta}>
                <Avatar alt={postWithFlags.author} src="/assets/profile.JPG" />
                <Typography variant="subtitle1">{postWithFlags.author}</Typography>
                <Typography variant="subtitle2">{new Date(postWithFlags.date).toLocaleDateString()}</Typography>
                {postWithFlags.tags && postWithFlags.tags.map((tag) => (
                  <Chip key={tag} label={tag} className={classes.tag} />
                ))}
              </div>
              {postWithFlags.image && (
                <Box style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <img src={`${process.env.PUBLIC_URL}${postWithFlags.image}`} alt={postWithFlags.title} className={classes.headerImage} />
                </Box>
              )}
              <Box className={classes.heroStats}>
                {heroStats.map((stat) => (
                  <div key={stat.label} className={classes.heroStat}>
                    <Typography className={classes.heroStatLabel}>{stat.label}</Typography>
                    <Typography className={classes.heroStatValue}>{stat.value}</Typography>
                  </div>
                ))}
              </Box>
            </div>
            {postWithFlags.heroBadge && (
              <span className={classes.heroBadge}>{postWithFlags.heroBadge}</span>
            )}
          </Paper>
          {phaseHighlights.length > 0 && (
            <Grid container spacing={3} className={classes.phaseGrid}>
              {phaseHighlights.map((phase) => (
                <Grid item xs={12} md={4} key={phase.title}>
                  <Box className={classes.phaseCard}>
                    <Typography className={classes.phaseDuration}>{phase.duration}</Typography>
                    <Typography className={classes.phaseTitle}>{phase.title}</Typography>
                    <Typography className={classes.phaseEssence}>{phase.essence}</Typography>
                    <ul>
                      {phase.bullets && phase.bullets.map((bullet) => (
                        <li key={bullet} className={classes.phaseBullet}>{bullet}</li>
                      ))}
                    </ul>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
          <Paper className={classes.contentPanel} elevation={0}>
            <div className={classes.markdownContent}>
              <ReactMarkdown 
                rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
                linkTarget="_blank"
                components={{
                  img: ({src, alt, ...props}) => (
                    <img 
                      src={src.startsWith('/') ? `${process.env.PUBLIC_URL}${src}` : src} 
                      alt={alt} 
                      style={{maxWidth: '100%', height: 'auto'}} 
                      {...props} 
                    />
                  )
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
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
