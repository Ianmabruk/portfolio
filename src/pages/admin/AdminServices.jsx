import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminApi } from '../../services/api'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import './AdminCRUD.css'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: '', slug: '', description: '', icon: '',
    image: '', featured: false, active: true, ordering: 0
  })
  const [file, setFile] = useState(null)

  const fetchServices = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getServices()
      setServices(res.data.data)
    } catch (error) {
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchServices() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', slug: '', description: '', icon: '', image: '', featured: false, active: true, ordering: 0 })
    setFile(null)
    setShowModal(true)
  }

  const openEdit = (service) => {
    setEditing(service.id)
    setForm({
      title: service.title, slug: service.slug, description: service.description,
      icon: service.icon || '', image: service.image || '', featured: !!service.featured,
      active: !!service.active, ordering: service.ordering || 0
    })
    setFile(null)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await adminApi.updateService(editing, form, file)
        toast.success('Service updated')
      } else {
        await adminApi.createService(form, file)
        toast.success('Service created')
      }
      setShowModal(false)
      fetchServices()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await adminApi.deleteService(id)
      toast.success('Service deleted')
      fetchServices()
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="admin-crud">
      <div className="admin-crud__header">
        <h1>Services</h1>
        <button onClick={openCreate} className="btn btn--primary">
          <Plus size={18} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="admin-crud__loading">
          <div className="spinner" />
        </div>
      ) : (
        <div className="admin-crud__table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Featured</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id}>
                  <td>{service.title}</td>
                  <td>{service.slug}</td>
                  <td>{service.featured ? 'Yes' : 'No'}</td>
                  <td>{service.active ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => openEdit(service)} className="action-btn action-btn--edit">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="action-btn action-btn--delete">
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
              <h2>{editing ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setShowModal(false)} className="admin-modal__close">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Icon (HTML)</label>
                <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
                {form.image && <img src={form.image} alt="" className="admin-modal__preview" />}
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                  Featured
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                  Active
                </label>
              </div>
              <div className="form-group">
                <label>Ordering</label>
                <input type="number" value={form.ordering} onChange={e => setForm({ ...form, ordering: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="admin-modal__actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn--secondary">Cancel</button>
                <button type="submit" className="btn btn--primary">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
