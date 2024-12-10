// src/api.js
import axios from 'axios';

// Détecte l'environnement et configure l'URL de base
const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction
  ? 'https://nsh-frontend.onrender.com/api/v1'
  : 'http://localhost:8000/api/v1';

// Crée une instance Axios avec configuration de base
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs et rafraîchir le token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${baseURL}/refresh-token`, {
          refresh_token: refreshToken,
        });
        const newAccessToken = response.data.access_token;
        localStorage.setItem('access_token', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Relance la requête originale
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Fonction pour analyser la demande de l'utilisateur et retourner la catégorie correspondante
export const analyzeRequest = async userInput => {
  try {
    // Envoi de la requête à l'API pour analyser l'input utilisateur
    console.log('TEST 1');
    const response = await axios.post(`${baseURL}/analyze/`, {
      input: userInput, // Ce que l'utilisateur a saisi
    });

    // Si l'API retourne une réponse correcte
    return response.data; // Récupération des données (par exemple, la catégorie suggérée)
  } catch (error) {
    console.error("Erreur lors de l'analyse de la demande:", error);
    throw new Error("Échec de l'analyse de la demande");
  }
};

export default api;
