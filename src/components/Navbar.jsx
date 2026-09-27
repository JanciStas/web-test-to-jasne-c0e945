import SiteImage from './SiteImage';
import { useState, useEffect } from 'react';
const LIGHT_THEMES = ['elegant', 'corporate', 'playful', 'eshop'];
export default function Navbar({
  data,
  sections
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const name = data.meta?.companyName || '';
  const lightHero = LIGHT_THEMES.includes(data.meta?.theme || 'modern');
  const links = (sections || []).filter(s => s !== 'hero').map(s => ({
    id: s,
    label: {
      features: 'Služby',
      products: 'Produkty',
      menu: 'Menu',
      team: 'Tím',
      testimonials: 'Referencie',
      gallery: 'Galéria',
      pricing: 'Cenník',
      hours: 'Hodiny',
      contact: 'Kontakt',
      faq: 'FAQ'
    }[s] || s
  }));
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // At the top of the page the hero decides text color: dark heroes need white
  // text, light-theme heroes need dark text. Once scrolled, the bar gets a
  // theme-colored translucent background and always uses theme text colors.
  const solid = scrolled || open;
  const brandColor = solid || lightHero ? 'text-[var(--t1)]' : 'text-white';
  const linkColor = solid || lightHero ? 'text-[var(--t2)] hover:text-[var(--t1)]' : 'text-white/70 hover:text-white';
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md shadow-sm' : ''}`} style={scrolled ? {
    background: 'color-mix(in srgb, var(--bg-a) 85%, transparent)'
  } : undefined}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className={`max-w-[70%] xl:max-w-[30%] truncate text-lg font-bold tracking-tight transition-colors ${brandColor}`}>{data.images?.logo && <SiteImage data-edit="images.logo" src={data.images.logo} alt="" width={40} height={40} priority className="inline-block w-10 h-10 object-contain mr-2" />}{name}</a>

        <div className="hidden xl:flex items-center gap-4">
          {links.map(l => <a key={l.id} href={`#${l.id}`} className={`text-sm transition-colors ${linkColor}`}>{l.label}</a>)}
          <a href="#contact" className="px-5 py-2 text-sm font-medium bg-[var(--accent)] text-white rounded-[var(--r-btn)] hover:opacity-90 transition-opacity">
            Kontaktujte nás
          </a>
        </div>

        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" className={`xl:hidden p-2 ${solid || lightHero ? 'text-[var(--t2)]' : 'text-white'}`} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && <div id="mobile-menu" className="xl:hidden bg-[var(--bg-a)] border-t border-[var(--border-c)] px-6 py-4 space-y-3">
          {links.map(l => <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="block text-[var(--t2)] hover:text-[var(--t1)] py-1">{l.label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)} className="block w-full text-center px-5 py-2.5 bg-[var(--accent)] text-white rounded-[var(--r-btn)] mt-3 hover:opacity-90 transition-opacity">
            Kontaktujte nás
          </a>
        </div>}
    </nav>;
}

