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
} from '@mui/material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const handleDelete = async userId => {
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')
    ) {
      try {
        await deleteUser(userId);
        loadUsers();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: '800px', margin: 'auto', marginTop: '50px' }}
    >
      <Typography variant="h6" gutterBottom>
        Gestion des Utilisateurs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Nom d'utilisateur</TableCell>
            <TableCell>Actif</TableCell>
            <TableCell>Premium</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.is_active ? 'Oui' : 'Non'}</TableCell>
              <TableCell>{user.is_premium ? 'Oui' : 'Non'}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(user.id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserManagement;
