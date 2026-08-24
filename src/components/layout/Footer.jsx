import { Link } from 'react-router-dom'
import './Footer.css'

const socialLinks = [
  { platform: 'Instagram', url: 'https://instagram.com/mabrix' },
  { platform: 'TikTok', url: 'https://tiktok.com/@mabrix' },
  { platform: 'Pinterest', url: 'https://pinterest.com/mabrix' },
  { platform: 'Facebook', url: 'https://facebook.com/mabrix' },
]

const socialIcons = {
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
  TikTok: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V2"/>
      <path d="M12 12v7"/>
    </svg>
  ),
  Pinterest: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" x2="12" y1="17" y2="22"/>
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4.76a2 2 0 0 1-.89 1.67l-.55.44a2 2 0 0 0-.44 2.54z"/>
    </svg>
  ),
  Facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
}

export default function Footer({ siteSettings, socialLinks: dbSocialLinks }) {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/portfolio' },
    { label: 'Community', path: '/community' },
    { label: 'Contact', path: '/contact' },
  ]

  const serviceLinks = [
    { label: 'Web Development', path: '/services' },
    { label: 'Software Development', path: '/services' },
    { label: 'UI/UX Design', path: '/services' },
    { label: 'Mobile Apps', path: '/services' },
    { label: 'Digital Marketing', path: '/services' },
  ]

  const displayedSocials = socialLinks

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">Mabrix</Link>
            <p className="footer__tagline">
              We build digital experiences that move businesses forward.
            </p>
            <div className="footer__contact">
              <a href="tel:0115407200" className="footer__contact-item">0115 407 200</a>
              <a href="mailto:hello@mabrix.com" className="footer__contact-item">hello@mabrix.com</a>
            </div>
            {displayedSocials.length > 0 && (
              <div className="footer__socials">
                {displayedSocials.map(link => {
                  const Icon = socialIcons[link.platform]
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer__social-link"
                      aria-label={link.platform}
                    >
                      {Icon && <Icon size={18} />}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4 className="footer__col-title">Navigation</h4>
              <nav className="footer__nav">
                {navItems.map(item => (
                  <Link key={item.path} to={item.path} className="footer__nav-link">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">Services</h4>
              <nav className="footer__nav">
                {serviceLinks.map(item => (
                  <Link key={item.label} to={item.path} className="footer__nav-link">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Mabrix Technologies. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
            <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
