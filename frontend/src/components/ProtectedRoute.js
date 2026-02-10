import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.is_staff) return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
