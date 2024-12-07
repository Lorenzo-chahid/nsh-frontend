import React, { useEffect, useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  Toolbar,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { styled } from '@mui/system';

const TruncatedTableCell = styled(TableCell)(({ theme }) => ({
  maxWidth: 200,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const TablesView = () => {
  const [tables, setTables] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/v1/admin/tables', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
          },
        });
        setTables(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des tables :', err);
        setSnackbar({
          open: true,
          message: 'Impossible de récupérer les données des tables.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const allTables = Object.keys(tables);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestion des Tables
      </Typography>

      {/* Tabs pour naviguer entre les tables */}
      <Paper elevation={3} sx={{ marginBottom: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {allTables.map((tableName, index) => (
            <Tab
              key={tableName}
              label={tableName}
              disabled={!tables[tableName] || tables[tableName].length === 0}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Contenu de la table active */}
      {allTables.length > 0 && tables[allTables[activeTab]] && (
        <Paper elevation={3}>
          <Typography
            variant="h6"
            sx={{
              padding: 2,
              textTransform: 'capitalize',
              borderBottom: '1px solid #ddd',
            }}
          >
            {allTables[activeTab]}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(tables[allTables[activeTab]][0] || {}).map(
                    key => (
                      <TableCell key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                    )
                  )}
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tables[allTables[activeTab]].map(row => (
                  <TableRow key={row.id} hover>
                    {Object.entries(row).map(([key, value]) => (
                      <TruncatedTableCell key={key}>
                        <Tooltip
                          title={
                            value !== null && value !== undefined ? value : '—'
                          }
                        >
                          <span>
                            {value !== null && value !== undefined
                              ? value
                              : '—'}
                          </span>
                        </Tooltip>
                      </TruncatedTableCell>
                    ))}
                    <TableCell align="center">
                      <Tooltip title="Voir">
                        <IconButton>
                          <VisibilityIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Modifier">
                        <IconButton>
                          <EditIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {tables[allTables[activeTab]].length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={
                        Object.keys(tables[allTables[activeTab]][0] || {})
                          .length + 1
                      }
                    >
                      Aucune donnée disponible.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Snackbar pour notifications */}
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

export default TablesView;
