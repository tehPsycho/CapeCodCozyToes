import CTASection from '../components/CTASection'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

function Shop() {
  return (
    <>
      <PageHeader eyebrow="Shop available items" title="Premade pieces, ready-now favorites, and order inspiration.">
        Browse handmade chunky chenille creations. Some items are available now, while others can be recreated or customized in your preferred colors.
      </PageHeader>
      <section className="section">
        <div className="container shop-note">
          Payments are handled securely through external checkout links. Custom orders are quoted individually.
        </div>
        <div className="container product-grid product-grid--wide">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <CTASection
        title="Need a different size, animal, color palette, or blanket style?"
        text="Custom orders are welcome and quoted based on size, yarn, design, and timeline."
        primaryLabel="Request a Custom Piece"
        primaryTo="/custom"
      />
    </>
  )
}

export default Shop
