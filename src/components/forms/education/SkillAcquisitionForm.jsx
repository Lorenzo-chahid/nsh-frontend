import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';

const SkillAcquisitionForm = () => {
  const [skill, setSkill] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [learningMethod, setLearningMethod] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Envoyer les données au backend ou au service API
    const skillAcquisitionData = {
      skill,
      currentLevel,
      learningMethod,
      duration,
    };
    console.log("Données d'acquisition de compétences:", skillAcquisitionData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Acquisition de Compétences Spécifiques
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Compétence à apprendre"
          fullWidth
          margin="normal"
          value={skill}
          onChange={e => setSkill(e.target.value)}
          required
        />
        <TextField
          label="Niveau actuel (débutant, intermédiaire, avancé)"
          fullWidth
          margin="normal"
          value={currentLevel}
          onChange={e => setCurrentLevel(e.target.value)}
          required
        />
        <TextField
          select
          label="Méthode d'apprentissage préférée"
          fullWidth
          margin="normal"
          value={learningMethod}
          onChange={e => setLearningMethod(e.target.value)}
          required
        >
          <MenuItem value="Théorique">Théorique</MenuItem>
          <MenuItem value="Pratique">Pratique</MenuItem>
          <MenuItem value="Mentorat">Mentorat</MenuItem>
          <MenuItem value="Autre">Autre</MenuItem>
        </TextField>
        <TextField
          label="Durée d'apprentissage (mois)"
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

export default SkillAcquisitionForm;
