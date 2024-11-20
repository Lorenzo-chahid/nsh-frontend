import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';

const ProjectManagementForm = () => {
  const [projectName, setProjectName] = useState('');
  const [objectives, setObjectives] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Envoyer les données au backend ou au service API
    const projectData = {
      projectName,
      objectives,
      deadline,
      priority,
    };
    console.log('Données de gestion de projet:', projectData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Gestion de Projet avec Objectifs et Priorités
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Nom du projet"
          fullWidth
          margin="normal"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          required
        />
        <TextField
          label="Objectifs du projet"
          fullWidth
          margin="normal"
          value={objectives}
          onChange={e => setObjectives(e.target.value)}
          required
        />
        <TextField
          label="Date limite du projet"
          type="date"
          fullWidth
          margin="normal"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          select
          label="Priorité du projet"
          fullWidth
          margin="normal"
          value={priority}
          onChange={e => setPriority(e.target.value)}
          required
        >
          <MenuItem value="Haute">Haute</MenuItem>
          <MenuItem value="Moyenne">Moyenne</MenuItem>
          <MenuItem value="Basse">Basse</MenuItem>
        </TextField>

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Soumettre
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProjectManagementForm;
