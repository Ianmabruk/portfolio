import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { publicApi } from '../../services/api'
import { ChevronDown } from 'lucide-react'
import './Home.css'

const defaultServices = [
  { title: 'Web Development', description: 'Modern responsive websites and web applications built with cutting-edge technologies.', slug: 'web-development' },
  { title: 'Software Development', description: 'Custom software solutions designed around your business needs and goals.', slug: 'software-development' },
  { title: 'UI/UX Design', description: 'Clean, intuitive and user-centered digital experiences that delight users.', slug: 'ui-ux-design' },
  { title: 'Mobile Apps', description: 'Mobile-first applications and digital products for iOS and Android.', slug: 'mobile-apps' },
  { title: 'Digital Marketing', description: 'Strategic marketing solutions to grow your online presence and reach.', slug: 'digital-marketing' },
  { title: 'Graphics Design', description: 'Visual design solutions that strengthen your brand identity and communicate your message.', slug: 'graphics-design' },
]

const defaultProjects = [
  { title: 'Luxury Fashion Store', client: 'Elegance Fashion', category: 'E-commerce', description: 'A premium e-commerce platform with seamless shopping experience.', cover_image: null, project_url: 'https://example.com' },
  { title: 'SaaS Dashboard', client: 'TechFlow', category: 'Software', description: 'A comprehensive analytics dashboard for a B2B SaaS platform.', cover_image: null, project_url: 'https://example.com' },
  { title: 'Corporate Website', client: 'Apex Corp', category: 'Websites', description: 'A modern corporate website for a global consulting firm.', cover_image: null, project_url: 'https://example.com' },
]

const defaultTestimonials = [
  { name: 'Sarah Johnson', company: 'Elegance Fashion', role: 'CEO', testimonial: 'Mabrix transformed our online store. The attention to detail exceeded our expectations.', image_url: null },
  { name: 'Michael Chen', company: 'TechFlow', role: 'CTO', testimonial: 'Working with Mabrix was a game-changer. They delivered a robust dashboard our team loves.', image_url: null },
  { name: 'David Miller', company: 'Apex Corp', role: 'Marketing Director', testimonial: 'Professional, responsive, and incredibly skilled. Mabrix is our go-to digital partner.', image_url: null },
]

export default function Home() {
  const [settings, setSettings] = useState(null)
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, servicesRes, projectsRes, testimonialsRes] = await Promise.all([
          publicApi.getSettings(),
          publicApi.getServices(),
          publicApi.getPortfolio({ featured: true }),
          publicApi.getTestimonials(),
        ])
        setSettings(settingsRes.data.data)
        setServices(servicesRes.data.data?.length ? servicesRes.data.data : defaultServices)
        setProjects(projectsRes.data.data?.length ? projectsRes.data.data : defaultProjects)
        setTestimonials(testimonialsRes.data.data?.length ? testimonialsRes.data.data : defaultTestimonials)
      } catch (error) {
        console.error('Failed to fetch homepage data:', error)
        setServices(defaultServices)
        setProjects(defaultProjects)
        setTestimonials(defaultTestimonials)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
    }),
  }

  const serviceIcons = {
    'Web Development': 'Code2',
    'Software Development': 'Code2',
    'UI/UX Design': 'Palette',
    'Mobile Apps': 'Smartphone',
    'Digital Marketing': 'Megaphone',
    'Graphics Design': 'Palette',
  }

  return (
    <div className="home">
      <section className="hero" style={{ background: '#f8f6f3', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero__content">
          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {settings?.hero_eyebrow || 'MABRIX TECHNOLOGIES'}
          </motion.p>
          <motion.h1
            className="hero__heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {settings?.hero_heading || 'We build digital experiences that move businesses forward.'}
          </motion.h1>
          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {settings?.hero_description || 'We design and build modern digital products, websites and technology experiences that help ambitious businesses grow.'}
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/services" className="btn btn--primary">Explore Services</Link>
            <Link to="/portfolio" className="btn btn--secondary">View Portfolio</Link>
          </motion.div>
        </div>
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span>Scroll to explore</span>
          <ChevronDown size={20} className="hero__scroll-icon" />
        </motion.div>
      </section>

      <section className="services-preview">
        <div className="services-preview__inner">
          <div className="section-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What we do
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              We create digital solutions designed to help businesses innovate, grow and stay ahead.
            </motion.p>
          </div>
          <div className="services-preview__grid">
            {services.slice(0, 6).map((service, i) => (
              <motion.div
                key={service.id || i}
                className="service-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <Link to={`/services/${service.slug}`} className="service-card__link">Learn more</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-preview">
        <div className="portfolio-preview__inner">
          <div className="section-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Selected Work
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              A selection of projects we are proud to have been a part of.
            </motion.p>
          </div>
          <div className="portfolio-preview__list">
            {projects.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.id || i}
                className="project-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="project-card__image">
                  {project.cover_image ? (
                    <img src={project.cover_image} alt={project.title} loading="lazy" />
                  ) : (
                    <div className="project-card__placeholder">
                      <span>{project.title?.[0] || 'P'}</span>
                    </div>
                  )}
                </div>
                <div className="project-card__content">
                  <span className="project-card__category">{project.category}</span>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__client">{project.client}</p>
                  <p className="project-card__description">{project.description}</p>
                  {project.project_url ? (
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="project-card__link">View Project</a>
                  ) : (
                    <Link to={`/portfolio/${project.slug}`} className="project-card__link">View Case Study</Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/portfolio" className="btn btn--secondary">View All Projects</Link>
          </div>
        </div>
      </section>

      <section className="testimonials-preview">
        <div className="testimonials-preview__inner">
          <div className="section-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What Our Clients Say
            </motion.h2>
          </div>
          <div className="testimonials-preview__grid">
            {testimonials.slice(0, 3).map((testimonial, i) => (
              <motion.div
                key={testimonial.id || i}
                className="testimonial-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="testimonial-card__text">"{testimonial.testimonial}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {testimonial.image_url ? (
                      <img src={testimonial.image_url} alt={testimonial.name} />
                    ) : (
                      <span>{testimonial.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <p className="testimonial-card__name">{testimonial.name}</p>
                    <p className="testimonial-card__company">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="community-preview">
        <div className="community-preview__inner">
          <div className="section-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Join the Mabrix Community
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Be part of a growing network of innovators, creators, and technology enthusiasts.
            </motion.p>
          </div>
          <motion.div
            className="community-preview__cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/community" className="btn btn--primary">Join Community</Link>
          </motion.div>
        </div>
      </section>

      <section className="contact-preview">
        <div className="contact-preview__inner">
          <div className="section-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Get in Touch
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Have a project in mind? Let's discuss how we can help.
            </motion.p>
          </div>
          <motion.div
            className="contact-preview__cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/contact" className="btn btn--primary">Contact Us</Link>
            {settings?.contact_phone && (
              <a href={`tel:${settings.contact_phone.replace(/\s/g, '')}`} className="btn btn--secondary">{settings.contact_phone}</a>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
