/**
 * Menu / price list section for restaurants, cafés, bistros.
 * content.menu = [{ category, items: [{ name, description?, price }] }]
 */
export default function Menu({
  data
}) {
  const d = data.menu;
  if (!d || d.length === 0) return null;
  return <section id="menu" className="py-24 md:py-32 bg-[var(--bg-a)]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
            {data.menuLabel || 'Menu'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">
            {data.menuHeading || 'Naša ponuka'}
          </h2>
        </div>

        <div className="space-y-14">
          {data.servingHours?.length > 0 && <div><h3 className="text-xl font-semibold mb-4">Časy podávania</h3><ul>{data.servingHours.map((row, i) => <li key={i}>{row.day}: {row.time}</li>)}</ul></div>}
          {data.reservationPolicy && <p>{data.reservationPolicy}</p>}
          {d.map((cat, i) => <div key={i}>
              <h3 className="text-xl font-semibold text-[var(--accent-dark)] mb-6 pb-2 border-b border-[var(--border-c)]">
                {cat.category}
              </h3>
              <ul className="space-y-5">
                {(cat.items || []).map((it, j) => <li key={j}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-semibold text-[var(--t1)]">{it.name}</span>
                      <span className="flex-1 border-b border-dotted border-[var(--t3)] translate-y-[-4px]" />
                      <span className="font-semibold text-[var(--t1)] whitespace-nowrap">{it.price}</span>
                    </div>
                    {it.description && <p className="text-sm text-[var(--t2)] mt-1 pr-16">{it.description}</p>}
                  {it.allergens && <p className="text-sm text-[var(--t2)] mt-1">Alergény: {it.allergens}</p>}
                  </li>)}
              </ul>
            </div>)}
        </div>
      </div>
    </section>;
}

