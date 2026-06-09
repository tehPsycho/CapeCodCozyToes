import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks, siteConfig } from '../data/siteConfig'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand__mark">CC</span>
          <span>{siteConfig.brandName}</span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-links ${isOpen ? 'nav-links--open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) => {
                const linkPath = link.to.split('#')[0]
                const isPathActive = linkPath !== '/' && location.pathname === linkPath
                const isHomeActive = linkPath === '/' && location.pathname === '/'
                return isActive || isPathActive || isHomeActive ? 'active' : undefined
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
