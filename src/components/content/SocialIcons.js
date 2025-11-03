import React from 'react';
import { Tooltip, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Resume from '../../settings/resume.json';

const useStyles = makeStyles((theme) => ({
  socialIcons: {
    position: 'fixed',
    top: theme.spacing(6),
    right: theme.spacing(6),
    zIndex: 1000,
  },
  iconButton: {
    height: '2.5rem',
    width: '2.5rem',
    display: 'block',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  icon: {
    fontSize: '1.25rem',
    pointerEvents: 'none',
  },
}));

export const SocialIcons = () => {
  const classes = useStyles();

  const handleClick = (url, network) => {
    console.log('SocialIcons handleClick called:', { url, network });
    
    if (network === 'Gmail') {
      // Scroll to contact section for Gmail
      console.log('Gmail detected, attempting to scroll to contact section');
      const contactSection = document.getElementById('contact');
      console.log('Contact section found:', contactSection);
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.error('Contact section with id="contact" not found!');
      }
    } else if (url.startsWith('mailto:')) {
      // For other mailto links (if any), create temporary anchor
      console.log('Mailto link detected (non-Gmail)');
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    } else {
      console.log('Opening external link:', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const socialItems = Resume.basics.profiles.map((socialItem) => {
    return (
      <Tooltip
        key={socialItem.network.toLowerCase()}
        title={socialItem.network === 'Gmail' ? 'Contact Me' : socialItem.username}
        placement='left'
        TransitionComponent={Zoom}
      >
        <div
          className={classes.iconButton}
          role="button"
          tabIndex={0}
          aria-label={socialItem.network}
          onClick={() => handleClick(socialItem.url, socialItem.network)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(socialItem.url, socialItem.network);
            }
          }}
        >
          <i className={`${classes.icon} ${socialItem.x_icon}`}></i>
        </div>
      </Tooltip>
    );
  });

  return <div className={classes.socialIcons}>{socialItems}</div>;
};
