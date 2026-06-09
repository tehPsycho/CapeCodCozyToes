import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import GalleryGrid from '../components/GalleryGrid'
import ProductCard from '../components/ProductCard'
import { galleryItems } from '../data/gallery'
import { products } from '../data/products'

const categories = [
  { title: 'Plush Animals', text: 'Turtles, bunnies, chickens, and cuddly characters with chunky handmade texture.' },
  { title: 'Blankets', text: 'From baby blanket sizes around 50x50 to oversized XL and king comforter-style pieces.' },
  { title: 'Nursery Pieces', text: 'Soft baskets, baby gifts, cozy sets, and custom colors for sweet little spaces.' },
  { title: 'Scrunchies', text: 'Hair scrunchies and ballerina skirt-style scrunchies in playful chenille colors.' },
]

function Home() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3)
  const heroImage = galleryItems.find((item) => item.id === 'single-turtle')?.image

  return (
    <>
      <section className="hero shell-accent">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">Handmade on Cape Cod</p>
            <h1>Soft, cozy handmade creations made with chunky chenille yarn.</h1>
            <p className="hero__subheadline">From plush animals and nursery pieces to oversized blankets and playful scrunchies, each piece is handmade with care, texture, and color.</p>
            <div className="button-row">
              <Link className="btn btn--dark" to="/shop">Shop Available Items</Link>
              <Link className="btn btn--light" to="/custom">Request a Custom Piece</Link>
            </div>
          </div>
          <div className="hero__image-card card-lift">
            <img src={heroImage} alt="Seafoam chunky chenille turtle plush" />
            <div className="hero__floating-note">Chunky texture • Coastal colors • Custom made</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <p className="eyebrow">Featured categories</p>
          <h2>Cozy creations with personality.</h2>
        </div>
        <div className="container category-grid">
          {categories.map((category) => (
            <article className="category-card card-lift" key={category.title}>
              <span className="yarn-dot" />
              <h3>{category.title}</h3>
              <p>{category.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tint">
        <div className="container section-heading section-heading--split">
          <div>
            <p className="eyebrow">Available now preview</p>
            <h2>Ready-made favorites and inspiration pieces.</h2>
          </div>
          <Link className="text-link" to="/shop">View all shop items</Link>
        </div>
        <div className="container product-grid">
          {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="section custom-preview">
        <div className="container two-column-card">
          <div>
            <p className="eyebrow">Custom orders preview</p>
            <h2>Pick the size, colors, texture, and cozy idea.</h2>
          </div>
          <p>Every custom order is quoted individually. Chunky chenille yarn is the standard material, with tons of color options and a variety of stitches chosen to fit the piece, texture, and design.</p>
          <Link className="btn btn--dark" to="/custom">Start a Custom Inquiry</Link>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading section-heading--split">
          <div>
            <p className="eyebrow">Gallery preview</p>
            <h2>Past pieces, color stories, and handmade details.</h2>
          </div>
          <Link className="text-link" to="/gallery">Open gallery</Link>
        </div>
        <div className="container">
          <GalleryGrid limit={4} />
        </div>
      </section>

      <CTASection
        title="Have an idea for a plush, blanket, nursery piece, or scrunchie?"
        text="Send the item type, size, preferred colors, and inspiration notes to start a cozy custom quote."
        primaryLabel="Contact Cape Cod Cozy Toes"
        primaryTo="/contact"
        secondaryLabel="Request Custom"
        secondaryTo="/custom"
      />
    </>
  )
}

export default Home
