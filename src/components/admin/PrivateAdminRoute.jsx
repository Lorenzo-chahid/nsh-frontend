import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem('admin_token');
  console.log('Admin token:', adminToken); // Débogage
  return adminToken ? children : <Navigate to="/admin/login" />;
};

export default PrivateAdminRoute;
