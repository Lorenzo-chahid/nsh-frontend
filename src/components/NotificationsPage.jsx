// src/components/NotificationsPage.jsx
import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import {
  getNotifications,
  respondToEvent,
} from '../services/NotificationService';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response);
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
    }
  };

  const handleResponse = async (notificationId, response) => {
    try {
      await respondToEvent(notificationId, response);
      setNotifications(notifications.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Erreur lors de la réponse à une invitation:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Mes Notifications
      </Typography>
      {notifications.length === 0 ? (
        <Typography variant="body1">
          Vous n'avez aucune notification.
        </Typography>
      ) : (
        <List>
          {notifications.map(notification => (
            <React.Fragment key={notification.id}>
              <ListItem>
                <ListItemText primary={notification.message} />
                {notification.target_type === 'event_invite' && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleResponse(notification.id, 'accept')}
                      style={{ marginRight: '10px' }}
                    >
                      Accepter
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleResponse(notification.id, 'decline')}
                    >
                      Refuser
                    </Button>
                  </>
                )}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </div>
  );
};

export default NotificationsPage;
