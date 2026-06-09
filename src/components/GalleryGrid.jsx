import { useMemo, useState } from 'react'
import { galleryFilters, galleryItems } from '../data/gallery'

function GalleryGrid({ limit }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)

  const items = useMemo(() => {
    const filtered = activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter)
    return limit ? filtered.slice(0, limit) : filtered
  }, [activeFilter, limit])

  return (
    <>
      {!limit && (
        <div className="filter-row" aria-label="Gallery filters">
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? 'filter-chip filter-chip--active' : 'filter-chip'}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="gallery-grid">
        {items.map((item) => (
          <button className="gallery-item card-lift" key={item.id} type="button" onClick={() => setSelectedItem(item)}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <span>{item.category}</span>
            <strong>{item.title}</strong>
          </button>
        ))}
      </div>

      {selectedItem && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedItem.title} onClick={() => setSelectedItem(null)}>
          <button className="lightbox__close" type="button" aria-label="Close gallery image">×</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedItem.image} alt={selectedItem.title} />
            <figcaption>{selectedItem.title}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

export default GalleryGrid
