// Resize only the known image CDN. Never rewrite customer URLs/signed links.
export default function SiteImage({ src, alt = '', priority = false, width = 1200, height = 800, sizes = '(max-width: 767px) 100vw, 50vw', ...props }) {
  if (!src) return null;
  let srcSet;
  let source = src;
  try {
    const url = new URL(src, 'https://site.invalid');
    if (/^\/media\/[a-f0-9]{32}\.webp$/.test(src)) srcSet = [480,960,1600].map(w => `${src.replace('.webp',w===1600?'.webp':'-'+w+'.webp')} ${w}w`).join(', ');
    if (url.hostname === 'images.pexels.com') {
      const variant = w => {
        const u = new URL(url); u.searchParams.set('auto', 'compress'); u.searchParams.set('cs', 'tinysrgb');
        u.searchParams.set('w', String(w)); u.searchParams.set('fit', 'crop'); return u.href;
      };
      source = variant(width);
      srcSet = [480, 768, 1200, 1600].map(w => `${variant(w)} ${w}w`).join(', ');
    }
  } catch { return null; }
  return <img {...props} src={source} srcSet={srcSet} sizes={srcSet ? sizes : undefined} alt={alt}
    width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchpriority={priority ? 'high' : 'auto'} />;
}

