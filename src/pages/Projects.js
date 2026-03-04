import React from 'react'; // v3
import { TopNavbar } from '../components/nav/TopNavbar';
import DisplacementSphere from '../components/background/DisplacementSphere';
import resume from '../settings/resume.json';
import './SubPage.css';

const ICONS = ['fas fa-network-wired', 'fas fa-shield-alt', 'fas fa-terminal', 'fas fa-code', 'fas fa-server'];

const badgeClass = (type) => type === 'Planning' ? 'sp-badge--planning' : 'sp-badge--inprogress';

export const Projects = () => {
  const { projects, certificates } = resume;
  const [featured, ...rest] = projects;

  return (
    <div className="sp-page">
      <DisplacementSphere />
      <TopNavbar />

      <div className="sp-hero">
        <span className="sp-hero__kicker"><i className="fas fa-code-branch" /> Portfolio</span>
        <h1 className="sp-hero__title">Projects</h1>
        <p className="sp-hero__sub">Personal and academic builds — networking, security, and automation.</p>
      </div>

      <div className="sp-content">

        {/* ── Bento grid ── */}
        <div className="sp-bento">

          {/* Featured card */}
          <div className="sp-bento-card sp-bento-card--featured">
            <div className="sp-bento-card__icon">
              <i className={ICONS[0]} />
            </div>
            <div className="sp-bento-card__body">
              <div className="sp-bento-card__top" style={{ marginBottom: '0.5rem' }}>
                <span className="sp-bento-card__num">01 — FEATURED</span>
                {featured.type && (
                  <span className={`sp-bento-card__badge ${badgeClass(featured.type)}`}>{featured.type}</span>
                )}
              </div>
              <h3 className="sp-bento-card__name" style={{ fontSize: '1.3rem', marginBottom: '0.6rem' }}>{featured.name}</h3>
              <p className="sp-bento-card__desc">{featured.description}</p>
              {featured.keywords?.length > 0 && (
                <div className="sp-tags" style={{ marginTop: '0.75rem' }}>
                  {featured.keywords.map((kw) => <span key={kw} className="sp-tag">{kw}</span>)}
                </div>
              )}
            </div>
          </div>

          {/* Remaining cards */}
          {rest.map((proj, i) => (
            <div key={proj.name} className="sp-bento-card">
              <div className="sp-bento-card__top">
                <span className="sp-bento-card__num">{String(i + 2).padStart(2, '0')}</span>
                {proj.type && (
                  <span className={`sp-bento-card__badge ${badgeClass(proj.type)}`}>{proj.type}</span>
                )}
              </div>
              <div className="sp-bento-card__icon" style={{ width: 40, height: 40, borderRadius: 10, fontSize: '1rem' }}>
                <i className={ICONS[(i + 1) % ICONS.length]} />
              </div>
              <h3 className="sp-bento-card__name">{proj.name}</h3>
              <p className="sp-bento-card__desc">{proj.description}</p>
              {proj.keywords?.length > 0 && (
                <div className="sp-tags">
                  {proj.keywords.map((kw) => <span key={kw} className="sp-tag">{kw}</span>)}
                </div>
              )}
              {proj.url && (
                <a href={proj.url} target="_blank" rel="noopener noreferrer" className="sp-bento-card__link">
                  View project →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── Certifications ── */}
        {certificates?.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <div className="sp-sec-head" style={{ marginBottom: '1.25rem' }}>
              <span className="sp-sec-num">—</span>
              <h2 className="sp-sec-title" style={{ fontSize: '1.1rem' }}>Certifications</h2>
              <div className="sp-sec-line" />
            </div>
            <div className="sp-cert-row">
              {certificates.map((cert, i) => (
                <div key={i} className="sp-cert-item">
                  <div className="sp-cert-icon"><i className="fas fa-certificate" /></div>
                  <div>
                    <div className="sp-cert-name">{cert.name}</div>
                    <div className="sp-cert-meta">{cert.issuer}</div>
                  </div>
                  <div className="sp-cert-status">
                    <span className="sp-tag sp-tag--amber">{cert.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Projects;
