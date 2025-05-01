import React from "react";
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
  }
}));

export const LogoLink = () => {
  const classes = useStyles();

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
        <img 
          src="/rjb_192x192.png" 
          alt={Resume.basics.name} 
          className={classes.logoImage}
        />
      </Link>
    </Tooltip>
  );
};
