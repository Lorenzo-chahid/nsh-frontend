// src/services/adminService.js

import axios from 'axios';

// Configuration de l'instance Axios avec la base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Remplacez par votre URL backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction de connexion admin
export const loginAdmin = async (username, password) => {
  try {
    const response = await api.post('/admin/login', {
      username,
      password,
    });
    // Stocker le token d'accès dans le localStorage ou un autre stockage sécurisé
    localStorage.setItem('admin_token', response.data.access_token);
    return true;
  } catch (error) {
    console.error('Admin login failed:', error);
    throw error;
  }
};

// Fonction pour récupérer tous les utilisateurs
export const fetchUsers = async () => {
  try {
    const response = await api.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async userId => {
  try {
    await api.delete(`/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    });
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Fonction pour récupérer toutes les tables
export const fetchAllTables = async () => {
  try {
    const response = await api.get('/admin/tables', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tables:', error);
    throw error;
  }
};
