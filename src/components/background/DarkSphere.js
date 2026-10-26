import React from 'react';
import DisplacementSphere from './LazySphere';
import { ThemeContext } from '../theme/ThemeProvider';

// For pages styled for a dark backdrop: the sphere reads the app theme to pick
// its background, so give it the dark variant without touching the user's theme.
const DARK_THEME = { theme: 'dark', toggleTheme: () => {} };

const DarkSphere = () => (
  <ThemeContext.Provider value={DARK_THEME}>
    <DisplacementSphere />
  </ThemeContext.Provider>
);

export default DarkSphere;
