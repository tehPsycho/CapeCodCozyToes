import { Link } from 'react-router-dom'
import { galleryItems } from '../data/gallery'

const quickLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Custom', to: '/custom' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About + Contact', to: '/about#contact' },
]

const highlights = ['Plush animals', 'Baby blankets', 'Nursery gifts', 'Scrunchies']

function Home() {
  const heroImage = galleryItems.find((item) => item.id === 'single-turtle')?.image

  return (
    <section className="home-landing shell-accent">
      <div className="container home-landing__grid">
        <div className="home-landing__copy">
          <p className="eyebrow">Handmade on Cape Cod</p>
          <h1>Soft, chunky, coastal cozy.</h1>
          <p className="home-landing__subheadline">
            Handmade chenille plush animals, blankets, nursery pieces, and scrunchies with custom colors and a sweet Cape Cod feel.
          </p>
          <div className="button-row home-landing__actions">
            <Link className="btn btn--dark" to="/custom">Start a Custom Piece</Link>
            <Link className="btn btn--light" to="/gallery">See Examples</Link>
          </div>
          <nav className="quick-jump" aria-label="Quick links">
            {quickLinks.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
          </nav>
        </div>

        <aside className="example-card card-lift" aria-label="Featured example">
          <div className="example-card__image">
            <img src={heroImage} alt="Seafoam chunky chenille turtle plush" />
          </div>
          <div className="example-card__body">
            <p className="eyebrow">Example piece</p>
            <h2>Seafoam turtle plush</h2>
            <p>Chunky texture, coastal color, and made-by-hand personality—an example of the style and softness available for custom orders.</p>
            <div className="mini-tags" aria-label="Item types">
              {highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Home
