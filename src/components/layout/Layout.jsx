import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { publicApi } from '../../services/api'
import './Layout.css'

export default function Layout() {
  const [settings, setSettings] = useState(null)
  const [socialLinks, setSocialLinks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, socialRes] = await Promise.all([
          publicApi.getSettings(),
          publicApi.getSocialLinks(),
        ])
        setSettings(settingsRes.data.data)
        setSocialLinks(socialRes.data.data)
      } catch (error) {
        console.error('Failed to fetch site data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="layout">
      <Header siteSettings={settings} socialLinks={socialLinks} />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer siteSettings={settings} socialLinks={socialLinks} />
    </div>
  )
}
