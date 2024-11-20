import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const MiniGames = () => (
  <Box mt={4}>
    <Typography variant="h5">Mini-jeu éducatif</Typography>
    <Typography variant="body1">
      Apprenez l'alphabet ukrainien en jouant !
    </Typography>
    <Button variant="contained">Commencer le jeu</Button>
  </Box>
);

export default MiniGames;
