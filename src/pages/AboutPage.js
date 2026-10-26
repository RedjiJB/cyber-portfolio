import React, { useRef, useState, useEffect, useMemo } from 'react';
import { TopNavbar } from '../components/nav/TopNavbar';
import DarkSphere from '../components/background/DarkSphere';
import { useInViewport } from '../hooks/useInViewport';
import resume from '../settings/resume.json';
import profilePic from '../assets/profile-bw.jpg';
import './SubPage.css';
import './AboutPage.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2025-09" -> "Sep 2025", "2025" -> "2025", empty -> "Present"
const fmtDate = (iso) => {
  const [y, m] = (iso || '').split('-');
  if (!y) return 'Present';
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
};

const OBSERVER_OPTIONS = { threshold: 0.1 };
const FACTS_OBSERVER_OPTIONS = { threshold: 0.6 };

// Fades a section in the first time it scrolls into view
const useReveal = () => {
  const ref = useRef(null);
  const visible = useInViewport(ref, true, OBSERVER_OPTIONS);
  return [ref, visible];
};

export const AboutPage = () => {
  const { basics, work, education, skills, volunteer = [], languages = [] } = resume;
  const spoken = languages.filter((l) => ['English', 'Haitian Creole', 'French'].includes(l.language));

  const factsRef = useRef(null);
  const factsInView = useInViewport(factsRef, true, FACTS_OBSERVER_OPTIONS);
  const [timelineRef, timelineVisible] = useReveal();
  const [educationRef, educationVisible] = useReveal();
  const [involvementRef, involvementVisible] = useReveal();
  const [skillsRef, skillsVisible] = useReveal();

  // Years since the earliest role, counted up when the stats scroll into view
  const experienceYears = useMemo(() => {
    const starts = work.filter((job) => !job.excludeFromTenure).map((job) => new Date(job.startDate)).filter((d) => !isNaN(d));
    if (!starts.length) return 0;
    const earliest = Math.min(...starts);
    return parseFloat(((Date.now() - earliest) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1));
  }, [work]);

  const [displayYears, setDisplayYears] = useState('0.0');

  useEffect(() => {
    if (!factsInView) return;
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      setDisplayYears(Math.min((step / steps) * experienceYears, experienceYears).toFixed(1));
      if (step >= steps) clearInterval(timer);
    }, 1400 / steps);
    return () => clearInterval(timer);
  }, [factsInView, experienceYears]);

  return (
    <div className="sp-page">
      <DarkSphere />
      <TopNavbar forceDark />

      <main className="ab-section">
        <h1 className="ab-title">About</h1>

        {/* Personal introduction */}
        <div className="ab-personal-card">
          <img src={profilePic} alt={basics.name} className="ab-photo" decoding="async" />
          <div className="ab-personal-text">
            <h2 className="ab-intro-title">{basics.name}</h2>
            <p className="ab-role">{basics.label}</p>
            <p className="ab-intro">{basics.description}</p>
            <div className="ab-socials">
              {basics.profiles.map((p) => (
                <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer" title={p.network} aria-label={p.network}>
                  <i className={p.x_icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div ref={factsRef} className="ab-stats">
          <div className="ab-stat">
            <i className="fas fa-map-marker-alt ab-stat__icon" />
            <span className="ab-stat__label">Location</span>
            <span className="ab-stat__value">{basics.location.city}, {basics.location.country}</span>
          </div>
          <div className="ab-stat">
            <i className="fas fa-briefcase ab-stat__icon" />
            <span className="ab-stat__label">Experience</span>
            <span className="ab-stat__value">{displayYears} years</span>
          </div>
          <div className="ab-stat">
            <i className="fas fa-graduation-cap ab-stat__icon" />
            <span className="ab-stat__label">Studying</span>
            <span className="ab-stat__value">CST Networking</span>
          </div>
          <div className="ab-stat">
            <i className="fas fa-language ab-stat__icon" />
            <span className="ab-stat__label">Languages</span>
            <span className="ab-stat__value">{spoken.map((l) => l.language).join(' · ')}</span>
          </div>
        </div>

        {/* Experience timeline */}
        <h2 className="ab-heading">Experience</h2>
        <div ref={timelineRef} className={`ab-timeline${timelineVisible ? ' is-visible' : ''}`}>
          {work.map((job, i) => (
            <div key={i} className="ab-timeline-item" style={{ '--order': i }}>
              <div className="ab-dot" />
              {i < work.length - 1 && <div className="ab-line" />}
              <div className="ab-timeline-card">
                <h3 className="ab-timeline-title">
                  {job.position} <span className="ab-company">@ {job.company}</span>
                </h3>
                <div className="ab-period">{fmtDate(job.startDate)} - {fmtDate(job.endDate)}</div>
                {job.summary && <p className="ab-desc">{job.summary}</p>}
                {job.highlights?.length > 0 && (
                  <ul className="ab-bullets">
                    {job.highlights.map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education timeline */}
        <h2 className="ab-heading">Education</h2>
        <div ref={educationRef} className={`ab-timeline${educationVisible ? ' is-visible' : ''}`}>
          {education.map((edu, i) => (
            <div key={i} className="ab-timeline-item" style={{ '--order': i }}>
              <div className="ab-dot" />
              {i < education.length - 1 && <div className="ab-line" />}
              <div className="ab-timeline-card">
                <h3 className="ab-timeline-title">
                  {edu.area} <span className="ab-company">@ {edu.institution}</span>
                </h3>
                <div className="ab-period">{fmtDate(edu.startDate)} - {fmtDate(edu.endDate)}</div>
                {edu.courses?.length > 0 && (
                  <div className="ab-tags">
                    {edu.courses.map((c) => <span key={c} className="ab-tag">{c}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Involvement */}
        {volunteer.length > 0 && (
          <>
            <h2 className="ab-heading">Community &amp; Involvement</h2>
            <div ref={involvementRef} className={`ab-timeline${involvementVisible ? ' is-visible' : ''}`}>
              {volunteer.map((v, i) => (
                <div key={i} className="ab-timeline-item" style={{ '--order': i }}>
                  <div className="ab-dot" />
                  {i < volunteer.length - 1 && <div className="ab-line" />}
                  <div className="ab-timeline-card">
                    <h3 className="ab-timeline-title">
                      {v.position} <span className="ab-company">@ {v.organization}</span>
                    </h3>
                    <div className="ab-period">{v.endDate === v.startDate ? fmtDate(v.startDate) : `${fmtDate(v.startDate)} - ${fmtDate(v.endDate)}`}</div>
                    <p className="ab-desc">{v.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Skills, grouped */}
        <h2 className="ab-heading">Skills &amp; Tools</h2>
        <div ref={skillsRef} className={`ab-skills${skillsVisible ? ' is-visible' : ''}`}>
          {skills.map((group, i) => (
            <div key={group.name} className="ab-skill-group" style={{ '--order': i }}>
              <h3 className="ab-skill-category">{group.name}</h3>
              <div className="ab-tags">
                {group.keywords.map((kw) => <span key={kw} className="ab-skill-tag">{kw}</span>)}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
