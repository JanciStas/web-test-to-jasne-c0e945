export default function FAQ({ data, editPrefix = 'faq' }) {
  if (!data.faq?.length) return null;
  return <section id="faq" className="py-24 md:py-32 bg-[var(--bg-a)]">
    <div className="max-w-3xl mx-auto px-6">
      <div className="text-center mb-16"><span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">{data.faqLabel || 'Otázky a odpovede'}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">{data.faqHeading || 'Často kladené otázky'}</h2></div>
      <div className="bg-[var(--bg-b)] rounded-[var(--r-card)] p-8 border border-[var(--border-c)]">
        {data.faq.map((item, i) => <details key={i} className="border-b border-[var(--border-c)] last:border-0">
          <summary className="py-5 cursor-pointer font-medium text-[var(--t1)]"><span data-edit={`${editPrefix}.${i}.question`}>{item.question}</span></summary>
          <p className="text-[var(--t2)] leading-relaxed pb-5"><span data-edit={`${editPrefix}.${i}.answer`}>{item.answer}</span></p>
        </details>)}
      </div>
    </div>
  </section>;
}

