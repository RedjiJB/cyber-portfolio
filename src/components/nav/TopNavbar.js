import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, makeStyles, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navButton: {
    margin: theme.spacing(0, 1),
    fontWeight: 500,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
  active: {
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  desktopNav: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
    width: 250,
  },
  drawerItem: {
    padding: theme.spacing(2, 3),
  },
  drawerItemActive: {
    backgroundColor: `${theme.palette.primary.main}22`,
  },
}));

export const TopNavbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname === path;
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Navigation links
  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Projects', path: '/projects' },
    { text: 'About', path: '/about' },
    { text: 'Blog', path: '/blog' },
    { text: 'Contact', path: '/contact' },
  ];

  // Close drawer when changing routes on mobile
  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  }, [location.pathname, isMobile]);

  const drawer = (
    <List>
      {navLinks.map((link) => (
        <ListItem 
          button 
          component={Link} 
          to={link.path} 
          key={link.text}
          className={`${classes.drawerItem} ${isActive(link.path) ? classes.drawerItemActive : ''}`}
        >
          <ListItemText 
            primary={link.text} 
            primaryTypographyProps={{ color: isActive(link.path) ? "primary" : "textPrimary" }}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className={classes.navLinks}>
            {navLinks.map((link) => (
              <Button
                key={link.text}
                component={Link}
                to={link.path}
                className={`${classes.navButton} ${isActive(link.path) ? classes.active : ''}`}
                disableRipple
              >
                {link.text}
              </Button>
            ))}
          </nav>
        )}
        {/* Mobile Navigation */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}; 