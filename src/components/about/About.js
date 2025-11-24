/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Grid, Paper, Box, IconButton, Chip } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FirstName, LastName } from "../../utils/getName";
import { Link } from "react-router-dom";

import './About.css';

import profilePic from '../../assets/profile.JPG';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "auto",
    '& *': {
      textShadow: theme.palette.type === 'dark'
        ? '0 0 8px rgba(255, 255, 255, 0.15)'
        : '0 0 5px rgba(0, 0, 0, 0.05)',
    },
  },
  contactButton: {
    marginTop: theme.spacing(3),
    borderRadius: 25,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '10px 20px',
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '& i': {
      marginRight: theme.spacing(1),
    },
    position: 'relative',
    zIndex: 1000,
  },
  resumeButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    borderRadius: 25,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: '10px 20px',
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
    '& i': {
      marginRight: theme.spacing(1),
    },
    position: 'relative',
    zIndex: 1000,
  },
  aboutText: {
    lineHeight: 1.8,
    fontSize: '1.1rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    textShadow: theme.palette.type === 'dark'
      ? '0 0 8px rgba(255, 255, 255, 0.15)'
      : '0 0 5px rgba(0, 0, 0, 0.05)',
  },
  skillsSection: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
  skillHeading: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: 600,
    textShadow: theme.palette.type === 'dark'
      ? '0 0 10px rgba(0, 191, 191, 0.4), 0 0 20px rgba(0, 191, 191, 0.2)'
      : '0 0 8px rgba(33, 150, 243, 0.3)',
  },
  skillItem: {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    textShadow: theme.palette.type === 'dark'
      ? '0 0 8px rgba(255, 255, 255, 0.2)'
      : '0 0 5px rgba(0, 0, 0, 0.05)',
  },
  skillIcon: {
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.main,
    fontSize: '1.2rem',
  },
  skillDescription: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(3),
    textShadow: theme.palette.type === 'dark'
      ? '0 0 8px rgba(255, 255, 255, 0.15)'
      : '0 0 5px rgba(0, 0, 0, 0.05)',
  },
  skillCard: {
    padding: theme.spacing(3),
    height: '100%',
    transition: 'all 0.3s ease',
    backgroundColor: theme.palette.type === 'dark' 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[8],
    },
    borderTop: `3px solid ${theme.palette.primary.main}`,
    '& *': {
      textShadow: theme.palette.type === 'dark'
        ? '0 0 8px rgba(255, 255, 255, 0.15)'
        : '0 0 5px rgba(0, 0, 0, 0.05)',
    },
  },
  backgroundSection: {
    marginTop: theme.spacing(6),
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    textShadow: theme.palette.type === 'dark'
      ? '0 0 10px rgba(0, 191, 191, 0.4), 0 0 20px rgba(0, 191, 191, 0.2)'
      : '0 0 8px rgba(33, 150, 243, 0.3)',
  },
  experienceSection: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
  experienceCard: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    transition: 'all 0.3s ease',
    backgroundColor: theme.palette.type === 'dark' 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[8],
    },
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    '& *': {
      textShadow: theme.palette.type === 'dark'
        ? '0 0 8px rgba(255, 255, 255, 0.15)'
        : '0 0 5px rgba(0, 0, 0, 0.05)',
    },
  },
  experienceTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    textShadow: theme.palette.type === 'dark'
      ? '0 0 10px rgba(0, 191, 191, 0.3), 0 0 15px rgba(0, 191, 191, 0.2)'
      : '0 0 8px rgba(33, 150, 243, 0.2)',
  },
  experienceCompany: {
    fontWeight: 500,
    marginBottom: theme.spacing(0.5),
    textShadow: theme.palette.type === 'dark'
      ? '0 0 8px rgba(255, 255, 255, 0.2)'
      : '0 0 5px rgba(0, 0, 0, 0.05)',
  },
  experienceDate: {
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
    marginBottom: theme.spacing(1),
    textShadow: theme.palette.type === 'dark'
      ? '0 0 8px rgba(255, 255, 255, 0.15)'
      : '0 0 5px rgba(0, 0, 0, 0.05)',
  },
  experienceDescription: {
    marginTop: theme.spacing(1),
    textShadow: theme.palette.type === 'dark'
      ? '0 0 8px rgba(255, 255, 255, 0.15)'
      : '0 0 5px rgba(0, 0, 0, 0.05)',
  },
}));

export const About = () => {
  const classes = useStyles();
  const theme = useTheme();
  const greetings = "About Me";
  
  // Bio text reflects the resume's description and summary
  const aboutme = `I am a Co-operative education student at Algonquin College in the Computer Systems Technician - Networking (1560X03FWO) program. I'm learning network administration, cybersecurity fundamentals, system configuration, and IT infrastructure management. My goal is to build a career in IT, focusing on protecting digital assets and implementing secure network solutions.`;

  return (
    <section className={classes.main}>
      <Container component="main" maxWidth="md">
        <div className="about">
          <Paper 
            elevation={3} 
            style={{ 
              borderRadius: '16px', 
              overflow: 'hidden', 
              marginBottom: '40px',
              backgroundColor: theme.palette.type === 'dark' 
                ? 'rgba(0, 0, 0, 0.3)' 
                : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box p={4}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    position: 'relative', 
                    display: 'inline-block',
                    padding: '5px'
                  }}>
                    <div style={{
                      width: '200px',
                      height: '200px',
                      border: `3px solid #00bfbf`,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      margin: '0 auto',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <img 
                        src={profilePic} 
                        alt="Redji Jean Baptiste" 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                        }} 
                      />
                    </div>
                    
                    <Box mt={2} display="flex" justifyContent="center">
                      <a href="mailto:jredji429@gmail.com" style={{ margin: '0 8px' }}>
                        <IconButton color="primary" aria-label="Gmail">
                          <i className="fab fa-google"></i>
                        </IconButton>
                      </a>
                      <a href="https://www.linkedin.com/in/redji-jean-baptiste-25b0471b7" target="_blank" rel="noopener noreferrer" style={{ margin: '0 8px' }}>
                        <IconButton color="primary" aria-label="LinkedIn">
                          <i className="fab fa-linkedin-in"></i>
                        </IconButton>
                      </a>
                      <a href="https://github.com/RedjiJB" target="_blank" rel="noopener noreferrer" style={{ margin: '0 8px' }}>
                        <IconButton color="primary" aria-label="GitHub">
                          <i className="fab fa-github"></i>
                        </IconButton>
                      </a>
                      <a href="https://t.me/RedjiJB" target="_blank" rel="noopener noreferrer" style={{ margin: '0 8px' }}>
                        <IconButton color="primary" aria-label="Telegram">
                          <i className="fab fa-telegram"></i>
                        </IconButton>
                      </a>
                    </Box>
                  </div>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" component="p" className={classes.aboutText}>
                    {aboutme}
                  </Typography>
                  
                  <Box mt={3} display="flex" flexWrap="wrap">
                    <Button 
                      component={Link}
                      to="/contact"
                      variant="contained" 
                      className={classes.contactButton}
                      startIcon={<i className="fas fa-terminal"></i>}
                    >
                      Get In Touch
                    </Button>
                    <Button 
                      component="a"
                      href={process.env.PUBLIC_URL + "/interactive-resume"}
                      variant="contained" 
                      className={classes.resumeButton}
                      startIcon={<i className="fas fa-file-alt"></i>}
                      target="_blank"
                    >
                      Resume
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </div>
      </Container>
    </section>
  );
};
