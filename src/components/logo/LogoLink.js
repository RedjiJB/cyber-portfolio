import React, { useState, useEffect } from "react";
import { Link, Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Resume from "../../settings/resume.json";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logo: {
    position: "fixed",
    width: "50px",
    height: "50px",
    top: theme.spacing(6),
    left: theme.spacing(6),
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
  },
  logoImage: {
    width: "90%",
    height: "90%",
    objectFit: "contain",
  },
  fallbackLogo: {
    width: "90%",
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  }
}));

export const LogoLink = () => {
  const classes = useStyles();
  const [imgSrc, setImgSrc] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = process.env.PUBLIC_URL + "/rjb_192x192.png";
    
    img.onload = () => {
      setImgSrc(process.env.PUBLIC_URL + "/rjb_192x192.png");
      setIsLoading(false);
    };
    
    img.onerror = () => {
      console.error("Failed to load main logo, trying fallback...");
      const fallbackImg = new Image();
      fallbackImg.src = process.env.PUBLIC_URL + "/rjb_32x32.png";
      
      fallbackImg.onload = () => {
        setImgSrc(process.env.PUBLIC_URL + "/rjb_32x32.png");
        setIsLoading(false);
      };
      
      fallbackImg.onerror = () => {
        console.error("Failed to load fallback logo");
        setImgError(true);
        setIsLoading(false);
      };
    };
  }, []);

  const handleImageError = () => {
    if (!imgError) {
      console.error("Image failed to load in component");
      setImgError(true);
      setImgSrc(process.env.PUBLIC_URL + "/rjb_32x32.png");
    }
  };

  return (
    <Tooltip
      title={Resume.basics.name}
      placement="right"
      TransitionComponent={Zoom}
    >
      <Link
        component={RouterLink}
        to="/"
        underline="none"
        color="inherit"
        className={classes.logo}
      >
        {isLoading ? (
          <div className={classes.fallbackLogo}>...</div>
        ) : imgError ? (
          <div className={classes.fallbackLogo}>
            {Resume.basics.name.split(' ').map(n => n[0]).join('')}
          </div>
        ) : (
          <img 
            src={imgSrc}
            alt={Resume.basics.name} 
            className={classes.logoImage}
            onError={handleImageError}
            loading="eager"
          />
        )}
      </Link>
    </Tooltip>
  );
};
