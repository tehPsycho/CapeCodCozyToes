import { Link } from 'react-router-dom'
import InquiryForm from '../components/InquiryForm'
import PageHeader from '../components/PageHeader'
import { siteConfig } from '../data/siteConfig'

function Contact() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Questions, custom ideas, and cozy requests are welcome.">
        Reach out about available items, custom colors, sizing, timing, and handmade chunky chenille creations.
      </PageHeader>
      <section className="section">
        <div className="container contact-grid">
          <div className="info-card shell-accent">
            <p className="eyebrow">Email</p>
            <h2><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></h2>
            <p>For custom orders, please include item type, size, preferred colors, and any inspiration photos or ideas.</p>
            <Link className="btn btn--dark" to="/custom">Custom Order Form</Link>
          </div>
          <InquiryForm mode="contact" />
        </div>
      </section>
    </>
  )
}

export default Contact
