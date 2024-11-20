import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const MainContainer = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Capture la page actuelle pour le contexte des messages
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Navbar toujours visible */}
      <Navbar />

      {/* Contenu principal */}
      <Box component="main" sx={{ flex: 1, padding: 2 }}>
        {children}
      </Box>

      {/* Footer */}
      <Footer />

      {/* Bouton de Chat */}
      <ChatButton onClick={() => setChatOpen(true)} />

      {/* Fenêtre de Chat */}
      {chatOpen && (
        <ChatWindow
          open={chatOpen}
          handleClose={() => setChatOpen(false)}
          currentPage={currentPage}
        />
      )}
    </Box>
  );
};

export default MainContainer;
