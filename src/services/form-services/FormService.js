import axios from 'axios';

const API_BASE_URL = 'https://nsh.onrender.com/api/v1'; // Base URL pour les appels API

const FormService = {
  // Appel API pour le formulaire de perte de poids
  submitWeightLossForm: data => {
    console.log('step 1');
    return axios.post(`${API_BASE_URL}/health/weight-loss`, data);
  },

  // Appel API pour le formulaire de gestion du stress
  submitStressManagementForm: data => {
    return axios.post(`${API_BASE_URL}/health/stress-management`, data);
  },

  // Appel API pour le formulaire d'acquisition de compétences
  submitSkillAcquisitionForm: data => {
    return axios.post(`${API_BASE_URL}/education/skill-acquisition`, data);
  },

  // Appel API pour le formulaire d'apprentissage des langues
  submitLanguageLearningForm: data => {
    return axios.post(`${API_BASE_URL}/education/language-learning`, data);
  },

  // Appel API pour le formulaire de résilience émotionnelle
  submitEmotionalResilienceForm: data => {
    return axios.post(`${API_BASE_URL}/personal/emotional-resilience`, data);
  },

  // Appel API pour le formulaire de compétences sociales
  submitSocialSkillsForm: data => {
    return axios.post(`${API_BASE_URL}/personal/social-skills`, data);
  },

  // Appel API pour le formulaire de gestion de projets
  submitProjectManagementForm: data => {
    return axios.post(`${API_BASE_URL}/productivity/project-management`, data);
  },

  // Appel API pour le formulaire de gestion des tâches
  submitTaskManagementForm: data => {
    return axios.post(`${API_BASE_URL}/productivity/task-management`, data);
  },

  // Appel API pour le formulaire de budget
  submitBudgetForm: data => {
    return axios.post(`${API_BASE_URL}/finance/budget`, data);
  },

  // Appel API pour le formulaire business
  submitBusinessForm: data => {
    return axios.post(`${API_BASE_URL}/finance/business`, data);
  },

  // Autres formulaires pour le secteur "santé"
  submitHealthForm: (formType, data) => {
    return axios.post(`${API_BASE_URL}/health/${formType}`, data);
  },

  // Autres formulaires pour le secteur "éducation"
  submitEducationForm: (formType, data) => {
    return axios.post(`${API_BASE_URL}/education/${formType}`, data);
  },

  // Appel API pour tous les formulaires d'un type donné
  submitGenericForm: (category, subCategory, data) => {
    return axios.post(`${API_BASE_URL}/${category}/${subCategory}`, data);
  },
};

export default FormService;
