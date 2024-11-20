import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';

const TaskManagementForm = () => {
  const [tasks, setTasks] = useState('');
  const [priority, setPriority] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [timeManagementMethod, setTimeManagementMethod] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Envoyer les données au backend ou au service API
    const taskManagementData = {
      tasks,
      priority,
      timeEstimate,
      timeManagementMethod,
    };
    console.log('Données de gestion des tâches:', taskManagementData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Gestion du Temps et des Tâches
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Nombre de tâches à accomplir"
          type="number"
          fullWidth
          margin="normal"
          value={tasks}
          onChange={e => setTasks(e.target.value)}
          required
        />
        <TextField
          select
          label="Priorité des tâches"
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
        <TextField
          label="Durée estimée pour chaque tâche (heures)"
          type="number"
          fullWidth
          margin="normal"
          value={timeEstimate}
          onChange={e => setTimeEstimate(e.target.value)}
          required
        />
        <TextField
          select
          label="Méthode de gestion du temps"
          fullWidth
          margin="normal"
          value={timeManagementMethod}
          onChange={e => setTimeManagementMethod(e.target.value)}
          required
        >
          <MenuItem value="Pomodoro">Pomodoro</MenuItem>
          <MenuItem value="Time blocking">Time blocking</MenuItem>
          <MenuItem value="Méthode GTD">Méthode GTD</MenuItem>
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

export default TaskManagementForm;
