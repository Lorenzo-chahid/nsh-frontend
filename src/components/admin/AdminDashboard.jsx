// src/components/admin/AdminDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '50px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Tableau de Bord Admin
      </Typography>
      <List component="nav">
        <ListItem button component={Link} to="/admin/users">
          <ListItemText primary="Gérer les Utilisateurs" />
        </ListItem>
        <ListItem button component={Link} to="/admin/tables">
          <ListItemText primary="Voir Toutes les Tables" />
        </ListItem>
        {/* Ajoutez d'autres liens si nécessaire */}
      </List>
    </Paper>
  );
};

export default AdminDashboard;
