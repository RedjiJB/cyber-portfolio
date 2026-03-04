import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./TopNavbar.css";

const navLinks = [
  { text: 'Home',     path: '/' },
  { text: 'Projects', path: '/projects' },
  { text: 'About',    path: '/about' },
  { text: 'Contact',  path: '/contact' },
];

export const TopNavbar = () => {
  const location = useLocation();
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

  /* ── lock body scroll when overlay open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── close overlay on route change ── */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const headerClass = [
    'nav-header',
    scrolled  ? 'nav-header--scrolled' : '',
    hidden    ? 'nav-header--hidden'   : '',
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
        <div className="nav-overlay__footer">Portfolio &mdash; RedjiJB</div>
      </div>
    </>
  );
};
