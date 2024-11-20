// src/components/Login.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Snackbar,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState(''); // Email ou username
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    // Préparation du payload à envoyer (sans rememberMe)
    const payload = {
      identifier,
      password,
    };

    console.log('Payload envoyé au backend:', payload); // Affiche le payload dans la console

    try {
      await login(identifier, password, rememberMe);
      console.log('Login successful');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Erreur de connexion, veuillez réessayer.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Champ pour email ou username */}
          <TextField
            label="Email ou Nom d'utilisateur"
            fullWidth
            margin="normal"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#5D4B9A',
                },
                '&:hover fieldset': {
                  borderColor: '#3F51B5',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3F51B5',
                },
              },
            }}
          />

          {/* Champ pour le mot de passe */}
          <TextField
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#5D4B9A',
                },
                '&:hover fieldset': {
                  borderColor: '#3F51B5',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3F51B5',
                },
              },
            }}
          />

          {/* Checkbox pour rester connecté */}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
            }
            label="Rester connecté"
          />

          {/* Bouton de connexion */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#5D4B9A',
              '&:hover': {
                backgroundColor: '#3F51B5',
              },
            }}
          >
            Se connecter
          </Button>
        </Box>
      </Paper>

      {/* Snackbar pour afficher les erreurs */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
        action={
          <IconButton size="small" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Login;
