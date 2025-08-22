import React, { lazy, Suspense } from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";

import Home from "../pages/Home";

const Resume = lazy(() => import("../pages/Resume"));
const Projects = lazy(() => import("../pages/Projects"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const DCentralBlog = lazy(() => import("../pages/DCentralBlog"));
const StudentBlog = lazy(() => import("../pages/StudentBlog"));
const ExtracurricularBlog = lazy(() => import("../pages/ExtracurricularBlog"));
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

export const App = () => {
    logCredits();

    return (
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <HelmetMeta />
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/projects" exact component={Projects} />
                <Route path="/about" exact component={AboutPage} />
                <Route path="/contact" exact component={ContactPage} />
                <Route path="/blog" exact component={Blog} />
                <Route path="/blog/d-central" exact component={DCentralBlog} />
                <Route path="/blog/student" exact component={StudentBlog} />
                <Route path="/blog/extracurricular" exact component={ExtracurricularBlog} />
                <Route path="/blog/:slug" component={BlogPost} />
                <Route path="/resume" component={Resume} />
                <Route path="*" component={PageNotFound} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    );
};
