// src/components/ChatButton.jsx

import React from 'react';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { styled } from '@mui/system';

const StyledFab = styled(Fab)({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
});

const ChatButton = ({ onClick }) => {
  return (
    <StyledFab color="primary" aria-label="chat" onClick={onClick}>
      <ChatIcon />
    </StyledFab>
  );
};

export default ChatButton;
