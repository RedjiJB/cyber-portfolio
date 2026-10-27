#!/usr/bin/env node
/**
 * Post-build step (runs automatically after `npm run build`).
 *
 * The app is a client-rendered React SPA, which search engines and AI agents often
 * cannot read. This script turns the built index.html into one static page per
 * route, each with its own title, description, canonical URL, Open Graph tags,
 * JSON-LD and real HTML content. React replaces that markup when the bundle loads.
 *
 * It also writes sitemap.xml, 404.html (SPA fallback for GitHub Pages),
 * llms.txt / llms-full.txt and a public resume.json (without the phone number).
 */
const fs = require('fs');
const path = require('path');

const { SITE_URL, SITE_NAME, SOCIAL_IMAGE, projectSlug, routes, urlFor, jsonLdFor } = require('../src/seo/pageMeta');
const resume = require('../src/settings/resume.json');

const BUILD = path.resolve(__dirname, '..', 'build');
const BASE_PATH = new URL(SITE_URL).pathname.replace(/\/$/, ''); // "/cyber-portfolio"

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const href = (p) => `${BASE_PATH}${p === '/' ? '/' : `${p}/`}`;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (iso) => {
  const [y, m] = (iso || '').split('-');
  if (!y) return 'Present';
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
};
const period = (a, b) => (a && a === b ? fmt(a) : `${fmt(a)} - ${fmt(b)}`);

const { basics, work, education, skills, volunteer = [], languages = [], projects, certificates } = resume;
const profileUrl = (network) => (basics.profiles.find((p) => p.network === network) || {}).url;

/* ── Page bodies (semantic HTML, visible without JavaScript) ───────────── */
const nav = () => `<nav aria-label="Main"><a href="${href('/')}">Home</a> · <a href="${href('/projects')}">Projects</a> · <a href="${href('/about')}">About</a> · <a href="${href('/contact')}">Contact</a></nav>`;

const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

