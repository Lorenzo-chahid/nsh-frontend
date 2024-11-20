import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext'; // Assurez-vous du bon chemin

const LanguageLearningForm = () => {
  const { token } = useAuth();
  const [language, setLanguage] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [learningMethod, setLearningMethod] = useState('');
  const [duration, setDuration] = useState('');
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Si vous voulez gérer le chargement

  const handleSubmit = async e => {
    e.preventDefault();
    const languageLearningData = {
      language,
      current_level: currentLevel,
      learning_method: learningMethod,
      duration: parseInt(duration),
    };
    console.log("Données d'apprentissage de la langue:", languageLearningData);

    setLoading(true);
    try {
      // Effectuer la requête POST en utilisant axios et en passant le token
      const response = await axios.post(
        '/api/v1/forms/language-learning/',
        languageLearningData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Projet créé:', response.data);
      setProject(response.data);
      setError(null);
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      setError('Une erreur est survenue lors de la création du projet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Apprentissage d'une Nouvelle Langue
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Langue à apprendre"
          fullWidth
          margin="normal"
          value={language}
          onChange={e => setLanguage(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          label="Niveau actuel (débutant, intermédiaire, avancé)"
          fullWidth
          margin="normal"
          value={currentLevel}
          onChange={e => setCurrentLevel(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          select
          label="Méthode d'apprentissage préférée"
          fullWidth
          margin="normal"
          value={learningMethod}
          onChange={e => setLearningMethod(e.target.value)}
          required
          disabled={loading}
        >
          <MenuItem value="Immersion">Immersion</MenuItem>
          <MenuItem value="Grammaire">Grammaire</MenuItem>
          <MenuItem value="Oral">Oral</MenuItem>
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
          disabled={loading}
        />

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Soumettre'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {project && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Votre programme personnalisé :</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {project.course}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default LanguageLearningForm;
