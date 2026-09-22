import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminApi } from '../../services/api'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import './AdminCRUD.css'

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: '', slug: '', client: '', category: '', description: '',
    challenge: '', solution: '', process: '', technologies: '',
    results: '', testimonial: '', year: '', project_url: '',
    featured: false, active: true, ordering: 0
  })
  const [file, setFile] = useState(null)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getPortfolio()
      setProjects(res.data.data)
    } catch (error) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({
      title: '', slug: '', client: '', category: '', description: '',
      challenge: '', solution: '', process: '', technologies: '',
      results: '', testimonial: '', year: '', project_url: '',
      featured: false, active: true, ordering: 0
    })
    setFile(null)
    setShowModal(true)
  }

  const openEdit = (project) => {
    setEditing(project.id)
    setForm({
      title: project.title, slug: project.slug, client: project.client,
      category: project.category, description: project.description,
      challenge: project.challenge || '', solution: project.solution || '',
      process: project.process || '', technologies: project.technologies || '',
      results: project.results || '', testimonial: project.testimonial || '',
      year: project.year || '', project_url: project.project_url || '',
      featured: !!project.featured, active: !!project.active,
      ordering: project.ordering || 0
    })
    setFile(null)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await adminApi.updateProject(editing, form, file)
        toast.success('Project updated')
      } else {
        await adminApi.createProject(form, file)
        toast.success('Project created')
      }
      setShowModal(false)
      fetchProjects()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      await adminApi.deleteProject(id)
      toast.success('Project deleted')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="admin-crud">
      <div className="admin-crud__header">
        <h1>Portfolio</h1>
        <button onClick={openCreate} className="btn btn--primary">
          <Plus size={18} /> Add Project
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
                <th>Client</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.client}</td>
                  <td>{project.category}</td>
                  <td>{project.featured ? 'Yes' : 'No'}</td>
                  <td>{project.active ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => openEdit(project)} className="action-btn action-btn--edit">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="action-btn action-btn--delete">
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
              <h2>{editing ? 'Edit Project' : 'Add Project'}</h2>
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
                <label>Client</label>
                <input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Challenge</label>
                <textarea value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Solution</label>
                <textarea value={form.solution} onChange={e => setForm({ ...form, solution: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Technologies</label>
                <input value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Results</label>
                <textarea value={form.results} onChange={e => setForm({ ...form, results: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Cover Image</label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
                {form.project_url && <img src={form.project_url} alt="" className="admin-modal__preview" />}
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
