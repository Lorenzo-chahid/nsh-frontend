// src/services/CalendarService.js

import axios from 'axios';
import { authHeader } from '../authService';

const API_URL = 'https://nsh-frontend.onrender.com/api/v1/calendar';

// Fonction pour récupérer tous les événements
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to load events:', error);
    throw error;
  }
};

// Fonction pour créer un nouvel événement
export const createEvent = async newEvent => {
  try {
    const response = await axios.post(`${API_URL}/events`, newEvent, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create event:', error);
    throw error;
  }
};

// Fonction pour mettre à jour un événement
export const updateEvent = async (eventId, updatedEvent) => {
  try {
    const response = await axios.put(
      `${API_URL}/events/${eventId}`,
      updatedEvent,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update event:', error);
    throw error;
  }
};

// Fonction pour supprimer un événement
export const deleteEvent = async eventId => {
  try {
    const response = await axios.delete(`${API_URL}/events/${eventId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete event:', error);
    throw error;
  }
};
