// src/components/ProjectList.jsx

import React, { useState, useEffect } from 'react';
import { getUserProjects } from '../services/ProjectService';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Container,
} from '@mui/material';
import ProjectDetails from './ProjectDetails';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getUserProjects();
        setProjects(data);
      } catch (error) {
        console.log('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleOpenDetails = project => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Your Projects
      </Typography>
      {projects.length === 0 ? (
        <Typography>You have no projects yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {projects.map(project => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {project.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorenzo
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDetails(project)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <ProjectDetails project={selectedProject} onClose={handleCloseDetails} />
    </Container>
  );
};

export default ProjectList;
