import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { publicApi } from '../../services/api'
import toast from 'react-hot-toast'
import './Forms.css'

export default function RequestService() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    service: '', budget: '', timeline: '', description: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [services, setServices] = useState([])

  useEffect(() => {
    publicApi.getServices()
      .then(res => {
        if (res.data?.data) setServices(res.data.data)
      })
      .catch(console.error)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await publicApi.submitRequest(form)
      setSubmitted(true)
      toast.success('Service request submitted successfully')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="request-page">
      <section className="request-page__hero">
        <div className="request-page__hero-inner">
          <motion.h1
            className="request-page__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Request a Service
          </motion.h1>
          <motion.p
            className="request-page__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Tell us about your project and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="request-page__form">
        <div className="request-page__form-inner">
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Needed</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-50k">$15,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timeline">Preferred Timeline</label>
                  <select
                    id="timeline"
                    value={form.timeline}
                    onChange={e => setForm({ ...form, timeline: e.target.value })}
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">1-3 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="description">Project Description</label>
                  <textarea
                    id="description"
                    rows="5"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn--primary">Submit Request</button>
            </motion.form>
          ) : (
            <motion.div
              className="request-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2>Request Received</h2>
              <p>We'll get back to you within 24 hours.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
