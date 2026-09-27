import SiteImage from './SiteImage';
/**
 * Team section for clinics, law firms, salons, agencies.
 * content.team = [{ name, role, photo? }]
 */
export default function Team({
  data
}) {
  const d = data.team;
  if (!d || d.length === 0) return null;
  return <section id="team" className="py-24 md:py-32 bg-[var(--bg-b)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
            {data.teamLabel || 'Náš tím'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">
            {data.teamHeading || 'Ľudia, ktorí sa o vás postarajú'}
          </h2>
        </div>

        <div className={`grid gap-8 max-w-5xl mx-auto ${d.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
          {d.map((m, i) => <div key={i} className="bg-[var(--bg-a)] rounded-[var(--r-card)] border border-[var(--border-c)] overflow-hidden text-center">
              {m.photo ? <SiteImage src={m.photo} alt={m.name} className="w-full aspect-square object-cover" /> : <div className="w-full aspect-square bg-[var(--bg-b)] flex items-center justify-center">
                  <span className="w-20 h-20 rounded-full bg-[var(--accent)] text-white text-3xl font-bold flex items-center justify-center">
                    {m.name?.charAt(0) || '?'}
                  </span>
                </div>}
              <div className="p-5">
                <div className="font-semibold text-[var(--t1)]">{m.name}</div>
                {m.role && <div className="text-sm text-[var(--t3)] mt-1">{m.role}</div>}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}

