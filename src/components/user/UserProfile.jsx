import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { deleteUser, updateUser } from '../../authService';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = async () => {
    try {
      console.log('STEEEEPPP ::: ', user, email, username);
      await updateUser(user.id, { email, username });
      setEditMode(false);
      // Mettre à jour le contexte ou afficher un message de succès
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.id);
      logout(); // Déconnecte l'utilisateur après la suppression du compte
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Mon Profil
      </Typography>
      <Box>
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={!editMode}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nom d'utilisateur"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={!editMode}
          fullWidth
          margin="normal"
        />
        <Box sx={{ mt: 2 }}>
          {editMode ? (
            <Button
              variant="contained"
              onClick={handleSaveChanges}
              sx={{ mr: 2 }}
            >
              Enregistrer les modifications
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleEditToggle}
              sx={{ mr: 2 }}
            >
              Modifier
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenDialog(true)}
          >
            Supprimer le compte
          </Button>
        </Box>
      </Box>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Supprimer le compte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
            irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteAccount} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
