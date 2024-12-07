// src/components/admin/UserManagement.jsx

import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../services/adminService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Avatar,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const usersData = await fetchUsers();
      console.log('pipi :: ', usersData);
      setUsers(usersData);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const handleDeleteClick = user => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser.id);
        setOpenDeleteDialog(false);
        setSelectedUser(null);
        loadUsers();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleEditClick = userId => {
    // Implémentez la navigation vers la page d'édition utilisateur si nécessaire
    navigate(`/admin/users/edit/${userId}`);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: '1000px', margin: 'auto', marginTop: '50px', padding: 2 }}
    >
      <Typography variant="h6" gutterBottom align="center">
        Gestion des Utilisateurs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Nom d'utilisateur</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Nom de Famille</TableCell>
            <TableCell>Date de Naissance</TableCell>
            <TableCell>Actif</TableCell>
            <TableCell>Premium</TableCell>
            <TableCell>Créé le</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                {user.profile_picture ? (
                  <Avatar
                    src={user.profile_picture}
                    alt={`${user.username}'s profile`}
                    sx={{ width: 40, height: 40 }}
                  />
                ) : (
                  <Avatar sx={{ width: 40, height: 40 }}>
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.first_name || '-'}</TableCell>
              <TableCell>{user.last_name || '-'}</TableCell>
              <TableCell>
                {user.birth_date
                  ? new Date(user.birth_date).toLocaleDateString()
                  : '-'}
              </TableCell>
              <TableCell>{user.is_active ? 'Oui' : 'Non'}</TableCell>
              <TableCell>{user.is_premium ? 'Oui' : 'Non'}</TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Tooltip title="Modifier">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(user.id)}
                    sx={{ mr: 1 }}
                  >
                    Modifier
                  </Button>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(user)}
                  >
                    Supprimer
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialogue de confirmation de suppression */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Supprimer l'utilisateur
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
            {selectedUser?.username} ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default UserManagement;
