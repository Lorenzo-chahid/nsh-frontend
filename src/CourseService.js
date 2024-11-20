// src/CourseService.js

import axios from 'axios';
import { authHeader, api } from './authService';

// Fonction pour récupérer la liste des cours de l'utilisateur
export const fetchUserCourses = async () => {
  try {
    const response = await api.get('/courses/user', {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user courses:', error);
    throw error;
  }
};

// Fonction pour récupérer un cours par son ID
export const getCourseById = async courseId => {
  try {
    const response = await api.get(`/courses/${courseId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch course:', error);
    throw error;
  }
};

// Fonction pour créer un nouveau cours
export const createCourse = async courseData => {
  try {
    const response = await api.post('/courses', courseData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create course:', error);
    throw error;
  }
};

// Fonction pour mettre à jour un cours
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await api.put(`/courses/${courseId}`, courseData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update course:', error);
    throw error;
  }
};

// Fonction pour supprimer un cours
export const deleteCourse = async courseId => {
  try {
    const response = await api.delete(`/courses/${courseId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete course:', error);
    throw error;
  }
};
