// src/components/SubscriptionPlans.jsx

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import { loadStripe } from '@stripe/stripe-js';
import { createStripeSession } from '../../services/paymentService';
import AuthModal from '../AuthModal';
import Carousel from 'react-material-ui-carousel';

const stripePromise = loadStripe(
  'pk_test_51QO6NIDc4Et5GayXOqgDcD6UrzuN7cjqX6VoaBmop7BKYYeulgXGOTXfxkzOv27G2JYvamampKocn1GxEsNqToz100JXuXolOF'
);

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

const SubscriptionPlans = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePlanSelection = async priceId => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token'); // Vérifie les deux emplacements

    if (!token || token === 'null' || token === 'undefined') {
      setAuthModalOpen(true); // Affiche la modale si aucun token valide
      return;
    }

    const stripe = await stripePromise;
    try {
      const { sessionId } = await createStripeSession(priceId); // Créez la session Stripe
      await stripe.redirectToCheckout({ sessionId }); // Redirigez l'utilisateur vers Stripe Checkout
    } catch (err) {
      console.error('Erreur lors de la création de la session Stripe:', err);
    }
  };

  const handleAuthenticated = () => {
    setAuthModalOpen(false); // Fermer la modale une fois connecté
  };

  const renderPlanCard = (plan, index) => (
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
            boxShadow: 6,
            borderRadius: 3,
            position: 'relative',
            overflow: 'visible',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.3s',
            '&:hover': {
              boxShadow: 8,
            },
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
                fontWeight: 'bold',
              }}
            />
          )}
          <CardContent>
            <Typography variant="h4" gutterBottom fontWeight="bold">
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
                      color: '#555',
                    }}
                  >
                    • {feature}
                  </Typography>
                </li>
              ))}
            </ul>
            <Box mt={2}>
              <Button
                variant="contained"
                color={plan.buttonColor}
                sx={{ paddingX: 5 }}
                onClick={() => handlePlanSelection(plan.priceId)}
              >
                {plan.buttonLabel}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
        Choisissez votre abonnement
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        Des plans flexibles pour s'adapter à vos besoins
      </Typography>
      <Box mt={4}>
        {isMobile ? (
          <Carousel
            animation="slide"
            navButtonsAlwaysVisible={false}
            indicators
            autoPlay={false}
            swipe
            navButtonsProps={{
              style: {
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#fff',
              },
            }}
            indicatorContainerProps={{
              style: {
                marginTop: '10px',
              },
            }}
          >
            {plans.map((plan, index) => (
              <Box key={index} sx={{ paddingX: 2 }}>
                {renderPlanCard(plan, index)}
              </Box>
            ))}
          </Carousel>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan, index) => renderPlanCard(plan, index))}
          </Grid>
        )}
      </Box>

      {/* Afficher la modale d'authentification si nécessaire */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />
    </Box>
  );
};

export default SubscriptionPlans;
