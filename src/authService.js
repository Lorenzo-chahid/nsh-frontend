// src/authService.js

import axios from 'axios';

// Crée une instance Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Remplacez par l'URL de votre backend
  // Ne définissez pas 'Content-Type' ici, laissez Axios le gérer automatiquement
});

const TOKEN_STORAGE_KEY = 'access_token';
const REFRESH_STORAGE_KEY = 'refresh_token';

// Fonctions utilitaires pour la gestion des tokens
const getTokenStorage = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
    ? localStorage
    : sessionStorage;
};

const setTokens = (accessToken, refreshToken, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(TOKEN_STORAGE_KEY, accessToken);
  storage.setItem(REFRESH_STORAGE_KEY, refreshToken);
};

const getAccessToken = () => {
  const storage = getTokenStorage();
  return storage.getItem(TOKEN_STORAGE_KEY);
};

const getRefreshToken = () => {
  const storage = getTokenStorage();
  return storage.getItem(REFRESH_STORAGE_KEY);
};

// Fonction pour se connecter et récupérer le token JWT
export const loginUser = async (identifier, password, rememberMe = false) => {
  try {
    const payload = {
      identifier,
      password,
    };
    console.log('Payload envoyé au backend:', payload); // Log du payload

    const response = await api.post('/login', payload);

    const { access_token, refresh_token, user } = response.data;

    // Sauvegarder les tokens dans le stockage approprié
    setTokens(access_token, refresh_token, rememberMe);

    console.log('Tokens stockés:', { access_token, refresh_token });
    return { access_token, refresh_token, user };
  } catch (error) {
    console.error(
      'Erreur lors de la connexion :',
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fonction pour vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  const token = getAccessToken();
  if (!token) {
    return false;
  }

  const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload du token
  const isExpired = payload.exp < Date.now() / 1000;

  if (isExpired) {
    logoutUser(); // Supprime le token expiré
    return false;
  }

  return true;
};

// Fonction pour déconnecter l'utilisateur
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(REFRESH_STORAGE_KEY);
  console.log('User logged out');
};

// Fonction pour gérer l'inscription utilisateur
export const signupUser = async (userData, rememberMe = false) => {
  try {
    const response = await api.post('/signup', userData);
    const { access_token, refresh_token, user } = response.data;

    // Stocker les tokens
    setTokens(access_token, refresh_token, rememberMe);

    console.log('Inscription réussie:', { access_token, refresh_token });

    return { access_token, refresh_token, user };
  } catch (error) {
    console.error(
      'Erreur lors de l’inscription:',
      error.response?.data || error.message
    );
    throw new Error('Échec de l’inscription.');
  }
};

// Fonction pour rafraîchir le token d'accès
export const refreshAccessToken = async () => {
  const refresh_token = getRefreshToken();
  if (!refresh_token) {
    throw new Error('Aucun token de rafraîchissement disponible.');
  }

  try {
    const response = await api.post('/refresh-token', { refresh_token });
    const { access_token } = response.data;

    // Remplace le token d'accès dans le bon stockage
    const storage = getTokenStorage();
    storage.setItem(TOKEN_STORAGE_KEY, access_token);

    console.log("Token d'accès rafraîchi:", access_token);
    return access_token;
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error.message);
    logoutUser(); // Déconnecter si le rafraîchissement échoue
    throw error;
  }
};

// Intercepteur pour renouveler les tokens expirés automatiquement
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          'Échec du rafraîchissement du token:',
          refreshError.message
        );
        logoutUser(); // Déconnecter si le rafraîchissement échoue
        window.location.href = '/login'; // Rediriger vers la page de connexion
      }
    }

    return Promise.reject(error);
  }
);

// Fonction pour récupérer l'en-tête d'autorisation
export const authHeader = () => {
  const token = getAccessToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    console.error('Aucun token trouvé');
    return {};
  }
};

// Fonction pour récupérer un projet par ID avec autorisation
export const fetchProjectById = async projectId => {
  try {
    const response = await api.get(`/projects/${projectId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      await refreshAccessToken();
      return await fetchProjectById(projectId); // Réessayez avec le nouveau token
    } else {
      throw error;
    }
  }
};

// Fonction pour récupérer la liste des utilisateurs
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users', { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des utilisateurs:',
      error.message
    );
    throw error;
  }
};

// Fonction pour récupérer les événements
export const fetchEvents = async () => {
  try {
    const response = await api.get('/events', { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des événements:',
      error.message
    );
    throw error;
  }
};

// Fonction pour créer un événement
export const createEvent = async eventData => {
  try {
    const response = await api.post('/events', eventData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'événement:", error.message);
    throw error;
  }
};

// Fonction pour supprimer un projet utilisateur
export const deleteUserProject = async projectId => {
  try {
    const response = await api.delete(`/projects/${projectId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error('Échec de la suppression du projet');
  }
};

// Fonction pour connecter un administrateur
export const loginAdmin = async (username, password) => {
  try {
    const response = await api.post('/login', {
      identifier: username,
      password,
    });
    const { access_token, user } = response.data;
    localStorage.setItem('admin_token', access_token);
    return { access_token, user };
  } catch (error) {
    console.error('Échec de la connexion administrateur:', error);
    throw new Error('Échec de la connexion');
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (userId, data) => {
  try {
    const response = await api.put(`/users/${userId}`, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error('Échec de la mise à jour de l’utilisateur');
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async userId => {
  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error('Échec de la suppression de l’utilisateur');
  }
};

// Fonction pour récupérer les projets de l'utilisateur
export const fetchUserProjects = async () => {
  try {
    const response = await api.get('/projects/', { headers: authHeader() });
    console.log('Projets de l’utilisateur:', response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Token expiré, essayez de le rafraîchir
      await refreshAccessToken();
      return await fetchUserProjects();
    } else {
      throw error;
    }
  }
};

// Fonction pour récupérer un événement par ID avec autorisation
export const fetchEventById = async eventId => {
  try {
    const response = await api.get(`/calendar/events/${eventId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await refreshAccessToken();
      return await fetchEventById(eventId);
    } else {
      throw error;
    }
  }
};

// Fonction pour mettre à jour un événement
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await api.put(`/events/${eventId}`, eventData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'événement:",
      error.message
    );
    throw error;
  }
};

// Fonction pour notifier les participants (à implémenter selon votre backend)
export const notifyParticipants = async (participantIds, message) => {
  try {
    await api.post(
      '/notifications',
      {
        participants: participantIds,
        message,
      },
      { headers: authHeader() }
    );
    console.log('Participants notifiés:', participantIds);
  } catch (error) {
    console.error(
      'Erreur lors de la notification des participants:',
      error.message
    );
    // Vous pouvez choisir de ne pas lancer une erreur ici si la notification échoue
  }
};

export { api };

// Ajoutez cette fonction pour récupérer les données utilisateur
export const getUserData = async () => {
  try {
    const response = await api.get('/users/me', { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des données utilisateur:',
      error
    );
    throw error;
  }
};
