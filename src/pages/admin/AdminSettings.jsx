import { useState, useEffect } from 'react'
import { adminApi } from '../../services/api'
import toast from 'react-hot-toast'
import './AdminSettings.css'

export default function AdminSettings() {
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
          adminApi.updateSettings({ key, value: value ?? '', type: 'text' })
        )
      )
      toast.success('Settings saved')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to save settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-settings">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="admin-settings">
      <div className="admin-settings__header">
        <h1>Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-settings__form">
        <div className="admin-settings__section">
          <h2>Hero</h2>
          <div className="form-group">
            <label>Hero Eyebrow</label>
            <input value={settings.hero_eyebrow || ''} onChange={e => handleChange('hero_eyebrow', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Hero Heading</label>
            <input value={settings.hero_heading || ''} onChange={e => handleChange('hero_heading', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Hero Description</label>
            <textarea value={settings.hero_description || ''} onChange={e => handleChange('hero_description', e.target.value)} />
          </div>
        </div>

        <div className="admin-settings__section">
          <h2>Contact</h2>
          <div className="form-group">
            <label>Contact Email</label>
            <input value={settings.contact_email || ''} onChange={e => handleChange('contact_email', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Contact Phone</label>
            <input value={settings.contact_phone || ''} onChange={e => handleChange('contact_phone', e.target.value)} />
          </div>
        </div>

        <div className="admin-settings__section">
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

        <div className="admin-settings__section">
          <h2>About Me</h2>
          <p className="admin-settings__hint">
            These fields drive the About section and contact details on the public portfolio.
          </p>
          <div className="form-group">
            <label>Name</label>
            <input value={settings.about_name || ''} onChange={e => handleChange('about_name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Professional Title</label>
            <input
              value={settings.about_title || ''}
              onChange={e => handleChange('about_title', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Biography</label>
            <textarea
              rows={5}
              value={settings.about_bio || ''}
              onChange={e => handleChange('about_bio', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input
              value={settings.about_skills || ''}
              onChange={e => handleChange('about_skills', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Profile Image URL</label>
            <input
              type="url"
              placeholder="https://... or /uploads/media/..."
              value={settings.about_image || ''}
              onChange={e => handleChange('about_image', e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
