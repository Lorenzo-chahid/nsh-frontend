// src/components/WeightLossForm.jsx

import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NansheRunning from './img/hh.png'; // Assurez-vous de placer l'image ici
import PlanReview from './PlanReview';

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
  const [plan, setPlan] = useState(null); // Stocke le plan généré
  const steps = [
    'Validation des données',
    'Envoi des données au serveur',
    'Traitement des données',
    'Préparation de la réponse',
    'Réception de la réponse',
  ];

  // Fonction de soumission du formulaire
  const handleSubmit = async e => {
    e.preventDefault();
    const completeFormData = { ...formData, custom_fields: customFields };
    setLoading(true);
    setCurrentStep(0);

    try {
      setCurrentStep(1);
      await axios.post('/api/v1/forms/weight-loss/', completeFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentStep(4);

      // Récupère le plan après la création
      fetchPlan();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer le plan depuis le backend
  const fetchPlan = async () => {
    try {
      const response = await axios.get('/api/v1/projects/1', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Plan fetched:', response.data);
      setPlan(response.data.program);
    } catch (error) {
      console.error('Erreur lors de la récupération du plan :', error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const handleRemoveCustomField = index => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const handleCustomFieldChange = (index, e) => {
    const updatedFields = [...customFields];
    updatedFields[index][e.target.name] = e.target.value;
    setCustomFields(updatedFields);
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}
    >
      <Typography variant="h5" gutterBottom>
        Formulaire de Perte de Poids
      </Typography>
      <form onSubmit={handleSubmit}>
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
          select // Ajout de la propriété 'select' pour le menu déroulant
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

        <Typography variant="h6" gutterBottom>
          Champs personnalisés
        </Typography>
        {customFields.map((field, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Nom du champ"
              name="name"
              value={field.name}
              onChange={e => handleCustomFieldChange(index, e)}
              fullWidth
              margin="normal"
              disabled={loading}
            />
            <TextField
              label="Valeur"
              name="value"
              value={field.value}
              onChange={e => handleCustomFieldChange(index, e)}
              fullWidth
              margin="normal"
              disabled={loading}
            />
            <IconButton onClick={() => handleRemoveCustomField(index)}>
              <RemoveIcon />
            </IconButton>
          </div>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddCustomField}
          disabled={loading}
        >
          Ajouter un champ personnalisé
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          Soumettre
        </Button>
      </form>

      {loading && (
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            position: 'relative',
            height: '50px',
            overflow: 'hidden',
          }}
        >
          <img
            src={NansheRunning}
            alt="Loading animation"
            style={{
              position: 'absolute',
              left: `${(currentStep / steps.length) * 100}%`,
              transition: 'left 0.5s',
              height: '50px',
            }}
          />
          <Typography variant="h6" gutterBottom>
            {steps[currentStep]}
          </Typography>
        </div>
      )}

      {plan && (
        <PlanReview
          plan={plan}
          onConfirm={() => console.log('Plan validé')}
          onEdit={() => console.log('Édition du plan')}
          onDelete={() => setPlan(null)}
        />
      )}
    </Paper>
  );
};

export default WeightLossForm;
