import { useState, useEffect } from 'react'
import { adminApi } from '../../services/api'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import './AdminCRUD.css'

export default function AdminPlans() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: '', slug: '', price: 0, billing_period: 'monthly',
    description: '', features: '', featured: false, active: true, ordering: 0
  })

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getPlans()
      setItems(res.data.data)
    } catch (error) {
      toast.error('Failed to load plans')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', slug: '', price: 0, billing_period: 'monthly', description: '', features: '', featured: false, active: true, ordering: 0 })
    setShowModal(true)
  }

  const openEdit = (item) => {
    setEditing(item.id)
    setForm({
      name: item.name, slug: item.slug, price: item.price,
      billing_period: item.billing_period || 'monthly', description: item.description,
      features: item.features, featured: !!item.featured, active: !!item.active,
      ordering: item.ordering || 0
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await adminApi.updatePlan(editing, form)
        toast.success('Plan updated')
      } else {
        await adminApi.createPlan(form)
        toast.success('Plan created')
      }
      setShowModal(false)
      fetchItems()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this plan?')) return
    try {
      await adminApi.deletePlan(id)
      toast.success('Plan deleted')
      fetchItems()
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="admin-crud">
      <div className="admin-crud__header">
        <h1>Plans</h1>
        <button onClick={openCreate} className="btn btn--primary">
          <Plus size={18} /> Add Plan
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
                <th>Price</th>
                <th>Period</th>
                <th>Featured</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.billing_period}</td>
                  <td>{item.featured ? 'Yes' : 'No'}</td>
                  <td>{item.active ? 'Yes' : 'No'}</td>
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
              <h2>{editing ? 'Edit Plan' : 'Add Plan'}</h2>
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
                <label>Slug</label>
                <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Features (one per line)</label>
                <textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} required />
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
