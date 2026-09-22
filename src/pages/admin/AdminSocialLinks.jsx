import { useState, useEffect } from 'react'
import { adminApi } from '../../services/api'
import toast from 'react-hot-toast'
import { Plus, Trash2 } from 'lucide-react'
import './AdminSocialLinks.css'

export default function AdminSocialLinks() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ platform: '', url: '', active: true, ordering: 0 })

  const fetchLinks = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getSocialLinks()
      setLinks(res.data.data)
    } catch (error) {
      toast.error('Failed to load social links')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLinks() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await adminApi.createSocialLink(form)
      toast.success('Social link created')
      setShowModal(false)
      setForm({ platform: '', url: '', active: true, ordering: 0 })
      fetchLinks()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this link?')) return
    try {
      await adminApi.deleteSocialLink(id)
      toast.success('Link deleted')
      fetchLinks()
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="admin-social-links">
      <div className="admin-social-links__header">
        <h1>Social Links</h1>
        <button onClick={() => setShowModal(true)} className="btn btn--primary">
          <Plus size={18} /> Add Link
        </button>
      </div>

      {loading ? (
        <div className="admin-social-links__loading">
          <div className="spinner" />
        </div>
      ) : (
        <div className="admin-crud__table">
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>URL</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map(link => (
                <tr key={link.id}>
                  <td>{link.platform}</td>
                  <td><a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></td>
                  <td>{link.active ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => handleDelete(link.id)} className="action-btn action-btn--delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal__content">
            <div className="admin-modal__header">
              <h2>Add Social Link</h2>
              <button onClick={() => setShowModal(false)} className="admin-modal__close">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Platform</label>
                <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} required>
                  <option value="">Select platform</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="X">X</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
              <div className="form-group">
                <label>URL</label>
                <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} required />
              </div>
              <div className="admin-modal__actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn--secondary">Cancel</button>
                <button type="submit" className="btn btn--primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
