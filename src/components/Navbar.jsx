import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Badge,
} from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
  Add as AddIcon,
  Book as CourseIcon,
  AccountCircle as ProfileIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getNotifications } from '../services/NotificationService';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const loadEvents = async () => {
    try {
      // Appelez votre service pour charger les événements ici
      console.log('Loading events...'); // Remplacez par votre service
    } catch (error) {
      console.error('Erreur lors du rechargement des événements :', error);
    }
  };

  const handleNotificationsClick = () => {
    loadEvents(); // Recharge les événements quand les notifications sont cliquées
    navigate('/notifications'); // Navigue vers la page des notifications
  };

  // Charger les notifications non lues
  useEffect(() => {
    const loadNotifications = async () => {
      if (user) {
        try {
          const notifications = await getNotifications();
          const unread = notifications.filter(n => !n.is_read).length;
          setUnreadCount(unread);
        } catch (error) {
          console.error('Erreur lors du chargement des notifications:', error);
        }
      }
    };

    loadNotifications();
  }, [user]);

  const handleLogin = () => navigate('/login');
  const handleSignUp = () => navigate('/signup');
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleCreateProject = () => navigate('/projects/create');
  const handleViewCourses = () => navigate('/courses');
  const handleProfileClick = () => navigate('/profile');
  const handleCalendarClick = () => navigate('/calendar');

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#4a4e69', color: '#f2e9e4' }}
    >
      <Toolbar>
        {/* Logo / Titre de l'application */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#f2e9e4',
          }}
          onClick={() => navigate(user ? '/dashboard' : '/')}
        >
          Nanshe
        </Typography>

        {/* Actions utilisateur */}
        {!user ? (
          <Box>
            <IconButton color="inherit" onClick={handleLogin}>
              <LoginIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleSignUp}>
              <SignUpIcon />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Gestion des projets */}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleCreateProject}
              sx={{ borderColor: '#f2e9e4', color: '#f2e9e4', mr: 2 }}
            >
              Créer un projet
            </Button>

            {/* Gestion des cours */}
            <Button
              variant="outlined"
              startIcon={<CourseIcon />}
              onClick={handleViewCourses}
              sx={{ borderColor: '#f2e9e4', color: '#f2e9e4', mr: 2 }}
            >
              Cours/Leçons
            </Button>

            {/* Calendrier */}
            <Button
              variant="outlined"
              startIcon={<CalendarIcon />}
              onClick={handleCalendarClick}
              sx={{
                borderColor: '#f2e9e4',
                color: '#f2e9e4',
                mr: 2,
                '&:hover': {
                  backgroundColor: '#9a8c98',
                  borderColor: '#f2e9e4',
                },
              }}
            >
              Calendrier
            </Button>

            {/* Notifications */}
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              sx={{ color: '#f2e9e4', mr: 2 }}
            >
              <Badge
                badgeContent={unreadCount > 9 ? '9+' : unreadCount}
                color="error"
              >
                <NotificationsIcon refreshCalendar={loadEvents} />
              </Badge>
            </IconButton>

            {/* Profil */}
            <IconButton color="inherit" onClick={handleProfileClick}>
              <ProfileIcon />
            </IconButton>

            {/* Déconnexion */}
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{ color: '#f2e9e4', ml: 2 }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
