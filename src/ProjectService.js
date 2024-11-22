import axios from 'axios';
import { authHeader } from './authService';

const api = axios.create({
  baseURL: 'https://nsh.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
export const getUserProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error.response || error.message);
    throw new Error(
      error.response?.data?.detail || 'Failed to fetch user projects'
    );
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
