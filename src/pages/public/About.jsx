import { motion } from 'framer-motion'
import './About.css'

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1 } }),
  }

  return (
    <div className="about-page">
      <section className="about-page__hero">
        <div className="about-page__hero-inner">
          <motion.h1
            className="about-page__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About Mabrix
          </motion.h1>
          <motion.p
            className="about-page__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            We are a digital studio focused on crafting high-quality digital products.
          </motion.p>
        </div>
      </section>

      <section className="about-page__mission">
        <div className="about-page__inner">
          <motion.div
            className="about-page__content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Philosophy</h2>
            <p>
              At Mabrix Technologies, we believe that great technology should feel simple. We combine strategic thinking with technical excellence to deliver solutions that are both beautiful and functional.
            </p>
            <p>
              Our approach is rooted in understanding your business, your users, and your goals. We don't just build websites and applications; we build digital experiences that move businesses forward.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="about-page__values">
        <div className="about-page__inner">
          <div className="about-page__values-grid">
            {[
              { title: 'Simplicity', text: 'We believe the best solutions are the simplest ones. Complexity is easy; clarity is hard.' },
              { title: 'Excellence', text: 'We hold ourselves to the highest standards in every line of code and every pixel.' },
              { title: 'Partnership', text: 'We work alongside our clients as true partners, invested in their success.' },
              { title: 'Innovation', text: 'We embrace emerging technologies and methodologies to deliver cutting-edge solutions.' },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                className="value-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
