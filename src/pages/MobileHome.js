import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Resume from '../settings/resume.json';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { TopNavbar } from '../components/nav/TopNavbar';
import DisplacementSphere from '../components/background/LazySphere';
import './MobileHome.css';

/* ─── Data ──────────────────────────────────────────────── */
const { basics, work, skills, projects, interests } = Resume;

const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

const contactLinks = [
  {
    label: 'Email',
    value: basics.email,
    href: `mailto:${basics.email}`,
    icon: 'fas fa-envelope',
  },
  {
    label: 'LinkedIn',
    value: `in/${basics.profiles.find(p => p.network === 'LinkedIn')?.username || ''}`,
    href: basics.profiles.find(p => p.network === 'LinkedIn')?.url || '#',
    icon: 'fab fa-linkedin-in',
  },
  {
    label: 'GitHub',
    value: `@${basics.profiles.find(p => p.network === 'GitHub')?.username || ''}`,
    href: basics.profiles.find(p => p.network === 'GitHub')?.url || '#',
    icon: 'fab fa-github',
  },
];

/* ─── Helpers ───────────────────────────────────────────── */
const formatPeriod = (startDate, endDate) => {
  const fmt = (d) => {
    if (!d) return 'Present';
    const date = new Date(d);
    return date.toLocaleDateString('en-CA', { year: 'numeric', month: 'short' });
  };
  return `${fmt(startDate)} — ${fmt(endDate)}`;
};

/* ─── Sub-components ────────────────────────────────────── */
const SectionEyebrow = ({ num, label }) => (
  <div className="mh-section__eyebrow reveal-up">
    <span className="mh-section__eyebrow-num">0{num}</span>
    <span className="mh-section__eyebrow-line" />
    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
      {label}
    </span>
  </div>
);

