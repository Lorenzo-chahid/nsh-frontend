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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
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
  Menu as MenuIcon,
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserMenuOpen = event => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  ];

  const currentLanguage = languages.find(
    lang => lang.code === i18n.language
  ) || { label: 'English', flag: '🇬🇧' }; // Fallback pour éviter les erreurs

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        {user ? (
          <>
            <ListItem button onClick={handleCreateProject}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={t('navbar.createProject')} />
            </ListItem>
            <ListItem button onClick={handleViewCourses}>
              <ListItemIcon>
                <CourseIcon />
              </ListItemIcon>
              <ListItemText primary={t('navbar.courses')} />
            </ListItem>
            <ListItem button onClick={handleCalendarClick}>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText primary={t('navbar.calendar')} />
            </ListItem>
            <ListItem button onClick={handleNotificationsClick}>
              <ListItemIcon>
                <Badge
                  badgeContent={unreadCount > 9 ? '9+' : unreadCount}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={t('navbar.notifications')} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={handleLogin}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={t('navbar.login')} />
            </ListItem>
            <ListItem button onClick={handleSignUp}>
              <ListItemIcon>
                <SignUpIcon />
              </ListItemIcon>
              <ListItemText primary={t('navbar.signUp')} />
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      {user && (
        <List>
          <ListItem button onClick={handleProfileClick}>
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary={t('navbar.profile')} />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('navbar.logout')} />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#4a4e69', color: '#f2e9e4' }}
      >
        <Toolbar>
          {/* Bouton Hamburger pour Mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', sm: 'none' }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              cursor: 'pointer',
              color: '#f2e9e4',
              textAlign: { xs: 'center', sm: 'left' },
            }}
            onClick={() => navigate(user ? '/dashboard' : '/')}
          >
            Nanshe
          </Typography>

          {/* Menus pour Desktop */}
          <Box
            sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
          >
            {user ? (
              <>
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
                <Tooltip title="Menu utilisateur">
                  <IconButton color="inherit" onClick={handleUserMenuOpen}>
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
                </Tooltip>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem onClick={handleProfileClick}>
                    <ProfileIcon sx={{ mr: 1 }} /> {t('navbar.profile')}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} /> {t('navbar.logout')}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box>
                <IconButton color="inherit" onClick={handleLogin}>
                  <LoginIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleSignUp}>
                  <SignUpIcon />
                </IconButton>
              </Box>
            )}

            {/* Sélecteur de Langue */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Typography
                variant="body2"
                sx={{ color: '#f2e9e4', marginRight: 1 }}
              >
                {currentLanguage.flag} {currentLanguage.label}
              </Typography>
              <IconButton color="inherit" onClick={handleOpenLanguageMenu}>
                <LanguageIcon />
              </IconButton>
              <Menu
                anchorEl={languageMenuAnchor}
                open={Boolean(languageMenuAnchor)}
                onClose={handleCloseLanguageMenu}
              >
                {languages.map(lang => (
                  <MenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.flag} {lang.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer pour Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
