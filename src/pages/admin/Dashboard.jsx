import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminApi } from '../../services/api'
import { Link } from 'react-router-dom'
import {
  Briefcase, FileText, Mail, Users, MessageSquare, Tag,
  ArrowRight
} from 'lucide-react'
import './Dashboard.css'

const statCards = [
  { label: 'Projects', key: 'projects', icon: Briefcase, color: '#1a1a1a' },
  { label: 'Services', key: 'services', icon: FileText, color: '#6b7280' },
  { label: 'Testimonials', key: 'testimonials', icon: MessageSquare, color: '#9ca3af' },
  { label: 'Plans', key: 'plans', icon: Tag, color: '#1a1a1a' },
  { label: 'Requests', key: 'requests', icon: Mail, color: '#6b7280' },
  { label: 'Inquiries', key: 'inquiries', icon: Mail, color: '#9ca3af' },
  { label: 'Community', key: 'community', icon: Users, color: '#1a1a1a' },
]

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.getDashboard()
      .then(res => { setData(res.data.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard__loading">
          <div className="spinner" />
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
        <p className="dashboard__subtitle">Welcome back. Here is what is happening.</p>
      </div>

      <div className="dashboard__stats">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.key}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="stat-card__icon">
              <stat.icon size={20} />
            </div>
            <div className="stat-card__content">
              <span className="stat-card__value">{data?.stats?.[stat.key] || 0}</span>
              <span className="stat-card__label">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard__recent">
        <h2 className="dashboard__section-title">Recent Activity</h2>
        <div className="dashboard__recent-grid">
          <div className="dashboard__panel">
            <h3>Recent Requests</h3>
            {data?.recentRequests?.length > 0 ? (
              <ul className="dashboard__list">
                {data.recentRequests.map(req => (
                  <li key={req.id} className="dashboard__list-item">
                    <span>{req.name}</span>
                    <span className="dashboard__list-meta">{req.service}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dashboard__empty">No recent requests</p>
            )}
          </div>
          <div className="dashboard__panel">
            <h3>Recent Inquiries</h3>
            {data?.recentInquiries?.length > 0 ? (
              <ul className="dashboard__list">
                {data.recentInquiries.map(inq => (
                  <li key={inq.id} className="dashboard__list-item">
                    <span>{inq.name}</span>
                    <span className="dashboard__list-meta">{inq.subject}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dashboard__empty">No recent inquiries</p>
            )}
          </div>
          <div className="dashboard__panel">
            <h3>Recent Community</h3>
            {data?.recentCommunity?.length > 0 ? (
              <ul className="dashboard__list">
                {data.recentCommunity.map(member => (
                  <li key={member.id} className="dashboard__list-item">
                    <span>{member.name}</span>
                    <span className="dashboard__list-meta">{member.interest || 'Community'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dashboard__empty">No recent members</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
