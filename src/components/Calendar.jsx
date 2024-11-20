// src/components/UserCalendar.js

import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Chip,
  FormHelperText,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../services/CalendarService';
import { fetchUsers, notifyParticipants } from '../authService'; // Assurez-vous que notifyParticipants est implémenté
import { useAuth } from '../context/AuthContext';

const localizer = momentLocalizer(moment);

const UserCalendar = () => {
  const { user } = useAuth(); // Récupérer l'utilisateur actuel
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: moment(),
    end: moment().add(1, 'hour'),
    is_shared: false,
    participants_ids: [],
    reminders: [],
  });
  const [allUsers, setAllUsers] = useState([]);
  const [availableReminders] = useState([
    { label: '10 minutes avant', value: 10 },
    { label: '30 minutes avant', value: 30 },
    { label: '1 heure avant', value: 60 },
    { label: '2 heures avant', value: 120 },
    { label: '1 jour avant', value: 1440 },
  ]);
  const [errors, setErrors] = useState({}); // Pour la validation du formulaire

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        const formattedEvents = fetchedEvents.map(event => ({
          ...event,
          start: moment(event.start).toDate(),
          end: moment(event.end).toDate(),
          participants_ids: Array.isArray(event.participants_ids)
            ? event.participants_ids
            : [],
          reminders: Array.isArray(event.reminders) ? event.reminders : [],
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
      }
    };

    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        const filteredUsers = users.filter(u => u.id !== user.id);
        setAllUsers(filteredUsers);
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    };

    loadEvents();
    loadUsers();
  }, [user.id]);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({
      title: '',
      description: '',
      start: moment(start),
      end: moment(end),
      is_shared: false,
      participants_ids: [],
      reminders: [],
    });
    setErrors({});
    setOpenDialog(true);
  };

  const handleSelectEvent = event => {
    setSelectedEvent({
      ...event,
      start: moment(event.start),
      end: moment(event.end),
      participants_ids: Array.isArray(event.participants_ids)
        ? event.participants_ids
        : [],
      reminders: Array.isArray(event.reminders) ? event.reminders : [],
    });
    setErrors({});
    setOpenEventDialog(true);
  };

  const handleAddEvent = async () => {
    // Validation du formulaire
    const validationErrors = {};
    if (!newEvent.title.trim()) {
      validationErrors.title = 'Le titre est requis';
    }
    if (newEvent.end.isSameOrBefore(newEvent.start)) {
      validationErrors.end = 'La date de fin doit être après la date de début';
    }
    if (newEvent.is_shared && newEvent.participants_ids.length === 0) {
      validationErrors.participants = 'Sélectionnez au moins un participant';
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const formattedEvent = {
        ...newEvent,
        start: newEvent.start.toISOString(),
        end: newEvent.end.toISOString(),
      };
      const createdEvent = await createEvent(formattedEvent);
      refreshEvents();
      setOpenDialog(false);
      setNewEvent({
        title: '',
        description: '',
        start: moment(),
        end: moment().add(1, 'hour'),
        is_shared: false,
        participants_ids: [],
        reminders: [],
      });
      setErrors({});

      // Envoyer des notifications si l'événement est partagé
      if (createdEvent.is_shared && createdEvent.participants_ids.length > 0) {
        await notifyParticipants(
          createdEvent.participants_ids,
          'Un nouvel événement a été ajouté.'
        );
      }
    } catch (error) {
      console.error("Échec de l'ajout de l'événement:", error);
    }
  };

  const handleUpdateEvent = async () => {
    // Validation du formulaire
    const validationErrors = {};
    if (!selectedEvent.title.trim()) {
      validationErrors.title = 'Le titre est requis';
    }
    if (selectedEvent.end.isSameOrBefore(selectedEvent.start)) {
      validationErrors.end = 'La date de fin doit être après la date de début';
    }
    if (
      selectedEvent.is_shared &&
      selectedEvent.participants_ids.length === 0
    ) {
      validationErrors.participants = 'Sélectionnez au moins un participant';
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const formattedEvent = {
        ...selectedEvent,
        start: selectedEvent.start.toISOString(),
        end: selectedEvent.end.toISOString(),
      };
      await updateEvent(formattedEvent.id, formattedEvent);
      refreshEvents();
      setOpenEventDialog(false);
      setSelectedEvent(null);

      // Envoyer des notifications si l'événement est partagé
      if (
        formattedEvent.is_shared &&
        formattedEvent.participants_ids.length > 0
      ) {
        await notifyParticipants(
          formattedEvent.participants_ids,
          'Un événement a été modifié.'
        );
      }
    } catch (error) {
      console.error("Échec de la mise à jour de l'événement:", error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(selectedEvent.id);
      refreshEvents();
      setOpenEventDialog(false);
      setSelectedEvent(null);

      // Envoyer des notifications si l'événement était partagé
      if (
        selectedEvent.is_shared &&
        selectedEvent.participants_ids.length > 0
      ) {
        await notifyParticipants(
          selectedEvent.participants_ids,
          'Un événement a été supprimé.'
        );
      }
    } catch (error) {
      console.error("Échec de la suppression de l'événement:", error);
    }
  };

  const refreshEvents = async () => {
    try {
      const fetchedEvents = await fetchEvents();
      const formattedEvents = fetchedEvents.map(event => ({
        ...event,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
        participants_ids: Array.isArray(event.participants_ids)
          ? event.participants_ids
          : [],
        reminders: Array.isArray(event.reminders) ? event.reminders : [],
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Erreur lors du rafraîchissement des événements:', error);
    }
  };

  const resetNewEvent = () => {
    setNewEvent({
      title: '',
      description: '',
      start: moment(),
      end: moment().add(1, 'hour'),
      is_shared: false,
      participants_ids: [],
      reminders: [],
    });
  };

  // Gestion des changements pour la création d'événements
  const handleChange = e => {
    const { name, value } = e.target;
    // Pour les champs multiples, value sera un tableau
    setNewEvent(prev => ({
      ...prev,
      [name]:
        name === 'participants_ids' || name === 'reminders' ? value : value,
    }));
  };

  // Gestion des changements pour l'édition d'événements
  const handleEventChange = e => {
    const { name, value } = e.target;
    // Pour les champs multiples, value sera un tableau
    setSelectedEvent(prev => ({
      ...prev,
      [name]:
        name === 'participants_ids' || name === 'reminders' ? value : value,
    }));
  };

  const handleDateChange = (field, date) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleEventDateChange = (field, date) => {
    setSelectedEvent(prev => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleCheckboxChange = e => {
    setNewEvent(prev => ({
      ...prev,
      is_shared: e.target.checked,
    }));
  };

  const handleEventCheckboxChange = e => {
    setSelectedEvent(prev => ({
      ...prev,
      is_shared: e.target.checked,
    }));
  };

  const handleRemindersChange = e => {
    const { value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      reminders: Array.isArray(value) ? value : [value],
    }));
  };

  const handleEventRemindersChange = e => {
    const { value } = e.target;
    setSelectedEvent(prev => ({
      ...prev,
      reminders: Array.isArray(value) ? value : [value],
    }));
  };

  return (
    <div style={{ height: '80vh', padding: '20px' }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
        titleAccessor="title"
      />

      {/* Dialog pour ajouter un événement */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ajouter un événement</DialogTitle>
        <DialogContent>
          <TextField
            label="Titre"
            fullWidth
            margin="dense"
            name="title"
            value={newEvent.title}
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label="Date et Heure de Début"
              value={newEvent.start}
              onChange={date => handleDateChange('start', date)}
              renderInput={params => (
                <TextField {...params} fullWidth margin="dense" />
              )}
            />
            <DateTimePicker
              label="Date et Heure de Fin"
              value={newEvent.end}
              onChange={date => handleDateChange('end', date)}
              renderInput={params => (
                <TextField {...params} fullWidth margin="dense" />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="dense"
            name="description"
            value={newEvent.description}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newEvent.is_shared}
                onChange={handleCheckboxChange}
                name="is_shared"
                color="primary"
              />
            }
            label="Partager avec d'autres utilisateurs"
          />
          {newEvent.is_shared && (
            <FormControl
              fullWidth
              margin="dense"
              error={Boolean(errors.participants)}
            >
              <InputLabel id="participants-label">Participants</InputLabel>
              <Select
                labelId="participants-label"
                id="participants"
                multiple
                name="participants_ids"
                value={newEvent.participants_ids}
                onChange={handleChange}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(id => {
                      const user = allUsers.find(user => user.id === id);
                      return (
                        <Chip key={id} label={user ? user.username : id} />
                      );
                    })}
                  </Box>
                )}
              >
                {allUsers.map(user => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
              {errors.participants && (
                <FormHelperText>{errors.participants}</FormHelperText>
              )}
            </FormControl>
          )}
          <FormControl fullWidth margin="dense">
            <InputLabel id="reminders-label">Rappels</InputLabel>
            <Select
              labelId="reminders-label"
              id="reminders"
              multiple
              name="reminders"
              value={newEvent.reminders}
              onChange={handleRemindersChange}
              renderValue={selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => {
                    const reminder = availableReminders.find(
                      r => r.value === value
                    );
                    return (
                      <Chip
                        key={value}
                        label={reminder ? reminder.label : value}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {availableReminders.map(reminder => (
                <MenuItem key={reminder.value} value={reminder.value}>
                  {reminder.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour voir ou modifier un événement */}
      {selectedEvent && (
        <Dialog
          open={openEventDialog}
          onClose={() => setOpenEventDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Modifier l'événement</DialogTitle>
          <DialogContent>
            <TextField
              label="Titre"
              fullWidth
              margin="dense"
              name="title"
              value={selectedEvent.title}
              onChange={handleEventChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                label="Date et Heure de Début"
                value={selectedEvent.start}
                onChange={date => handleEventDateChange('start', date)}
                renderInput={params => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
              />
              <DateTimePicker
                label="Date et Heure de Fin"
                value={selectedEvent.end}
                onChange={date => handleEventDateChange('end', date)}
                renderInput={params => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
              />
            </LocalizationProvider>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="dense"
              name="description"
              value={selectedEvent.description}
              onChange={handleEventChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedEvent.is_shared}
                  onChange={handleEventCheckboxChange}
                  name="is_shared"
                  color="primary"
                />
              }
              label="Partager avec d'autres utilisateurs"
            />
            {selectedEvent.is_shared && (
              <FormControl
                fullWidth
                margin="dense"
                error={Boolean(errors.participants)}
              >
                <InputLabel id="participants-label">Participants</InputLabel>
                <Select
                  labelId="participants-label"
                  id="participants"
                  multiple
                  name="participants_ids"
                  value={selectedEvent.participants_ids}
                  onChange={handleEventChange}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(id => {
                        const user = allUsers.find(user => user.id === id);
                        return (
                          <Chip key={id} label={user ? user.username : id} />
                        );
                      })}
                    </Box>
                  )}
                >
                  {allUsers.map(user => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
                {errors.participants && (
                  <FormHelperText>{errors.participants}</FormHelperText>
                )}
              </FormControl>
            )}
            <FormControl fullWidth margin="dense">
              <InputLabel id="reminders-label">Rappels</InputLabel>
              <Select
                labelId="reminders-label"
                id="reminders"
                multiple
                name="reminders"
                value={selectedEvent.reminders}
                onChange={handleEventRemindersChange}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(value => {
                      const reminder = availableReminders.find(
                        r => r.value === value
                      );
                      return (
                        <Chip
                          key={value}
                          label={reminder ? reminder.label : value}
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {availableReminders.map(reminder => (
                  <MenuItem key={reminder.value} value={reminder.value}>
                    {reminder.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEventDialog(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleUpdateEvent} color="primary">
              Modifier
            </Button>
            <Button onClick={handleDeleteEvent} color="secondary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default UserCalendar;
