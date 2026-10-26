import React, { lazy, Suspense } from 'react';

// three.js is the heaviest dependency, so load it after the page itself has painted.
const DisplacementSphere = lazy(() => import('./DisplacementSphere'));

const LazySphere = (props) => (
  <Suspense fallback={null}>
    <DisplacementSphere {...props} />
  </Suspense>
);

export default LazySphere;
