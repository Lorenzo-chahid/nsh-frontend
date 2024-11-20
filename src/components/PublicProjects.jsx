import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  CardActions,
  Button,
  CardContent,
} from '@mui/material';
import { fetchPublicProjects } from '../services/ProjectService';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledCard = styled('div')(({ theme }) => ({
  backgroundColor: theme?.palette?.background?.paper || '#fff',
  borderRadius: '16px',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const ProjectHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.2rem',
  color: theme?.palette?.text?.primary || '#333',
  marginBottom: '8px',
}));

const ProjectDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme?.palette?.text?.secondary || '#666',
  marginBottom: '16px',
}));

const PublicProjects = () => {
  const [publicProjects, setPublicProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPublicProjects = async () => {
      try {
        const projects = await fetchPublicProjects();
        setPublicProjects(projects);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des projets publics:',
          error
        );
      }
    };

    getPublicProjects();
  }, []);

  return (
    <Grid container spacing={3}>
      {publicProjects.map(project => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <StyledCard>
            <CardContent>
              <ProjectHeader>{project.name}</ProjectHeader>
              <ProjectDescription>{project.description}</ProjectDescription>
              <Typography
                variant="caption"
                style={{ fontSize: '0.8rem', color: '#888' }}
              >
                Catégorie: {project.category}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                style={{
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  textTransform: 'none',
                  borderRadius: '8px',
                }}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                Voir le projet
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default PublicProjects;
