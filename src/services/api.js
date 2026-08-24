import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL || '/uploads';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const publicApi = {
  getServices: () => api.get('/services'),
  getService: (slug) => api.get(`/services/${slug}`),
  getPortfolio: (params) => api.get('/portfolio', { params }),
  getProject: (slug) => api.get(`/portfolio/slug/${slug}`),
  getPortfolioCategories: () => api.get('/portfolio/categories'),
  getTestimonials: () => api.get('/testimonials'),
  getPlans: () => api.get('/plans'),
  getSocialLinks: () => api.get('/social-links'),
  getSettings: () => api.get('/settings'),
  joinCommunity: (data) => api.post('/community/join', data),
  submitRequest: (data) => api.post('/requests', data),
  submitInquiry: (data) => api.post('/inquiries', data),
};

export const adminApi = {
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  getDashboard: () => api.get('/admin/dashboard'),
  getServices: () => api.get('/admin/services'),
  createService: (data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('image', file);
    return api.post('/admin/services', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateService: (id, data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('image', file);
    return api.put(`/admin/services/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteService: (id) => api.delete(`/admin/services/${id}`),
  getPortfolio: () => api.get('/admin/portfolio'),
  createProject: (data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('cover_image', file);
    return api.post('/admin/portfolio', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateProject: (id, data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('cover_image', file);
    return api.put(`/admin/portfolio/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteProject: (id) => api.delete(`/admin/portfolio/${id}`),
  getTestimonials: () => api.get('/admin/testimonials'),
  createTestimonial: (data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('image', file);
    return api.post('/admin/testimonials', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateTestimonial: (id, data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('image', file);
    return api.put(`/admin/testimonials/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),
  getPlans: () => api.get('/admin/plans'),
  createPlan: (data) => api.post('/admin/plans', data),
  updatePlan: (id, data) => api.put(`/admin/plans/${id}`, data),
  deletePlan: (id) => api.delete(`/admin/plans/${id}`),
  getCommunity: (params) => api.get('/admin/community', { params }),
  updateCommunityStatus: (id, data) => api.put(`/admin/community/${id}/status`, data),
  getRequests: (params) => api.get('/admin/requests', { params }),
  updateRequestStatus: (id, data) => api.put(`/admin/requests/${id}/status`, data),
  getInquiries: (params) => api.get('/admin/inquiries', { params }),
  updateInquiryStatus: (id, data) => api.put(`/admin/inquiries/${id}/status`, data),
  getMedia: (params) => api.get('/admin/media', { params }),
  uploadMedia: (file, altText, category) => {
    const form = new FormData();
    form.append('file', file);
    form.append('alt_text', altText || '');
    form.append('category', category || 'general');
    return api.post('/admin/media/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteMedia: (id) => api.delete(`/admin/media/${id}`),
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data) => api.post('/admin/settings', data),
  getSocialLinks: () => api.get('/admin/social-links'),
  createSocialLink: (data) => api.post('/admin/social-links', data),
  updateSocialLink: (id, data) => api.put(`/admin/social-links/${id}`, data),
  deleteSocialLink: (id) => api.delete(`/admin/social-links/${id}`),
  getActivities: () => api.get('/admin/activities'),
};

export { UPLOADS_URL };
