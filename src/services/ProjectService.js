import axios from 'axios';
import { authHeader } from '../authService';

const API_URL = 'https://nsh-frontend.onrender.com/api/v1';
const api = axios.create({
  baseURL: 'https://nsh-frontend.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const TOKEN_STORAGE_KEY = 'access_token';

export const getAccessToken = () => {
  return (
    sessionStorage.getItem(TOKEN_STORAGE_KEY) ||
    localStorage.getItem(TOKEN_STORAGE_KEY)
  );
};

// Intercepteur pour ajouter l'en-tête d'authentification avant chaque requête
api.interceptors.request.use(
  config => {
    config.headers = {
      ...config.headers,
      ...authHeader(), // Ajouter dynamiquement l'en-tête d'authentification
    };
    return config;
  },
  error => Promise.reject(error)
);

// Fonction pour créer un nouveau projet
export const createProject = async (name, description, duration) => {
  try {
    const response = await api.post('/projects', {
      name,
      description,
      duration: parseInt(duration), // S'assurer que la durée est un entier
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error.response || error.message);
    throw new Error(error.response?.data?.detail || 'Failed to create project');
  }
};

// Fonction pour récupérer les projets de l'utilisateur
// Fonction pour récupérer les projets de l'utilisateur
export const getUserProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    throw error;
  }
};

// Récupérer les subgoals d'un projet
export const getProjectSubGoals = async projectId => {
  try {
    const response = await api.get(`/projects/subgoals/${projectId}`);
    return response.data.sub_goals;
  } catch (error) {
    console.error('Error fetching sub-goals:', error);
    throw error;
  }
};

// Récupérer un subgoal spécifique par ID
export const getSubGoalById = async subGoalId => {
  try {
    const response = await api.get(`/projects/subgoal/${subGoalId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sub-goal:', error);
    throw error;
  }
};

export const getCourseById = async courseId => {
  try {
    const response = await axios.get(
      `/api/v1/projects/subgoal/${courseId}/course`
    ); // API pour récupérer le cours
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

// Récupérer un cours spécifique par ID de sub-goal
export const getCourseBySubGoalId = async subGoalId => {
  try {
    const response = await api.get(`/projects/subgoal/1/course`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

// Fonction pour compléter un subgoal
export const completeSubGoal = async (projectId, subGoalId) => {
  try {
    const response = await api.post(
      `/projects/${projectId}/sub_goals/${subGoalId}/complete`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error completing sub-goal:',
      error.response || error.message
    );
    throw new Error(
      error.response?.data?.detail || 'Failed to complete sub-goal'
    );
  }
};

export const getUserCourses = async () => {
  try {
    const response = await axios.get('/api/v1/courses/user'); // Remplacez l'URL par celle qui récupère les cours de l'utilisateur
    return response.data;
  } catch (error) {
    console.error('Error fetching user courses:', error);
    throw error;
  }
};
// Remplacez par l'URL de votre API

// Fonction pour récupérer les projets publics
export const fetchPublicProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects/public`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets publics:', error);
    throw error;
  }
};

export const fetchProjectById = async projectId => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('PIKACHUUU :: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    throw error;
  }
};

// Autres fonctions liées aux projets...

export const subscribeToProject = async projectId => {
  try {
    const response = await axios.post(
      `${API_URL}/projects/${projectId}/subscribe`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription au projet:", error);
    throw error;
  }
};

export const unsubscribeFromProject = async projectId => {
  try {
    const response = await axios.delete(
      `${API_URL}/projects/${projectId}/unsubscribe`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la désinscription au projet:', error);
    throw error;
  }
};
