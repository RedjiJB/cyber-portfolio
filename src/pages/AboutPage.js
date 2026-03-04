import React from 'react'; // v3
import { TopNavbar } from '../components/nav/TopNavbar';
import DisplacementSphere from '../components/background/DisplacementSphere';
import resume from '../settings/resume.json';
import profilePic from '../assets/profile.JPG';
import './SubPage.css';

const fmtDate = (d) => {
  if (!d) return 'Present';
  const [y, m] = d.split('-');
  return new Date(+y, +m - 1).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' });
};

export const AboutPage = () => {
  const { basics, work, education, skills } = resume;

  return (
    <div className="sp-page">
      <DisplacementSphere />
      <TopNavbar />

      <div className="sp-hero">
        <span className="sp-hero__kicker"><i className="fas fa-user-circle" /> About Me</span>
        <h1 className="sp-hero__title">{basics.name}</h1>
        <p className="sp-hero__sub">{basics.label} — {basics.location.city}, {basics.location.country}</p>
      </div>

      <div className="sp-content">
        <div className="sp-about-layout">

          {/* ── Sidebar ── */}
          <aside className="sp-sidebar">

            <div className="sp-profile-card sp-card">
              <img src={profilePic} alt={basics.name} className="sp-avatar" />
              <p className="sp-profile-name">{basics.name}</p>
              <p className="sp-profile-role">{basics.label}</p>
              <p className="sp-profile-loc"><i className="fas fa-map-marker-alt" style={{ color: 'var(--sp-cyan)', marginRight: '0.35rem' }} />{basics.location.city}, {basics.location.country}</p>
              <div className="sp-divider" />
              <div className="sp-social-row">
                {basics.profiles.map((p) => (
                  <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer"
                    className="sp-social-btn" title={p.network}>
                    <i className={p.x_icon} />
                  </a>
                ))}
              </div>
              <div className="sp-btn-row" style={{ justifyContent: 'center', marginTop: '0.25rem' }}>
                <a href={process.env.PUBLIC_URL + '/interactive-resume'} target="_blank"
                  rel="noopener noreferrer" className="sp-btn sp-btn--solid">
                  <i className="fas fa-file-alt" /> Resume
                </a>
              </div>
            </div>

            <div className="sp-stat-card sp-card">
              <div className="sp-stat-item">
                <span className="sp-stat-label">Status</span>
                <span className="sp-stat-value" style={{ color: '#4ade80' }}>● Open to Co-op</span>
              </div>
              <div className="sp-stat-item">
                <span className="sp-stat-label">Program</span>
                <span className="sp-stat-value">CST Networking</span>
              </div>
              <div className="sp-stat-item">
                <span className="sp-stat-label">School</span>
                <span className="sp-stat-value">Algonquin College</span>
              </div>
              <div className="sp-stat-item">
                <span className="sp-stat-label">Focus</span>
                <span className="sp-stat-value">Networking · Security</span>
              </div>
            </div>

          </aside>

          {/* ── Main column ── */}
          <div className="sp-main-col">

            {/* Bio */}
            <div className="sp-bio-card sp-card">
              <div className="sp-sec-head">
                <span className="sp-sec-num">00</span>
                <h2 className="sp-sec-title">Bio</h2>
                <div className="sp-sec-line" />
              </div>
              <p className="sp-bio-text">{basics.description}</p>
              <div className="sp-btn-row">
                <a href="/#/contact" className="sp-btn sp-btn--outline">
                  <i className="fas fa-terminal" /> Get In Touch
                </a>
              </div>
            </div>

            {/* Skills */}
            <div className="sp-card" style={{ padding: '1.75rem' }}>
              <div className="sp-sec-head">
                <span className="sp-sec-num">01</span>
                <h2 className="sp-sec-title">Skills &amp; Tools</h2>
                <div className="sp-sec-line" />
              </div>
              <div className="sp-skills-bento">
                {skills.map((s) => (
                  <div key={s.name} className="sp-skill-tile">
                    <div className="sp-skill-tile__head">
                      <span className="sp-skill-tile__name">{s.name}</span>
                      <span className={`sp-skill-tile__badge ${s.level === 'In Progress' ? 'sp-badge--progress' : 'sp-badge--beginner'}`}>
                        {s.level}
                      </span>
                    </div>
                    <div className="sp-tags">
                      {s.keywords.map((kw) => <span key={kw} className="sp-tag">{kw}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="sp-card" style={{ padding: '1.75rem' }}>
              <div className="sp-sec-head">
                <span className="sp-sec-num">02</span>
                <h2 className="sp-sec-title">Experience</h2>
                <div className="sp-sec-line" />
              </div>
              <div className="sp-job-stack">
                {work.map((job, i) => (
                  <div key={i} className="sp-job-card">
                    <div className="sp-job-top">
                      <div className="sp-job-company">{job.company}</div>
                      <div className="sp-job-period">{fmtDate(job.startDate)} — {fmtDate(job.endDate)}</div>
                    </div>
                    <div className="sp-job-role">{job.position}</div>
                    <div className="sp-job-desc">{job.summary}</div>
                    {job.highlights && (
                      <ul className="sp-job-bullets">
                        {job.highlights.map((h, j) => <li key={j}>{h}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="sp-card" style={{ padding: '1.75rem' }}>
              <div className="sp-sec-head">
                <span className="sp-sec-num">03</span>
                <h2 className="sp-sec-title">Education</h2>
                <div className="sp-sec-line" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {education.map((edu, i) => (
                  <div key={i} className="sp-edu-card">
                    <div className="sp-edu-institution">{edu.institution}</div>
                    <div className="sp-edu-area">{edu.area}</div>
                    <div className="sp-edu-dates">{fmtDate(edu.startDate)} — {fmtDate(edu.endDate)}</div>
                    {edu.courses && (
                      <div className="sp-tags">
                        {edu.courses.map((c) => <span key={c} className="sp-tag">{c}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
