import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import SkillManager from '../../SkillsManager'; // Nouveau composant pour gérer les compétences

const WeightLossForm = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    goal_weight: '',
    current_weight: '',
    daily_calories: '',
    exercise_level: '',
    duration: '',
  });
  const [customFields, setCustomFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState([]); // Stocke les compétences générées
  const [skillsStepComplete, setSkillsStepComplete] = useState(false);

  const steps = [
    'Validation des données',
    'Génération des compétences nécessaires',
    'Validation des compétences',
    'Finalisation du projet',
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setCurrentStep(1); // Étape 1 : Génération des compétences

    try {
      const response = await axios.post(
        '/v1/skills/generate', // Appel API pour générer les compétences
        { form_data: formData }, // Envoie les données nécessaires
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        console.log('TESTTS:  ', formData)
      );

      setSkills(response.data.skills); // Stocke les compétences générées
      setCurrentStep(2); // Étape 2 : Afficher les compétences
    } catch (error) {
      console.error('Erreur lors de la génération des compétences :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillsValidation = () => {
    // Marque l'étape des compétences comme terminée
    setSkillsStepComplete(true);
    setCurrentStep(3); // Étape suivante : Finalisation du projet
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}
    >
      <Typography variant="h5" gutterBottom>
        Création de Projet - Perte de Poids
      </Typography>

      {currentStep === 0 && (
        <form onSubmit={handleSubmit}>
          {/* Formulaire principal */}
          <TextField
            label="Poids Cible"
            name="goal_weight"
            value={formData.goal_weight}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={loading}
          />
          <TextField
            label="Poids Actuel"
            name="current_weight"
            value={formData.current_weight}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={loading}
          />
          <TextField
            label="Apport Calorique Quotidien"
            name="daily_calories"
            value={formData.daily_calories}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            disabled={loading}
          />
          <TextField
            select
            label="Niveau d'Exercice"
            name="exercise_level"
            value={formData.exercise_level}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={loading}
          >
            <MenuItem value="">
              <em>Sélectionnez le niveau d'exercice</em>
            </MenuItem>
            <MenuItem value="low">Faible</MenuItem>
            <MenuItem value="moderate">Modéré</MenuItem>
            <MenuItem value="high">Élevé</MenuItem>
          </TextField>
          <TextField
            label="Durée (en jours)"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Générer les compétences
          </Button>
        </form>
      )}

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
          <Typography variant="body1">{steps[currentStep]}</Typography>
        </div>
      )}

      {currentStep === 2 && (
        <SkillManager
          skills={skills}
          onValidate={handleSkillsValidation} // Validation des compétences
        />
      )}

      {currentStep === 3 && (
        <Typography variant="h6" color="success">
          Projet finalisé avec succès !
        </Typography>
      )}
    </Paper>
  );
};

export default WeightLossForm;
