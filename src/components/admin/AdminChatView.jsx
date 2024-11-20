// src/components/admin/AdminChatView.jsx

import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import jwt_decode from 'jwt-decode';

const AdminChatView = () => {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const ws = useRef(null);
  const messagesEndRef = useRef(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (token) {
      // Établir la connexion WebSocket avec le jeton
      ws.current = new WebSocket(`ws://localhost:8000/ws/chat?token=${token}`);

      ws.current.onopen = () => {
        console.log('Connecté au WebSocket Admin');
      };

      ws.current.onmessage = event => {
        const data = JSON.parse(event.data);
        setMessages(prev => [...prev, data]);
        setConversations(prev => {
          const key = `${data.user_id}-${data.page}`;
          if (!prev.find(item => item.key === key)) {
            return [
              ...prev,
              {
                user_id: data.user_id,
                page: data.page,
                user_name: data.user_name,
                key,
              },
            ];
          }
          return prev;
        });
        scrollToBottom();
      };

      ws.current.onclose = () => {
        console.log('Déconnecté du WebSocket Admin');
      };

      // Récupérer les messages historiques via REST
      fetch('http://localhost:8000/api/messages/')
        .then(response => response.json())
        .then(data => {
          setMessages(data);
          // Extraire les conversations uniques
          const uniqueConvos = data.reduce((acc, msg) => {
            const key = `${msg.user_id}-${msg.page}`;
            if (!acc.find(item => item.key === key)) {
              acc.push({
                user_id: msg.user_id,
                page: msg.page,
                user_name: msg.user_name,
                key,
              });
            }
            return acc;
          }, []);
          setConversations(uniqueConvos);
        })
        .catch(error =>
          console.error('Erreur lors de la récupération des messages:', error)
        );

      return () => {
        ws.current.close();
      };
    }
  }, [token]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendReply = () => {
    if (replyMessage.trim() === '' || !ws.current || !selectedConversation)
      return;

    const messageData = {
      user_id: selectedConversation.user_id,
      user_name: 'Admin',
      message: replyMessage,
      page: selectedConversation.page,
      is_admin: true,
    };

    ws.current.send(JSON.stringify(messageData));
    setReplyMessage('');
    setSnackbar({
      open: true,
      message: 'Réponse envoyée avec succès.',
      severity: 'success',
    });
  };

  const handleSelectConversation = convo => {
    setSelectedConversation(convo);
    // Filtrer les messages pour la conversation sélectionnée
    const filteredMessages = messages.filter(
      msg => msg.user_id === convo.user_id && msg.page === convo.page
    );
    setMessages(filteredMessages);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, padding: 2 }}>
      {/* Liste des Conversations */}
      <Box
        sx={{
          width: '30%',
          borderRight: '1px solid #ccc',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Conversations
        </Typography>
        <List>
          {conversations.map(convo => (
            <ListItem
              button
              key={convo.key}
              selected={
                selectedConversation && selectedConversation.key === convo.key
              }
              onClick={() => handleSelectConversation(convo)}
            >
              <ListItemText
                primary={convo.user_name}
                secondary={`Page: ${convo.page}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Vue de la Conversation Sélectionnée */}
      <Box
        sx={{
          width: '70%',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {selectedConversation ? (
          <>
            <Typography variant="h6" gutterBottom>
              Conversation avec {selectedConversation.user_name}
            </Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
              <List>
                {messages.map((msg, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color={msg.is_admin ? 'primary' : 'secondary'}
                        >
                          {msg.user_name}{' '}
                          <Typography variant="caption" color="textSecondary">
                            {new Date(msg.timestamp).toLocaleString()}
                          </Typography>
                        </Typography>
                      }
                      secondary={msg.message}
                    />
                  </ListItem>
                ))}
                <div ref={messagesEndRef} />
              </List>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                variant="outlined"
                label="Votre réponse"
                fullWidth
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendReply();
                  }
                }}
              />
              <Button variant="contained" color="primary" onClick={sendReply}>
                Envoyer
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Sélectionnez une conversation pour voir les messages.
          </Typography>
        )}
      </Box>

      {/* Snackbar pour les Notifications */}
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

export default AdminChatView;
