import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const BudgetForm = () => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savingGoal, setSavingGoal] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Envoyer les données au backend ou au service API
    const budgetData = {
      income,
      expenses,
      savingGoal,
      deadline,
    };
    console.log('Données de budget:', budgetData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Planification d'épargne / Gestion de budget
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Revenu mensuel (€)"
          type="number"
          fullWidth
          margin="normal"
          value={income}
          onChange={e => setIncome(e.target.value)}
          required
        />
        <TextField
          label="Dépenses mensuelles (€)"
          type="number"
          fullWidth
          margin="normal"
          value={expenses}
          onChange={e => setExpenses(e.target.value)}
          required
        />
        <TextField
          label="Objectif d'épargne (€)"
          type="number"
          fullWidth
          margin="normal"
          value={savingGoal}
          onChange={e => setSavingGoal(e.target.value)}
          required
        />
        <TextField
          label="Délai pour atteindre l'objectif (mois)"
          type="number"
          fullWidth
          margin="normal"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
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

export default BudgetForm;
