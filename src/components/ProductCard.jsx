import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const hasPrice = product.price && product.price !== 'Contact for pricing'
  const customPath = `/custom?item=${encodeURIComponent(product.name)}`

  return (
    <article className="product-card card-lift">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="availability-badge">{product.availability}</span>
      </div>
      <div className="product-card__body">
        <p className="category-pill">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card__footer">
          <strong>{hasPrice ? product.price : 'Contact for pricing'}</strong>
          {product.paymentLink ? (
            <a className="btn btn--small btn--dark" href={product.paymentLink} target="_blank" rel="noreferrer">Buy Now</a>
          ) : (
            <Link className="btn btn--small btn--outline" to={customPath}>Ask About This Item</Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
