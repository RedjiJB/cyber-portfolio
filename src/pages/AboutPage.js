import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Container, Typography } from '@material-ui/core';
import { LogoLink } from '../components/logo/LogoLink';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { TopNavbar } from '../components/nav/TopNavbar';
import { About } from '../components/about/About';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    position: 'relative',
  },
  contentWrapper: {
    marginTop: '6rem',
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 1,
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  navWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  logoWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  controlsWrapper: {
    position: 'relative',
    zIndex: 100,
  }
}));

export const AboutPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.logoWrapper}>
        <LogoLink />
      </div>
      <div className={classes.controlsWrapper}>
        <ThemeToggle />
        <Hidden smDown>
          <SocialIcons />
        </Hidden>
        <Hidden mdUp>
          <SpeedDials />
        </Hidden>
      </div>
      <div className={classes.navWrapper}>
        <TopNavbar />
      </div>
      
      <div className={classes.contentWrapper}>
        <Container maxWidth="lg">
          <Typography variant="h3" className={classes.pageTitle}>
            About Me
          </Typography>
          <About />
        </Container>
      </div>
    </div>
  );
};

export default AboutPage;