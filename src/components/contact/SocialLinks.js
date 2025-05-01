import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, IconButton, Tooltip, Paper, Box } from '@material-ui/core';
import { resumeApi } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  socialGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  socialItem: {
    padding: theme.spacing(3),
    textAlign: 'center',
    width: '160px',
    transition: 'all 0.3s ease',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[8],
      '& $socialIcon': {
        color: theme.palette.primary.main,
      },
    },
  },
  socialIcon: {
    fontSize: '2.5rem',
    color: theme.palette.text.secondary,
    transition: 'all 0.3s ease',
    marginBottom: theme.spacing(1),
  },
  socialNetwork: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  socialUsername: {
    fontStyle: 'italic',
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: theme.spacing(3),
    position: 'relative',
    paddingBottom: theme.spacing(1),
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 40,
      height: 3,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const SocialLinks = () => {
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch resume data to get social profiles
    const fetchProfiles = async () => {
      try {
        const response = await resumeApi.getData();
        if (response.data && response.data.data && response.data.data.basics) {
          setProfiles(response.data.data.basics.profiles || []);
        }
      } catch (error) {
        console.error('Error fetching social profiles:', error);
        // Fallback to hardcoded profiles if API fails
        setProfiles([
          {
            network: "Email",
            username: "jredji429@gmail.com",
            url: "mailto:jredji429@gmail.com",
            icon: "fas fa-envelope"
          },
          {
            network: "Discord",
            username: "uncleruckus9003",
            url: "https://discord.com/users/uncleruckus9003",
            icon: "fab fa-discord"
          },
          {
            network: "Telegram",
            username: "RedjiJB",
            url: "https://t.me/RedjiJB",
            icon: "fab fa-telegram"
          },
          {
            network: "LinkedIn",
            username: "redji-jean-baptiste",
            url: "https://www.linkedin.com/in/redji-jean-baptiste-25b0471b7",
            icon: "fab fa-linkedin"
          },
          {
            network: "GitHub",
            username: "RedjiJB",
            url: "https://github.com/RedjiJB",
            icon: "fab fa-github"
          },
          {
            network: "GitLab",
            username: "RedjiJB",
            url: "https://gitlab.com/RedjiJB",
            icon: "fab fa-gitlab"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <Typography>Loading social links...</Typography>;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" className={classes.title}>
        Connect With Me
      </Typography>
      
      <Box className={classes.socialGrid}>
        {profiles.map((profile, index) => (
          <Paper key={index} className={classes.socialItem} elevation={3}>
            <Tooltip title={`Connect on ${profile.network}`}>
              <IconButton 
                component="a" 
                href={profile.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Connect on ${profile.network}`}
              >
                <Box textAlign="center">
                  <i className={`${profile.icon} ${classes.socialIcon}`} />
                  <Typography variant="subtitle1" className={classes.socialNetwork}>
                    {profile.network}
                  </Typography>
                  <Typography variant="body2" className={classes.socialUsername}>
                    {profile.username}
                  </Typography>
                </Box>
              </IconButton>
            </Tooltip>
          </Paper>
        ))}
      </Box>
    </div>
  );
};

export default SocialLinks;