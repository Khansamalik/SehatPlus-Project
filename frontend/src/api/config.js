// Centralized API configuration
// RAW value can be either https://domain (no /api) or https://domain/api
const RAW = (import.meta.env.VITE_API_URL || '').trim();

// Normalize (remove trailing slash)
export const API_BASE_URL = RAW.replace(/\/$/, '');

// If API_BASE_URL ends with /api we keep it for endpoints, but derive an origin for static assets
export const API_ORIGIN = API_BASE_URL.replace(/\/api$/i, '');

export function buildApiUrl(path) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
}

export function buildAssetUrl(path) {
  // Assets (like /uploads/...) should come from origin not /api
  return `${API_ORIGIN}${path.startsWith('/') ? path : '/' + path}`;
}
