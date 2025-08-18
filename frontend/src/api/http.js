// frontend/src/api/http.js
import axios from 'axios';
import { API_BASE_URL } from './config';

const http = axios.create({ baseURL: API_BASE_URL });

// Add timestamps to logs for debugging timing issues
const timestamp = () => new Date().toISOString().split('T')[1].split('.')[0];

// Attach token on every request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`[${timestamp()}] 🔒 Attaching token to request: ${config.method} ${config.url}`);
  } else {
    delete config.headers.Authorization;
    console.log(`[${timestamp()}] ⚠️ No token found for request: ${config.method} ${config.url}`);
  }
  return config;
});

// Handle auth failures globally
http.interceptors.response.use(
  (res) => {
    const fullUrl = `${API_BASE_URL}${res.config.url}`;
    console.log(`[${timestamp()}] ✅ API Success: ${res.config.method.toUpperCase()} ${fullUrl}`, res.status);
    return res;
  },
  (error) => {
    const status = error?.response?.status;
    const msg = error?.response?.data?.message;
    const fullUrl = error.config ? `${API_BASE_URL}${error.config.url}` : '(no config)';
    console.error(`[${timestamp()}] ❌ API Error: ${error.config?.method?.toUpperCase()} ${fullUrl}`, {
      status,
      message: msg,
      error
    });
    
    if (status === 401) {
      // Add detailed logging for 401 errors
      console.warn(`[${timestamp()}] 🔴 401 Unauthorized from ${error.config?.url}. Token exists: ${!!localStorage.getItem('token')}`);
      console.warn('Request details:', {
        headers: error.config?.headers,
        method: error.config?.method,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      });
      
      // Don't auto-redirect for login-related endpoints
      if (error.config?.url?.includes('/login') || error.config?.url?.includes('/register')) {
        return Promise.reject(error);
      }
      
      // Clear auth and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('isPremium');
      localStorage.removeItem('premiumPlan');
      localStorage.removeItem('userProfile');
      
      if (msg) console.warn(`[${timestamp()}] Auth error:`, msg);
      
      // Redirect only if not already on login
      if (!window.location.pathname.includes('/login')) {
        console.log(`[${timestamp()}] 🔄 Redirecting to login due to auth failure`);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default http;