/* ─── Main component ────────────────────────────────────── */
const MobileHome = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const rootRef = useRef(null);

  /* Global observer — catches all .reveal-up / .reveal-left / .reveal-scale */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale, .reveal-fade');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    targets.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Dot-nav: track active section via IntersectionObserver */
  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const scrollToSection = useCallback((i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  /* Per-section reveal refs */
  const aboutCard   = useScrollReveal();
  const aboutBadges = useStaggerReveal();
  const skillsList  = useStaggerReveal();
  const timeline    = useStaggerReveal();
  const projectList = useStaggerReveal();
  const contactList = useStaggerReveal();
  const interestList = useStaggerReveal();

  return (
    <div className="mh" ref={rootRef}>
      {/* Shared navbar (overlay mode) */}
      <TopNavbar />

      {/* ══ Displacement sphere — fixed behind all content ══ */}
      <DisplacementSphere />

      {/* ══ Dot navigation ══════════════════════════════════ */}
      <nav className="mh-dots" aria-label="Section indicator">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            className={`mh-dot${activeSection === i ? ' mh-dot--active' : ''}`}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </nav>

      {/* ══ 1 — HERO ════════════════════════════════════════ */}
      <section
        id="home"
        className="mh-hero"
        ref={el => (sectionRefs.current[0] = el)}
      >
        <div className="mh-hero__content">
          <h1 className="mh-hero__name">{basics.name.split(' ')[0]}<br />{basics.name.split(' ').slice(1).join(' ')}</h1>
        </div>

        <div className="mh-hero__scroll" aria-hidden="true">
          <div className="mh-hero__scroll-line" />
          <span>scroll</span>
        </div>
      </section>

      {/* Glass panel — all content after hero floats on top of the sphere */}
      <div className="mh-content">

      {/* ══ 2 — ABOUT ═══════════════════════════════════════ */}
      <section
        id="about"
        className="mh-section"
        ref={el => (sectionRefs.current[1] = el)}
      >
        <SectionEyebrow num={1} label="About" />
        <h2 className="mh-section__title reveal-up">Who I&nbsp;Am</h2>

        <div className="mh-about__card reveal-up" ref={aboutCard}>
          <p className="mh-about__bio">{basics.description}</p>
          <div className="mh-about__badges stagger-children" ref={aboutBadges}>
            <span className="mh-badge mh-badge--cyan">
              <i className="fas fa-map-marker-alt" />
              {basics.location.city}, {basics.location.country}
            </span>
            <span className="mh-badge">
              <i className="fas fa-graduation-cap" />
              Algonquin College
            </span>
            <span className="mh-badge">
              <i className="fas fa-shield-alt" />
              Security Operations
            </span>
            <span className="mh-badge">
              <i className="fas fa-network-wired" />
              Networking
            </span>
          </div>
        </div>
      </section>

      <div className="mh-divider" />

      {/* ══ 3 — SKILLS ══════════════════════════════════════ */}
      <section
        id="skills"
        className="mh-section"
        ref={el => (sectionRefs.current[2] = el)}
      >
        <SectionEyebrow num={2} label="Skills" />
        <h2 className="mh-section__title reveal-up">Technical Skills</h2>

        <div className="mh-skills__list stagger-children" ref={skillsList}>
          {skills.map((skill) => (
            <div key={skill.name} className="mh-skill-row">
              <div className="mh-skill-row__label">
                {skill.name}
                <span className="mh-skill-row__level">{skill.level}</span>
              </div>
              <div className="mh-skill-row__keywords">
                {skill.keywords.map(kw => (
                  <span key={kw} className="mh-chip">{kw}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mh-divider" />

      {/* ══ 4 — EXPERIENCE ══════════════════════════════════ */}
      <section
        id="experience"
        className="mh-section"
        ref={el => (sectionRefs.current[3] = el)}
      >
        <SectionEyebrow num={3} label="Experience" />
        <h2 className="mh-section__title reveal-up">Work History</h2>

        <div className="mh-timeline stagger-children" ref={timeline}>
          {work.map((job) => (
            <div key={`${job.company}-${job.startDate}`} className="mh-timeline__item">
              <p className="mh-timeline__period">
                {formatPeriod(job.startDate, job.endDate)}
              </p>
              <h3 className="mh-timeline__role">{job.position}</h3>
              <p className="mh-timeline__company">{job.company}</p>
              <p className="mh-timeline__summary">{job.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mh-divider" />

      {/* ══ 5 — PROJECTS ════════════════════════════════════ */}
      <section
        id="projects"
        className="mh-section"
        ref={el => (sectionRefs.current[4] = el)}
      >
        <SectionEyebrow num={4} label="Projects" />
        <h2 className="mh-section__title reveal-up">What I'm Building</h2>

        <div className="mh-projects__track stagger-children" ref={projectList}>
          {projects.map((proj) => (
            <div key={proj.name} className="mh-project-card">
              <h3 className="mh-project-card__name">{proj.name}</h3>
              <p className="mh-project-card__desc">{proj.description}</p>
              {proj.keywords?.length > 0 && (
                <div className="mh-project-card__tags">
                  {proj.keywords.map(kw => (
                    <span key={kw} className="mh-project-card__tag">{kw}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <Link
            to="/projects"
            style={{
              display: 'inline-block',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--cyan)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,180,216,0.4)',
              paddingBottom: '2px',
            }}
          >
            View all projects →
          </Link>
        </div>
      </section>

      <div className="mh-divider" />

      {/* ══ 6 — CONTACT ═════════════════════════════════════ */}
      <section
        id="contact"
        className="mh-section"
        ref={el => (sectionRefs.current[5] = el)}
      >
        <SectionEyebrow num={5} label="Contact" />
        <h2 className="mh-section__title reveal-up">Get in Touch</h2>

        <p className="mh-contact__intro reveal-up">
          I'm actively looking for co-op and networking/cybersecurity roles.
          Whether you have an opportunity or just want to connect — reach out.
        </p>

        <div className="mh-contact__links stagger-children" ref={contactList}>
          {contactLinks.map(({ label, value, href, icon, download }) => (
            <a
              key={label}
              href={href}
              className="mh-contact__link"
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              download={download || undefined}
            >
              <div className="mh-contact__link-icon">
                <i className={icon} />
              </div>
              <div className="mh-contact__link-body">
                <div className="mh-contact__link-label">{label}</div>
                <div className="mh-contact__link-value">{value}</div>
              </div>
              <span className="mh-contact__link-arrow">›</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══ INTERESTS ═══════════════════════════════════════ */}
      <div className="mh-divider" />
      <section className="mh-section">
        <SectionEyebrow num={6} label="Interests" />
        <h2 className="mh-section__title reveal-up">What Drives Me</h2>
        <div className="mh-interests__grid stagger-children" ref={interestList}>
          {interests.map((interest) => (
            <div key={interest.name} className="mh-interest-card">
              <div className="mh-interest-card__name">{interest.name}</div>
              <div className="mh-interest-card__desc">{interest.description}</div>
              <div className="mh-interest-card__tags">
                {interest.keywords.map(kw => (
                  <span key={kw} className="mh-project-card__tag">{kw}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer className="mh-footer">
        © {new Date().getFullYear()} {basics.name} · {basics.location.city}, {basics.location.country}
      </footer>
      </div> {/* end .mh-content */}    </div>
  );
};

export default MobileHome;
