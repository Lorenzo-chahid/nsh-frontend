import { api, authHeader } from '../authService';

export const getNotifications = async () => {
  try {
    const response = await api.get('/notifications/', {
      headers: authHeader(),
    });
    console.log('Notifications fetched:', response.data); // Log les notifications
    return response.data; // Assurez-vous que les types sont des chaînes
  } catch (error) {
    console.error(
      'Erreur lors du chargement des notifications :',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const respondToEvent = async (notificationId, response) => {
  try {
    const url = `/notifications/${notificationId}/respond`;
    const params = { response };
    const config = { headers: authHeader() };
    await api.post(url, params, config);
  } catch (error) {
    console.error('Erreur lors de la réponse à une invitation :', error);
    throw error;
  }
};

export const markNotificationAsRead = async notificationId => {
  try {
    await api.put(
      `/notifications/${notificationId}/read`,
      {},
      { headers: authHeader() }
    );
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    await api.put(
      '/notifications/mark-all-read',
      {},
      { headers: authHeader() }
    );
  } catch (error) {
    console.error(
      'Erreur lors de la mise à jour de toutes les notifications :',
      error.response?.data || error.message
    );
    throw error;
  }
};
