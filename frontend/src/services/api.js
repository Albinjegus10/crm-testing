import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (credentials) => api.post('/login/', credentials),
  signup: (data) => axios.post(`${API_URL}/signup/`, data),
  forgotPassword: (data) => axios.post(`${API_URL}/forgot-password/`, data),
};

export const leads = {
  submit: (data) => axios.post(`${API_URL}/submit-lead/`, data),
  getAll: (params) => api.get('/leads/', { params }),
  update: (id, data) => api.patch(`/leads/${id}/`, data),
};

export const clients = {
  getAll: (params) => api.get('/clients/', { params }),
  create: (data) => api.post('/clients/', data),
  update: (id, data) => api.patch(`/clients/${id}/`, data),
  delete: (id) => api.delete(`/clients/${id}/`),
  importExcel: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/clients/import_excel/', formData);
  },
  exportExcel: () => api.get('/clients/export_excel/', { responseType: 'blob' }),
};

export const attendance = {
  getAll: (params) => api.get('/attendance/', { params }),
  checkIn: () => api.post('/attendance/check_in/'),
  checkOut: () => api.post('/attendance/check_out/'),
  exportReport: (params) => api.get('/attendance/export_report/', { params, responseType: 'blob' }),
};

export const notifications = {
  getAll: () => api.get('/notifications/'),
};

export const tasks = {
  getAll: (params) => api.get('/tasks/', { params }),
  create: (data) => api.post('/tasks/', data),
  update: (id, data) => api.patch(`/tasks/${id}/`, data),
  delete: (id) => api.delete(`/tasks/${id}/`),
  startTask: (id) => api.post(`/tasks/${id}/start_task/`),
  completeTask: (id, data) => api.post(`/tasks/${id}/complete_task/`, data),
};

export const users = {
  getStaff: () => api.get('/staff-users/'),
};

export default api;
