export default function Testimonials({
  data
}) {
  const d = data.testimonials;
  if (!d || d.length === 0) return null;
  return <section id="testimonials" className="py-24 md:py-32 bg-[var(--bg-b)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
            {data.testimonialsLabel || 'Referencie'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">
            {data.testimonialsHeading || 'Čo hovoria naši klienti'}
          </h2>
        </div>

        <div className={`grid gap-8 ${d.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {d.map((t, i) => <div key={i} className="bg-[var(--bg-a)] p-8 rounded-[var(--r-card)] border border-[var(--border-c)] shadow-sm">

              <p className="text-[var(--t2)] leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-b)] flex items-center justify-center text-sm font-semibold text-[var(--t2)]">
                  {t.name?.charAt(0) || '?'}
                </div>
                <div>
                  <div className="font-semibold text-[var(--t1)] text-sm">{t.name}</div>
                  {t.role && <div className="text-[var(--t3)] text-xs">{t.role}</div>}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}

