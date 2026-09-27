import { useState, useEffect } from 'react';
export default function Contact({
  data
}) {
  const d = data.contact;
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [delivery, setDelivery] = useState({ busy: false, message: '', ok: false });
  if (!d) return null;
  const inputClass = 'w-full px-4 py-2.5 bg-[var(--bg-a)] border border-[var(--border-c)] rounded-[var(--r-btn)] text-[var(--t1)] placeholder-[var(--t3)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-glow)] focus:border-[var(--accent)] transition-all';
  const set = key => e => setForm(f => ({
    ...f,
    [key]: e.target.value
  }));

  // The endpoint is supplied by the server only when delivery is configured.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!d.formEndpoint || delivery.busy) return;
    const website = new FormData(e.currentTarget).get('website') || '';
    setDelivery({ busy: true, message: '', ok: false });
    try {
      const response = await fetch(d.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok || !result.accepted) throw new Error(result.error || 'Odoslanie zlyhalo.');
      setDelivery({ busy: false, ok: true, message: 'Správa bola prijatá na odoslanie. Ďakujeme za váš dopyt.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) { setDelivery({ busy: false, ok: false, message: err.message || 'Odoslanie zlyhalo. Použite priamy kontakt.' }); }
  };
  return <section id="contact" className="py-24 md:py-32 bg-[var(--bg-a)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
              {data.contactLabel || 'Kontakt'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight mb-6">
              {data.contactHeading || 'Napíšte nám'}
            </h2>
            <p className="text-[var(--t2)] leading-relaxed mb-10">
              {<span data-edit="contact.description">{d.description || 'Radi vám odpovieme na otázky.'}</span>}
            </p>

            <div className="space-y-6">
              {d.email && <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[var(--r-btn)] bg-[var(--bg-b)] flex items-center justify-center text-[var(--t2)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--t3)] mb-0.5">E-mail</div>
                    <a href={`mailto:${d.email}`} className="text-[var(--t1)] hover:text-[var(--t2)] transition-colors"><span data-edit="contact.email">{d.email}</span></a>
                  </div>
                </div>}

              {d.phone && <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[var(--r-btn)] bg-[var(--bg-b)] flex items-center justify-center text-[var(--t2)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--t3)] mb-0.5">Telefón</div>
                    <a href={`tel:${d.phone}`} className="text-[var(--t1)] hover:text-[var(--t2)] transition-colors"><span data-edit="contact.phone">{d.phone}</span></a>
                  </div>
                </div>}

              {d.address && <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[var(--r-btn)] bg-[var(--bg-b)] flex items-center justify-center text-[var(--t2)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--t3)] mb-0.5">Adresa</div>
                    <span className="text-[var(--t1)]"><span data-edit="contact.address">{d.address}</span></span>
                  </div>
                </div>}
            </div>
          </div>

          <div className="bg-[var(--bg-b)] rounded-[var(--r-card)] p-8 border border-[var(--border-c)]">
            {(!d.formEndpoint || d.requestEndpoint) ? <p className="text-[var(--t2)] leading-relaxed">
                {d.requestEndpoint ? <a href="#request" className="underline">Poslať dopyt alebo vybrať termín</a> : d.bookingUrl ? <a href={d.bookingUrl} className="underline">Dohodnúť termín cez rezervačný systém</a> : 'Kontaktujte nás e-mailom alebo telefonicky pomocou uvedených kontaktov.'}
              </p> : <form className="space-y-5" onSubmit={handleSubmit}><fieldset className="space-y-5" disabled={!hydrated || delivery.busy}><div hidden><label>Web<input name="website" tabIndex={-1} autoComplete="off" /></label></div><p role="status" aria-live="polite">{delivery.message}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--t2)] mb-1.5">Meno</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Vaše meno" value={form.name} onChange={set('name')} required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--t2)] mb-1.5">E-mail</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="vas@email.sk" value={form.email} onChange={set('email')} className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--t2)] mb-1.5">Správa</label>
                <textarea id="contact-message" name="message" rows="5" placeholder="Vaša správa..." value={form.message} onChange={set('message')} required className={`${inputClass} resize-none`} />
              </div>
              <button type="submit" disabled={delivery.busy} className="w-full py-3 bg-[var(--accent)] text-white font-medium rounded-[var(--r-btn)] hover:bg-[var(--accent-dark)] transition-colors">
                {delivery.busy ? 'Odosielam…' : 'Odoslať správu'}
              </button>
              <p className="text-xs text-[var(--t3)] leading-relaxed">
                Vaše údaje použijeme na vybavenie dopytu. <a href={d.privacyUrl} className="underline">Informácie o spracovaní osobných údajov</a>.
              </p>
            </fieldset></form>}
          </div>
        </div>
      </div>
    </section>;
}

