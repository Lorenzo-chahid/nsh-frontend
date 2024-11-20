import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchUserProjects, deleteUserProject } from '../authService';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Public, Edit, Delete } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '16px',
  height: '100%',
  cursor: 'pointer',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
}));

const IconContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
});

const UserProjects = () => {
  const navigate = useNavigate();
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const fetchProjects = async () => {
    try {
      const projects = await fetchUserProjects();
      setUserProjects(projects);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteConfirm = (project, event) => {
    event.stopPropagation(); // Empêche la propagation pour éviter la redirection
    setSelectedProject(project);
    setOpenConfirm(true);
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    try {
      await deleteUserProject(selectedProject.id);
      setSnackbar({
        open: true,
        message: 'Projet supprimé avec succès',
        severity: 'success',
      });
      setUserProjects(
        userProjects.filter(project => project.id !== selectedProject.id)
      );
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la suppression du projet',
        severity: 'error',
      });
    } finally {
      setOpenConfirm(false);
      setSelectedProject(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <Box mt={4}>
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={4}>
          {userProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StyledCard onClick={() => navigate(`/projects/${project.id}`)}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {project.description}
                    </Typography>
                    <IconContainer>
                      <IconButton
                        onClick={event => {
                          event.stopPropagation(); // Empêche la propagation pour éviter la redirection
                          navigate(`/projects/view/${project.id}`);
                        }}
                        sx={{
                          color: 'grey',
                          '&:hover': { color: 'blue' },
                        }}
                      >
                        <Public />
                      </IconButton>
                      <IconButton
                        onClick={event => {
                          event.stopPropagation(); // Empêche la propagation pour éviter la redirection
                          navigate(`/projects/edit/${project.id}`);
                        }}
                        sx={{
                          color: 'grey',
                          '&:hover': { color: 'green' },
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={event => handleDeleteConfirm(project, event)}
                        sx={{
                          color: 'grey',
                          '&:hover': { color: 'red' },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </IconContainer>
                  </CardContent>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modale de confirmation de suppression */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Voulez-vous vraiment supprimer le projet{' '}
          <strong>{selectedProject?.name}</strong> ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteProject} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de succès/erreur */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProjects;
