import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchBar = ({ inputValue, handleInputChange }) => (
  <Box display="flex" alignItems="center" width="100%">
    <TextField
      label="Rechercher"
      variant="outlined"
      fullWidth
      value={inputValue}
      onChange={handleInputChange}
      sx={{ mr: 2 }}
    />
    <IconButton color="primary">
      <SearchIcon />
    </IconButton>
  </Box>
);

export default SearchBar;
