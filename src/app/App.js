import React, { lazy, Suspense } from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline, CircularProgress, useMediaQuery } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";

import Home from "../pages/Home";
import SinglePageHome from "../pages/SinglePageHome";
import MobileHome from "../pages/MobileHome";

const Resume = lazy(() => import("../pages/Resume"));
const Projects = lazy(() => import("../pages/Projects"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}>
    <CircularProgress />
  </div>
);

// Mobile-aware home: serve MobileHome on ≤768px, SinglePageHome on desktop
const HomeRoute = () => {
  const isMobile = useMediaQuery('(max-width:768px)');
  return isMobile ? <MobileHome /> : <SinglePageHome />;
};

export const App = () => {
    logCredits();

    return (
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <HelmetMeta />
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
                <Route path="/" exact component={HomeRoute} />
                <Route path="/multi" exact component={Home} />
                <Route path="/projects" exact component={Projects} />
                <Route path="/about" exact component={AboutPage} />
                <Route path="/contact" exact component={ContactPage} />
                <Route path="/resume" component={Resume} />
                <Route path="*" component={PageNotFound} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    );
};
