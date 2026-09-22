import { Link } from 'react-router-dom'
import './Footer.css'

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
  Facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  WhatsApp: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
      <path d="M9 10a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1H9V10z"/>
    </svg>
  ),
}

const serviceLinks = [
  { label: 'Web Development', slug: 'web-development' },
  { label: 'Software Development', slug: 'software-development' },
  { label: 'UI/UX Design', slug: 'ui-ux-design' },
  { label: 'Mobile Apps', slug: 'mobile-apps' },
  { label: 'Digital Marketing', slug: 'digital-marketing' },
  { label: 'Graphics Design', slug: 'graphics-design' },
]

export default function Footer({ siteSettings, socialLinks: dbSocialLinks }) {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/portfolio' },
    { label: 'Community', path: '/community' },
    { label: 'Contact', path: '/contact' },
  ]

  const displayedSocials = dbSocialLinks && dbSocialLinks.length > 0 ? dbSocialLinks : []

  const contactPhone = siteSettings?.contact_phone || ''
  const contactEmail = siteSettings?.contact_email || 'hello@mabrix.com'

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">Mabrix</Link>
            <p className="footer__tagline">
              {siteSettings?.site_description || 'We build digital experiences that move businesses forward.'}
            </p>
            <div className="footer__contact">
              {contactPhone && (
                <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="footer__contact-item">
                  {contactPhone}
                </a>
              )}
              <a href={`mailto:${contactEmail}`} className="footer__contact-item">{contactEmail}</a>
            </div>
            {displayedSocials.length > 0 && (
              <div className="footer__socials">
                {displayedSocials.map(link => {
                  const Icon = socialIcons[link.platform]
                  return (
                    <a
                      key={link.id || link.platform}
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
                  <Link key={item.slug} to={`/services/${item.slug}`} className="footer__nav-link">
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
