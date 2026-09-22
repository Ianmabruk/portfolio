import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { publicApi } from '../../services/api'
import './Services.css'

export default function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    publicApi.getServices()
      .then(res => {
        if (res.data?.data) setServices(res.data.data)
      })
      .catch(console.error)
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 }
    }),
  }

  return (
    <div className="services-page">
      <section className="services-page__hero">
        <div className="services-page__hero-inner">
          <motion.h1
            className="services-page__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Services
          </motion.h1>
          <motion.p
            className="services-page__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            We offer a complete range of digital services to help your business thrive.
          </motion.p>
        </div>
      </section>

      <section className="services-page__grid">
        <div className="services-page__inner">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className="service-detail-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {service.icon && (
                <div className="service-detail-card__icon">
                  <div dangerouslySetInnerHTML={{ __html: service.icon }} />
                </div>
              )}
              <div className="service-detail-card__image">
                {service.image && (
                  <img src={service.image} alt={service.title} loading="lazy" />
                )}
              </div>
              <h2 className="service-detail-card__title">{service.title}</h2>
              <p className="service-detail-card__description">{service.description}</p>
              <Link to={`/services/${service.slug}`} className="btn btn--secondary">
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
