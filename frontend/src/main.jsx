// src/main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { RouterProvider } from 'react-router';

import Root from './Root.jsx';
import Home from './pages/home.jsx';
import PremiumHome from './pages/PremiumHome.jsx';
import MapView from './pages/map.jsx';
import PMap from './pages/pmap.jsx';
import AboutUs from './pages/AboutUs.jsx';
import EmergencyContacts from './pages/EmergnencyContacts.jsx';
import Login from './pages/login.jsx';
import Registration from './pages/registration.jsx';
import UploadReport from './pages/Upload.jsx';
import Alert from './pages/alert.jsx';
import ContactUs from './pages/contact.jsx';
import PremiumDashboard from './pages/Prohome.jsx';
import IceCard from './pages/IceCard.jsx';
import IcePublic from './pages/IcePublic.jsx';
import IceApprove from './pages/IceApprove.jsx';
import Profile from './pages/profile.jsx';
import Notifications from './pages/Notifications.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import { AuthProvider } from './context/AuthContext';
import { EmergencyDataProvider } from './context/EmergencyDataContext.jsx';
import AuthGuard from './components/AuthGuard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<Home />} />
      <Route path="premium" element={<PremiumHome />} />
      <Route path="pro" element={<AuthGuard><PremiumDashboard /></AuthGuard>} />
      <Route path="emergency-patient" element={<AuthGuard><EmergencyContacts /></AuthGuard>} />
      <Route path="ice-card" element={<AuthGuard><IceCard /></AuthGuard>} />
      <Route path="ice/public/:code" element={<IcePublic />} />
      <Route path="approve-access/:token" element={<IceApprove />} />
      <Route path="map" element={<AuthGuard><MapView /></AuthGuard>} />
      <Route path="pmap" element={<AuthGuard><PMap /></AuthGuard>} />
      <Route path="upload-report" element={<AuthGuard><UploadReport /></AuthGuard>} /> 
      <Route path="alert" element={<AuthGuard><Alert /></AuthGuard>} />
      <Route path="about" element={<AboutUs />} />
      <Route path="register" element={<Registration />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<AuthGuard><Profile /></AuthGuard>} />
      <Route path="notifications" element={<AuthGuard><Notifications /></AuthGuard>} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <EmergencyDataProvider>
      <RouterProvider router={router} />
    </EmergencyDataProvider>
  </AuthProvider>
);