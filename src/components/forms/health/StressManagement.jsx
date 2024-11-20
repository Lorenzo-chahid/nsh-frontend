import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';

const StressManagementForm = () => {
  const [stressLevel, setStressLevel] = useState('');
  const [copingMechanism, setCopingMechanism] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Envoyer les données au backend ou au service API
    const stressManagementData = {
      stressLevel,
      copingMechanism,
      frequency,
    };
    console.log('Données de gestion du stress:', stressManagementData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Gestion du Stress / Bien-être Mental
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Niveau de stress actuel (sur 10)"
          type="number"
          fullWidth
          margin="normal"
          value={stressLevel}
          onChange={e => setStressLevel(e.target.value)}
          required
        />
        <TextField
          select
          label="Méthode de gestion du stress préférée"
          fullWidth
          margin="normal"
          value={copingMechanism}
          onChange={e => setCopingMechanism(e.target.value)}
          required
        >
          <MenuItem value="Méditation">Méditation</MenuItem>
          <MenuItem value="Exercice physique">Exercice physique</MenuItem>
          <MenuItem value="Thérapie">Thérapie</MenuItem>
          <MenuItem value="Autre">Autre</MenuItem>
        </TextField>
        <TextField
          label="Fréquence de suivi (jours)"
          type="number"
          fullWidth
          margin="normal"
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
          required
        />

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Soumettre
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default StressManagementForm;
