/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Grid, Paper, Box, IconButton, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FirstName, LastName } from "../../utils/getName";
import { Link } from "react-router-dom";

import './About.css';

import profilePic from '../../assets/profile.JPG';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "auto",
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
  },
  skillsSection: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
  skillHeading: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  skillItem: {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  skillIcon: {
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.main,
    fontSize: '1.2rem',
  },
  skillDescription: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  skillCard: {
    padding: theme.spacing(3),
    height: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[8],
    },
    borderTop: `3px solid ${theme.palette.primary.main}`,
  },
  backgroundSection: {
    marginTop: theme.spacing(6),
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

export const About = () => {
  const classes = useStyles();
  const greetings = "About Me";
  
  const [textToShow, setTextToShow] = useState("bio");
  
  // Bio text reflects the resume's description and summary
  const aboutme = `I'm ${FirstName} ${LastName}, a Cybersecurity Analyst & AI Engineer based in Toronto, Canada. I protect digital systems through advanced threat analysis, vulnerability assessment, and AI-powered security solutions. My expertise spans security operations, incident response, and machine learning with a focus on developing robust defenses against evolving cyber threats.`;

  // Background text reflects education and current focus
  const background = `With a strong foundation in Computer Science from the University of Toronto and industry certifications including OSCP and GIAC, I specialize in implementing AI-driven security solutions that detect and mitigate threats in real-time. In 2024, I'm actively working on advanced security research projects including threat intelligence platforms, adversarial AI testing frameworks, and automated penetration testing tools.`;

  // Switch between bio and background every 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setTextToShow(textToShow === "bio" ? "background" : "bio");
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [textToShow]);

  return (
    <section className={classes.main}>
      <Container component="main" maxWidth="md">
        <div className="about">
          <Paper 
            elevation={3} 
            style={{ 
              borderRadius: '16px', 
              overflow: 'hidden', 
              marginBottom: '40px' 
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
                  <Typography component="h2" variant="h4" gutterBottom color="primary" style={{ fontWeight: 600 }}>
                    {greetings}
                  </Typography>
                  
                  <Typography variant="body1" component="p" className={classes.aboutText}>
                    {textToShow === "bio" ? aboutme : background}
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
                      href="/interactive-resume"
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

        <div className={classes.skillsSection}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Skills & Expertise
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-shield-alt ${classes.skillIcon}`}></i>
                  Cybersecurity Analysis
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Expert in threat intelligence, vulnerability assessment, incident response, security architecture, and risk management
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Threat Intelligence', 'SIEM', 'Incident Response', 'Vulnerability Assessment', 'Risk Management'].map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-tools ${classes.skillIcon}`}></i>
                  Security Tools
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Expert with industry-standard security tools including Nessus, Wireshark, Metasploit, Burp Suite, Kali Linux, and various SIEM platforms
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Nessus', 'Wireshark', 'Metasploit', 'Burp Suite', 'Kali Linux', 'Splunk'].map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-brain ${classes.skillIcon}`}></i>
                  AI & Machine Learning
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Advanced expertise in security-focused AI applications including anomaly detection, behavioral analysis, and NLP for threat detection
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Anomaly Detection', 'TensorFlow', 'PyTorch', 'Behavioral Analysis', 'NLP', 'Security Analytics'].map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-network-wired ${classes.skillIcon}`}></i>
                  Network Security
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Expert in firewall configuration, VPN implementation, network segmentation, traffic analysis, and secure network architecture
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Firewall Configuration', 'Traffic Analysis', 'Network Segmentation', 'IDS/IPS', 'Zero Trust'].map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-bug ${classes.skillIcon}`}></i>
                  Penetration Testing
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Advanced expertise in ethical hacking, vulnerability exploitation, web application testing, and security assessment methodologies
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['OSCP', 'Ethical Hacking', 'Web App Testing', 'Exploit Development', 'Security Assessments'].map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-code-branch ${classes.skillIcon}`}></i>
                  Secure Development
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Advanced knowledge in secure coding practices, code review for security vulnerabilities, DevSecOps, and OWASP secure coding standards
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Secure Coding', 'Code Review', 'DevSecOps', 'OWASP Top 10', 'SAST/DAST'].map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div className={classes.backgroundSection}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Key Projects
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-shield-alt ${classes.skillIcon}`}></i>
                  AI-Powered Security Operations Center
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  A comprehensive security operations platform using machine learning to detect, analyze, and respond to security threats in real-time (In Development, 2024)
                </Typography>
                <Chip label="In Development" size="small" style={{ backgroundColor: '#FFD700', color: '#333', margin: '8px 0' }} />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-virus ${classes.skillIcon}`}></i>
                  Advanced Malware Analysis Framework
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  An AI-powered system for automated analysis of malware samples, identifying patterns, behaviors, and potential attribution using machine learning
                </Typography>
                <Chip label="In Development" size="small" style={{ backgroundColor: '#FFD700', color: '#333', margin: '8px 0' }} />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-robot ${classes.skillIcon}`}></i>
                  Adversarial AI Testing Framework
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  A platform for testing AI model resilience against adversarial attacks and implementing defensive measures to protect machine learning systems
                </Typography>
                <Chip label="Planning Phase" size="small" style={{ backgroundColor: '#87CEEB', color: '#333', margin: '8px 0' }} />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-search ${classes.skillIcon}`}></i>
                  Threat Intelligence Platform
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  An AI-driven platform that collects, analyzes, and correlates threat data from multiple sources to provide actionable security intelligence
                </Typography>
                <Chip label="Completed" size="small" style={{ backgroundColor: '#90EE90', color: '#333', margin: '8px 0' }} />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-laptop-code ${classes.skillIcon}`}></i>
                  Automated Penetration Testing Framework
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  A comprehensive platform that automates vulnerability scanning, exploitation, and reporting for professional penetration testing engagements
                </Typography>
                <Chip label="Research" size="small" style={{ backgroundColor: '#BA55D3', color: 'white', margin: '8px 0' }} />
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div className={classes.backgroundSection}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Research Interests
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-user-secret ${classes.skillIcon}`}></i>
                  Threat Intelligence & Attribution
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Researching advanced persistent threats (APTs), cyber attribution techniques, and proactive threat hunting methodologies
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['APT Research', 'Cyber Attribution', 'Threat Hunting', 'Intelligence Analysis'].map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-unlock-alt ${classes.skillIcon}`}></i>
                  Vulnerability Research
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Exploring zero-day vulnerabilities, exploit development techniques, and advanced reverse engineering methodologies
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Zero-day Research', 'Exploit Development', 'Reverse Engineering', 'Binary Analysis'].map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-brain ${classes.skillIcon}`}></i>
                  AI Security
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Researching adversarial machine learning, securing AI systems from attacks, and developing robust AI models for security applications
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Adversarial ML', 'Model Security', 'Robust AI Systems', 'Security Analytics'].map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-shield-virus ${classes.skillIcon}`}></i>
                  Open Source Security Tools
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Contributing to and developing open source security tools, frameworks, and educational resources for the cybersecurity community
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['OWASP', 'Security Tools', 'Community Projects', 'Threat Sharing'].map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      color="primary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
};
