import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { publicApi } from '../../services/api'
import toast from 'react-hot-toast'
import './Forms.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const submittingRef = useRef(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address'
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submittingRef.current) return
    if (!validate()) return
    if (submitting) return
    submittingRef.current = true
    setSubmitting(true)
    try {
      await publicApi.submitInquiry(form)
      setSubmitted(true)
      toast.success('Message sent successfully')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
      submittingRef.current = false
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-page__hero">
        <div className="contact-page__hero-inner">
          <motion.h1
            className="contact-page__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Let's Talk Together
          </motion.h1>
          <motion.p
            className="contact-page__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Have a project in mind? Let's discuss how we can help.
          </motion.p>
        </div>
      </section>

      <section className="contact-page__form">
        <div className="contact-page__form-inner">
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              noValidate
            >
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
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
                  {errors.email && <span className="form-error">{errors.email}</span>}
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
                <div className="form-group form-group--full">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    required
                  />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
              </div>
              <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          ) : (
            <motion.div
              className="contact-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2>Message Sent</h2>
              <p>Thank you for reaching out. We'll get back to you soon.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
