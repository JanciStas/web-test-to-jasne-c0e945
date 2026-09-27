const ICONS = {
  code: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />,
  phone: <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />,
  chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
  globe: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
  lightning: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
  heart: <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />,
  star: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
};
function DetailsLink({ data, index }) {
  const page = data.pages?.find(p => p.kind === 'menu' || p.serviceIndex === index);
  if (!page) return null;
  return <a href={'/sluzby/' + page.slug + '/'} className="inline-block underline mt-4 text-[var(--accent)]">{page.kind === 'menu' ? 'Pozrieť celé menu' : 'Podrobnosti služby'}</a>;
}
function Icon({
  name
}) {
  const path = ICONS[name] || ICONS.star;
  return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      {path}
    </svg>;
}
function EditorialFeatures({
  data,
  d
}) {
  return <section id="features" className="py-24 md:py-32 bg-[var(--bg-a)]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
            {data.featuresLabel || 'Čo ponúkame'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">
            {data.featuresHeading || 'Naše služby'}
          </h2>
        </div>

        <div>
          {d.map((f, i) => <div key={i} className="flex gap-6 md:gap-10 py-8 border-t border-[var(--border-c)] last:border-b group">
              <div className="text-2xl md:text-3xl font-bold text-[var(--t3)] group-hover:text-[var(--accent)] transition-colors tabular-nums w-14 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex items-start gap-5">
                <div className="hidden sm:flex w-11 h-11 rounded-[var(--r-btn)] bg-[var(--bg-b)] items-center justify-center text-[var(--accent)] flex-shrink-0 mt-0.5">
                  <Icon name={f.icon} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--t1)] mb-2"><span data-edit={`features.${i}.title`}>{f.title}</span></h3>
                  <p className="text-[var(--t2)] leading-relaxed max-w-xl"><span data-edit={`features.${i}.description`}>{f.description}</span></p><DetailsLink data={data} index={i} />{f.price && <p className="mt-3 font-semibold text-[var(--accent)]"><span data-edit={`features.${i}.price`}>{f.price}</span></p>}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}
export default function Features({
  data
}) {
  const d = data.features;
  if (!d || d.length === 0) return null;
  if (data.meta?.layout === 'editorial') {
    return <EditorialFeatures data={data} d={d} />;
  }
  return <section id="features" className="py-24 md:py-32 bg-[var(--bg-a)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
            {data.featuresLabel || 'Čo ponúkame'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">
            {data.featuresHeading || 'Naše služby'}
          </h2>
        </div>

        <div className={`grid gap-8 ${d.length <= 3 ? 'md:grid-cols-3' : d.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {d.map((f, i) => <div key={i} className="group p-8 rounded-[var(--r-card)] bg-[var(--bg-b)] hover:bg-[var(--t1)] transition-all duration-300 border border-[var(--border-c)] hover:border-[var(--t1)]">
              <div className="w-12 h-12 rounded-[var(--r-btn)] bg-[var(--t1)] group-hover:bg-[var(--accent)] flex items-center justify-center text-[var(--bg-a)] group-hover:text-white mb-6 transition-colors">
                <Icon name={f.icon} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--t1)] group-hover:text-[var(--bg-a)] mb-3 transition-colors">
                <span data-edit={`features.${i}.title`}>{f.title}</span>
              </h3>
              <p className="text-[var(--t2)] group-hover:text-[var(--inv-muted)] leading-relaxed transition-colors">
                <span data-edit={`features.${i}.description`}>{f.description}</span>
              </p><DetailsLink data={data} index={i} />{f.price && <p className="mt-3 font-semibold text-[var(--accent)]"><span data-edit={`features.${i}.price`}>{f.price}</span></p>}
            </div>)}
        </div>
      </div>
    </section>;
}

