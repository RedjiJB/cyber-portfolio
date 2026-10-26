// Single source of truth for per-page SEO. CommonJS on purpose: the React app
// imports it (webpack handles CJS) and scripts/prerender.js requires it in Node.
const resume = require('../settings/resume.json');

const SITE_URL = 'https://redjijb.github.io/cyber-portfolio';
const SITE_NAME = 'Redji Jean Baptiste';
const SOCIAL_IMAGE = `${SITE_URL}/social-image.png`;
const PERSON_IMAGE = `${SITE_URL}/assets/profile-bw.jpg`;

const projectSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const trim = (text, max = 158) => {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
};

const { basics, projects } = resume;
const profile = (network) => (basics.profiles.find((p) => p.network === network) || {}).url;

const personNode = () => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: basics.name,
  url: `${SITE_URL}/`,
  image: PERSON_IMAGE,
  jobTitle: basics.label,
  description: basics.description,
  email: `mailto:${basics.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Ottawa', addressRegion: 'ON', addressCountry: 'CA' },
  worksFor: { '@type': 'Organization', name: 'The Sod Boys', url: 'https://thesodboys.ca' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Algonquin College', url: 'https://www.algonquincollege.com/' },
  knowsLanguage: ['en', 'ht', 'fr'],
  knowsAbout: resume.skills.flatMap((s) => s.keywords),
  sameAs: [profile('GitHub'), profile('LinkedIn')].filter(Boolean),
});

const routes = () => {
  const list = [
    {
      path: '/',
      title: `${SITE_NAME} | Full-Stack Developer & Cloud System Administrator`,
      description: trim('Portfolio of Redji Jean Baptiste: full-stack developer, cloud system administrator and networking student at Algonquin College (Ottawa & Toronto, Canada).'),
      kind: 'home',
    },
    {
      path: '/projects',
      title: `Projects | ${SITE_NAME}`,
      description: trim('Projects by Redji Jean Baptiste: a production field-operations platform, a terminal training game, Windows and Linux automation toolkits and networking labs.'),
      kind: 'projects',
    },
    {
      path: '/about',
      title: `About | ${SITE_NAME}`,
      description: trim('About Redji Jean Baptiste: cloud administration, software development, IT help desk and security operations experience, plus studies at Algonquin College.'),
      kind: 'about',
    },
    {
      path: '/contact',
      title: `Contact | ${SITE_NAME}`,
      description: trim('Contact Redji Jean Baptiste about co-op and internship roles in software development, cloud and systems administration, networking and cybersecurity.'),
      kind: 'contact',
    },
  ];
  projects.forEach((project) => {
    list.push({
      path: `/projects/${projectSlug(project.name)}`,
      title: `${project.name} | Projects | ${SITE_NAME}`,
      description: trim(`${project.name}: ${project.description}`),
      kind: 'project',
      project,
    });
  });
  return list;
};

const urlFor = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`);

const jsonLdFor = (route) => {
  const url = urlFor(route.path);
  const site = { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, inLanguage: 'en', publisher: { '@id': `${SITE_URL}/#person` } };
  const page = {
    '@type': route.kind === 'about' ? 'ProfilePage' : route.kind === 'projects' ? 'CollectionPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
  };
  if (route.kind === 'about') page.mainEntity = { '@id': `${SITE_URL}/#person` };
  if (route.kind === 'projects') {
    page.mainEntity = {
      '@type': 'ItemList',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: urlFor(`/projects/${projectSlug(p.name)}`),
      })),
    };
  }

  const graph = [page];
  if (route.kind === 'home') graph.push(site);
  if (route.kind === 'home' || route.kind === 'about') graph.push(personNode());

  if (route.kind === 'project') {
    const p = route.project;
    graph.push({
      '@type': 'SoftwareSourceCode',
      name: p.name,
      description: p.description,
      url,
      author: { '@id': `${SITE_URL}/#person` },
      keywords: (p.keywords || []).join(', '),
      ...(p.url ? { codeRepository: p.url } : {}),
    });
  }

  if (route.path !== '/') {
    const crumbs = [{ name: 'Home', url: `${SITE_URL}/` }];
    if (route.kind === 'project') crumbs.push({ name: 'Projects', url: urlFor('/projects') });
    crumbs.push({ name: route.kind === 'project' ? route.project.name : route.title.split(' | ')[0], url });
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
};

// Lookup used by the client; pathname is relative to the router basename.
const metaFor = (pathname) => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const route = routes().find((r) => r.path === clean);
  if (!route) {
    return { title: `Page not found | ${SITE_NAME}`, description: 'This page does not exist.', url: `${SITE_URL}/`, noindex: true, jsonLd: null };
  }
  return { title: route.title, description: route.description, url: urlFor(route.path), noindex: false, jsonLd: jsonLdFor(route) };
};

module.exports = {
  SITE_URL, SITE_NAME, SOCIAL_IMAGE, projectSlug, routes, urlFor, jsonLdFor, metaFor,
};
