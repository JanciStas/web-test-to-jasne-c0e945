export default function Pricing({
  data
}) {
  const d = data.pricing;
  if (!d || d.length === 0) return null;
  return <section id="pricing" className="py-24 md:py-32 bg-[var(--bg-b)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
            {data.pricingLabel || 'Cennik'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">
            {data.pricingHeading || 'Cenove plany'}
          </h2>
        </div>

        <div className={`grid gap-8 max-w-5xl mx-auto ${d.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {d.map((plan, i) => <div key={i} className={`relative p-8 rounded-[var(--r-card)] border ${plan.featured ? 'bg-[var(--t1)] border-[var(--t1)] shadow-2xl shadow-[0_0_40px_var(--accent-glow)] scale-105' : 'bg-[var(--bg-a)] border-[var(--border-c)]'}`}>
              {plan.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold bg-[var(--accent)] text-white rounded-[var(--r-badge)] shadow-sm whitespace-nowrap">
                  {plan.badge || 'Najpopularnejsi'}
                </span>}

              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-2 ${plan.featured ? 'text-[var(--bg-a)]' : 'text-[var(--t1)]'}`}>
                  {plan.name}
                </h3>
                {plan.description && <p className={`text-sm ${plan.featured ? 'text-[var(--inv-muted)]' : 'text-[var(--t3)]'}`}>
                    {plan.description}
                  </p>}
              </div>

              <div className="mb-8">
                <span className={`text-4xl font-bold ${plan.featured ? 'text-[var(--bg-a)]' : 'text-[var(--t1)]'}`}>
                  {plan.price}
                </span>
                {plan.period && <span className={`text-sm ml-1 ${plan.featured ? 'text-[var(--inv-muted)]' : 'text-[var(--t3)]'}`}>
                    /{plan.period}
                  </span>}
              </div>

              <ul className="space-y-3 mb-8">
                {(plan.features || []).map((f, j) => <li key={j} className="flex items-start gap-3 text-sm">
                    <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.featured ? 'text-green-400' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className={plan.featured ? 'text-[var(--inv-muted)]' : 'text-[var(--t2)]'}>{f}</span>
                  </li>)}
              </ul>

              <a href="#contact" className={`block w-full text-center py-3 rounded-[var(--r-btn)] font-medium transition-colors ${plan.featured ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)]' : 'bg-[var(--t1)] text-[var(--bg-a)] hover:opacity-90'}`}>
                {plan.cta || 'Vybrat plan'}
              </a>
            </div>)}
        </div>
      </div>
    </section>;
}

