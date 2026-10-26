import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TopNavbar } from '../components/nav/TopNavbar';
import DarkSphere from '../components/background/DarkSphere';
import resume from '../settings/resume.json';
import { projectSlug } from '../utils/projectSlug';
import './SubPage.css';
import './ProjectCase.css';

const assetUrl = (src) => `${process.env.PUBLIC_URL}/${src}`;

export const ProjectCase = () => {
  const { slug } = useParams();
  const { projects } = resume;
  const index = projects.findIndex((p) => projectSlug(p.name) === slug);
  const project = projects[index];

  if (!project) {
    return (
      <div className="sp-page">
        <DarkSphere />
        <TopNavbar forceDark />
        <main className="pc-section">
          <h1 className="pc-title">Project not found</h1>
          <p className="pc-text"><Link to="/projects">&larr; Back to projects</Link></p>
        </main>
      </div>
    );
  }

  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <div className="sp-page">
      <DarkSphere />
      <TopNavbar forceDark />

      <main className="pc-section">
        <p className="pc-kicker">Case study {String(index + 1).padStart(2, '0')}</p>
        <h1 className="pc-title">{project.name}</h1>
        <p className="pc-sub">{project.entity}{project.type ? ` · ${project.type}` : ''}</p>

        <section className="pc-card">
          <h2 className="pc-heading">Overview</h2>
          <p className="pc-text">{project.overview || project.description}</p>
        </section>

        {project.highlights?.length > 0 && (
          <section className="pc-card">
            <h2 className="pc-heading">Highlights</h2>
            <ul className="pc-list">
              {project.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </section>
        )}

        {project.diagrams?.length > 0 && (
          <section className="pc-diagrams" aria-label="Diagrams">
            {project.diagrams.map((d) => (
              <figure key={d.src} className="pc-figure">
                <a href={assetUrl(d.src)} target="_blank" rel="noopener noreferrer" title="Open full size">
                  <img src={assetUrl(d.src)} alt={d.alt} loading="lazy" decoding="async" />
                </a>
                <figcaption>{d.caption} <span className="pc-hint">Tap to open full size.</span></figcaption>
              </figure>
            ))}
            <p className="pc-note">Diagrams are simplified. Addresses, hostnames and account names are placeholders.</p>
          </section>
        )}

        {project.sections?.map((s) => (
          <section key={s.title} className="pc-card">
            <h2 className="pc-heading">{s.title}</h2>
            {s.paragraphs?.map((t) => <p key={t} className="pc-text">{t}</p>)}
            {s.bullets?.length > 0 && (
              <ul className="pc-list">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
          </section>
        ))}

        {project.keywords?.length > 0 && (
          <section className="pc-card">
            <h2 className="pc-heading">Tech &amp; skills</h2>
            <div className="pc-tags">
              {project.keywords.map((kw) => <span key={kw} className="pc-tag">{kw}</span>)}
            </div>
          </section>
        )}

        {project.url && (
          <p className="pc-text">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="pc-link">
              View source on GitHub &rarr;
            </a>
          </p>
        )}

        <nav className="pc-pager" aria-label="More projects">
          {prev ? <Link to={`/projects/${projectSlug(prev.name)}`}>&larr; {prev.name}</Link> : <span />}
          {next ? <Link to={`/projects/${projectSlug(next.name)}`}>{next.name} &rarr;</Link> : <span />}
        </nav>
      </main>
    </div>
  );
};

export default ProjectCase;
