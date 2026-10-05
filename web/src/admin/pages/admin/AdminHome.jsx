import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminApi } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import './AdminHome.css'

export default function AdminAboutMe() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getSettings()
      setSettings(res.data.data)
    } catch (error) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSettings() }, [])

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await Promise.all(
        Object.entries(settings).map(([key, value]) =>
          adminApi.updateSettings({ key, value, type: 'text' })
        )
      )
      toast.success('About Me settings saved')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-home">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="admin-home">
      <div className="admin-home__header">
        <h1>About Me</h1>
        <p className="admin-home__subtitle">Manage your profile, bio, and site settings</p>
      </div>

      <form onSubmit={handleSubmit} className="admin-home__form">
        <div className="admin-home__section">
          <h2>Profile</h2>
          <div className="form-group">
            <label>Name</label>
            <input value={settings.hero_eyebrow || ''} onChange={e => handleChange('hero_eyebrow', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Headline</label>
            <input value={settings.hero_heading || ''} onChange={e => handleChange('hero_heading', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Bio / Description</label>
            <textarea value={settings.hero_description || ''} onChange={e => handleChange('hero_description', e.target.value)} rows={4} />
          </div>
        </div>

        <div className="admin-home__section">
          <h2>Contact</h2>
          <div className="form-group">
            <label>Contact Email</label>
            <input type="email" value={settings.contact_email || ''} onChange={e => handleChange('contact_email', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Contact Phone</label>
            <input value={settings.contact_phone || ''} onChange={e => handleChange('contact_phone', e.target.value)} />
          </div>
        </div>

        <div className="admin-home__section">
          <h2>Statistics</h2>
          <div className="form-group">
            <label>Projects Delivered</label>
            <input value={settings.stats_projects || ''} onChange={e => handleChange('stats_projects', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Businesses Supported</label>
            <input value={settings.stats_businesses || ''} onChange={e => handleChange('stats_businesses', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Digital Solutions</label>
            <input value={settings.stats_solutions || ''} onChange={e => handleChange('stats_solutions', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Commitment</label>
            <input value={settings.stats_commitment || ''} onChange={e => handleChange('stats_commitment', e.target.value)} />
          </div>
        </div>

        <div className="admin-home__section">
          <h2>Site</h2>
          <div className="form-group">
            <label>Site Title</label>
            <input value={settings.site_title || ''} onChange={e => handleChange('site_title', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Site Description</label>
            <textarea value={settings.site_description || ''} onChange={e => handleChange('site_description', e.target.value)} rows={3} />
          </div>
        </div>

        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save About Me'}
        </button>
      </form>
    </div>
  )
}