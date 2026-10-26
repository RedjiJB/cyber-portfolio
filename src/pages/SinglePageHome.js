import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Box } from '@material-ui/core';
import DisplacementSphere from '../components/background/LazySphere';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { Content } from '../components/content/Content';
import { TopNavbar } from '../components/nav/TopNavbar';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
}));

// Desktop landing page. Projects, About and Contact are their own routes
// (see TopNavbar); their data lives in settings/resume.json.
export const SinglePageHome = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ height: '100vh', overflow: 'hidden' }}>
      <DisplacementSphere />
      <ThemeToggle />
      <Hidden smDown>
        <SocialIcons />
      </Hidden>
      <Hidden mdUp>
        <SpeedDials />
      </Hidden>
      <TopNavbar />

      <Box style={{ height: 'calc(100vh - 80px)', overflow: 'auto', marginTop: '80px' }}>
        <div className={classes.heroSection}>
          <Content />
        </div>
      </Box>
    </div>
  );
};

export default SinglePageHome;
