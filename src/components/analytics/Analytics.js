import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import settings from '../../settings/analytics.json';

// Cookieless visit counting with GoatCounter (https://www.goatcounter.com).
// It stays completely off until a site code is set in settings/analytics.json, so
// the site never contacts a third party by accident. The code is public by design.
const CODE = (settings.goatcounter || '').trim();
export const analyticsEnabled = /^[a-z0-9-]{2,}$/i.test(CODE);

const doNotTrack = () => {
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === '1' || dnt === 'yes' || navigator.globalPrivacyControl === true;
};

let loading = null;

const loadScript = () => {
  if (loading) return loading;
  loading = new Promise((resolve) => {
    // This is a single-page app, so count each route ourselves instead of on page load.
    window.goatcounter = { no_onload: true };
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    script.dataset.goatcounter = `https://${CODE}.goatcounter.com/count`;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false); // blocked by an ad blocker: fail quietly
    document.head.appendChild(script);
  });
  return loading;
};

const whenIdle = (fn) => {
  if ('requestIdleCallback' in window) window.requestIdleCallback(fn, { timeout: 3000 });
  else setTimeout(fn, 1500);
};

export const Analytics = () => {
  const { pathname } = useLocation();
  const lastCounted = useRef(null);

  useEffect(() => {
    if (!analyticsEnabled || doNotTrack() || lastCounted.current === pathname) return;
    lastCounted.current = pathname;
    // Wait for idle time so counting never competes with the page loading.
    whenIdle(() => {
      loadScript().then((ok) => {
        if (ok && window.goatcounter && window.goatcounter.count) {
          window.goatcounter.count({ path: pathname, title: document.title });
        }
      });
    });
  }, [pathname]);

  return null;
};
