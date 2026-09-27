// Build-time SEO patch for index.html.
//
// The runtime React app (App.jsx setHeadTags) injects <title>/description/OG
// tags via JS — correct for browsers, but Facebook/WhatsApp/LinkedIn scrapers
// do NOT run JS, so a shared link would have no preview. This script bakes the
// same metadata into the static index.html BEFORE `npm run build`, so scrapers
// see it in the served HTML.
//
// Runs in the project root (cwd) inside the Codespace: `node patch-index.mjs`.
// No dependencies — plain fs + string ops. Non-fatal by design: on any problem
// it logs and exits 0 so the build still proceeds (graceful degradation to the
// JS-only behaviour we had before).

import { readFileSync, writeFileSync, existsSync } from 'fs';

const MARKER = '<!-- seo-patched -->';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

try {
  if (!existsSync('index.html') || !existsSync('src/content.json')) {
    console.log('patch-index: index.html or content.json missing — skipping');
    process.exit(0);
  }

  const content = JSON.parse(readFileSync('src/content.json', 'utf8'));
  const companyName = content.meta?.companyName || '';
  const title = content.seo?.title || companyName || 'Web';
  const description = content.seo?.description || '';
  const ogImage = content.images?.hero || '';

  const tags = [
    MARKER,
    `<title>${esc(title)}</title>`,
    description && `<meta name="description" content="${esc(description)}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    description && `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="sk_SK">`,
    ogImage && `<meta property="og:image" content="${esc(ogImage)}">`,
    `<meta name="twitter:card" content="${ogImage ? 'summary_large_image' : 'summary'}">`,
  ].filter(Boolean).join('\n    ');

  let html = readFileSync('index.html', 'utf8');

  // Remove a previous patch block (everything from MARKER to the last tag we add).
  if (html.includes(MARKER)) {
    html = html.replace(new RegExp(`\\s*${MARKER}[\\s\\S]*?twitter:card[^>]*>`, ''), '');
  }
  // Drop any pre-existing static <title> so ours is authoritative.
  html = html.replace(/<title>[\s\S]*?<\/title>\s*/i, '');

  // Ensure Slovak lang on <html>.
  if (/<html[^>]*\slang=/i.test(html)) {
    html = html.replace(/(<html[^>]*\slang=)"[^"]*"/i, '$1"sk"');
  } else {
    html = html.replace(/<html/i, '<html lang="sk"');
  }

  // Inject our block right after <head> (fallback: before </head>).
  if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/(<head[^>]*>)/i, `$1\n    ${tags}`);
  } else if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `    ${tags}\n  </head>`);
  } else {
    console.log('patch-index: no <head> found — skipping');
    process.exit(0);
  }

  writeFileSync('index.html', html);
  console.log(`patch-index: OK — title="${title}"`);
} catch (err) {
  console.log(`patch-index: non-fatal error — ${err.message}`);
  process.exit(0);
}

