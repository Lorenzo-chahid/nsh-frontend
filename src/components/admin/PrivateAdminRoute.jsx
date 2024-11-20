// src/components/admin/PrivateAdminRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem('admin_token');
  return adminToken ? children : <Navigate to="/admin/login" />;
};

export default PrivateAdminRoute;
