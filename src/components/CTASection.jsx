import { Link } from 'react-router-dom'

function CTASection({ eyebrow = 'Ready for something cozy?', title, text, primaryLabel, primaryTo, secondaryLabel, secondaryTo }) {
  return (
    <section className="cta-section">
      <div className="container cta-card shell-accent">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="button-row">
          {primaryLabel && <Link className="btn btn--dark" to={primaryTo}>{primaryLabel}</Link>}
          {secondaryLabel && <Link className="btn btn--light" to={secondaryTo}>{secondaryLabel}</Link>}
        </div>
      </div>
    </section>
  )
}

export default CTASection
