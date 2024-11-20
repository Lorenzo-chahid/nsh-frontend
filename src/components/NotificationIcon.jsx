import React, { useEffect, useState } from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { getNotifications } from '../services/NotificationService';

const NotificationIcon = ({ onNotificationsRead }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      const unread = response.filter(
        notification => !notification.is_read
      ).length;
      setUnreadCount(unread);
      if (onNotificationsRead) {
        onNotificationsRead(unread); // Mettre à jour l'état global ou un parent
      }
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <IconButton
      color="inherit"
      onClick={() => {
        navigate('/notifications');
        setUnreadCount(0); // Réinitialise immédiatement après clic
        if (onNotificationsRead) {
          onNotificationsRead(0);
        }
      }}
    >
      <Badge badgeContent={unreadCount} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default NotificationIcon;
