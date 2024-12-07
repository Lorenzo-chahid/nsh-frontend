// src/components/UserProfile.js

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
  Avatar,
  Grid,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { deleteUser, updateUser, getUserData } from '../../authService';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const UserProfile = () => {
  const { user, setUser, logout } = useAuth(); // Assurez-vous que setUser est disponible dans AuthContext
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [birthDate, setBirthDate] = useState(user?.birth_date || '');
  const [profilePicture, setProfilePicture] = useState(null); // Pour le nouveau fichier
  const [openDialog, setOpenDialog] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = async () => {
    try {
      // Préparer les données à mettre à jour
      const updatedData = {
        email,
        username,
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
      };

      // Si une nouvelle photo de profil est sélectionnée, la télécharger
      if (profilePicture) {
        const formData = new FormData();
        formData.append('profile_picture', profilePicture);

        const response = await axios.post(
          'http://localhost:8000/api/v1/upload-profile-picture',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Assurez-vous d'utiliser le bon token
            },
          }
        );

        if (response.data.profile_picture) {
          updatedData.profile_picture = response.data.profile_picture;
        }
      }

      // Mettre à jour l'utilisateur
      const updatedUser = await updateUser(user.id, updatedData);
      setUser(updatedUser); // Mettre à jour le contexte utilisateur
      setEditMode(false);
      setProfilePicture(null); // Réinitialiser le fichier sélectionné
    } catch (error) {
      console.error('Échec de la mise à jour de l’utilisateur:', error);
      // Vous pouvez afficher un message d'erreur à l'utilisateur ici
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.id);
      logout(); // Déconnecte l'utilisateur après la suppression du compte
    } catch (error) {
      console.error('Échec de la suppression du compte:', error);
      // Vous pouvez afficher un message d'erreur à l'utilisateur ici
    }
  };

  const handleProfilePictureChange = e => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('Mon Profil')}
      </Typography>
      <Grid container spacing={3}>
        {/* Avatar et Photo de Profil */}
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Avatar
            src={user.profile_picture}
            alt={`${user.username}'s profile`}
            sx={{ width: 150, height: 150, margin: '0 auto' }}
          />
          {editMode && (
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" component="label">
                {t('Changer la photo de profil')}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </Button>
              {profilePicture && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {profilePicture.name}
                </Typography>
              )}
            </Box>
          )}
        </Grid>

        {/* Informations Utilisateur */}
        <Grid item xs={12} md={8}>
          <Box>
            <TextField
              label={t('Email')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={!editMode}
              fullWidth
              margin="normal"
            />
            <TextField
              label={t('Nom d’utilisateur')}
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={!editMode}
              fullWidth
              margin="normal"
            />
            <TextField
              label={t('Prénom')}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              disabled={!editMode}
              fullWidth
              margin="normal"
            />
            <TextField
              label={t('Nom de famille')}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              disabled={!editMode}
              fullWidth
              margin="normal"
            />
            <TextField
              label={t('Date de naissance')}
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              disabled={!editMode}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box sx={{ mt: 3 }}>
              {editMode ? (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveChanges}
                    sx={{ mr: 2 }}
                  >
                    {t('Enregistrer les modifications')}
                  </Button>
                  <Button variant="outlined" onClick={handleEditToggle}>
                    {t('Annuler')}
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={handleEditToggle}
                    sx={{ mr: 2 }}
                  >
                    {t('Modifier')}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setOpenDialog(true)}
                  >
                    {t('Supprimer le compte')}
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{t('Supprimer le compte')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(
              'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            {t('Annuler')}
          </Button>
          <Button onClick={handleDeleteAccount} color="secondary">
            {t('Supprimer')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
