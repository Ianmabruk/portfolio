import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { publicApi } from '../../services/api'
import './ServiceDetail.css'

export default function ServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    publicApi.getService(slug)
      .then(res => { setService(res.data.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="service-detail-page">
        <div className="service-detail-page__loading">
          <div className="spinner" />
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="service-detail-page">
        <div className="service-detail-page__not-found">
          <h1>Service not found</h1>
          <Link to="/services" className="btn btn--secondary">Back to Services</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="service-detail-page">
      <section className="service-detail-page__hero">
        <div className="service-detail-page__hero-inner">
          <motion.h1
            className="service-detail-page__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {service.title}
          </motion.h1>
          <motion.p
            className="service-detail-page__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      <section className="service-detail-page__content">
        <div className="service-detail-page__inner">
          {service.image && (
            <div className="service-detail-page__image">
              <img src={service.image} alt={service.title} />
            </div>
          )}
          <div className="service-detail-page__body">
            <h2>Overview</h2>
            <p>{service.description}</p>
            <Link to="/request-service" className="btn btn--primary">Request This Service</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
