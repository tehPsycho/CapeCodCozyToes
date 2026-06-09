import CTASection from '../components/CTASection'
import PageHeader from '../components/PageHeader'

function About() {
  return (
    <>
      <PageHeader eyebrow="About the brand" title="Handmade cozy pieces with soft texture and coastal color.">
        Cape Cod Cozy Toes creates chunky chenille yarn items designed to feel personal, polished, and wonderfully tactile.
      </PageHeader>
      <section className="section">
        <div className="container story-card shell-accent">
          <p>Cape Cod Cozy Toes is a handmade chunky-knit creations brand focused on soft textures, custom colors, and thoughtful details. Each piece is made with chunky chenille yarn, giving plush animals, nursery items, blankets, and accessories a cozy feel that is both playful and practical.</p>
          <p>The collection ranges from small accessories like hair scrunchies and ballerina skirt-style scrunchies to baby blankets, nursery keepsakes, plush animals, small blankets, and oversized XL/king blankets. Custom work is available for customers who want a specific color palette, size, theme, or gift idea.</p>
          <p>The goal is simple: create handmade pieces that look beautiful, feel incredibly soft, and hold the character of something made carefully by hand.</p>
        </div>
      </section>
      <CTASection
        title="Want something made in your colors?"
        text="Share your size, colors, inspiration, and timeline for a custom chunky chenille quote."
        primaryLabel="Start a Custom Order"
        primaryTo="/custom"
        secondaryLabel="View Gallery"
        secondaryTo="/gallery"
      />
    </>
  )
}

export default About
