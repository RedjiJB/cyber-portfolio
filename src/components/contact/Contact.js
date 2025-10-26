/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Typography, Box, Link, IconButton, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import DescriptionIcon from '@material-ui/icons/Description';

import './Contact.css';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "3em",
  },
  contactHeading: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'translateY(-2px)',
    },
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: 1000,
  },
  iconButton: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
    position: 'relative',
    zIndex: 1000,
  },
  resumeButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '30px',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: '#fff',
    transition: 'all 0.3s ease',
    boxShadow: theme.shadows[4],
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: theme.shadows[8],
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    },
  },
}));

export const Contact = () => {
  const classes = useStyles();
  const greetings = "Get in Touch";

  return (
    <section className={classes.main}>
      <Container component="main" maxWidth="md">
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center"
          textAlign="center"
        >
          <Typography variant="h4" className={classes.contactHeading}>
            <TextDecrypt text={greetings}/>
          </Typography>
          <Typography variant="body1" paragraph style={{ maxWidth: '600px', marginBottom: '3rem' }}>
            If you'd like to connect or learn more about my work, feel free to reach out via email or connect on social media.
          </Typography>
          
          {/* Email Contact */}
          <Box mb={4}>
            <Link 
              href="mailto:jredji429@gmail.com" 
              className={classes.socialLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '1.2rem', fontWeight: 500 }}
            >
              <i className="fab fa-google" style={{ fontSize: '1.8rem', marginRight: '12px', color: '#00bfbf' }}></i>
              jredji429@gmail.com
            </Link>
          </Box>
          
          {/* Social Icons - Larger and More Graceful */}
          <Box className={classes.socialIcons} style={{ 
            marginBottom: '2rem',
            justifyContent: 'center',
            gap: '24px'
          }}>
            <IconButton 
              aria-label="LinkedIn" 
              className={classes.iconButton}
              href="https://www.linkedin.com/in/redji-jean-baptiste-25b0471b7"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '3rem',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <LinkedInIcon style={{ fontSize: '3rem' }} />
            </IconButton>
            
            <IconButton 
              aria-label="GitHub" 
              className={classes.iconButton}
              href="https://github.com/RedjiJB"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '3rem',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <GitHubIcon style={{ fontSize: '3rem' }} />
            </IconButton>
          </Box>
          
          {/* TryHackMe Badge */}
          <Box mt={3} display="flex" justifyContent="center">
            <iframe 
              src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=4012776" 
              style={{ border: 'none', width: '400px', height: '60px' }}
              title="TryHackMe Badge"
            />
          </Box>
          
          {/* Resume Button */}
          <Button
            className={classes.resumeButton}
            variant="contained"
            startIcon={<DescriptionIcon />}
            onClick={() => window.open('/interactive-resume/index.html', '_blank')}
          >
            View Interactive Resume
          </Button>
        </Box>
      </Container>
    </section>
  );
};
