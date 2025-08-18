import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component to protect routes that require authentication
export const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check both context and localStorage to be sure
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!isAuthenticated && !token) {
      console.log('Access denied: Not authenticated, redirecting to login');
      navigate('/login');
    } else if (!userId) {
      console.log('Access denied: No user ID found, redirecting to login');
      navigate('/login');
    } else {
      console.log('Access granted: User is authenticated');
    }
  }, [isAuthenticated, navigate]);

  // Return children only if authenticated
  return isAuthenticated || localStorage.getItem('token') ? children : null;
};

export default AuthGuard;
