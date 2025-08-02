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
            Current Skills (Level 1)
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-network-wired ${classes.skillIcon}`}></i>
                  Networking Fundamentals
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Learning core networking concepts including OSI model, TCP/IP, IPv4 subnetting, VLSM, and simple LAN design through hands-on labs and Packet Tracer simulations.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['OSI Model', 'TCP/IP', 'IPv4 Subnetting', 'VLSM', 'LAN Design', 'Packet Tracer'].map((tech) => (
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
                  <i className={`fab fa-windows ${classes.skillIcon}`}></i>
                  Windows Desktop Support
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Hands-on experience with Windows 10/11 installation, local Group Policy configuration, NTFS permissions, PowerShell basics, and workgroup configuration.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Windows 10/11', 'Local GPO', 'NTFS Permissions', 'PowerShell', 'Workgroup Config'].map((tech) => (
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
                  <i className={`fab fa-linux ${classes.skillIcon}`}></i>
                  GNU/Linux System Support
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Comfortable with Bash command line interface, user/group management, file permissions, basic shell scripting, and Netplan networking configuration.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Bash CLI', 'User/Group Management', 'File Permissions', 'Shell Scripting', 'Netplan'].map((tech) => (
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
                  <i className={`fas fa-calculator ${classes.skillIcon}`}></i>
                  Numeracy & Logic
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Strong foundation in binary, hexadecimal, and decimal number system conversions, Boolean algebra, truth tables, and introductory probability concepts.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Binary/Hex/Decimal', 'Boolean Algebra', 'Truth Tables', 'Probability'].map((tech) => (
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
                  <i className={`fas fa-comments ${classes.skillIcon}`}></i>
                  Professional Communication
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Developing technical writing skills, incident documentation, professional email etiquette, and presentation abilities for IT environments.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Technical Writing', 'Incident Documentation', 'Email Etiquette', 'Presentations'].map((tech) => (
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
                  <i className={`fab fa-python ${classes.skillIcon}`}></i>
                  Programming Fundamentals
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Learning Python programming basics including data types, loops, functions, error handling, and pseudocode development for automation tasks.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Python', 'Data Types', 'Loops', 'Functions', 'Error Handling', 'Pseudocode'].map((tech) => (
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

        <div className={classes.skillsSection}>
          <Typography variant="h5" className={classes.sectionTitle}>
            In-Progress Skills (Winter 2026)
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-server ${classes.skillIcon}`}></i>
                  Windows Domain Administration
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Currently learning Active Directory, Group Policy management, PowerShell automation, and Windows Server roles as part of CST 8200 coursework.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Active Directory', 'Group Policy', 'PowerShell Automation', 'Windows Server'].map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="secondary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
                <Chip 
                  label="In Progress" 
                  size="small" 
                  style={{ backgroundColor: '#FF9800', color: '#fff', marginTop: '8px' }}
                />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-route ${classes.skillIcon}`}></i>
                  Routing & Switching Fundamentals
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Advancing into VLANs, trunking, Spanning Tree Protocol, inter-VLAN routing, and small-office Wi-Fi configuration through upcoming coursework.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['VLANs', 'Trunking', 'STP', 'Inter-VLAN Routing', 'Wi-Fi'].map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="secondary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
                <Chip 
                  label="In Progress" 
                  size="small" 
                  style={{ backgroundColor: '#FF9800', color: '#fff', marginTop: '8px' }}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div className={classes.backgroundSection}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Current Projects
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-network-wired ${classes.skillIcon}`}></i>
                  Subnet Designer & Visualizer
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Python tool that calculates VLSM subnet schemes and produces LAN topology diagrams. Reinforces OSI/TCP-IP knowledge and IPv4 addressing from CST 8182.
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
                  <i className={`fab fa-windows ${classes.skillIcon}`}></i>
                  Windows 11 Secure Build Guide
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Hardened Windows 11 VM with local GPOs, NTFS permissions and PowerShell scripts for automated baseline deployment. Mirrors skills from CST 8202.
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
                  <i className={`fab fa-linux ${classes.skillIcon}`}></i>
                  Linux Essentials Lab Book
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  GitHub repo of step-by-step Bash labs that cover user/group management, file permissions and shell-scripting automation—direct output of CST 8207.
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
                  <i className={`fas fa-calculator ${classes.skillIcon}`}></i>
                  Interactive Number-System Converter
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  CLI program that converts binary ↔ decimal ↔ hex and demonstrates Boolean logic routines learned in MAT 8002 and CST 8324.
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
            Career Interests & Goals
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-shield-alt ${classes.skillIcon}`}></i>
                  Blue-Team Security Operations
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Building resilient detection pipelines and hands-on incident-response playbooks for enterprise and small networks.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['SOC', 'SIEM', 'Incident Response', 'Detection Engineering'].map((area) => (
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
                  <i className={`fas fa-robot ${classes.skillIcon}`}></i>
                  Network Automation & Infrastructure-as-Code
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Eliminating manual toil by codifying network configs with Python, Ansible, and Terraform.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Python', 'Ansible', 'Terraform', 'CI/CD'].map((area) => (
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
                  <i className={`fas fa-lock ${classes.skillIcon}`}></i>
                  Zero-Trust / SASE Architectures
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Designing identity-centric, segmented networks for hybrid-cloud environments in line with NIST 800-207.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Zero Trust', 'SASE', 'Micro-Segmentation', 'NIST 800-207'].map((area) => (
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
                  <i className={`fas fa-cloud ${classes.skillIcon}`}></i>
                  Cloud & Container Security
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Hardening AWS, Azure, and Kubernetes workloads from build to runtime with DevSecOps practices.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['AWS', 'Azure', 'Kubernetes', 'DevSecOps'].map((area) => (
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

        <div className={classes.backgroundSection}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Planned Certifications
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-certificate ${classes.skillIcon}`}></i>
                  Foundation 2025-26
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Building core cybersecurity and networking certifications to establish professional foundation.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['CompTIA Security+', 'Cisco CyberOps Associate'].map((cert) => (
                    <Chip
                      key={cert}
                      label={cert}
                      color="secondary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-shield-alt ${classes.skillIcon}`}></i>
                  Blue-Team Depth 2026-27
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Advanced defensive security certifications focusing on analysis and operations.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['CySA+', 'CyberOps Professional', 'PCNSE', 'NSE 4-6'].map((cert) => (
                    <Chip
                      key={cert}
                      label={cert}
                      color="secondary"
                      size="small"
                      style={{ margin: '0 4px 4px 0' }}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper className={classes.skillCard} elevation={2}>
                <Typography variant="h6" className={classes.skillItem}>
                  <i className={`fas fa-graduation-cap ${classes.skillIcon}`}></i>
                  Architect-Path 2028-29
                </Typography>
                <Typography variant="body1" className={classes.skillDescription}>
                  Senior-level certifications for security architecture and advanced specializations.
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['CASP+', 'GIAC Certs', 'CISSP', 'CCSP'].map((cert) => (
                    <Chip
                      key={cert}
                      label={cert}
                      color="secondary"
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
              Security Officer
            </Typography>
            <Typography variant="subtitle1" className={classes.experienceCompany}>
              One King West Hotel & Residence
            </Typography>
            <Typography variant="body2" className={classes.experienceDate}>
              July 2024 - April 2025
            </Typography>
            <Typography variant="body1" className={classes.experienceDescription}>
              Provided comprehensive security services and guest assistance in a 51-story luxury hotel environment, serving 400+ residences and hotel guests daily while maintaining 4-star service standards. Utilized advanced surveillance technology including 80+ CCTV cameras, biometric access control systems, and integrated alarm monitoring. Responded to emergency situations with average response time under 2 minutes and conducted regular security audits identifying potential risks.
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
              Engaged in security operations in a high-traffic entertainment complex serving 5,000+ daily visitors across gaming floors, restaurants, and event spaces. Coordinated hourly patrols covering 200,000 sq ft of property and monitored 50+ CCTV cameras. Implemented security protocols for VIP events hosting up to 1,000 guests and trained junior security staff on company protocols.
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
              September 2020 - November 2022
            </Typography>
            <Typography variant="body1" className={classes.experienceDescription}>
              Provided comprehensive security services across 15+ client locations including commercial complexes, construction sites, retail establishments, and public events. Engaged in security operations for diverse properties ranging from 10,000 to 500,000 sq ft, adapting security strategies to match unique client needs. Conducted detailed risk assessments and implemented enhanced security protocols that reduced theft incidents.
            </Typography>
          </Paper>

          <Paper className={classes.experienceCard} elevation={2}>
            <Typography variant="h6" className={classes.experienceTitle}>
              Associate
            </Typography>
            <Typography variant="subtitle1" className={classes.experienceCompany}>
              UTSC Student Managed Fund
            </Typography>
            <Typography variant="body2" className={classes.experienceDate}>
              May 2023 - January 2024
            </Typography>
            <Typography variant="body1" className={classes.experienceDescription}>
              Conducted comprehensive financial analysis and due diligence on equity and fixed-income securities for a simulated student-managed investment portfolio. Collaborated with team of student analysts to develop investment strategies and present quarterly performance reports. Participated in weekly investment committee meetings, presenting research findings that contributed to fund outperforming benchmark indices.
            </Typography>
          </Paper>
        </div>
      </Container>
    </section>
  );
};
