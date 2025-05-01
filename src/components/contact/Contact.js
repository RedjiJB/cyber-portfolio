/* eslint-disable no-unused-vars */
import React from "react";
import { useRef } from "react";
import { Container, Typography, TextField, Button, Grid, Box, Link, IconButton, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";
import Swal from 'sweetalert2';
import Resume from "../../settings/resume.json";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';

// Import the new SocialLinks component
import SocialLinks from "./SocialLinks";

import emailjs from '@emailjs/browser';

import './Contact.css';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "3em",
  },
  form: {
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
  formfield: {
    width: '100%',
    marginBottom: '2rem',
    position: 'relative',
    zIndex: 10,
  },
  contactHeading: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: theme.spacing(3),
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  socialText: {
    fontSize: '1.1rem',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(2),
    position: 'relative',
    zIndex: 1000,
  },
  iconButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
    position: 'relative',
    zIndex: 1000,
  },
}));

export const Contact = () => {
  const classes = useStyles();
  const greetings = "Get in Touch";

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8bezxog', 'template_jmsk313', form.current, 'knwNTK4YU4K30HYMd')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'You have sent an email!',
      showConfirmButton: false,
      timer: 1500
    })
    e.target.reset()
  };

  // Get profile links
  const profiles = Resume.basics.profiles;
  const linkedInProfile = profiles.find(profile => profile.network === "LinkedIn");
  const githubProfile = profiles.find(profile => profile.network === "GitHub");
  const twitterProfile = profiles.find(profile => profile.network === "Twitter");
  const emailProfile = profiles.find(profile => profile.network === "Email");

  return (
    <section className={classes.main}>
      <Container component="main" maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" className={classes.contactHeading}>
              <TextDecrypt text={greetings}/>
            </Typography>
            <Typography variant="body1" paragraph>
              If you'd like to connect or learn more about my work, feel free to send a message or connect on social media.
            </Typography>
            
            {/* Email Contact */}
            <div className={classes.socialLinks}>
              <Link href="mailto:jredji429@gmail.com" className={classes.socialLink} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-google" style={{ fontSize: '1.5rem', marginRight: '8px', color: '#00bfbf' }}></i>
                <Typography className={classes.socialText}>jredji429@gmail.com</Typography>
              </Link>
            </div>
            
            {/* Traditional Social Icons */}
            <Box className={classes.socialIcons} style={{ marginBottom: '2rem' }}>
              <IconButton 
                aria-label="LinkedIn" 
                className={classes.iconButton}
                href="https://www.linkedin.com/in/redji-jean-baptiste-25b0471b7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
              
              <IconButton 
                aria-label="GitHub" 
                className={classes.iconButton}
                href="https://github.com/RedjiJB"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon fontSize="large" />
              </IconButton>
            </Box>
            
            {/* Additional Social Links from API */}
            <SocialLinks />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <div className="_form_wrapper">
              <form ref={form} onSubmit={sendEmail} className={classes.form}>
                <TextField
                  id="outlined-name-input"
                  label="Name"
                  type="text"
                  size="small"
                  variant="filled"
                  name="name"
                  className={classes.formfield}
                />
                <TextField
                  id="outlined-password-input"
                  label="Email"
                  type="email"
                  size="small"
                  variant="filled"
                  name="email"
                  className={classes.formfield}
                />
                <TextField
                  id="outlined-password-input"
                  label="Message"
                  type="textarea"
                  size="small"
                  multiline
                  minRows={5}
                  variant="filled"
                  name="message"
                  className={classes.formfield}
                />
                <button type="submit" value="Send" className="submit-btn" style={{ position: 'relative', zIndex: 1000 }}>
                <i className="fas fa-terminal"></i>
                  <Typography component='span'> Send Message</Typography>
                </button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};
