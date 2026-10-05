import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminHome from './pages/admin/AdminHome'
import AdminServices from './pages/admin/AdminServices'
import AdminPortfolio from './pages/admin/AdminPortfolio'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminPlans from './pages/admin/AdminPlans'
import AdminCommunity from './pages/admin/AdminCommunity'
import AdminRequests from './pages/admin/AdminRequests'
import AdminInquiries from './pages/admin/AdminInquiries'
import AdminMedia from './pages/admin/AdminMedia'
import AdminSettings from './pages/admin/AdminSettings'
import AdminSocialLinks from './pages/admin/AdminSocialLinks'

// This app is the admin dashboard only. The public portfolio is a separate
// application in web/ and is served as its own site.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="community" element={<AdminCommunity />} />
        <Route path="requests" element={<AdminRequests />} />
        <Route path="contact" element={<AdminInquiries />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="social-links" element={<AdminSocialLinks />} />
      </Route>
    </Routes>
  )
}

export default App