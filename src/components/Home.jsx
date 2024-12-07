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
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { getCategoriesFromInput } from '../categoryService';
import Carousel from 'react-material-ui-carousel';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import StarIcon from '@mui/icons-material/Star';
import { loadStripe } from '@stripe/stripe-js';
import { createStripeSession } from '../services/paymentService';
import AuthModal from './AuthModal';
import CookieConsentModal from './cookies/CookieConsentModal'; // Import de la nouvelle modal
import ChatBotAI from './ChatBotAI';

const stripePromise = loadStripe(
  'pk_test_51QO6NIDc4Et5GayXOqgDcD6UrzuN7cjqX6VoaBmop7BKYYeulgXGOTXfxkzOv27G2JYvamampKocn1GxEsNqToz100JXuXolOF'
);

const images = [
  { url: '/images/slider1.jpg', captionKey: 'home.slider1' },
  { url: '/images/slider2.jpg', captionKey: 'home.slider2' },
  { url: '/images/slider3.jpg', captionKey: 'home.slider3' },
];

const plans = [
  {
    title: 'Free',
    price: '0€ / mois',
    features: [
      'Inscription à 1 projet public',
      'Génération de 1 projet privé',
      'Accès à la communauté',
      'IA limitée pour discuter',
    ],
    buttonLabel: 'Choisir Free',
    buttonColor: 'primary',
    isPopular: false,
    priceId: null,
  },
  {
    title: 'Premium',
    price: '3,99€ / mois',
    features: [
      'Accès illimité aux projets publics',
      'Création de jusqu’à 9 projets privés par mois',
      'Accès complet à la communauté',
      'IA avancée pour accompagner vos projets',
    ],
    buttonLabel: 'Choisir Premium',
    buttonColor: 'success',
    isPopular: true,
    priceId: 'price_1QO6NIDc4Et5GayX7kZT1lxt',
  },
  {
    title: 'Founder',
    price: '10€ / mois',
    features: [
      'Tous les avantages de Premium',
      'Reconnaissance dans la communauté',
      'Accès à des fonctionnalités exclusives à venir',
      'Soutien actif au développement de la plateforme',
    ],
    buttonLabel: 'Choisir Founder',
    buttonColor: 'secondary',
    isPopular: false,
    priceId: 'price_1QO6NIDc4Et5GayX9Ll0FGME',
  },
];

const COOKIE_PREFERENCES_KEY = 'cookie_preferences';

const Home = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  useEffect(() => {
    // Afficher la modale de consentement aux cookies si l'utilisateur n'a pas exprimé ses préférences
    const storedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
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

  const handlePlanSelection = async priceId => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');

    if (!token || token === 'null' || token === 'undefined') {
      setAuthModalOpen(true);
      return;
    }

    const stripe = await stripePromise;
    try {
      const { sessionId } = await createStripeSession(priceId);
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error('Erreur lors de la création de la session Stripe:', err);
    }
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

        {/* Section 2: Carousel */}
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
        <Box sx={{ mt: 10, pb: 6 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Choisissez votre abonnement
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, mb: 4 }}
          >
            Des plans flexibles pour s'adapter à vos besoins
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      boxShadow: 4,
                      borderRadius: 3,
                      position: 'relative',
                      overflow: 'visible',
                    }}
                  >
                    {plan.isPopular && (
                      <Chip
                        label="Populaire"
                        color="secondary"
                        icon={<StarIcon />}
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          boxShadow: 3,
                        }}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h4" gutterBottom>
                        {plan.title}
                      </Typography>
                      <Divider sx={{ marginY: 2 }} />
                      <Typography variant="h5" color="primary" gutterBottom>
                        {plan.price}
                      </Typography>
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {plan.features.map((feature, idx) => (
                          <li key={idx}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              • {feature}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="contained"
                        color={plan.buttonColor}
                        sx={{ marginTop: 3, paddingX: 5 }}
                        onClick={() => handlePlanSelection(plan.priceId)}
                      >
                        {plan.buttonLabel}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
        <ChatBotAI />
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
