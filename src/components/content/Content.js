import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "./TextDecrypt";
import Resume from "../../settings/resume.json";
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
      textShadow: theme.palette.type === 'dark'
        ? '0 0 15px rgba(255, 255, 255, 0.3), 0 0 25px rgba(0, 191, 191, 0.2)'
        : '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    '& h1': {
      textShadow: theme.palette.type === 'dark'
        ? '0 0 20px rgba(0, 191, 191, 0.5), 0 0 30px rgba(0, 191, 191, 0.3), 0 0 40px rgba(0, 191, 191, 0.2)'
        : '0 0 15px rgba(33, 150, 243, 0.3), 0 0 25px rgba(33, 150, 243, 0.2)',
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
        <Typography variant="h5" component="h2">
            <TextDecrypt text={`${FirstName} ${LastName}`} />
        </Typography>
        <Typography variant="h1" component="h1" className={classes.jobs}>
            {Resume.basics.job1}
        </Typography>
      </div>
    </Container>
  );
};
