import React from 'react';
import { Box, Chip } from '@mui/material';

const TrendingCategories = ({ categories }) => (
  <Box mt={2}>
    {categories.map((category, index) => (
      <Chip key={index} label={category} sx={{ margin: '4px' }} />
    ))}
  </Box>
);

export default TrendingCategories;
