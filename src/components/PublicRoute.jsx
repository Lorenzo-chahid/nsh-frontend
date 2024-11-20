// src/components/PublicRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>; // Afficher un indicateur de chargement
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
