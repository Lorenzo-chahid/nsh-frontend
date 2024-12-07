// src/components/SignIn.js

import React, { useState } from 'react';
import { signupUser } from '../authService';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SignIn = () => {
  const navigate = useNavigate();

  // État initial pour les données du formulaire
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    preferredLanguage: 'fr',
    firstName: '',
    lastName: '',
    birthDate: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [skipDetails, setSkipDetails] = useState(false);
  const [skipPayment, setSkipPayment] = useState(false);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = e => {
    const { name, value } = e.target;

    // Mettre à jour les données du formulaire
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    // Valider le mot de passe si le champ modifié est 'password'
    if (name === 'password') {
      setPasswordValid(validatePassword(value));
    }
  };

  // Fonction pour gérer la visibilité du mot de passe
  const handleTogglePasswordVisibility = field => {
    setShowPassword(prevShow => ({
      ...prevShow,
      [field]: !prevShow[field],
    }));
  };

  // Fonction pour gérer l'upload de l'image
  const handleImageUpload = e => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  // Fonction de validation du mot de passe
  const validatePassword = password => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
    return passwordRegex.test(password);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!passwordValid) {
      setError(
        'Le mot de passe doit contenir au moins 7 caractères, un chiffre et un caractère spécial.'
      );
      return;
    }

    const userData = new FormData();
    userData.append('email', formData.email);
    userData.append('username', formData.username);
    userData.append('password', formData.password);
    userData.append('preferred_language', formData.preferredLanguage);

    if (!skipDetails) {
      userData.append('first_name', formData.firstName);
      userData.append('last_name', formData.lastName);
      userData.append('birth_date', formData.birthDate);
    }

    if (profilePicture) {
      userData.append('profile_picture', profilePicture);
    }

    try {
      await signupUser(userData);
      if (!skipPayment) {
        // Rediriger vers la page de paiement
        navigate('/subscriptions');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError("L'inscription a échoué. Veuillez réessayer.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ color: '#5C6BC0' }}
        >
          Inscription
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Nom d'utilisateur"
            name="username"
            type="text"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Mot de passe"
            name="password"
            type={showPassword.password ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleTogglePasswordVisibility('password')}
                  >
                    {showPassword.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirmer le mot de passe"
            name="confirmPassword"
            type={showPassword.confirmPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      handleTogglePasswordVisibility('confirmPassword')
                    }
                  >
                    {showPassword.confirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            label="Langue préférée"
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="fr">Français</MenuItem>
            <MenuItem value="en">Anglais</MenuItem>
            <MenuItem value="nl">Néerlandais</MenuItem>
          </TextField>
          {!skipDetails && (
            <>
              <TextField
                label="Prénom"
                name="firstName"
                type="text"
                fullWidth
                margin="normal"
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                label="Nom"
                name="lastName"
                type="text"
                fullWidth
                margin="normal"
                value={formData.lastName}
                onChange={handleChange}
              />
              <TextField
                label="Date de naissance"
                name="birthDate"
                type="date"
                fullWidth
                margin="normal"
                value={formData.birthDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ margin: '16px 0' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skipDetails}
                onChange={e => setSkipDetails(e.target.checked)}
              />
            }
            label="Passer les informations supplémentaires"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skipPayment}
                onChange={e => setSkipPayment(e.target.checked)}
              />
            }
            label="Passer l'étape de paiement"
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Inscription
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
