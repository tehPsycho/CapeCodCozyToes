function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="page-header shell-accent">
      <div className="container page-header__inner">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children && <p className="page-header__text">{children}</p>}
      </div>
    </section>
  )
}

export default PageHeader
