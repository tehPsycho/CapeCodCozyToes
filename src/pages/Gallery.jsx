import { Link } from 'react-router-dom'
import GalleryGrid from '../components/GalleryGrid'
import PageHeader from '../components/PageHeader'

function Gallery() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="A cozy lookbook of handmade chunky chenille creations.">
        Explore plush animals, blankets, nursery pieces, scrunchies, and custom inspiration from real image assets in the Cape Cod Cozy Toes collection.
      </PageHeader>
      <section className="section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
      <section className="section section--compact">
        <div className="container gallery-cta">
          <h2>See something similar?</h2>
          <Link className="btn btn--dark" to="/custom">Request a custom piece.</Link>
        </div>
      </section>
    </>
  )
}

export default Gallery
