import { Route, Routes } from 'react-router-dom';
import PortfolioSite from './PortfolioSite';

import AdminLogin from './admin/pages/admin/AdminLogin';
import AdminLayout from './admin/components/admin/AdminLayout';
import Dashboard from './admin/pages/admin/Dashboard';
import AdminHome from './admin/pages/admin/AdminHome';
import AdminServices from './admin/pages/admin/AdminServices';
import AdminPortfolio from './admin/pages/admin/AdminPortfolio';
import AdminTestimonials from './admin/pages/admin/AdminTestimonials';
import AdminPlans from './admin/pages/admin/AdminPlans';
import AdminCommunity from './admin/pages/admin/AdminCommunity';
import AdminRequests from './admin/pages/admin/AdminRequests';
import AdminInquiries from './admin/pages/admin/AdminInquiries';
import AdminMedia from './admin/pages/admin/AdminMedia';
import AdminSettings from './admin/pages/admin/AdminSettings';
import AdminSocialLinks from './admin/pages/admin/AdminSocialLinks';

/**
 * One application, two areas:
 *
 *   /            public portfolio, open to every visitor
 *   /admin       authentication, then the management dashboard
 *
 * Authentication guards only the /admin area. The portfolio never checks it.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioSite />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<AdminHome />} />
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

      <Route path="*" element={<PortfolioSite />} />
    </Routes>
  );
}