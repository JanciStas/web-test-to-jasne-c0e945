import { useEffect } from 'react';
// Self-hosted theme fonts (no request to Google Fonts — GDPR). The browser only
// loads only faces selected for the active theme by build-site.mjs.
// Slovak needs the latin-ext subset for diacritics.

import baseContent from './content.json';
import ServicePage from './components/ServicePage';
import EditorBridge from './components/EditorBridge';
import BusinessActions from './components/BusinessActions';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Team from './components/Team';
import Hours from './components/Hours';
import Products from './components/Products';

const SECTION_MAP = {
  hero: Hero,
  features: Features,
  products: Products,
  menu: Menu,
  team: Team,
  testimonials: Testimonials,
  gallery: Gallery,
  pricing: Pricing,
  hours: Hours,
  contact: Contact,
  faq: FAQ,
};

const ACCENT_MAP = {
  blue: { light: '#3b82f6', dark: '#1d4ed8', glow: 'rgba(59,130,246,0.12)' },
  emerald: { light: '#10b981', dark: '#059669', glow: 'rgba(16,185,129,0.12)' },
  rose: { light: '#f43f5e', dark: '#e11d48', glow: 'rgba(244,63,94,0.12)' },
  amber: { light: '#f59e0b', dark: '#d97706', glow: 'rgba(245,158,11,0.12)' },
  violet: { light: '#8b5cf6', dark: '#7c3aed', glow: 'rgba(139,92,246,0.12)' },
  cyan: { light: '#06b6d4', dark: '#0891b2', glow: 'rgba(6,182,212,0.12)' },
};

// Design themes per business vertical. Tokens are exposed as CSS variables;
// components consume them via Tailwind arbitrary values (bg-[var(--bg-a)] etc.).
// `modern` reproduces the original dark-hero design exactly (backward compatible
// with content.json files that have no meta.theme).
const THEME_MAP = {
  modern: {
    // tech, SaaS, agencies — original design
    bgA: '#ffffff', bgB: '#f9fafb',
    t1: '#111827', t2: '#4b5563', t3: '#9ca3af',
    borderC: '#f3f4f6', invMuted: '#9ca3af',
    rCard: '1rem', rBtn: '0.5rem', rBadge: '9999px',
    fontHeading: "ui-sans-serif, system-ui, -apple-system, sans-serif",
    fontBody: "ui-sans-serif, system-ui, -apple-system, sans-serif",
    footerBg: '#111827',
    heroLight: false,
    noise: true,
  },
  elegant: {
    // restaurants, cafés, beauty, wellness, hotels — warm cream + serif
    bgA: '#faf7f2', bgB: '#f3ede3',
    t1: '#292524', t2: '#57534e', t3: '#a8a29e',
    borderC: '#e7e0d4', invMuted: '#a8a29e',
    rCard: '0.375rem', rBtn: '0.25rem', rBadge: '9999px',
    fontHeading: "'Playfair Display', Georgia, serif",
    fontBody: "'Lato', ui-sans-serif, system-ui, sans-serif",
    footerBg: '#1c1917',
    heroLight: true,
    noise: false,
  },
  bold: {
    // fitness, sports, car services, trades, construction — black + sharp edges
    bgA: '#0a0a0a', bgB: '#171717',
    t1: '#ffffff', t2: '#a3a3a3', t3: '#737373',
    borderC: '#262626', invMuted: '#525252',
    rCard: '0', rBtn: '0', rBadge: '0',
    fontHeading: "'Archivo Black', 'Arial Black', sans-serif",
    fontBody: "'Inter', ui-sans-serif, system-ui, sans-serif",
    footerBg: '#000000',
    heroLight: false,
    noise: true,
  },
  corporate: {
    // lawyers, accountants, finance, medical — clean, trustworthy, whitespace
    bgA: '#ffffff', bgB: '#f8fafc',
    t1: '#0f172a', t2: '#475569', t3: '#94a3b8',
    borderC: '#e2e8f0', invMuted: '#94a3b8',
    rCard: '0.75rem', rBtn: '0.5rem', rBadge: '9999px',
    fontHeading: "'Inter', ui-sans-serif, system-ui, sans-serif",
    fontBody: "'Inter', ui-sans-serif, system-ui, sans-serif",
    footerBg: '#0f172a',
    heroLight: true,
    noise: false,
  },
  eshop: {
    // online stores, product catalogs — clean white retail look
    bgA: '#ffffff', bgB: '#f5f5f7',
    t1: '#1a1a1a', t2: '#52525b', t3: '#a1a1aa',
    borderC: '#e4e4e7', invMuted: '#a1a1aa',
    rCard: '0.5rem', rBtn: '0.375rem', rBadge: '0.25rem',
    fontHeading: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    fontBody: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    footerBg: '#18181b',
    heroLight: true,
    noise: false,
  },
  playful: {
    // kids, events, creative services, florists — pastel + rounded
    bgA: '#fffcf7', bgB: '#fdf3ec',
    t1: '#3f3d56', t2: '#6b6885', t3: '#a5a3b8',
    borderC: '#f0e6dc', invMuted: '#a5a3b8',
    rCard: '1.5rem', rBtn: '9999px', rBadge: '9999px',
    fontHeading: "'Nunito', ui-sans-serif, system-ui, sans-serif",
    fontBody: "'Nunito', ui-sans-serif, system-ui, sans-serif",
    footerBg: '#3f3d56',
    heroLight: true,
    noise: false,
  },
};

