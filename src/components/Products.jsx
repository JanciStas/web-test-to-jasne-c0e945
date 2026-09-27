import SiteImage from './SiteImage';
/**
 * Product catalog section for e-shops. Static sites have no cart/backend —
 * "Objednať" opens a prefilled order e-mail to the business (common first
 * step for small Slovak e-shops).
 * content.products = [{ name, description?, price, oldPrice?, image?, badge? }]
 */
export default function Products({
  data,
  images
}) {
  const d = data.products;
  if (!d || d.length === 0) return null;
  // Products without their own photo fall back to the stock photos fetched for
  // the site (gallery, then hero) — an empty grey card sells nothing.
  const fallbackImages = [...(images?.gallery || []), images?.hero].filter(Boolean);
  const imageFor = (p, i) => p.image || (fallbackImages.length ? fallbackImages[i % fallbackImages.length] : null);
  const orderEmail = data.contact?.email;
  const orderHref = p => {
    if (!orderEmail) return '#contact';
    const subject = `Objednávka: ${p.name}`;
    const body = `Dobrý deň,\n\nmám záujem o objednávku:\n\nProdukt: ${p.name}\nCena: ${p.price}\nPočet kusov: 1\n\nMeno a doručovacia adresa:\n`;
    return `mailto:${orderEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return <section id="products" className="py-24 md:py-32 bg-[var(--bg-a)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
            {data.productsLabel || 'Produkty'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">
            {data.productsHeading || 'Naša ponuka'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {d.map((p, i) => <div key={i} className="group bg-[var(--bg-a)] rounded-[var(--r-card)] border border-[var(--border-c)] overflow-hidden flex flex-col">
              <div className="relative aspect-square bg-[var(--bg-b)] overflow-hidden">
                {p.badge && <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-semibold bg-[var(--accent)] text-white rounded-[var(--r-badge)]">
                    {p.badge}
                  </span>}
                {imageFor(p, i) ? <SiteImage src={imageFor(p, i)} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="w-full h-full bg-gradient-to-br from-[var(--bg-b)] to-[var(--border-c)]" />}
              </div>

              <div className="p-4 md:p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-[var(--t1)] leading-snug">{p.name}</h3>
                {p.description && <p className="text-sm text-[var(--t2)] mt-1.5 line-clamp-2">{p.description}</p>}
                <div className="flex items-baseline gap-2 mt-3 mb-4">
                  <span className="text-lg font-bold text-[var(--t1)]">{p.price}</span>
                  {p.oldPrice && <span className="text-sm text-[var(--t3)] line-through">{p.oldPrice}</span>}
                </div>
                <a href={orderHref(p)} className="mt-auto block w-full text-center py-2.5 text-sm bg-[var(--accent)] text-white font-medium rounded-[var(--r-btn)] hover:bg-[var(--accent-dark)] transition-colors">
                  Objednať
                </a>
              </div>
            </div>)}
        </div>

        {orderEmail && <p className="text-center text-sm text-[var(--t3)] mt-10">
            Objednávky vybavujeme e-mailom — po odoslaní vás budeme kontaktovať s potvrdením a platobnými údajmi.
          </p>}
      </div>
    </section>;
}

