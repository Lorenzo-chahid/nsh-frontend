import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';

const SocialSkillsForm = () => {
  const [communicationGoal, setCommunicationGoal] = useState('');
  const [publicSpeaking, setPublicSpeaking] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Envoyer les données au backend ou au service API
    const socialSkillsData = {
      communicationGoal,
      publicSpeaking,
      confidenceLevel,
      duration,
    };
    console.log('Données de développement personnel:', socialSkillsData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Amélioration des Compétences Sociales et Confiance en Soi
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Objectif de communication (ex. : écoute active, négociation)"
          fullWidth
          margin="normal"
          value={communicationGoal}
          onChange={e => setCommunicationGoal(e.target.value)}
          required
        />
        <TextField
          label="Prise de parole en public (ex. : oui/non)"
          fullWidth
          margin="normal"
          value={publicSpeaking}
          onChange={e => setPublicSpeaking(e.target.value)}
          required
        />
        <TextField
          label="Niveau de confiance actuel (sur 10)"
          type="number"
          fullWidth
          margin="normal"
          value={confidenceLevel}
          onChange={e => setConfidenceLevel(e.target.value)}
          required
        />
        <TextField
          label="Durée estimée pour atteindre les objectifs (mois)"
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

export default SocialSkillsForm;
