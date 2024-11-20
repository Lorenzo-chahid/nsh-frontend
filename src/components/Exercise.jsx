// src/components/Exercise.jsx

import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';

const Exercise = ({ exercise, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="body2">
        <strong>Question {index + 1}:</strong> {exercise.question}
      </Typography>
      {showAnswer && (
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          <strong>Réponse:</strong> {exercise.answer}
        </Typography>
      )}
      <Button size="small" onClick={handleToggleAnswer}>
        {showAnswer ? 'Cacher la réponse' : 'Afficher la réponse'}
      </Button>
    </Box>
  );
};

export default Exercise;
