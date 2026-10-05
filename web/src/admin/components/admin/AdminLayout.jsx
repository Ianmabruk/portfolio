import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { adminApi } from '../../services/api'
import {
  LayoutDashboard, Home, Briefcase, FileText, MessageSquare,
  Tag, Users, Mail, Settings, LogOut, Menu, X,
  Image, Share2
} from 'lucide-react'
import './AdminLayout.css'

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/home', label: 'Home', icon: Home },
  { path: '/admin/services', label: 'Services', icon: Briefcase },
  { path: '/admin/portfolio', label: 'Projects', icon: FileText },
  { path: '/admin/community', label: 'Community', icon: Users },
  { path: '/admin/contact', label: 'Contact', icon: Mail },
  { path: '/admin/social-links', label: 'Social Links', icon: Share2 },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="admin-layout__loading">
          <div className="spinner" />
        </div>
      </div>
    )
  }

  if (!user) {
    navigate('/admin/login')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <span className="admin-sidebar__logo">MABRIX</span>
          <button className="admin-sidebar__close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="admin-sidebar__nav">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'admin-nav-item--active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <button onClick={handleLogout} className="admin-nav-item admin-nav-item--logout">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button className="admin-header__menu" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="admin-header__user">
            <span>{user?.name || 'Admin'}</span>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
