import React from 'react'; // v3
import { TopNavbar } from '../components/nav/TopNavbar';
import DisplacementSphere from '../components/background/DisplacementSphere';
import resume from '../settings/resume.json';
import './SubPage.css';

const LINK_META = {
  Email:    { icon: 'fas fa-envelope',    label: 'Email Address' },
  LinkedIn: { icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  GitHub:   { icon: 'fab fa-github',      label: 'GitHub' },
  GitLab:   { icon: 'fab fa-gitlab',      label: 'GitLab' },
  Telegram: { icon: 'fab fa-telegram',    label: 'Telegram' },
};

export const ContactPage = () => {
  const { basics } = resume;

  return (
    <div className="sp-page">
      <DisplacementSphere />
      <TopNavbar />

      <div className="sp-hero">
        <span className="sp-hero__kicker"><i className="fas fa-paper-plane" /> Let's Talk</span>
        <h1 className="sp-hero__title">Contact</h1>
        <p className="sp-hero__sub">
          Actively seeking co-op and cybersecurity / networking roles.<br />
          Drop a message — I respond within 24 hours.
        </p>
      </div>

      <div className="sp-content">
        <div className="sp-contact-layout">

          {/* Left — big tiles */}
          <div className="sp-contact-grid">
            {basics.profiles.map((p) => {
              const meta = LINK_META[p.network];
              if (!meta) return null;
              const isEmail = p.url.startsWith('mailto');
              return (
                <a
                  key={p.network}
                  href={p.url}
                  className="sp-contact-tile"
                  target={isEmail ? undefined : '_blank'}
                  rel="noopener noreferrer"
                >
                  <div className="sp-contact-tile__icon">
                    <i className={meta.icon} />
                  </div>
                  <div>
                    <div className="sp-contact-tile__label">{meta.label}</div>
                    <div className="sp-contact-tile__value">{p.username}</div>
                  </div>
                  <span className="sp-contact-tile__arrow">↗</span>
                </a>
              );
            })}
          </div>

          {/* Right — status + resume panel */}
          <div className="sp-status-panel">

            <div className="sp-status-card sp-card">
              <h3 className="sp-status-card__title">Availability</h3>
              <div className="sp-availability-dot">Open to opportunities</div>
              <p className="sp-status-card__text">
                Co-op student at Algonquin College — available for networking,
                IT infrastructure, and cybersecurity roles. Remote or Ottawa-based.
              </p>
              <a href="/#/about" className="sp-btn sp-btn--outline">
                <i className="fas fa-user" /> View Full Profile
              </a>
            </div>

            <div className="sp-status-card sp-card">
              <h3 className="sp-status-card__title">Resume</h3>
              <div className="sp-btn-row" style={{ flexDirection: 'column' }}>
                <a
                  href={process.env.PUBLIC_URL + '/interactive-resume'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sp-btn sp-btn--solid"
                  style={{ justifyContent: 'center' }}
                >
                  <i className="fas fa-file-alt" /> View Interactive Resume
                </a>
                <a
                  href={process.env.PUBLIC_URL + '/resume/downloadresume.pdf'}
                  download
                  className="sp-btn sp-btn--outline"
                  style={{ justifyContent: 'center' }}
                >
                  <i className="fas fa-download" /> Download PDF
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
