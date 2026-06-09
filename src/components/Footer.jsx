import { Link } from 'react-router-dom'
import { navLinks, siteConfig } from '../data/siteConfig'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>{siteConfig.brandName}</h2>
          <p>{siteConfig.tagline}</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
        <div className="footer-links" aria-label="Footer navigation">
          {navLinks.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
        </div>
        <p className="footer-credit">Site built by <a href={siteConfig.c2cUrl}>C2C</a></p>
      </div>
    </footer>
  )
}

export default Footer
