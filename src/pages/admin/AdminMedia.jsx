import { useState, useEffect } from 'react'
import { adminApi } from '../../services/api'
import toast from 'react-hot-toast'
import { Upload, Trash2 } from 'lucide-react'
import './AdminMedia.css'

export default function AdminMedia() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState(null)

  const fetchAssets = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getMedia()
      setAssets(res.data.data)
    } catch (error) {
      toast.error('Failed to load media')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAssets() }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    try {
      await adminApi.uploadMedia(file)
      toast.success('File uploaded')
      setFile(null)
      fetchAssets()
    } catch (error) {
      toast.error('Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this file?')) return
    try {
      await adminApi.deleteMedia(id)
      toast.success('File deleted')
      fetchAssets()
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="admin-media">
      <div className="admin-media__header">
        <h1>Media Library</h1>
      </div>

      <div className="admin-media__upload">
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
          />
          <button type="submit" className="btn btn--primary" disabled={!file || uploading}>
            <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="admin-media__loading">
          <div className="spinner" />
        </div>
      ) : (
        <div className="admin-media__grid">
          {assets.map(asset => (
            <div key={asset.id} className="media-card">
              <div className="media-card__image">
                <img src={asset.url} alt={asset.alt_text || ''} />
              </div>
              <div className="media-card__info">
                <span className="media-card__name">{asset.original_name}</span>
                <button onClick={() => handleDelete(asset.id)} className="media-card__delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
