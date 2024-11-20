import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Créer l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour gérer l'erreur 401 et rafraîchir le token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(
          'http://localhost:8000/api/v1/refresh-token',
          {
            refresh_token: refreshToken,
          }
        );
        const newAccessToken = response.data.access_token;
        localStorage.setItem('access_token', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest); // Relance la requête originale avec le nouveau token
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Ici, nous devrions gérer la redirection, mais ne pas utiliser useNavigate
        // Il faudra le gérer dans le composant
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const API_URL = 'http://localhost:8000/api/v1'; // Assure-toi de configurer l'URL de l'API correctement

// Fonction pour analyser la demande de l'utilisateur et retourner la catégorie correspondante
export const analyzeRequest = async userInput => {
  try {
    // Envoi de la requête à l'API pour analyser l'input utilisateur
    console.log('TEST 1');
    const response = await axios.post(`${API_URL}/analyze/`, {
      input: userInput, // Ce que l'utilisateur a saisi
    });

    // Si l'API retourne une réponse correcte
    return response.data; // Récupération des données (par exemple, la catégorie suggérée)
  } catch (error) {
    console.error("Erreur lors de l'analyse de la demande:", error);
    throw new Error("Échec de l'analyse de la demande");
  }
};

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets :', error);
    throw error;
  }
};

// Récupérer un projet spécifique par ID
export const getProjectById = async projectId => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du projet :', error);
    throw error;
  }
};

// Mettre à jour un projet
export const updateProject = async (projectId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/projects/${projectId}/`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet :', error);
    throw error;
  }
};

// Supprimer un projet
export const deleteProject = async projectId => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${projectId}/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du projet :', error);
    throw error;
  }
};

export const createProject = async (name, description, duration, category) => {
  try {
    const response = await axios.post(`${API_URL}/projects/create/`, {
      name,
      description,
      duration,
      category,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du projet :', error);
    throw error; // Propager l'erreur pour être gérée dans le composant
  }
};

export default api;
