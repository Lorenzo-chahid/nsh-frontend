import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const BusinessForm = () => {
  const [businessType, setBusinessType] = useState('');
  const [initialCapital, setInitialCapital] = useState('');
  const [expectedRevenue, setExpectedRevenue] = useState('');
  const [investmentGoal, setInvestmentGoal] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Envoyer les données au backend ou au service API
    const businessData = {
      businessType,
      initialCapital,
      expectedRevenue,
      investmentGoal,
    };
    console.log("Données de création d'entreprise:", businessData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Création d'entreprise / Projet d'investissement
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Type d'entreprise ou d'investissement"
          fullWidth
          margin="normal"
          value={businessType}
          onChange={e => setBusinessType(e.target.value)}
          required
        />
        <TextField
          label="Capital initial (€)"
          type="number"
          fullWidth
          margin="normal"
          value={initialCapital}
          onChange={e => setInitialCapital(e.target.value)}
          required
        />
        <TextField
          label="Revenu attendu annuel (€)"
          type="number"
          fullWidth
          margin="normal"
          value={expectedRevenue}
          onChange={e => setExpectedRevenue(e.target.value)}
          required
        />
        <TextField
          label="Objectif d'investissement (€)"
          type="number"
          fullWidth
          margin="normal"
          value={investmentGoal}
          onChange={e => setInvestmentGoal(e.target.value)}
          required
        />

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Soumettre
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BusinessForm;
