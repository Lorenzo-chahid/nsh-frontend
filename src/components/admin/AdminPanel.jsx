// src/components/admin/AdminPanel.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Typography, Toolbar } from '@mui/material';
import ChatButton from '../ChatButton';
import ChatWindow from '../ChatWindow';
import { useAuth } from '../../context/AuthContext'; // Utilisez le contexte d'authentification

const AdminPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const { token, user } = useAuth();

  // Définir les onglets disponibles avec leurs chemins correspondants
  const adminTabs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Utilisateurs', path: '/admin/users' },
    { label: 'Tables', path: '/admin/tables' },
    { label: 'Chat', path: '/admin/chat' }, // Nouveau onglet Chat
    // Ajoutez d'autres onglets ici si nécessaire
  ];

  // Déterminer l'onglet actif basé sur l'URL actuelle
  const currentTabIndex = adminTabs.findIndex(tab =>
    location.pathname.startsWith(tab.path)
  );

  const handleTabChange = (event, newValue) => {
    navigate(adminTabs[newValue].path);
  };

  useEffect(() => {
    // Capture la page actuelle pour le contexte des messages
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div">
            Panneau d'Administration
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs
        value={currentTabIndex !== -1 ? currentTabIndex : false}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Onglets Admin"
      >
        {adminTabs.map(tab => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>
      <Box sx={{ padding: 3 }}>
        <Outlet />
      </Box>

      {/* Bouton de Chat */}
      <ChatButton onClick={() => setChatOpen(true)} />

      {/* Fenêtre de Chat */}
      <ChatWindow
        open={chatOpen}
        handleClose={() => setChatOpen(false)}
        currentPage={currentPage}
      />
    </Box>
  );
};

export default AdminPanel;
