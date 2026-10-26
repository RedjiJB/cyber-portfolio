import React, { useEffect } from 'react';
import DisplacementSphere from './LazySphere';
import { ThemeContext } from '../theme/ThemeProvider';

// For pages styled for a dark backdrop: the sphere reads the app theme to pick
// its background, so give it the dark variant without touching the user's theme.
const DARK_THEME = { theme: 'dark', toggleTheme: () => {} };
const DARK_BACKGROUND = '#121212';

const DarkSphere = () => {
  // The sphere fades in over a few seconds and loads after the page, and the
  // app's light theme paints the body white. Light text on that white body is
  // unreadable until the sphere arrives, so paint the dark backdrop right away.
  useEffect(() => {
    const { body, documentElement } = document;
    const previous = [body.style.backgroundColor, documentElement.style.backgroundColor];
    body.style.backgroundColor = DARK_BACKGROUND;
    documentElement.style.backgroundColor = DARK_BACKGROUND;
    return () => {
      body.style.backgroundColor = previous[0];
      documentElement.style.backgroundColor = previous[1];
    };
  }, []);

  return (
    <ThemeContext.Provider value={DARK_THEME}>
      <DisplacementSphere />
    </ThemeContext.Provider>
  );
};

export default DarkSphere;
