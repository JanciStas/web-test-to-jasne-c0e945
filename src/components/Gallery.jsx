import SiteImage from './SiteImage';
export default function Gallery({
  data,
  images
}) {
  const items = data.gallery || [];
  const galleryImages = images?.gallery || [];
  if (items.length === 0 && galleryImages.length === 0) return null;
  const displayItems = items.length > 0 ? items : galleryImages.map((url, i) => ({
    image: url,
    title: `Ilustračná fotografia ${i + 1}`,
    category: ''
  }));
  return <section id="gallery" className="py-24 md:py-32 bg-[var(--bg-a)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--t3)] mb-3 block">
            {data.galleryLabel || 'Galéria'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--t1)] tracking-tight">
            {data.galleryHeading || 'Ilustračné fotografie'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item_, i) => <div key={i} className="group relative aspect-[4/3] rounded-[var(--r-card)] overflow-hidden bg-[var(--bg-b)]">
              {item_.image ? <SiteImage data-edit={`gallery.${i}.image`} src={item_.image} alt={item_.title || ''} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />}

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  {item_.category && <span className="text-xs font-medium tracking-wider uppercase text-white/60 mb-1 block">
                      {item_.category}
                    </span>}
                  <h3 className="text-lg font-semibold text-white"><span data-edit={`gallery.${i}.title`}>{item_.title}</span></h3>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}

