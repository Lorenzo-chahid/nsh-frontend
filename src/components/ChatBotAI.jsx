import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';

const ChatBotAI = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Bonjour! 👋 Comment puis-je vous aider aujourd’hui?',
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = event => setInput(event.target.value);

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user's message
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'user', text: input },
      ]);

      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'bot', text: "C'est intéressant ! 😊" },
        ]);
      }, 1000);

      // Clear the input
      setInput('');
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <IconButton onClick={handleOpen} sx={{ p: 1 }}>
          <img
            src="/jj.png" // Path to the image in the public folder
            alt="Chatbot Icon"
            style={{ width: 78, height: 78, borderRadius: '50%' }}
          />
        </IconButton>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="chatbot-modal-title"
        aria-describedby="chatbot-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 80,
            left: 16,
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '60vh',
            overflow: 'hidden',
          }}
        >
          <Typography
            id="chatbot-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            ChatBotAI
          </Typography>

          {/* Message List */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              mb: 2,
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: 1,
            }}
          >
            <List>
              {messages.map((message, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent:
                      message.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {message.sender === 'bot' && (
                    <Avatar
                      alt="ChatBot Icon"
                      src="/jj.png"
                      sx={{ width: 32, height: 32, mr: 1 }}
                    />
                  )}
                  <Box
                    sx={{
                      bgcolor:
                        message.sender === 'user' ? 'primary.main' : 'grey.300',
                      color: message.sender === 'user' ? 'white' : 'black',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      maxWidth: '70%',
                    }}
                  >
                    <ListItemText primary={message.text} />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Input Field */}
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Votre réponse..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            Envoyer
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ChatBotAI;
