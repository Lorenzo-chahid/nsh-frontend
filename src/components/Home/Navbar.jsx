// src/components/Navbar.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateProject = () => {
    navigate('/projects/create');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nanshe
        </Typography>

        {/* Affichage dynamique en fonction de l'état d'authentification */}
        {!user ? (
          <>
            <IconButton color="inherit" onClick={handleLogin}>
              <LoginIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleSignUp}>
              <SignUpIcon />
            </IconButton>
          </>
        ) : (
          <>
            {/* Bouton pour créer un projet */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateProject}
              sx={{ mr: 2 }}
            >
              Créer un projet
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
