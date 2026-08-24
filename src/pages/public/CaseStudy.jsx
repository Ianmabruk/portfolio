import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { publicApi } from '../../services/api'
import './CaseStudy.css'

export default function CaseStudy() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    publicApi.getProject(slug)
      .then(res => { setProject(res.data.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="case-study-page">
        <div className="case-study-page__loading">
          <div className="spinner" />
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="case-study-page">
        <div className="case-study-page__not-found">
          <h1>Project not found</h1>
          <Link to="/portfolio" className="btn btn--secondary">Back to Portfolio</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="case-study-page">
      <section className="case-study-page__hero">
        <div className="case-study-page__hero-inner">
          <motion.span
            className="case-study-page__category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {project.category}
          </motion.span>
          <motion.h1
            className="case-study-page__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            className="case-study-page__client"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Client: {project.client} {project.year && `| ${project.year}`}
          </motion.p>
        </div>
      </section>

      {project.cover_image && (
        <section className="case-study-page__hero-image">
          <img src={project.cover_image} alt={project.title} />
        </section>
      )}

      <section className="case-study-page__content">
        <div className="case-study-page__inner">
          <motion.div
            className="case-study-page__section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Challenge</h2>
            <p>{project.challenge || project.description}</p>
          </motion.div>

          {project.solution && (
            <motion.div
              className="case-study-page__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Solution</h2>
              <p>{project.solution}</p>
            </motion.div>
          )}

          {project.process && (
            <motion.div
              className="case-study-page__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Development Process</h2>
              <p>{project.process}</p>
            </motion.div>
          )}

          {project.technologies && (
            <motion.div
              className="case-study-page__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Technologies</h2>
              <p>{project.technologies}</p>
            </motion.div>
          )}

          {project.results && (
            <motion.div
              className="case-study-page__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Results</h2>
              <p>{project.results}</p>
            </motion.div>
          )}

          {project.images && project.images.length > 0 && (
            <motion.div
              className="case-study-page__gallery"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Project Gallery</h2>
              <div className="case-study-page__gallery-grid">
                {project.images.map((img, i) => (
                  <div key={i} className="case-study-page__gallery-item">
                    <img src={img.image_url} alt={img.alt_text || ''} loading="lazy" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {project.testimonial && (
            <motion.div
              className="case-study-page__testimonial"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <blockquote>"{project.testimonial}"</blockquote>
            </motion.div>
          )}

          <motion.div
            className="case-study-page__cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Have a project in mind?</h2>
            <p>Let's build it together.</p>
            <Link to="/request-service" className="btn btn--primary btn--large">
              Start a Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