// Idempotent <head> management: every injected element carries data-app-head
// so a re-run (theme/content hot-swap) replaces instead of duplicating.
function setHeadTags({ seo, companyName, accent, theme }) {
  document.querySelectorAll('[data-app-head]').forEach(el => el.remove());
  const add = (el) => { el.setAttribute('data-app-head', ''); document.head.appendChild(el); return el; };

  // Title + SEO meta + OpenGraph
  const title = seo?.title || companyName || document.title;
  document.title = title;
  const description = seo?.description || '';
  const metas = [
    description && { name: 'description', content: description },
    { property: 'og:title', content: title },
    description && { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
  ].filter(Boolean);
  for (const m of metas) {
    const el = document.createElement('meta');
    if (m.name) el.setAttribute('name', m.name);
    if (m.property) el.setAttribute('property', m.property);
    el.setAttribute('content', m.content);
    add(el);
  }

  // Favicon: accent-colored rounded square + white company initial (SVG data URI, no asset needed)
  const initial = (companyName || 'W').trim().charAt(0).toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='${accent.light}'/><text x='32' y='44' font-size='34' font-family='Arial, sans-serif' font-weight='bold' text-anchor='middle' fill='#ffffff'>${initial}</text></svg>`;
  const icon = document.createElement('link');
  icon.rel = 'icon';
  icon.type = 'image/svg+xml';
  icon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  add(icon);

}

export default function App({ content = baseContent, pageSlug = '' }) {
  const slug = pageSlug || (typeof window !== 'undefined' ? window.location.pathname.match(/^\/sluzby\/([^/]+)\/?$/)?.[1] : '');
  const pageIndex = (content.pages || []).findIndex(p=>p.slug===slug);
  const page = content.pages?.[pageIndex];
  const accent = ACCENT_MAP[content.meta?.accentColor] || ACCENT_MAP.blue;
  const themeName = THEME_MAP[content.meta?.theme] ? content.meta.theme : 'modern';
  const theme = THEME_MAP[themeName];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', accent.light);
    root.style.setProperty('--accent-dark', accent.dark);
    root.style.setProperty('--accent-glow', accent.glow);
    root.style.setProperty('--bg-a', theme.bgA);
    root.style.setProperty('--bg-b', theme.bgB);
    root.style.setProperty('--t1', theme.t1);
    root.style.setProperty('--t2', theme.t2);
    root.style.setProperty('--t3', theme.t3);
    root.style.setProperty('--border-c', theme.borderC);
    root.style.setProperty('--inv-muted', theme.invMuted);
    root.style.setProperty('--r-card', theme.rCard);
    root.style.setProperty('--r-btn', theme.rBtn);
    root.style.setProperty('--r-badge', theme.rBadge);
    root.style.setProperty('--font-heading', theme.fontHeading);
    root.style.setProperty('--font-body', theme.fontBody);
    root.style.setProperty('--footer-bg', theme.footerBg);
    root.setAttribute('data-theme', themeName);
    root.setAttribute('data-layout', content.meta?.layout === 'editorial' ? 'editorial' : 'classic');

    setHeadTags({
      seo: page ? { title: page.title + ' — ' + content.meta.companyName, description: page.description } : content.seo,
      companyName: content.meta?.companyName,
      accent,
      theme,
    });
  }, [accent, theme, themeName, content, page]);

  const sections = page ? ['hero', ...(page.faq?.length ? ['faq'] : []), 'contact'] : content.meta?.sections || ['hero', 'features', 'contact'];
  const images = content.images || {};

  return (
    <div className="min-h-screen bg-[var(--bg-a)] text-[var(--t1)]" style={{ fontFamily: 'var(--font-body)', '--accent': accent.light, '--accent-dark': accent.dark, '--accent-glow': accent.glow,
      '--bg-a': theme.bgA, '--bg-b': theme.bgB, '--t1': theme.t1, '--t2': theme.t2, '--t3': theme.t3,
      '--border-c': theme.borderC, '--inv-muted': theme.invMuted, '--r-card': theme.rCard, '--r-btn': theme.rBtn,
      '--r-badge': theme.rBadge, '--font-heading': theme.fontHeading, '--font-body': theme.fontBody, '--footer-bg': theme.footerBg }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }
        section { scroll-margin-top: 5rem; }
        body { background: ${theme.bgA}; }
        h1, h2, h3, h4 { font-family: var(--font-heading); }
        ${themeName === 'bold' ? `
        h1, h2 { text-transform: uppercase; letter-spacing: 0.02em; }
        #hero { clip-path: polygon(0 0, 100% 0, 100% calc(100% - 3.5rem), 0 100%); }
        ` : ''}
        ${theme.noise ? `body {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
        }` : ''}
      ` }} />


      <EditorBridge origin={content.editorOrigin}/><Navbar data={content} sections={sections} />

      {page ? <ServicePage data={content} page={page} index={pageIndex}/> : sections.map(sectionId => {
        const Component = SECTION_MAP[sectionId];
        if (!Component) return null;
        return <Component key={sectionId} data={content} images={images} />;
      })}

      <BusinessActions data={content}/><Footer data={content} sections={sections} />
    </div>
  );
}