const bodies = {
  home: () => `
    <header>${nav()}<h1>${esc(basics.name)}</h1><p><strong>${esc(basics.label)}</strong></p></header>
    <p>${esc(basics.description)}</p>
    <h2>Links</h2>
    ${list([
      `<a href="${href('/projects')}">Projects</a>`,
      `<a href="${href('/about')}">About</a>`,
      `<a href="${href('/contact')}">Contact</a>`,
      `<a href="${esc(profileUrl('GitHub'))}">GitHub</a>`,
      `<a href="${esc(profileUrl('LinkedIn'))}">LinkedIn</a>`,
    ])}`,

  projects: () => `
    <header>${nav()}<h1>Projects</h1></header>
    ${projects.map((p) => `
      <article>
        <h2><a href="${href(`/projects/${projectSlug(p.name)}`)}">${esc(p.name)}</a></h2>
        <p>${esc(p.description)}</p>
        <p>Technologies: ${esc((p.keywords || []).join(', '))}</p>
        <p>Status: ${esc(p.type || '')} · ${esc(period(p.startDate, p.endDate))}</p>
      </article>`).join('')}
    <h2>Certifications</h2>
    ${list(certificates.map((c) => `${esc(c.name)} (${esc(c.issuer)}): ${esc(c.status)}`))}`,

  about: () => `
    <header>${nav()}<h1>About ${esc(basics.name)}</h1><p>${esc(basics.label)}</p></header>
    <p>${esc(basics.description)}</p>
    <p>Location: ${esc(basics.location.city)}, ${esc(basics.location.country)}</p>
    <p>Languages: ${esc(languages.filter((l) => ['English', 'Haitian Creole', 'French'].includes(l.language)).map((l) => `${l.language} (${l.fluency})`).join(', '))}</p>
    <h2>Experience</h2>
    ${work.map((w) => `
      <article>
        <h3>${esc(w.position)} at ${esc(w.company)}</h3>
        <p>${esc(period(w.startDate, w.endDate))}</p>
        <p>${esc(w.summary)}</p>
        ${list((w.highlights || []).map(esc))}
      </article>`).join('')}
    <h2>Education</h2>
    ${education.map((e) => `<article><h3>${esc(e.area)} at ${esc(e.institution)}</h3><p>${esc(period(e.startDate, e.endDate))}</p></article>`).join('')}
    <h2>Community &amp; Involvement</h2>
    ${volunteer.map((v) => `<article><h3>${esc(v.position)} at ${esc(v.organization)}</h3><p>${esc(period(v.startDate, v.endDate))}</p><p>${esc(v.summary)}</p></article>`).join('')}
    <h2>Skills</h2>
    ${skills.map((s) => `<h3>${esc(s.name)}</h3><p>${esc(s.keywords.join(', '))}</p>`).join('')}`,

  contact: () => `
    <header>${nav()}<h1>Contact</h1></header>
    <p>Open to co-op and internship roles in software development, cloud and systems administration, networking and cybersecurity.</p>
    ${list([
      `Email: <a href="mailto:${esc(basics.email)}">${esc(basics.email)}</a>`,
      `LinkedIn: <a href="${esc(profileUrl('LinkedIn'))}">${esc(profileUrl('LinkedIn'))}</a>`,
      `GitHub: <a href="${esc(profileUrl('GitHub'))}">${esc(profileUrl('GitHub'))}</a>`,
    ])}`,

  project: (route) => {
    const p = route.project;
    return `
    <header>${nav()}<p><a href="${href('/projects')}">&larr; All projects</a></p><h1>${esc(p.name)}</h1><p>${esc(p.entity || '')}${p.type ? ` · ${esc(p.type)}` : ''}</p></header>
    <h2>Overview</h2>
    <p>${esc(p.overview || p.description)}</p>
    ${p.highlights && p.highlights.length ? `<h2>Highlights</h2>${list(p.highlights.map(esc))}` : ''}
    ${(p.diagrams || []).length ? `<section><h2>Diagrams</h2>${p.diagrams.map((d) => `<figure><img src="${BASE_PATH}/${esc(d.src)}" alt="${esc(d.alt)}" loading="lazy" style="max-width:100%;background:#f4f6fa" /><figcaption>${esc(d.caption)}</figcaption></figure>`).join('')}<p><em>Diagrams are simplified. Addresses, hostnames and account names are placeholders.</em></p></section>` : ''}
    ${(p.sections || []).map((sec) => `<section><h2>${esc(sec.title)}</h2>${(sec.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join('')}${sec.bullets && sec.bullets.length ? list(sec.bullets.map(esc)) : ''}</section>`).join('')}
    <h2>Technologies</h2>
    <p>${esc((p.keywords || []).join(', '))}</p>
    ${p.url ? `<p><a href="${esc(p.url)}">Source code</a></p>` : ''}`;
  },
};

/* ── Head + shell ──────────────────────────────────────────────────────── */
// The prerendered content is for crawlers and AI agents, not for people, so it is
// visually hidden (still in the HTML and still read by screen readers). Visitors see a
// splash in the colour of the page that is about to load, so nothing flashes before React mounts.
const PRERENDER_CSS = `
  #root > .prerender{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
  #root > .prerender-splash{position:fixed;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center}
  #root > .prerender-splash::after{content:"";width:36px;height:36px;border:3px solid rgba(128,128,128,.25);border-top-color:#00b4d8;border-radius:50%;animation:root-spin .8s linear infinite}`;

// The landing page follows the saved theme (light by default); every other page is dark.
const backdropHeadFor = (route) => (route.kind === 'home'
  ? `<style>html{background:#fafafa}</style><script>try{if(JSON.parse(localStorage.getItem("dark")))document.documentElement.style.background="#111111"}catch(e){}</script>`
  : `<style>html{background:#121212}</style>`);

const headFor = (route) => {
  const url = urlFor(route.path);
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" data-react-helmet="true" />`,
    `<meta name="author" content="${esc(basics.name)}" data-react-helmet="true" />`,
    `<meta name="keywords" content="${esc(basics.keywords)}" data-react-helmet="true" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" data-react-helmet="true" />`,
    `<link rel="canonical" href="${esc(url)}" data-react-helmet="true" />`,
    `<meta property="og:type" content="website" data-react-helmet="true" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" data-react-helmet="true" />`,
    `<meta property="og:title" content="${esc(route.title)}" data-react-helmet="true" />`,
    `<meta property="og:description" content="${esc(route.description)}" data-react-helmet="true" />`,
    `<meta property="og:url" content="${esc(url)}" data-react-helmet="true" />`,
    `<meta property="og:image" content="${esc(SOCIAL_IMAGE)}" data-react-helmet="true" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="600" />`,
    `<meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" data-react-helmet="true" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" data-react-helmet="true" />`,
    `<meta name="twitter:image" content="${esc(SOCIAL_IMAGE)}" data-react-helmet="true" />`,
    `<script type="application/ld+json" data-react-helmet="true">${JSON.stringify(jsonLdFor(route)).replace(/</g, '\\u003c')}</script>`,
    `<style>${PRERENDER_CSS}</style>`,
    backdropHeadFor(route),
    // Without JavaScript there is no app to wait for, so show the readable static page instead of the splash.
    `<noscript><style>#root>.prerender-splash{display:none}#root>.prerender{position:static;width:auto;height:auto;max-width:820px;margin:0 auto;padding:2rem 1.5rem;overflow:visible;clip:auto;clip-path:none;white-space:normal;font:16px/1.65 system-ui,sans-serif;color:#eceff8;background:#121212;min-height:100vh}#root>.prerender a{color:#00c8e8}html,body{background:#121212}</style></noscript>`,
  ];
  return tags.join('\n        ');
};

