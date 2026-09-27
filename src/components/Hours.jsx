import { useState } from 'react';
/**
 * Opening hours + map section for brick-and-mortar businesses.
 * content.hours = { days: [{ day, time }], note? }
 * Map is derived from content.contact.address via keyless Google Maps embed,
 * loaded only after the visitor clicks (no third-party request by default — GDPR).
 */
export default function Hours({
  data
}) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const d = data.hours;
  if (!d || !d.days || d.days.length === 0) return null;
  const address = data.contact?.address;

  return <section id="hours" className="py-24 md:py-32 bg-[var(--bg-b)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
            {data.hoursLabel || 'Otváracie hodiny'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">
            {data.hoursHeading || 'Kedy nás nájdete'}
          </h2>
        </div>

        <div className={`grid gap-8 max-w-5xl mx-auto ${address ? 'md:grid-cols-2' : 'max-w-xl'}`}>
          <div className="bg-[var(--bg-a)] rounded-[var(--r-card)] border border-[var(--border-c)] p-8">
            <ul className="divide-y divide-[var(--border-c)]">
              {d.days.map((row, i) => <li key={i} className="flex items-center justify-between py-3">
                  <span className="text-[var(--t2)]">{row.day}</span>
                  <span className="font-semibold text-[var(--t1)]">{row.time}</span>
                </li>)}
            </ul>
            {d.note && <p className="text-sm text-[var(--t3)] mt-6">{d.note}</p>}
          </div>

          {address && <div className="rounded-[var(--r-card)] overflow-hidden border border-[var(--border-c)] min-h-[320px] bg-[var(--bg-b)]">
              {mapLoaded ? <iframe title="Mapa" src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} className="w-full h-full min-h-[320px] border-0" loading="lazy" referrerPolicy="no-referrer" allowFullScreen /> : <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center p-8 gap-4">
                  <p className="text-[var(--t1)] font-medium">{address}</p>
                  <p className="text-sm text-[var(--t3)] max-w-xs">
                    Mapa sa načíta z Google Maps až po kliknutí (Google pritom získa vašu IP adresu).
                  </p>
                  <button type="button" onClick={() => setMapLoaded(true)} className="px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-[var(--r-btn)] hover:bg-[var(--accent-dark)] transition-colors">
                    Zobraziť mapu
                  </button>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent)] hover:underline">
                    Otvoriť v Google Maps
                  </a>
                </div>}
            </div>}
        </div>
      </div>
    </section>;
}

