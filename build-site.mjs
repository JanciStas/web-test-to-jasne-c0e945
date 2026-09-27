import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createServer, build } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

process.env.NODE_ENV = 'production';
const content = JSON.parse(readFileSync('src/content.json', 'utf8'));
const fonts = {
  modern: [],
  elegant: [
    ['playfair-display', [600, 700]],
    ['lato', [400, 700]],
  ],
  bold: [
    ['archivo-black', [400]],
    ['inter', [400, 600, 700]],
  ],
  corporate: [['inter', [400, 500, 600, 700]]],
  playful: [['nunito', [400, 600, 700, 800]]],
  eshop: [['dm-sans', [400, 500, 600, 700]]],
};
writeFileSync(
  'src/fonts.css',
  (fonts[content.meta?.theme] || [])
    .flatMap(([font, weights]) =>
      weights.flatMap((w) =>
        ['latin', 'latin-ext'].map((subset) => `@import '@fontsource/${font}/${subset}-${w}.css';`)
      )
    )
    .join('\n')
);
await import('./patch-index.mjs');
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true, include: [] },
});
const rendered = [];
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  for (const page of [null, ...(content.pages || [])]) {
    if (page && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug)) throw new Error('Invalid page slug');
    const html = renderToString(React.createElement(App, { content, pageSlug: page?.slug || '' }));
    if ((html.match(/<h1[ >]/g) || []).length !== 1)
      throw new Error('Page must have one main heading');
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    if (!page)
      for (const section of content.meta.sections)
        if (!ids.has(section)) throw new Error('Empty/missing section: ' + section);
    for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g))
      if (!ids.has(anchor)) throw new Error('Broken navigation: #' + anchor);
    if (/style="[^"]*opacity:\s*0(?:;|")/.test(html))
      throw new Error('Hidden content before JavaScript');
    rendered.push({ page, html, path: page ? '/sluzby/' + page.slug + '/' : '/' });
  }
} finally {
  await server.close();
}
await build();
const base = readFileSync('dist/index.html', 'utf8');
const esc = (v) =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
for (const item of rendered) {
  let html = base.replace(
    /<div id="root">[\s\S]*?<\/div><!-- prerender-end -->|<div id="root"><\/div>/,
    () => `<div id="root">${item.html}</div><!-- prerender-end -->`
  );
  if (!html.includes('<!-- prerender-end -->')) throw new Error('Missing root element');
  if (item.page) {
    html = html
      .replace(/<title>[\s\S]*?<\/title>/i, '')
      .replace(
        /<meta\s+(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"[^>]*>/gi,
        ''
      );
    const title = esc(item.page.title + ' — ' + content.meta.companyName),
      desc = esc(item.page.description);
    html = html.replace(
      '</head>',
      `<title>${title}</title><meta name="description" content="${desc}"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"></head>`
    );
  }
  if (content.siteUrl && /^https:\/\/[^/]+\/?$/.test(content.siteUrl))
    html = html.replace(
      '</head>',
      `<link rel="canonical" href="${esc(content.siteUrl.replace(/\/$/, '') + item.path)}"></head>`
    );
  const directory = 'dist' + item.path;
  mkdirSync(directory, { recursive: true });
  writeFileSync(directory + 'index.html', html);
}
if (content.siteUrl && /^https:\/\/[^/]+\/?$/.test(content.siteUrl)) {
  writeFileSync(
    'dist/sitemap.xml',
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      rendered
        .map((p) => `<url><loc>${esc(content.siteUrl.replace(/\/$/, '') + p.path)}</loc></url>`)
        .join('') +
      '</urlset>'
  );
  writeFileSync(
    'dist/robots.txt',
    'User-agent: *\nAllow: /\nSitemap: ' + content.siteUrl.replace(/\/$/, '') + '/sitemap.xml\n'
  );
}
console.log('SITE_BUILD_OK ' + rendered.length + ' pages');

