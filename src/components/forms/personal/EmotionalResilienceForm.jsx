import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';

const EmotionalResilienceForm = () => {
  const [stressTriggers, setStressTriggers] = useState('');
  const [emotionalControl, setEmotionalControl] = useState('');
  const [resilienceGoal, setResilienceGoal] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Envoyer les données au backend ou au service API
    const emotionalResilienceData = {
      stressTriggers,
      emotionalControl,
      resilienceGoal,
      duration,
    };
    console.log('Données de résilience émotionnelle:', emotionalResilienceData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Gestion du Stress et Résilience Émotionnelle
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Déclencheurs de stress"
          fullWidth
          margin="normal"
          value={stressTriggers}
          onChange={e => setStressTriggers(e.target.value)}
          required
        />
        <TextField
          label="Capacité de contrôle émotionnel (sur 10)"
          type="number"
          fullWidth
          margin="normal"
          value={emotionalControl}
          onChange={e => setEmotionalControl(e.target.value)}
          required
        />
        <TextField
          label="Objectif de résilience (ex. : rester calme dans des situations stressantes)"
          fullWidth
          margin="normal"
          value={resilienceGoal}
          onChange={e => setResilienceGoal(e.target.value)}
          required
        />
        <TextField
          label="Durée pour atteindre l'objectif (mois)"
          type="number"
          fullWidth
          margin="normal"
          value={duration}
          onChange={e => setDuration(e.target.value)}
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

export default EmotionalResilienceForm;
