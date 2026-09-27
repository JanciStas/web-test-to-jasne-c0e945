import { useState, useEffect } from 'react';
const inputClass =
  'w-full min-w-0 px-4 py-3 border border-[var(--border-c)] rounded-[var(--r-btn)] bg-[var(--bg-a)] text-[var(--t1)]';
async function photoData(file) {
  if (!file) return null;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 4 * 1024 * 1024)
    throw new Error('Príloha musí byť JPEG, PNG alebo WebP do 4 MB.');
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/webp', 0.8).split(',')[1];
}
export default function BusinessActions({ data }) {
  const endpoint = data.contact?.requestEndpoint;
  const [hydrated, setHydrated] = useState(false),
    [slots, setSlots] = useState([]),
    [mode, setMode] = useState('quote'),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState('');
  const [requestKey, setRequestKey] = useState('');
  useEffect(() => {
    setHydrated(true);
    setRequestKey(crypto.randomUUID());
  }, []);
  useEffect(() => {
    if (!endpoint) return;
    const controller = new AbortController();
    fetch(endpoint + '/slots', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : { slots: [] }))
      .then((v) => setSlots(v.slots || []))
      .catch(() => {});
    return () => controller.abort();
  }, [endpoint]);
  if (!endpoint || !data.contact?.privacyUrl) return null;
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (busy) return;
    setBusy(true);
    setMessage('');
    try {
      const values = new FormData(form);
      const photo = await photoData(values.get('photo')?.size ? values.get('photo') : null);
      const body = {
        key: requestKey,
        kind: mode,
        name: values.get('name'),
        email: values.get('email'),
        phone: values.get('phone') || '',
        message: values.get('message') || '',
        service: values.get('service') || '',
        slotId: values.get('slotId') || '',
        website: values.get('website') || '',
        photo,
      };
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Požiadavku sa nepodarilo uložiť.');
      setMessage(
        (result.status === 'confirmed'
          ? 'Termín je rezervovaný.'
          : 'Dopyt je uložený u prevádzkovateľa.') +
          ' Vaše číslo: ' +
          result.id.slice(0, 8) +
          '.'
      );
      form.reset();
      setRequestKey(crypto.randomUUID());
      const fresh = await fetch(endpoint + '/slots')
        .then((r) => r.json())
        .catch(() => ({ slots: [] }));
      setSlots(fresh.slots || []);
    } catch (err) {
      setMessage(
        err.name === 'TimeoutError'
          ? 'Odoslanie sa nepodarilo potvrdiť. Skúste znova bez zmeny údajov; rovnaká požiadavka sa neuloží dvakrát.'
          : err.message || 'Odoslanie zlyhalo. Skúste neskôr.'
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section id="request" className="py-20 px-6 bg-[var(--bg-b)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Dohodnime si ďalší krok</h2>
        <p className="text-[var(--t2)] mb-6">
          Opíšte, čo potrebujete. Fotografiu môžete priložiť ako podklad k dopytu.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            type="button"
            onClick={() => setMode('quote')}
            aria-pressed={mode === 'quote'}
            className={inputClass + ' w-auto'}
          >
            Poslať dopyt
          </button>
          {slots.length > 0 && (
            <button
              type="button"
              onClick={() => setMode('booking')}
              aria-pressed={mode === 'booking'}
              className={inputClass + ' w-auto'}
            >
              Rezervovať termín
            </button>
          )}
        </div>
        <form onSubmit={submit}>
          <fieldset disabled={!hydrated || busy} className="space-y-5 min-w-0">
            <div hidden>
              <label>
                Web
                <input name="website" tabIndex={-1} />
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <label>
                Meno
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className={inputClass}
                />
              </label>
              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                  className={inputClass}
                />
              </label>
            </div>
            <label className="block">
              Telefón (nepovinný)
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                className={inputClass}
              />
            </label>
            {mode === 'booking' ? (
              <label className="block">
                Voľný termín — čas v Bratislave
                <select name="slotId" required className={inputClass}>
                  <option value="">Vyberte termín</option>
                  {slots.map((s) => (
                    <option key={s.id} value={s.id}>
                      {new Date(s.start).toLocaleString('sk-SK', { timeZone: 'Europe/Bratislava' })}{' '}
                      — {s.service} ({s.remaining} voľných)
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <>
                <label className="block">
                  Služba
                  <select name="service" className={inputClass}>
                    <option value="">Vyberte službu</option>
                    {(data.features || []).map((s, i) => (
                      <option key={i} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  Fotografická príloha (nepovinná)
                  <input
                    name="photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className={inputClass}
                  />
                </label>
              </>
            )}
            <label className="block">
              {mode === 'quote' ? 'Čo potrebujete?' : 'Poznámka (nepovinná)'}
              <textarea
                name="message"
                required={mode === 'quote'}
                minLength={mode === 'quote' ? 5 : undefined}
                maxLength={5000}
                rows={4}
                className={inputClass}
              />
            </label>
            <p className="text-sm text-[var(--t2)]">
              Údaje slúžia na vybavenie požiadavky.{' '}
              <a className="underline" href={data.contact.privacyUrl}>
                Informácie o spracovaní údajov
              </a>
              .
            </p>
            <button
              type="submit"
              className="px-7 py-3 rounded-[var(--r-btn)] bg-[var(--accent-dark)] text-white font-semibold"
            >
              {busy
                ? 'Ukladám…'
                : mode === 'booking'
                  ? 'Rezervovať vybraný termín'
                  : 'Odoslať dopyt'}
            </button>
          </fieldset>
        </form>
        <p role="status" aria-live="polite" className="mt-5 break-words">
          {message}
        </p>
        <noscript>Pre online odoslanie zapnite JavaScript alebo použite priamy kontakt.</noscript>
      </div>
    </section>
  );
}

