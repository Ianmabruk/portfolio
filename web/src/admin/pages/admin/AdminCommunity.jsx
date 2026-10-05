import { useState, useEffect } from 'react'
import { adminApi } from '../../services/api'
import toast from 'react-hot-toast'
import { Search } from 'lucide-react'
import './AdminList.css'

export default function AdminCommunity() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await adminApi.getCommunity({ search })
      setMembers(res.data.data)
    } catch (error) {
      toast.error('Failed to load community members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMembers() }, [search])

  const updateStatus = async (id, status) => {
    try {
      await adminApi.updateCommunityStatus(id, { status })
      toast.success('Status updated')
      fetchMembers()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="admin-list">
      <div className="admin-list__header">
        <h1>Community Members</h1>
        <div className="admin-list__search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search members..."
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
                <th>Phone</th>
                <th>Interest</th>
                <th>Company</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone || '-'}</td>
                  <td>{member.interest || '-'}</td>
                  <td>{member.company || '-'}</td>
                  <td>{new Date(member.created_at).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={member.status}
                      onChange={e => updateStatus(member.id, e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
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