const render = (shell, route) => {
  let html = shell.replace(/<title>[\s\S]*?<\/title>/, '');
  html = html.replace('</head>', `        ${headFor(route)}\n    </head>`);
  const splashStyle = route.kind === 'home' ? '' : ' style="background:#121212"';
  const body = `<div class="prerender-splash" aria-hidden="true"${splashStyle}></div><div class="prerender"><main>${bodies[route.kind](route)}</main></div>`;
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
};

const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

/* ── Run ───────────────────────────────────────────────────────────────── */
const shellPath = path.join(BUILD, 'index.html');
if (!fs.existsSync(shellPath)) {
  console.error('prerender: build/index.html not found. Run the build first.');
  process.exit(1);
}
const shell = fs.readFileSync(shellPath, 'utf8');
if (!shell.includes('<div id="root"></div>')) {
  console.error('prerender: expected an empty <div id="root"></div> in build/index.html (already prerendered?).');
  process.exit(1);
}

const all = routes();
all.forEach((route) => {
  const out = route.path === '/' ? shellPath : path.join(BUILD, route.path, 'index.html');
  write(out, render(shell, route));
});

// 404 fallback: the app shows its own "not found" route and tells crawlers not to index it.
write(path.join(BUILD, '404.html'), shell.replace('</head>', '        <meta name="robots" content="noindex, follow" />\n    </head>'));

write(path.join(BUILD, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((r) => `  <url>\n    <loc>${urlFor(r.path)}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>`).join('\n')}
</urlset>
`);

// Machine-readable summaries for AI agents (https://llmstxt.org) and a JSON Resume copy.
const llms = `# ${basics.name}

> ${basics.label}. ${basics.description}

Personal portfolio of ${basics.name} (${basics.location.city}, ${basics.location.region}, ${basics.location.country}).

## Pages
${all.filter((r) => r.kind !== 'project').map((r) => `- [${r.title.split(' | ')[0] === SITE_NAME ? 'Home' : r.title.split(' | ')[0]}](${urlFor(r.path)}): ${r.description}`).join('\n')}

## Projects
${projects.map((p) => `- [${p.name}](${urlFor(`/projects/${projectSlug(p.name)}`)}): ${p.description}`).join('\n')}

## Optional
- [Full text of this site](${SITE_URL}/llms-full.txt)
- [JSON Resume](${SITE_URL}/resume.json)
- [GitHub](${profileUrl('GitHub')})
- [LinkedIn](${profileUrl('LinkedIn')})
- Contact: ${basics.email}
`;
write(path.join(BUILD, 'llms.txt'), llms);

const llmsFull = `# ${basics.name}: full portfolio text

${basics.label}
${basics.description}
Location: ${basics.location.city}, ${basics.location.region}, ${basics.location.country}
Email: ${basics.email}
GitHub: ${profileUrl('GitHub')}
LinkedIn: ${profileUrl('LinkedIn')}

## Experience
${work.map((w) => `### ${w.position}, ${w.company} (${period(w.startDate, w.endDate)})\n${w.summary}\n${(w.highlights || []).map((h) => `- ${h}`).join('\n')}`).join('\n\n')}

## Education
${education.map((e) => `- ${e.area}, ${e.institution} (${period(e.startDate, e.endDate)})`).join('\n')}

## Community and involvement
${volunteer.map((v) => `- ${v.position}, ${v.organization} (${period(v.startDate, v.endDate)}): ${v.summary}`).join('\n')}

## Certifications
${certificates.map((c) => `- ${c.name} (${c.issuer}): ${c.status}`).join('\n')}

## Skills
${skills.map((s) => `- ${s.name}: ${s.keywords.join(', ')}`).join('\n')}

## Projects
${projects.map((p) => `### ${p.name} (${p.type || 'Project'})\n${p.overview || p.description}\n${(p.sections || []).map((sec) => `#### ${sec.title}\n${(sec.paragraphs || []).join('\n')}${sec.bullets ? `\n${sec.bullets.map((b) => `- ${b}`).join('\n')}` : ''}`).join('\n')}\nTechnologies: ${(p.keywords || []).join(', ')}\n${p.url ? `Source: ${p.url}\n` : ''}URL: ${urlFor(`/projects/${projectSlug(p.name)}`)}`).join('\n\n')}
`;
write(path.join(BUILD, 'llms-full.txt'), llmsFull);

const publicResume = JSON.parse(JSON.stringify(resume));
delete publicResume.basics.phone;
delete publicResume.references;
write(path.join(BUILD, 'resume.json'), `${JSON.stringify(publicResume, null, 2)}\n`);

console.log(`prerender: wrote ${all.length} pages, 404.html, sitemap.xml, llms.txt, llms-full.txt, resume.json`);
