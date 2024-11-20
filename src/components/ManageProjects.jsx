// src/components/ManageProjects.jsx

import React from 'react';
import { Container, Typography } from '@mui/material';
import ProjectList from './ProjectList'; // Importer ProjectList

const ManageProjects = () => {
  return (
    <div>
      <Container>
        <Typography variant="h4" gutterBottom>
          Gérer mes projets
        </Typography>
        {/* Afficher la liste des projets */}
        <ProjectList />
      </Container>
    </div>
  );
};

export default ManageProjects;
