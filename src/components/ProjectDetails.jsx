import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Snackbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  fetchProjectById,
  subscribeToProject,
} from '../services/ProjectService';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchProjectDetails = async () => {
    try {
      const data = await fetchProjectById(projectId);
      setProject(data);
      console.log('here :', data);
    } catch (err) {
      console.error('Erreur lors de la récupération du projet:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    setSubscribing(true);
    try {
      await subscribeToProject(projectId);
      setSnackbar({
        open: true,
        message: 'Vous êtes maintenant inscrit à ce projet.',
        severity: 'success',
      });
    } catch (err) {
      console.error("Erreur lors de l'inscription au projet:", err);
      setSnackbar({
        open: true,
        message: "Une erreur est survenue lors de l'inscription.",
        severity: 'error',
      });
    } finally {
      setSubscribing(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return <Alert severity="error">Erreur lors du chargement du projet.</Alert>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {project.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {project.description}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Catégorie: {project.category}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Durée: {project.duration} jours
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubscribe}
        disabled={subscribing}
        sx={{ marginTop: 2 }}
      >
        {subscribing ? 'Inscription en cours...' : "S'inscrire"}
      </Button>

      {/* Affichage des cours, sections et exercices */}
      {project.courses && project.courses.length > 0 && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Cours Associés
          </Typography>
          {project.courses.map(course => (
            <Accordion key={course.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`course-content-${course.id}`}
                id={`course-header-${course.id}`}
              >
                <Typography variant="h6">{course.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="textSecondary">
                  {course.description}
                </Typography>
                {course.sections && course.sections.length > 0 && (
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Sections
                    </Typography>
                    {course.sections.map(section => (
                      <Accordion key={section.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`section-content-${section.id}`}
                          id={`section-header-${section.id}`}
                        >
                          <Typography>{section.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2">
                            {section.content}
                          </Typography>
                          {section.exercises &&
                            section.exercises.length > 0 && (
                              <Box sx={{ marginTop: 2 }}>
                                <Typography variant="subtitle2">
                                  Exercices
                                </Typography>
                                <ul>
                                  {section.exercises.map(exercise => (
                                    <li key={exercise.id}>
                                      <strong>Question:</strong>{' '}
                                      {exercise.question}
                                      <br />
                                      <strong>Réponse:</strong>{' '}
                                      {exercise.answer}
                                    </li>
                                  ))}
                                </ul>
                              </Box>
                            )}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectDetails;
