import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeProvider";
import "./TopNavbar.css";

const navLinks = [
  { text: 'Home',     path: '/' },
  { text: 'Projects', path: '/projects' },
  { text: 'About',    path: '/about' },
  { text: 'Contact',  path: '/contact' },
];

// forceDark: for pages that always render on a dark backdrop regardless of theme
export const TopNavbar = ({ forceDark = false }) => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext) || {};
  const isLight = theme === 'light' && !forceDark;
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const lastScrollY = useRef(0);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  /* ── scroll-reactive hide/show + glass ── */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── freeze page behind overlay (iOS Safari ignores overflow:hidden) ── */
  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.width = '100%';
    return () => {
      style.position = '';
      style.top = '';
      style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  /* ── close overlay on Escape ── */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  /* ── close overlay on route change ── */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const headerClass = [
    'nav-header',
    scrolled  ? 'nav-header--scrolled' : '',
    hidden    ? 'nav-header--hidden'   : '',
    isLight && !menuOpen ? 'nav-header--light' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="nav-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <span className="nav-logo__bracket">&lt;</span>
            RJB
            <span className="nav-logo__bracket">/&gt;</span>
          </Link>

          {/* Desktop links */}
          <nav className="nav-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.path}
                className={`nav-link${isActive(link.path) ? ' nav-link--active' : ''}`}
              >
                <span className="nav-link__label">{link.text}</span>
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? ' nav-hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>

        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`nav-overlay${menuOpen ? ' nav-overlay--open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <nav className="nav-overlay__links">
          {navLinks.map((link, i) => (
            <Link
              key={link.text}
              to={link.path}
              className={`nav-overlay__link${isActive(link.path) ? ' nav-overlay__link--active' : ''}`}
              style={{ '--i': i }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="nav-overlay__num">0{i + 1}</span>
              {link.text}
            </Link>
          ))}
        </nav>
        <div className="nav-overlay__social">
          <a href="https://github.com/RedjiJB" target="_blank" rel="noopener noreferrer" aria-label="GitHub" tabIndex={menuOpen ? 0 : -1}>
            <i className="fab fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/redji-jean-baptiste-25b0471b7" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" tabIndex={menuOpen ? 0 : -1}>
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <div className="nav-overlay__footer">Portfolio &mdash; RedjiJB</div>
      </div>
    </>
  );
};
