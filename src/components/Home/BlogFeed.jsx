import React from 'react';
import { Box, Typography } from '@mui/material';

const BlogFeed = ({ articles }) => (
  <Box mt={4}>
    <Typography variant="h5">Articles récents</Typography>
    <Box mt={2}>
      {articles.map((article, index) => (
        <Box key={index} mb={2}>
          <Typography variant="h6">{article.title}</Typography>
          <Typography variant="body2">{article.excerpt}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default BlogFeed;
