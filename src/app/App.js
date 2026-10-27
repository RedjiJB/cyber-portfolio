import React, { lazy, Suspense, useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { Analytics } from "../components/analytics/Analytics";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline, CircularProgress, useMediaQuery } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";

import SinglePageHome from "../pages/SinglePageHome";
import MobileHome from "../pages/MobileHome";

// Only the landing pages ship in the main bundle; every other route is its own chunk.
const routeLoaders = {
  Home: () => import("../pages/Home"),
  Resume: () => import("../pages/Resume"),
  Projects: () => import("../pages/Projects"),
  ProjectCase: () => import("../pages/ProjectCase"),
  AboutPage: () => import("../pages/AboutPage"),
  ContactPage: () => import("../pages/ContactPage"),
  PageNotFound: () => import("../pages/PageNotFound"),
};

const Home = lazy(routeLoaders.Home);
const Resume = lazy(routeLoaders.Resume);
const Projects = lazy(routeLoaders.Projects);
const ProjectCase = lazy(routeLoaders.ProjectCase);
const AboutPage = lazy(routeLoaders.AboutPage);
const ContactPage = lazy(routeLoaders.ContactPage);
const PageNotFound = lazy(routeLoaders.PageNotFound);

// Once the landing page is up, fetch the other chunks while the browser is idle
// so nav clicks resolve instantly instead of waiting on the network.
const prefetchRoutes = () => {
  const run = () => [
    routeLoaders.Projects,
    routeLoaders.AboutPage,
    routeLoaders.ContactPage,
    routeLoaders.ProjectCase,
  ].forEach((load) => load().catch(() => {}));
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 4000 });
  } else {
    setTimeout(run, 2000);
  }
};

// Loading fallback component
// Prefetched chunks resolve almost instantly, so only show the spinner if the
// wait is noticeable; otherwise it just flashes between pages.
const LoadingFallback = () => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      // Every page except the landing page has a dark backdrop, so don't flash white between them.
      background: pathname === '/' ? 'transparent' : '#121212',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.2s ease',
    }}>
      <CircularProgress />
    </div>
  );
};

// Mobile-aware home: serve MobileHome on ≤768px, SinglePageHome on desktop
const HomeRoute = () => {
  const isMobile = useMediaQuery('(max-width:768px)');
  return isMobile ? <MobileHome /> : <SinglePageHome />;
};

// Old links used hash URLs (/#/projects). Send them to the real path so existing
// bookmarks and shared links keep working now that the site uses clean URLs.
const LegacyHashRedirect = () => {
  const history = useHistory();
  useEffect(() => {
    const { hash } = window.location;
    if (hash.startsWith("#/")) history.replace(hash.slice(1));
  }, [history]);
  return null;
};

// Reset the scroll offset on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App = () => {
    logCredits();

    useEffect(() => { prefetchRoutes(); }, []);

    return (
      <ThemeProvider>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <HelmetMeta />
          <LegacyHashRedirect />
          <ScrollToTop />
          <Analytics />
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
                <Route path="/" exact component={HomeRoute} />
                <Route path="/multi" exact component={Home} />
                <Route path="/projects" exact component={Projects} />
                <Route path="/projects/:slug" exact component={ProjectCase} />
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
