import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { publicApi } from '../../services/api'
import { Link } from 'react-router-dom'
import './Plans.css'

export default function Plans() {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    publicApi.getPlans()
      .then(res => setPlans(res.data.data))
      .catch(console.error)
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
  }

  return (
    <div className="plans-page">
      <section className="plans-page__hero">
        <div className="plans-page__hero-inner">
          <motion.h1
            className="plans-page__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Plans
          </motion.h1>
          <motion.p
            className="plans-page__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Transparent pricing for every stage of your project.
          </motion.p>
        </div>
      </section>

      <section className="plans-page__grid">
        <div className="plans-page__inner">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              className={`plan-detail-card ${plan.featured ? 'plan-detail-card--featured' : ''}`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {plan.featured && <span className="plan-detail-card__badge">Featured</span>}
              <h3 className="plan-detail-card__name">{plan.name}</h3>
              <div className="plan-detail-card__price">
                <span className="plan-detail-card__amount">${plan.price}</span>
                <span className="plan-detail-card__period">/{plan.billing_period}</span>
              </div>
              <p className="plan-detail-card__description">{plan.description}</p>
              <ul className="plan-detail-card__features">
                {plan.features.split('\n').map((feature, j) => (
                  <li key={j}>{feature}</li>
                ))}
              </ul>
              <Link to="/request-service" className="btn btn--primary plan-detail-card__cta">
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
