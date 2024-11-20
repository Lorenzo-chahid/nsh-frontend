import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assurez-vous que le chemin est correct

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Utilisez `user` pour vérifier l'authentification

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
