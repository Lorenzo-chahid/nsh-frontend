// src/components/admin/AdminLogin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/adminService';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await loginAdmin(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '50px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Connexion Admin
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Nom d'utilisateur"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Se connecter
        </Button>
      </form>
    </Paper>
  );
};

export default AdminLogin;
