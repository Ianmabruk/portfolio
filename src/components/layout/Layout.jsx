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
        const [homeRes, socialRes] = await Promise.all([
          publicApi.getHome(),
          publicApi.getSocialLinks(),
        ])
        if (homeRes.data?.data?.settings) {
          setSettings(homeRes.data.data.settings)
        } else {
          const settingsRes = await publicApi.getSettings()
          setSettings(settingsRes.data.data)
        }
        setSocialLinks(socialRes.data.data)
      } catch (error) {
        console.error('Failed to fetch site data:', error)
        try {
          const settingsRes = await publicApi.getSettings()
          setSettings(settingsRes.data.data)
        } catch (e) {
          console.error('Failed to fetch settings:', e)
        }
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
