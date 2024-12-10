// src/components/Dashboard.jsx

import React from 'react';
import {
  Typography,
  Grid,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CreateProjectForms from './CreateProjectForms';
import UserProjects from './UserProjects';
import PublicProjects from './PublicProjects';

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      {/* Section des projets de l'utilisateur */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#333',
          marginBottom: 3,
          textAlign: isSmallScreen ? 'center' : 'left',
        }}
      >
        Vos Projets
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 3 },
          marginBottom: { xs: 3, sm: 4 },
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
          textAlign: isSmallScreen ? 'center' : 'left',
        }}
      >
        Projets Publics
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 3 },
          marginBottom: { xs: 3, sm: 4 },
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
          textAlign: isSmallScreen ? 'center' : 'left',
        }}
      >
        Créez un nouveau projet
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 3 },
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
