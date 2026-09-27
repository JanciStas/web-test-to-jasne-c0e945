import SiteImage from './SiteImage';
// Only http(s)/mailto/tel/anchor/relative links may reach an href — the content
// is AI-authored from customer text, so `javascript:` must never render.
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|#|\/)/i;
const safeHref = (v, fallback = '#') => typeof v === 'string' && SAFE_HREF.test(v.trim()) ? v : fallback;
const LIGHT_THEMES = ['elegant', 'corporate', 'playful', 'eshop'];
function DarkHero({
  d,
  bgImage
}) {
  return <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {bgImage ? <div className="absolute inset-0">
          <SiteImage data-edit="images.hero" src={bgImage} alt="" className="w-full h-full object-cover" priority />
          <div data-edit-target="images.hero" className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40" />
        </div> : <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-gradient" />}

      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl bg-[var(--accent)]" />
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full opacity-15 blur-3xl bg-[var(--accent-dark)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-2xl">
          {d.badge && <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase bg-white/10 text-white/80 rounded-[var(--r-badge)] mb-6 backdrop-blur-sm border border-white/10">
              <span data-edit="hero.badge">{d.badge}</span>
            </span>}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            <span data-edit="hero.heading">{d.heading}</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
            <span data-edit="hero.subtitle">{d.subtitle}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            {d.cta1 && <a href={safeHref(d.cta1.link, '#features')} className="px-8 py-3.5 bg-[var(--accent)] text-white font-semibold rounded-[var(--r-btn)] hover:bg-[var(--accent-dark)] transition-all text-center shadow-lg shadow-[var(--accent-glow)]">
                <span data-edit="hero.cta1.text">{d.cta1.text}</span>
              </a>}
            {d.cta2 && <a href={safeHref(d.cta2.link, '#contact')} className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-[var(--r-btn)] hover:bg-white/10 transition-all text-center backdrop-blur-sm">
                <span data-edit="hero.cta2.text">{d.cta2.text}</span>
              </a>}
          </div>

          {d.stats && d.stats.length > 0 && <div className="flex gap-10 pt-8 border-t border-white/10">
              {d.stats.map((s, i) => <div key={i}>
                  <div className="text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-sm text-white/50 mt-1">{s.label}</div>
                </div>)}
            </div>}
        </div>
      </div>
    </section>;
}
function LightHero({
  d,
  bgImage,
  playful
}) {
  // Split layout: text left, image (or decorative panel) right.
  // Playful theme renders the visual as an organic blob shape.
  const imageRadius = playful ? '42% 58% 55% 45% / 48% 44% 56% 52%' : 'var(--r-card)';
  return <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-b)]">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-25 blur-3xl bg-[var(--accent-glow)] pointer-events-none" style={{
      background: 'var(--accent-glow)'
    }} />

      <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            {d.badge && <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-[var(--accent-dark)] rounded-[var(--r-badge)] mb-6 border border-[var(--border-c)] bg-[var(--bg-a)]">
                <span data-edit="hero.badge">{d.badge}</span>
              </span>}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--t1)] leading-tight tracking-tight mb-6">
              <span data-edit="hero.heading">{d.heading}</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--t2)] leading-relaxed mb-10 max-w-xl">
              <span data-edit="hero.subtitle">{d.subtitle}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              {d.cta1 && <a href={safeHref(d.cta1.link, '#features')} className="px-8 py-3.5 bg-[var(--accent)] text-white font-semibold rounded-[var(--r-btn)] hover:bg-[var(--accent-dark)] transition-all text-center shadow-lg shadow-[var(--accent-glow)]">
                  <span data-edit="hero.cta1.text">{d.cta1.text}</span>
                </a>}
              {d.cta2 && <a href={safeHref(d.cta2.link, '#contact')} className="px-8 py-3.5 border border-[var(--border-c)] text-[var(--t1)] font-medium rounded-[var(--r-btn)] hover:bg-[var(--bg-a)] transition-all text-center">
                  <span data-edit="hero.cta2.text">{d.cta2.text}</span>
                </a>}
            </div>

            {d.stats && d.stats.length > 0 && <div className="flex gap-10 pt-8 border-t border-[var(--border-c)]">
                {d.stats.map((s, i) => <div key={i}>
                    <div className="text-3xl font-bold text-[var(--t1)]">{s.value}</div>
                    <div className="text-sm text-[var(--t3)] mt-1">{s.label}</div>
                  </div>)}
              </div>}
          </div>

          <div className="relative">
            <div className="absolute -inset-4 opacity-30 blur-2xl" style={{
            background: 'var(--accent-glow)',
            borderRadius: imageRadius
          }} />
            {bgImage ? <SiteImage data-edit="images.hero" src={bgImage} alt="" className="relative w-full aspect-[16/10] md:aspect-[4/5] object-cover shadow-xl" style={{
            borderRadius: imageRadius
          }} priority /> : <div className="relative w-full aspect-[4/5] shadow-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] opacity-90" style={{
            borderRadius: imageRadius
          }} />}
          </div>
        </div>
      </div>
    </section>;
}

