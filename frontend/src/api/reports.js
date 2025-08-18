import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const createAuthInstance = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });
};

export const uploadReport = async (file, { description = '', tags = [] } = {}) => {
  try {
    console.log('Uploading to API URL:', API_URL);
    const api = createAuthInstance();
    const form = new FormData();
    form.append('file', file);
    if (description) form.append('description', description);
    if (tags && tags.length) form.append('tags', tags.join(','));
    const res = await api.post('/reports', form, { 
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000 // 30 second timeout for large files
    });
    return res.data;
  } catch (error) {
    console.error('API Upload Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || 'Upload failed');
  }
};

export const listReports = async () => {
  const api = createAuthInstance();
  const res = await api.get('/reports');
  return res.data;
};

export const updateReport = async (id, data) => {
  const api = createAuthInstance();
  const res = await api.put(`/reports/${id}`, data);
  return res.data;
};

export const deleteReport = async (id) => {
  const api = createAuthInstance();
  const res = await api.delete(`/reports/${id}`);
  return res.data;
};
