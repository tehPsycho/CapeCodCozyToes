import { useSearchParams } from 'react-router-dom'
import InquiryForm from '../components/InquiryForm'
import PageHeader from '../components/PageHeader'
import { siteConfig } from '../data/siteConfig'

const details = [
  'All items are made with chunky knit chenille yarn.',
  'A variety of stitches may be used depending on the piece, texture, and design.',
  'Blankets can range from baby blanket sizes around 50x50 to oversized XL/king blankets that hang over the sides like a comforter.',
  'The ballerina skirt item is a scrunchie.',
  'Chunky chenille yarn is the standard material.',
  'There are tons of color options available.',
]

function CustomOrders() {
  const [searchParams] = useSearchParams()
  const requestedItem = searchParams.get('item') || ''

  return (
    <>
      <PageHeader eyebrow="Custom orders" title="Made-for-you chunky chenille pieces, quoted individually.">
        Choose a plush animal, blanket, nursery item, scrunchie, or totally custom cozy creation. Share your colors, size, inspiration, and timeline to begin.
      </PageHeader>
      <section className="section">
        <div className="container custom-grid">
          <div className="info-card shell-accent">
            <p className="eyebrow">How custom works</p>
            <h2>Handmade texture, color, and scale.</h2>
            <p>Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or use the inquiry form to open a prefilled email draft.</p>
            <ul className="check-list">
              {details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </div>
          <InquiryForm initialItem={requestedItem} />
        </div>
      </section>
    </>
  )
}

export default CustomOrders
