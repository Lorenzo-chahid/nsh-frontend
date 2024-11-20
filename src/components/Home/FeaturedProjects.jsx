import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const FeaturedProjects = ({ projects }) => (
  <Box mt={4}>
    <Typography variant="h5">Projets en vedette</Typography>
    <Box display="flex" justifyContent="space-around" mt={2}>
      {projects.map((project, index) => (
        <Card key={index} sx={{ width: '30%' }}>
          <CardContent>
            <Typography variant="h6">{project.title}</Typography>
            <Typography variant="body2">{project.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);

export default FeaturedProjects;
