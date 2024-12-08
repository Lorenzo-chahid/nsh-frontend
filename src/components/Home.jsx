// src/components/Home.jsx

import React, { useState, useEffect } from 'react';
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
import CookieConsentModal from './cookies/CookieConsentModal'; // Import de la nouvelle modal
import SubscriptionPlans from './payment/SubscriptionsPlans'; // Import du composant amélioré
import AuthModal from './AuthModal'; // Import de la modale d'authentification

const images = [
  { url: '/images/slider1.jpg', captionKey: 'home.slider1' },
  { url: '/images/slider2.jpg', captionKey: 'home.slider2' },
  { url: '/images/slider3.jpg', captionKey: 'home.slider3' },
];

const Home = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  useEffect(() => {
    // Afficher la modale de consentement aux cookies si l'utilisateur n'a pas exprimé ses préférences
    const storedPrefs = localStorage.getItem('cookie_preferences');
    if (!storedPrefs) {
      setCookieModalOpen(true);
    }
  }, []);

  const handleInputChange = e => {
    const value = e.target.value;
    setInputValue(value);
    const matchedCategories = getCategoriesFromInput(value);
    setCategories(matchedCategories);
  };

  const handleAuthenticated = () => {
    setAuthModalOpen(false);
  };

  const handleCloseCookieModal = () => {
    setCookieModalOpen(false);
  };

  return (
    <div>
      {/* Modal de consentement aux cookies */}
      <CookieConsentModal
        open={cookieModalOpen}
        onClose={handleCloseCookieModal}
      />

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {/* Section 1: Header */}
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
            py: { xs: 4, md: 8 },
            px: 2,
            background: 'linear-gradient(145deg, #2c2c54, #bfbecf)',
            borderRadius: 4,
            mt: 4,
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
          >
            {t('home.welcome')}
            <span style={{ color: '#6a5acd' }}> Nanshe</span>
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            mb={2}
            sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
          >
            {t('home.subtitle')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
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
                  height: { xs: 250, md: 400 },
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
                  sx={{ backdropFilter: 'blur(2px)', px: 2 }}
                >
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
                  >
                    {t(item.captionKey)}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Carousel>
        </Box>

        {/* Section 3: Recherche */}
        <Box mt={5} display="flex" flexDirection="column" alignItems="center">
          <Box width="100%" maxWidth="600px" display="flex" alignItems="center">
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
        </Box>

        {/* Section 4: Description */}
        <Box mt={8} textAlign="center">
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 3 }}
          >
            {t('home.whatIsNanshe')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="sm"
            mx="auto"
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            {t('home.description')}
          </Typography>
        </Box>

        {/* Section 5: Avantages */}
        <Grid container spacing={4} mt={4} textAlign="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 4, backgroundColor: '#f8f8f8' }}
            >
              <Typography variant="h6" color="primary.main" gutterBottom>
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
              <Typography variant="h6" color="primary.main" gutterBottom>
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
              <Typography variant="h6" color="primary.main" gutterBottom>
                {t('home.advantage3')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('home.advantage3Desc')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Section 6: Abonnements */}
        <SubscriptionPlans />
      </Container>

      {/* Modale d'authentification */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};

export default Home;
