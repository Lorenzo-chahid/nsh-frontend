import React from 'react';
import { Typography, Grid, Box, Paper } from '@mui/material';
import CreateProjectForms from './CreateProjectForms';
import UserProjects from './UserProjects';
import PublicProjects from './PublicProjects';

const Dashboard = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Section des projets de l'utilisateur */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#333',
          marginBottom: 3,
        }}
      >
        Vos Projets
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginBottom: 4,
          borderRadius: '16px',
          backgroundColor: '#fff',
        }}
      >
        <UserProjects />
      </Paper>

      {/* Section des projets publics */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#333',
          marginBottom: 3,
        }}
      >
        Projets Publics
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginBottom: 4,
          borderRadius: '16px',
          backgroundColor: '#fff',
        }}
      >
        <Grid container spacing={2}>
          <PublicProjects />
        </Grid>
      </Paper>

      {/* Section de création de projet */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#333',
          marginBottom: 3,
        }}
      >
        Créez un nouveau projet
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: '16px',
          backgroundColor: '#fff',
        }}
      >
        <CreateProjectForms />
      </Paper>
    </Box>
  );
};

export default Dashboard;
