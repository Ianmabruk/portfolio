import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminApi, assetUrl } from '../../services/api'
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
    results: '', testimonial: '', year: '', project_url: '', github_url: '',
    status: 'live', featured: false, active: true, ordering: 0
  })
  const [file, setFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [deletingImage, setDeletingImage] = useState(null)
  const [editingCover, setEditingCover] = useState(null)

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
      results: '', testimonial: '', year: '', project_url: '', github_url: '',
      status: 'live', featured: false, active: true, ordering: 0
    })
    setFile(null)
    setCoverPreview(null)
    setImages([])
    setImageFiles([])
    setEditingCover(null)
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
      github_url: project.github_url || '', status: project.status || 'live',
      featured: !!project.featured, active: !!project.active,
      ordering: project.ordering || 0
    })
    setImages(project.images || [])
    setEditingCover(project.cover_image || null)
    setFile(null)
    setCoverPreview(null)
    setImageFiles([])
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await adminApi.updateProject(editing, form, file)
        if (imageFiles.length) await uploadGalleryImages(editing)
        toast.success('Project updated')
      } else {
        const res = await adminApi.createProject(form, file)
        const newId = res.data?.data?.id
        if (newId && imageFiles.length) await uploadGalleryImages(newId)
        toast.success('Project created')
      }
      setShowModal(false)
      fetchProjects()
    } catch (error) {
      const message = error.response?.data?.message
      toast.error(message || 'Unable to save project. Please try again.')
    }
  }

  const handleCoverChange = (e) => {
    const selected = e.target.files[0]
    setFile(selected)
    setCoverPreview(selected ? URL.createObjectURL(selected) : null)
  }

  const handleGalleryChange = (e) => {
    const selected = Array.from(e.target.files || [])
    if (!selected.length) return
    const tooLarge = selected.find(f => f.size > 10 * 1024 * 1024)
    if (tooLarge) {
      toast.error('Images must be smaller than 10MB')
      e.target.value = ''
      return
    }
    setImageFiles(prev => [...prev, ...selected])
  }

  const uploadGalleryImages = async (projectId) => {
    for (const imageFile of imageFiles) {
      await adminApi.addProjectImage(projectId, { alt_text: '' }, imageFile)
    }
    setImageFiles([])
  }

  const removeImage = async (projectId, imageId) => {
    try {
      await adminApi.deleteProjectImage(projectId, imageId)
      setImages(prev => prev.filter(img => img.id !== imageId))
      toast.success('Image removed')
    } catch (error) {
      toast.error('Unable to remove image. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Delete Project?\n\nDeleting this project will remove it from the portfolio, including its images. This action cannot be undone.'
    )
    if (!confirmed) return
    try {
      await adminApi.deleteProject(id)
      toast.success('Project deleted')
      fetchProjects()
    } catch (error) {
      toast.error('Unable to delete project. Please try again.')
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
                <label>Year</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={e => setForm({ ...form, year: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Process</label>
                <input value={form.process} onChange={e => setForm({ ...form, process: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Testimonial</label>
                <textarea value={form.testimonial} onChange={e => setForm({ ...form, testimonial: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Live Project URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={form.project_url}
                  onChange={e => setForm({ ...form, project_url: e.target.value })}
                />
                <small className="form-hint">Used by the "Live Project" button on the portfolio.</small>
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/you/project"
                  value={form.github_url}
                  onChange={e => setForm({ ...form, github_url: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="live">Live</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  value={form.ordering}
                  onChange={e => setForm({ ...form, ordering: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Cover Image</label>
                <input type="file" accept="image/*" onChange={handleCoverChange} />
                {coverPreview && <img src={coverPreview} alt="Cover preview" className="admin-modal__preview" />}
                {!coverPreview && editingCover && (
                  <img src={assetUrl(editingCover)} alt="Current cover" className="admin-modal__preview" />
                )}
              </div>
              <div className="form-group">
                <label>Gallery Images</label>
                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />

                {imageFiles.length > 0 && (
                  <div className="admin-gallery__grid">
                    {imageFiles.map((f, i) => (
                      <div key={`${f.name}-${i}`} className="admin-gallery__item">
                        <img src={URL.createObjectURL(f)} alt={f.name} />
                        <button
                          type="button"
                          className="action-btn action-btn--delete"
                          aria-label={`Remove ${f.name}`}
                          onClick={() => setImageFiles(prev => prev.filter((_, idx) => idx !== i))}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length > 0 && (
                  <div className="admin-gallery__grid">
                    {images.map(image => (
                      <div key={image.id} className="admin-gallery__item">
                        <img src={assetUrl(image.image_url)} alt={image.alt_text || ''} />
                        <button
                          type="button"
                          className="action-btn action-btn--delete"
                          aria-label="Remove image"
                          disabled={deletingImage === image.id}
                          onClick={() => removeImage(editing, image.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <small className="form-hint">
                  Images are saved with the project. Max 10MB per image.
                </small>
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
