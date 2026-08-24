import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import './Header.css'

export default function Header({ siteSettings, socialLinks }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/portfolio' },
    { label: 'Community', path: '/community' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">Mabrix</span>
        </Link>

        <nav className="header__nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__nav-link ${location.pathname === item.path ? 'header__nav-link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/request-service" className="header__cta">
          Let's Work Together
        </Link>

        <button
          className="header__menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="header__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="header__mobile-nav">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={item.path} className="header__mobile-link">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/request-service" className="header__mobile-cta">
                Let's Work Together
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
