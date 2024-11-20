import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const QuickQuiz = () => {
  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => setAnswered(true);

  return (
    <Box mt={4}>
      <Typography variant="h5">Quiz du jour</Typography>
      <Typography variant="body1">Qu'est-ce qu'une startup ?</Typography>
      {!answered ? (
        <Button variant="contained" onClick={handleAnswer}>
          Répondre
        </Button>
      ) : (
        <Typography variant="body2">
          Une startup est une jeune entreprise...
        </Typography>
      )}
    </Box>
  );
};

export default QuickQuiz;
