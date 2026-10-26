import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "./TextDecrypt";
import { FirstName, LastName } from "../../utils/getName";

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: "auto",
    marginBottom: "auto",
  },
  heading: {
    marginLeft: theme.spacing(20),
    "@media (max-width: 768px)": {
      marginLeft: theme.spacing(5),
    },
    '& h2': {
      textShadow: 'none',
      fontFamily: '"Inter", sans-serif',
    },
    '& h1': {
      textShadow: 'none',
      fontFamily: '"Inter", sans-serif',
    },
  },
  jobs: {
    "@media (max-width: 768px)": {
      fontSize: '3rem',
    },
  },
}));

export const Content = () => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.main} maxWidth="md">
      <div className={classes.heading}>
        <Typography variant="h1" component="h1" className={classes.jobs}>
            <TextDecrypt text={`${FirstName} ${LastName}`} />
        </Typography>
      </div>
    </Container>
  );
};
