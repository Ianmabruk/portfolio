import { useState, useEffect } from 'react'
import { adminApi } from '../../services/api'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import './AdminCRUD.css'

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: '', company: '', role: '', testimonial: '',
    rating: 5, project_reference: '', featured: false, active: true, ordering: 0
  })
  const [file, setFile] = useState(null)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getTestimonials()
      setItems(res.data.data)
    } catch (error) {
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', company: '', role: '', testimonial: '', rating: 5, project_reference: '', featured: false, active: true, ordering: 0 })
    setFile(null)
    setShowModal(true)
  }

  const openEdit = (item) => {
    setEditing(item.id)
    setForm({
      name: item.name, company: item.company, role: item.role || '',
      testimonial: item.testimonial, rating: item.rating || 5,
      project_reference: item.project_reference || '', featured: !!item.featured,
      active: !!item.active, ordering: item.ordering || 0
    })
    setFile(null)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await adminApi.updateTestimonial(editing, form, file)
        toast.success('Testimonial updated')
      } else {
        await adminApi.createTestimonial(form, file)
        toast.success('Testimonial created')
      }
      setShowModal(false)
      fetchItems()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    try {
      await adminApi.deleteTestimonial(id)
      toast.success('Testimonial deleted')
      fetchItems()
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="admin-crud">
      <div className="admin-crud__header">
        <h1>Testimonials</h1>
        <button onClick={openCreate} className="btn btn--primary">
          <Plus size={18} /> Add Testimonial
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
                <th>Name</th>
                <th>Company</th>
                <th>Rating</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.rating}/5</td>
                  <td>{item.featured ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => openEdit(item)} className="action-btn action-btn--edit">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="action-btn action-btn--delete">
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
              <h2>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowModal(false)} className="admin-modal__close">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Testimonial</label>
                <textarea value={form.testimonial} onChange={e => setForm({ ...form, testimonial: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })} />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
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
