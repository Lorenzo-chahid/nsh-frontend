import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatWithIA = async (userId, userInput) => {
  try {
    const response = await api.post('/chatbot/chat/', {
      user_id: 1, // Doit correspondre au schéma du backend
      user_input: userInput, // Doit correspondre au schéma du backend
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la communication avec l'IA :",
      userId,
      userInput,
      error
    );
    throw error;
  }
};
