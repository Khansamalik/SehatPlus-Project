import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component to protect routes that require authentication
export const AuthGuard = ({ children }) => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      // Check both context and localStorage to be sure
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const userStr = localStorage.getItem('user');
      
      if (!isAuthenticated) {
        if (token && userId && userStr) {
          // We have local storage data but context doesn't show authenticated
          // This can happen on page refresh - restore the auth state
          try {
            const user = JSON.parse(userStr);
            console.log('Restoring auth from localStorage', { userId, hasToken: !!token });
            login(user, token); // Restore auth context from localStorage
            setIsChecking(false);
          } catch (e) {
            console.error('Failed to parse user from localStorage', e);
            navigateToLogin();
          }
        } else {
          navigateToLogin();
        }
      } else {
        // Already authenticated in context
        setIsChecking(false);
      }
    };
    
    const navigateToLogin = () => {
      console.log('Access denied: Not authenticated, redirecting to login');
      setIsChecking(false);
      navigate('/login');
    };
    
    checkAuth();
  }, [isAuthenticated, navigate, login]);

  // Show nothing while checking authentication
  if (isChecking) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#6C0B14]"></div>
    </div>;
  }

  // Return children only if authenticated
  return isAuthenticated ? children : null;
};

export default AuthGuard;
