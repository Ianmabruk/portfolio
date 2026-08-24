import { useState, useEffect } from 'react'
import { adminApi } from '../../services/api'
import toast from 'react-hot-toast'
import { Search } from 'lucide-react'

export default function AdminInquiries() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getInquiries({ search })
      setItems(res.data.data)
    } catch (error) {
      toast.error('Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [search])

  const updateStatus = async (id, status) => {
    try {
      await adminApi.updateInquiryStatus(id, { status })
      toast.success('Status updated')
      fetchItems()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="admin-list">
      <div className="admin-list__header">
        <h1>Inquiries</h1>
        <div className="admin-list__search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-list__loading">
          <div className="spinner" />
        </div>
      ) : (
        <div className="admin-crud__table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.subject}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={item.status}
                      onChange={e => updateStatus(item.id, e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
