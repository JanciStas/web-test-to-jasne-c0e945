import Contact from './Contact';
import FAQ from './FAQ';
import Menu from './Menu';
export default function ServicePage({ data, page, index }) {
  const service = page.kind === 'menu' ? null : data.features?.[page.serviceIndex];
  return (
    <>
      <main id="hero" className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <nav aria-label="Navigácia stránky" className="mb-8 text-sm">
          <a href="/" className="underline">
            {data.meta.companyName}
          </a>
          <span aria-hidden="true"> / </span>
          <span>{page.kind === 'menu' ? 'Menu' : service?.title}</span>
        </nav>
        <h1
          data-edit={`pages.${index}.title`}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6 break-words"
        >
          {page.title}
        </h1>
        <p data-edit={`pages.${index}.description`} className="text-xl text-[var(--t2)] mb-8">
          {page.description}
        </p>
        {service?.price && (
          <p className="text-xl font-semibold text-[var(--accent-dark)] mb-6">{service.price}</p>
        )}
        <div
          data-edit={`pages.${index}.body`}
          className="whitespace-pre-line text-lg leading-relaxed text-[var(--t2)] mb-10"
        >
          {page.body}
        </div>
        <a
          href="#contact"
          className="inline-block rounded-[var(--r-btn)] px-7 py-3 bg-[var(--accent-dark)] text-white"
        >
          {page.kind === 'menu' ? 'Kontakt a rezervácia' : data.hero?.cta1?.text || 'Mám záujem o túto službu'}
        </a>
      </main>
      {page.kind === 'menu' && <Menu data={data} />}
      {page.faq?.length > 0 && (
        <FAQ
          editPrefix={`pages.${index}.faq`}
          data={{ faq: page.faq, faqHeading: 'Otázky k službe' }}
        />
      )}
      <Contact data={data} />
    </>
  );
}

