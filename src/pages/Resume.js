import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab';
import resumeData from '../settings/resume.json';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
  },
  subtitle: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  timeline: {
    padding: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  tabPanel: {
    padding: theme.spacing(3),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const Resume = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    if (resumeData && resumeData.work) {
      // Sort by endDate descending, then startDate descending
      const sorted = [...resumeData.work].sort((a, b) => {
        const aEnd = a.endDate === 'Present' ? '9999-12-31' : a.endDate;
        const bEnd = b.endDate === 'Present' ? '9999-12-31' : b.endDate;
        if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);
        return b.startDate.localeCompare(a.startDate);
      });
      setExperience(sorted);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Interactive Resume
      </Typography>
      
      <Paper className={classes.paper}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Experience" />
          <Tab label="Skills" />
          <Tab label="Education" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Timeline className={classes.timeline}>
            {experience.map((job, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < experience.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="h3">
                    {job.position}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {job.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {job.startDate} - {job.endDate}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {job.summary}
                  </Typography>
                  <List dense>
                    {job.highlights && job.highlights.map((highlight, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={highlight} />
                      </ListItem>
                    ))}
                  </List>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Security Skills
              </Typography>
              <Box>
                <Chip label="Surveillance Systems" className={classes.chip} />
                <Chip label="Access Control" className={classes.chip} />
                <Chip label="Risk Assessment" className={classes.chip} />
                <Chip label="Emergency Response" className={classes.chip} />
                <Chip label="Security Protocols" className={classes.chip} />
                <Chip label="CCTV Monitoring" className={classes.chip} />
                <Chip label="Incident Reporting" className={classes.chip} />
                <Chip label="Law Enforcement Liaison" className={classes.chip} />
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography variant="h6" gutterBottom>
            Education & Certifications
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Security Guard License"
                secondary="Ontario Security Guard License"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="First Aid & CPR Certification"
                secondary="Canadian Red Cross"
              />
            </ListItem>
          </List>
        </TabPanel>
      </Paper>
    </Container>
  );
};
