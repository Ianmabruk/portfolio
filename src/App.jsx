import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/public/Home'
import Services from './pages/public/Services'
import ServiceDetail from './pages/public/ServiceDetail'
import Portfolio from './pages/public/Portfolio'
import CaseStudy from './pages/public/CaseStudy'
import About from './pages/public/About'
import Plans from './pages/public/Plans'
import Community from './pages/public/Community'
import RequestService from './pages/public/RequestService'
import Contact from './pages/public/Contact'
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:slug" element={<CaseStudy />} />
        <Route path="about" element={<About />} />
        <Route path="plans" element={<Plans />} />
        <Route path="community" element={<Community />} />
        <Route path="request-service" element={<RequestService />} />
        <Route path="contact" element={<Contact />} />
      </Route>
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
