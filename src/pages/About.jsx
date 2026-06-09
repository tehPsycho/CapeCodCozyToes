import { Link } from 'react-router-dom'
import InquiryForm from '../components/InquiryForm'
import PageHeader from '../components/PageHeader'
import { siteConfig } from '../data/siteConfig'

const aboutPoints = [
  'Handmade chunky chenille pieces with soft, tactile texture.',
  'Custom colors, sizing, and gift ideas are welcome.',
  'Common pieces include plush animals, blankets, nursery sets, and scrunchies.',
]

function About() {
  return (
    <>
      <PageHeader eyebrow="About + Contact" title="Handmade cozy pieces with coastal color.">
        Cape Cod Cozy Toes creates soft chunky chenille pieces that feel personal, polished, and wonderfully tactile.
      </PageHeader>

      <section className="section section--tight">
        <div className="container about-contact-grid">
          <article className="info-card shell-accent">
            <p className="eyebrow">About the brand</p>
            <h2>Simple, soft, and made carefully by hand.</h2>
            <p>
              Cape Cod Cozy Toes focuses on handmade chenille creations with cozy texture, cheerful color, and thoughtful details. Each piece is made to feel beautiful, practical, and personal.
            </p>
            <ul className="check-list">
              {aboutPoints.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <div className="button-row">
              <Link className="btn btn--dark" to="/custom">Request Custom</Link>
              <Link className="btn btn--outline" to="/gallery">View Gallery</Link>
            </div>
          </article>

          <aside className="contact-panel" id="contact">
            <p className="eyebrow">Contact</p>
            <h2>Have a question?</h2>
            <p>Email for available items, custom colors, sizing, timing, or gift ideas.</p>
            <a className="contact-panel__email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <p className="contact-panel__hint">For custom pieces, include item type, size, colors, and any inspiration notes.</p>
          </aside>
        </div>
      </section>

      <section className="section section--tight section--tint" id="quick-message">
        <div className="container compact-form-grid">
          <div>
            <p className="eyebrow">Quick message</p>
            <h2>Prefer a short note?</h2>
            <p>Use this concise contact form to open a prefilled email draft.</p>
          </div>
          <InquiryForm mode="contact" />
        </div>
      </section>
    </>
  )
}

export default About
