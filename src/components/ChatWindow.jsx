// src/components/ChatWindow.jsx

import React, { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';

const ChatWindow = ({ open, handleClose, currentPage }) => {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && token) {
      // Établir la connexion WebSocket avec le jeton
      ws.current = new WebSocket(`ws://localhost:8000/ws/chat?token=${token}`);

      ws.current.onopen = () => {
        console.log('Connecté au WebSocket');
      };

      ws.current.onmessage = event => {
        const data = JSON.parse(event.data);
        setMessages(prev => [...prev, data]);
        scrollToBottom();
      };

      ws.current.onclose = () => {
        console.log('Déconnecté du WebSocket');
      };

      // Récupérer les messages historiques via REST
      fetch('http://localhost:8000/api/messages/')
        .then(response => response.json())
        .then(data => setMessages(data))
        .catch(error =>
          console.error('Erreur lors de la récupération des messages:', error)
        );

      return () => {
        ws.current.close();
      };
    }
  }, [open, token]);

  const sendMessage = () => {
    if (newMessage.trim() === '' || !ws.current) return;

    const messageData = {
      user_id: user.id,
      user_name: user.name,
      message: newMessage,
      page: currentPage,
      is_admin: false, // Assurez-vous que cela est correct selon l'utilisateur
    };

    ws.current.send(JSON.stringify(messageData));
    setNewMessage('');
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Support Client</DialogTitle>
      <DialogContent dividers>
        <List>
          {messages.map(msg => (
            <ListItem key={msg.id || Math.random()}>
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
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <TextField
            variant="outlined"
            label="Votre message"
            fullWidth
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Envoyer
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ChatWindow;
