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
  getPortfolio: (params) => api.get('/projects', { params }),
  getProject: (id) => api.get(`/projects/${id}`),
  getPortfolioCategories: () => api.get('/projects/categories'),
  getTestimonials: () => api.get('/testimonials'),
  getPlans: () => api.get('/plans'),
  getSocialLinks: () => api.get('/social-links'),
  getSettings: () => api.get('/settings'),
  getHome: () => api.get('/home'),
  joinCommunity: (data) => api.post('/community', data),
  submitRequest: (data) => api.post('/requests', data),
  submitInquiry: (data) => api.post('/contact', data),
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
    return api.post('/services', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateService: (id, data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('image', file);
    return api.put(`/services/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteService: (id) => api.delete(`/services/${id}`),
  getPortfolio: () => api.get('/admin/portfolio'),
  createProject: (data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('cover_image', file);
    return api.post('/portfolio', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateProject: (id, data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('cover_image', file);
    return api.put(`/portfolio/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteProject: (id) => api.delete(`/portfolio/${id}`),
  addProjectImage: (id, data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) form.append(key, value);
    });
    if (file) form.append('image', file);
    return api.post(`/portfolio/${id}/images`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteProjectImage: (id, imageId) => api.delete(`/portfolio/${id}/images/${imageId}`),
  getTestimonials: () => api.get('/admin/testimonials'),
  createTestimonial: (data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('image', file);
    return api.post('/testimonials', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateTestimonial: (id, data, file) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    if (file) form.append('image', file);
    return api.put(`/testimonials/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),
  getPlans: () => api.get('/admin/plans'),
  createPlan: (data) => api.post('/plans', data),
  updatePlan: (id, data) => api.put(`/plans/${id}`, data),
  deletePlan: (id) => api.delete(`/plans/${id}`),
  getCommunity: (params) => api.get('/admin/community', { params }),
  updateCommunityStatus: (id, data) => api.put(`/community/${id}/status`, data),
  getRequests: (params) => api.get('/admin/requests', { params }),
  updateRequestStatus: (id, data) => api.put(`/requests/${id}/status`, data),
  getInquiries: (params) => api.get('/admin/inquiries', { params }),
  updateInquiryStatus: (id, data) => api.put(`/inquiries/${id}/status`, data),
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
  createSocialLink: (data) => api.post('/social-links', data),
  updateSocialLink: (id, data) => api.put(`/social-links/${id}`, data),
  deleteSocialLink: (id) => api.delete(`/social-links/${id}`),
  getActivities: () => api.get('/admin/activities'),
};

export { UPLOADS_URL };

/**
 * Builds a display URL for a stored asset reference.
 * The database stores public paths such as "/uploads/media/file.png", so the
 * prefix is only applied when it is missing (e.g. a separate CDN host) to
 * avoid producing "/uploads/uploads/...".
 */
export const assetUrl = (value) => {
  if (!value) return '';
  const path = String(value);
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;
  if (!UPLOADS_URL || path.startsWith(`${UPLOADS_URL}/`) || path === UPLOADS_URL) return path;
  return `${UPLOADS_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};
