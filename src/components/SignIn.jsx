import React, { useState } from 'react';
import { signupUser } from '../authService';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Tooltip,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = password => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/; // Minimum 7 characters, 1 number, 1 special character
    return passwordRegex.test(password);
  };

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(validatePassword(value));
  };

  const handleConfirmPasswordChange = e => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!passwordValid) {
      setError(
        'Le mot de passe doit contenir au moins 7 caractères, un chiffre et un caractère spécial.'
      );
      return;
    }

    try {
      await signupUser(email, username, password);
      navigate('/dashboard'); // Redirige vers le tableau de bord après l'inscription
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
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#5C6BC0',
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
          <TextField
            label="Nom d'utilisateur"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#5C6BC0',
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
          <Tooltip
            title={`Longueur : ${password.length}/7 caractères | ${
              passwordValid ? '✔️' : '❌'
            } Chiffre | ${
              password.match(/[!@#$%^&*]/) ? '✔️' : '❌'
            } Caractère spécial`}
          >
            <TextField
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#5C6BC0',
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
          </Tooltip>
          <Tooltip
            title={`Longueur : ${confirmPassword.length}/7 caractères | ${
              passwordValid ? '✔️' : '❌'
            } Chiffre | ${
              confirmPassword.match(/[!@#$%^&*]/) ? '✔️' : '❌'
            } Caractère spécial`}
          >
            <TextField
              label="Confirmer le mot de passe"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#5C6BC0',
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
          </Tooltip>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Inscription
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
