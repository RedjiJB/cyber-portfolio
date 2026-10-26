import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TopNavbar } from '../components/nav/TopNavbar';
import DarkSphere from '../components/background/DarkSphere';
import { projectSlug } from '../utils/projectSlug';
import resume from '../settings/resume.json';
import './SubPage.css';
import './ProjectsPage.css';

const CATEGORIES = ['All', 'In Progress', 'Planning'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2024-09-01" -> "Sep 2024"; empty string stays empty
const formatMonth = (iso) => {
  const [year, month] = (iso || '').split('-');
  return year && month ? `${MONTHS[Number(month) - 1]} ${year}` : '';
};

const dateLabel = ({ startDate, endDate }) => {
  const start = formatMonth(startDate);
  if (!start) return 'Planned';
  return `${start} - ${formatMonth(endDate) || 'Present'}`;
};

export const Projects = () => {
  const { projects, certificates } = resume;
  const [activeCategory, setActiveCategory] = useState('All');
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const filteredProjects = useMemo(
    () => (activeCategory === 'All' ? projects : projects.filter((p) => p.type === activeCategory)),
    [projects, activeCategory]
  );

  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;
    setAnimating(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(category);
      setAnimating(false);
    }, 200);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div className="sp-page pp-page">
      <DarkSphere />
      <TopNavbar forceDark />

      <main className="pp-section">
        <h1 className="pp-title">Projects</h1>

        <div className="pp-categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`pp-category${activeCategory === category ? ' active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={`pp-grid${animating ? ' animating' : ''}`}>
          {filteredProjects.map((project, index) => (
            <div key={project.name} className="pp-card" style={{ '--order': index }}>
              <h3 className="pp-card__title">{project.name}</h3>
              <p className="pp-card__desc">{project.description}</p>

              <div className="pp-tech">
                {project.keywords?.map((kw) => <span key={kw} className="pp-tag">{kw}</span>)}
              </div>

              <div className="pp-date">{dateLabel(project)}</div>

              <div className="pp-links">
                <Link to={`/projects/${projectSlug(project.name)}`} className="pp-link">
                  <i className="fas fa-book-open" /> Case study
                </Link>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="pp-link">
                    <i className="fab fa-github" /> Source
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {certificates?.length > 0 && (
          <div className="pp-certs">
            <h2 className="pp-subtitle">Certifications</h2>
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
      </main>
    </div>
  );
};

export default Projects;
