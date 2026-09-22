import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { publicApi } from '../../services/api'
import { Link } from 'react-router-dom'
import './Portfolio.css'

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, categoriesRes] = await Promise.all([
          publicApi.getPortfolio({}),
          publicApi.getPortfolioCategories(),
        ])
        setProjects(projectsRes.data.data)
        setCategories(['All', ...categoriesRes.data.data])
      } catch (error) {
        console.error('Failed to fetch portfolio:', error)
      }
    }
    fetchData()
  }, [])

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05 } }),
  }

  return (
    <div className="portfolio-page">
      <section className="portfolio-page__hero">
        <div className="portfolio-page__hero-inner">
          <motion.h1
            className="portfolio-page__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Portfolio
          </motion.h1>
          <motion.p
            className="portfolio-page__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            A selection of projects we are proud to have been a part of.
          </motion.p>
        </div>
      </section>

      <section className="portfolio-page__filters">
        <div className="portfolio-page__filters-inner">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="portfolio-page__grid">
        <div className="portfolio-page__inner">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              className="portfolio-card"
              custom={i}
              initial="hidden"
              animate="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="portfolio-card__image">
                {project.cover_image ? (
                  <img src={project.cover_image} alt={project.title} loading="lazy" />
                ) : (
                  <div className="portfolio-card__placeholder">{project.title[0]}</div>
                )}
              </div>
              <div className="portfolio-card__content">
                <span className="portfolio-card__category">{project.category}</span>
                <h3 className="portfolio-card__title">{project.title}</h3>
                <p className="portfolio-card__client">{project.client}</p>
                <p className="portfolio-card__description">{project.description}</p>
                {project.project_url ? (
                  <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="portfolio-card__link">
                    View Project
                  </a>
                ) : (
                  <Link to={`/portfolio/${project.slug}`} className="portfolio-card__link">
                    View Case Study
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
