import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  IconButton,
  Chip,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { getCategoriesFromInput } from '../categoryService';
import Carousel from 'react-material-ui-carousel';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const images = [
  { url: '/images/slider1.jpg', captionKey: 'home.slider1' },
  { url: '/images/slider2.jpg', captionKey: 'home.slider2' },
  { url: '/images/slider3.jpg', captionKey: 'home.slider3' },
];

const Home = () => {
  const { t } = useTranslation(); // Hook pour la traduction
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);

  const handleInputChange = e => {
    const value = e.target.value;
    setInputValue(value);

    // Obtenir les catégories en fonction de l'input
    const matchedCategories = getCategoriesFromInput(value);
    setCategories(matchedCategories);
  };

  return (
    <div>
      <Container maxWidth="lg">
        {/* Section 1: Header avec slogan et bouton d'inscription */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          textAlign="center"
          bgcolor="background.paper"
          sx={{
            color: 'primary.main',
            padding: 4,
            background: 'linear-gradient(145deg, #2c2c54, #bfbecf)',
            borderRadius: 4,
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            {t('home.welcome')}
            <span style={{ color: '#6a5acd' }}> Nanshe</span>
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={2}>
            {t('home.subtitle')}
          </Typography>
          <Button variant="contained" color="primary" size="large">
            {t('home.joinUs')}
          </Button>
        </Box>

        {/* Section 2: Carousel d'images */}
        <Box
          mt={4}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Carousel
            animation="slide"
            navButtonsAlwaysVisible
            indicators={false}
            autoPlay
            interval={5000}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            {images.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  position: 'relative',
                  height: 400,
                  backgroundImage: `url(${item.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="#ffffff"
                  height="100%"
                  bgcolor="rgba(0, 0, 0, 0.4)"
                  textAlign="center"
                  sx={{
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <Typography variant="h4" component="h2">
                    {t(item.captionKey)}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Carousel>
        </Box>

        {/* Section 3: Recherche avec suggestions de catégories */}
        <Box mt={5} display="flex" justifyContent="center" alignItems="center">
          <Box width="100%" maxWidth="600px">
            <TextField
              label={t('home.searchLabel')}
              variant="outlined"
              fullWidth
              value={inputValue}
              onChange={handleInputChange}
              sx={{
                bgcolor: 'white',
                borderRadius: '4px',
                boxShadow: 3,
                input: { color: '#333' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(106, 90, 205, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                mr: 2,
              }}
            />
            <IconButton color="primary" sx={{ ml: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        <Box mt={2} display="flex" justifyContent="center" flexWrap="wrap">
          {categories.map((category, index) => (
            <Chip
              key={index}
              label={category}
              sx={{
                margin: '4px',
                color: '#ffffff',
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'secondary.main',
                },
                fontSize: '1rem',
                padding: '10px',
              }}
            />
          ))}
        </Box>

        {/* Section 4: Description du projet */}
        <Box mt={6} textAlign="center">
          <Typography variant="h4" gutterBottom>
            {t('home.whatIsNanshe')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="sm"
            mx="auto"
          >
            {t('home.description')}
          </Typography>
        </Box>

        {/* Section 5: Avantages sous forme de grille */}
        <Grid container spacing={4} mt={4} textAlign="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 4, backgroundColor: '#f8f8f8' }}
            >
              <Typography variant="h6" color="primary.main">
                {t('home.advantage1')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('home.advantage1Desc')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 4, backgroundColor: '#f8f8f8' }}
            >
              <Typography variant="h6" color="primary.main">
                {t('home.advantage2')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('home.advantage2Desc')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 4, backgroundColor: '#f8f8f8' }}
            >
              <Typography variant="h6" color="primary.main">
                {t('home.advantage3')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('home.advantage3Desc')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
