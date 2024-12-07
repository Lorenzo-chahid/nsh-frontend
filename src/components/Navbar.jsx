// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Badge,
  Menu,
  MenuItem,
  Avatar,
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
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getNotifications } from '../services/NotificationService';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);

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

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

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

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setLanguageMenuAnchor(null);
  };

  const handleOpenLanguageMenu = event => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setLanguageMenuAnchor(null);
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  ];

  const currentLanguage = languages.find(
    lang => lang.code === i18n.language
  ) || { label: 'English', flag: '🇬🇧' }; // Fallback pour éviter les erreurs

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#4a4e69', color: '#f2e9e4' }}
    >
      <Toolbar>
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
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleCreateProject}
              sx={{ borderColor: '#f2e9e4', color: '#f2e9e4', mr: 2 }}
            >
              {t('navbar.createProject')}
            </Button>
            <Button
              variant="outlined"
              startIcon={<CourseIcon />}
              onClick={handleViewCourses}
              sx={{ borderColor: '#f2e9e4', color: '#f2e9e4', mr: 2 }}
            >
              {t('navbar.courses')}
            </Button>
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
              {t('navbar.calendar')}
            </Button>
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              sx={{ color: '#f2e9e4', mr: 2 }}
            >
              <Badge
                badgeContent={unreadCount > 9 ? '9+' : unreadCount}
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleProfileClick}>
              {user.profile_picture ? (
                <Avatar
                  src={user.profile_picture}
                  alt={`${user.username}'s profile`}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <ProfileIcon />
              )}
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{ color: '#f2e9e4', ml: 2 }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Typography variant="body2" sx={{ color: '#f2e9e4', marginRight: 1 }}>
            {currentLanguage.flag} {currentLanguage.label}
          </Typography>
          <IconButton color="inherit" onClick={handleOpenLanguageMenu}>
            <LanguageIcon />
          </IconButton>
        </Box>
        <Menu
          anchorEl={languageMenuAnchor}
          open={Boolean(languageMenuAnchor)}
          onClose={handleCloseLanguageMenu}
        >
          {languages.map(lang => (
            <MenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
              {lang.flag} {lang.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
