// Centralized API & App configuration
// Backend API: set VITE_API_URL to the full backend API root (including /api), e.g.
//   VITE_API_URL=https://your-backend.up.railway.app/api
// Frontend Public App (for generating shareable links): set VITE_PUBLIC_APP_URL to the deployed frontend origin, e.g.
//   VITE_PUBLIC_APP_URL=https://your-frontend.vercel.app
// If VITE_PUBLIC_APP_URL is not set we fallback to window.location.origin at runtime where needed.
const RAW = (import.meta.env.VITE_API_URL || '').trim();

// Normalize (remove trailing slash)
export const API_BASE_URL = RAW.replace(/\/$/, '');

// If API_BASE_URL ends with /api we keep it for endpoints, but derive an origin for static assets
export const API_ORIGIN = API_BASE_URL.replace(/\/api$/i, '');

// Optional explicit asset origin (use this if frontend & backend are on different domains)
export const ASSET_ORIGIN = (import.meta.env.VITE_ASSET_ORIGIN || '').trim() || API_ORIGIN;

// Optional explicit public app URL (used for user-facing share links like /ice/public/<code>)
export const PUBLIC_APP_URL = (import.meta.env.VITE_PUBLIC_APP_URL || '').trim().replace(/\/$/, '');

export function buildApiUrl(path) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
}

export function buildAssetUrl(path) {
  // Assets (like /uploads/...) should come from asset origin not /api
  if (!path) return '';
  const p = path.startsWith('/') ? path : '/' + path;
  return `${ASSET_ORIGIN}${p}`;
}

// Try multiple candidate URLs for an asset (first that succeeds wins)
export function candidateAssetUrls(filePath) {
  if (!filePath) return [];
  const p = filePath.startsWith('/') ? filePath : '/' + filePath;
  const candidates = [];
  // 1. Explicit asset origin
  if (ASSET_ORIGIN) candidates.push(`${ASSET_ORIGIN}${p}`);
  // 2. API origin (strip /api)
  if (API_ORIGIN && API_ORIGIN !== ASSET_ORIGIN) candidates.push(`${API_ORIGIN}${p}`);
  // 3. Raw API base (in case backend mounted /uploads under /api by mistake)
  if (API_BASE_URL && !/\/uploads\//.test(API_BASE_URL)) candidates.push(`${API_BASE_URL}${p}`);
  return [...new Set(candidates)];
}
