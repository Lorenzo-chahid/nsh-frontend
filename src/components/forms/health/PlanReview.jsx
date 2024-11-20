import React, { useState } from 'react';
import { Button, Paper, Typography, Box, TextField } from '@mui/material';

const PlanReview = ({ program, onConfirm, onEdit, onDelete }) => {
  const [editableProgram, setEditableProgram] = useState(program);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = e => {
    setEditableProgram(e.target.value);
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5">Programme personnalisé</Typography>
      <Box my={2}>
        {isEditing ? (
          <TextField
            multiline
            fullWidth
            value={editableProgram}
            onChange={handleChange}
            rows={10}
            variant="outlined"
          />
        ) : (
          <Typography>{editableProgram}</Typography>
        )}
      </Box>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onConfirm(editableProgram)}
        >
          Valider
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleEditToggle}>
          {isEditing ? "Annuler l'édition" : 'Éditer'}
        </Button>
        <Button variant="contained" color="error" onClick={onDelete}>
          Supprimer
        </Button>
      </Box>
    </Paper>
  );
};

export default PlanReview;