// Editorial layout: centered large-display headline with a wide image below.
// Token-based, so it works on both light and dark themes.
function EditorialHero({
  d,
  bgImage,
  dark
}) {
  const onDark = dark ? 'text-white' : 'text-[var(--t1)]';
  const onDarkMuted = dark ? 'text-white/70' : 'text-[var(--t2)]';
  const badgeCls = dark ? 'bg-white/10 text-white/80 border-white/10 backdrop-blur-sm' : 'bg-[var(--bg-a)] text-[var(--accent-dark)] border-[var(--border-c)]';
  return <section id="hero" className={`relative overflow-hidden ${dark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-[var(--bg-b)]'}`}>
      <div className="relative max-w-5xl mx-auto px-6 pt-32 md:pt-44 pb-16 text-center">
        {d.badge && <span className={`inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase rounded-[var(--r-badge)] mb-8 border ${badgeCls}`}>
            <span data-edit="hero.badge">{d.badge}</span>
          </span>}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl mx-auto ${onDark}`}>
          <span data-edit="hero.heading">{d.heading}</span>
        </h1>
        <p className={`text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${onDarkMuted}`}>
          <span data-edit="hero.subtitle">{d.subtitle}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          {d.cta1 && <a href={safeHref(d.cta1.link, '#features')} className="px-8 py-3.5 bg-[var(--accent)] text-white font-semibold rounded-[var(--r-btn)] hover:bg-[var(--accent-dark)] transition-all text-center shadow-lg shadow-[var(--accent-glow)]">
              <span data-edit="hero.cta1.text">{d.cta1.text}</span>
            </a>}
          {d.cta2 && <a href={safeHref(d.cta2.link, '#contact')} className={`px-8 py-3.5 border font-medium rounded-[var(--r-btn)] transition-all text-center ${dark ? 'border-white/20 text-white hover:bg-white/10 backdrop-blur-sm' : 'border-[var(--border-c)] text-[var(--t1)] hover:bg-[var(--bg-a)]'}`}>
              <span data-edit="hero.cta2.text">{d.cta2.text}</span>
            </a>}
        </div>
        {d.stats && d.stats.length > 0 && <div className="flex flex-wrap gap-10 justify-center">
            {d.stats.map((s, i) => <div key={i} className="text-center">
                <div className={`text-3xl font-bold ${onDark}`}>{s.value}</div>
                <div className={`text-sm mt-1 ${dark ? 'text-white/50' : 'text-[var(--t3)]'}`}>{s.label}</div>
              </div>)}
          </div>}
      </div>

      {bgImage && <div className="relative max-w-6xl mx-auto px-6 pb-20">
          <SiteImage data-edit="images.hero" src={bgImage} alt="" className="w-full aspect-[21/9] object-cover shadow-xl" style={{
        borderRadius: 'var(--r-card)'
      }} priority />
        </div>}
    </section>;
}
export default function Hero({
  data,
  images
}) {
  const d = data.hero || {};
  const bgImage = images?.hero;
  const theme = data.meta?.theme || 'modern';
  const editorial = data.meta?.layout === 'editorial';
  const dark = !LIGHT_THEMES.includes(theme);
  if (editorial) {
    return <EditorialHero d={d} bgImage={bgImage} dark={dark} />;
  }
  if (!dark) {
    return <LightHero d={d} bgImage={bgImage} playful={theme === 'playful'} />;
  }
  return <DarkHero d={d} bgImage={bgImage} />;
}

