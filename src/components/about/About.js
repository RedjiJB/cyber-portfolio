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
  experienceSection: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
  experienceCard: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[8],
    },
    borderLeft: `3px solid ${theme.palette.primary.main}`,
  },
  experienceTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  experienceCompany: {
    fontWeight: 500,
    marginBottom: theme.spacing(0.5),
  },
  experienceDate: {
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
    marginBottom: theme.spacing(1),
  },
  experienceDescription: {
    marginTop: theme.spacing(1),
  },
}));

export const About = () => {
  const classes = useStyles();
  const greetings = "About Me";
  
  // Bio text reflects the resume's description and summary
  const aboutme = `I'm ${FirstName} ${LastName}, a Cybersecurity Analyst based in Toronto, Canada. I protect digital systems through advanced threat analysis, vulnerability assessment, and AI-powered security solutions. My background is self-taught and open source, with a focus on developing robust defenses against evolving cyber threats.`;

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

        <div className={classes.skillsSection}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Skills & Knowledge
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-shield-alt ${classes.skillIcon}`}></i>
                  Cybersecurity Analysis
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Familiar with threat intelligence, vulnerability assessment, incident response, security architecture, and risk management, applying these concepts in open source and self-driven projects.
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
                  Hands-on experience with industry-standard security tools such as Nessus, Wireshark, Metasploit, Burp Suite, Kali Linux, and SIEM platforms, gained through practical exploration and open source work.
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
                  Applied security-focused AI concepts including anomaly detection, behavioral analysis, and NLP for threat detection in personal and collaborative projects.
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
                  Comfortable with firewall configuration, VPN implementation, network segmentation, traffic analysis, and designing secure network architectures.
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
                  Explored ethical hacking, vulnerability exploitation, web application testing, and security assessment methodologies through self-guided learning and open source contributions.
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
                  Practiced secure coding, code review for vulnerabilities, DevSecOps, and OWASP secure coding standards in both personal and collaborative environments.
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
                  A comprehensive security operations platform using machine learning to detect, analyze, and respond to security threats in real-time
                </Typography>
                <Chip 
                  label="In Progress" 
                  size="small" 
                  style={{ backgroundColor: '#4CAF50', color: '#fff', margin: '8px 0' }} 
                  icon={<i className="fas fa-hammer" style={{ fontSize: '0.8rem' }} />}
                />
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
                <Chip 
                  label="Planning" 
                  size="small" 
                  style={{ backgroundColor: '#FF9800', color: '#fff', margin: '8px 0' }} 
                  icon={<i className="fas fa-clock" style={{ fontSize: '0.8rem' }} />}
                />
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
                <Chip 
                  label="Planning" 
                  size="small" 
                  style={{ backgroundColor: '#FF9800', color: '#fff', margin: '8px 0' }} 
                  icon={<i className="fas fa-clock" style={{ fontSize: '0.8rem' }} />}
                />
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
                <Chip 
                  label="Planning" 
                  size="small" 
                  style={{ backgroundColor: '#FF9800', color: '#fff', margin: '8px 0' }} 
                  icon={<i className="fas fa-clock" style={{ fontSize: '0.8rem' }} />}
                />
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
                <Chip 
                  label="In Progress" 
                  size="small" 
                  style={{ backgroundColor: '#4CAF50', color: '#fff', margin: '8px 0' }} 
                  icon={<i className="fas fa-hammer" style={{ fontSize: '0.8rem' }} />}
                />
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

        <div className={classes.experienceSection}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Professional Experience
          </Typography>

          <Paper className={classes.experienceCard} elevation={2}>
            <Typography variant="h6" className={classes.experienceTitle}>
              Guest Services Security
            </Typography>
            <Typography variant="subtitle1" className={classes.experienceCompany}>
              One King West Hotel & Residence
            </Typography>
            <Typography variant="body2" className={classes.experienceDate}>
              July 2024 - April 2025
            </Typography>
            <Typography variant="body1" className={classes.experienceDescription}>
              Provided comprehensive security services and guest assistance in a luxury hotel environment. Utilized advanced surveillance technology, maintained detailed security logs, and delivered professional guest services while maintaining security protocols.
            </Typography>
          </Paper>

          <Paper className={classes.experienceCard} elevation={2}>
            <Typography variant="h6" className={classes.experienceTitle}>
              Security Officer
            </Typography>
            <Typography variant="subtitle1" className={classes.experienceCompany}>
              Great Canadian Entertainment
            </Typography>
            <Typography variant="body2" className={classes.experienceDate}>
              December 2022 - April 2023
            </Typography>
            <Typography variant="body1" className={classes.experienceDescription}>
              Managed security operations in a high-traffic entertainment complex. Coordinated patrols, monitored CCTV systems, and implemented security protocols for VIP events while collaborating with law enforcement.
            </Typography>
          </Paper>

          <Paper className={classes.experienceCard} elevation={2}>
            <Typography variant="h6" className={classes.experienceTitle}>
              Security Guard
            </Typography>
            <Typography variant="subtitle1" className={classes.experienceCompany}>
              Iron Horse Security & Investigations
            </Typography>
            <Typography variant="body2" className={classes.experienceDate}>
              September 2020 - November 2025
            </Typography>
            <Typography variant="body1" className={classes.experienceDescription}>
              Provided comprehensive security services across multiple locations. Managed operations for diverse properties, conducted risk assessments, and implemented enhanced security protocols while utilizing advanced surveillance technology.
            </Typography>
          </Paper>
        </div>
      </Container>
    </section>
  );
};
