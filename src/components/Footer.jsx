// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Nanshe. Tous droits réservés.
      </Typography>
    </Box>
  );
};

export default Footer;
