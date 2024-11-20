import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { chatWithIA } from '../services/IAService';

const ChatBot = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [level, setLevel] = useState(0); // Niveau de l'IA
  const [skillPoints, setSkillPoints] = useState(0); // Points de compétence disponibles
  const [skills, setSkills] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initialBotMessage = {
      sender: 'bot',
      text: "Bonjour ! Je suis ton IA personnelle, prête à t'aider. Comment puis-je t'aider aujourd'hui ?",
    };
    setMessages([initialBotMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      const userMessage = {
        sender: 'user',
        text: inputValue,
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      setInputValue('');

      try {
        const response = await chatWithIA(userId, inputValue);

        const botResponse = {
          sender: 'bot',
          text: response.response,
        };

        setMessages(prevMessages => [...prevMessages, botResponse]);
        setLevel(response.level); // Mettre à jour le niveau
        setSkillPoints(response.skill_points); // Mettre à jour les points de compétence
        setSkills(response.skills); // Mettre à jour les compétences
      } catch (error) {
        console.error("Erreur lors de la communication avec l'IA:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6">
        Niveau de l'IA : {level} | Points de compétence : {skillPoints}
      </Typography>
      <Typography variant="body1">
        Compétences : {JSON.stringify(skills)}
      </Typography>
      <Paper
        elevation={3}
        sx={{ p: 2, mt: 2, height: '70vh', overflowY: 'auto' }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{message.sender === 'bot' ? '🥚' : '👤'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        message.sender === 'bot'
                          ? 'primary.main'
                          : 'text.primary',
                    }}
                  >
                    {message.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Entrez votre message..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ ml: 1 }}
        >
          Envoyer
        </Button>
      </Box>
    </Container>
  );
};

export default ChatBot;
