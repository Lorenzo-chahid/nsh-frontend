// src/components/cookies/CookieConsentModal.jsx

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';

// Clé pour le localStorage
const COOKIE_PREFERENCES_KEY = 'cookie_preferences';

const CookieConsentModal = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm')); // Plein écran sur mobile

  const [functionalCookies, setFunctionalCookies] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [personalizationCookies, setPersonalizationCookies] = useState(false);

  useEffect(() => {
    // Charger les préférences existantes
    const storedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (storedPrefs) {
      const parsed = JSON.parse(storedPrefs);
      setFunctionalCookies(parsed.functional);
      setAnalyticsCookies(parsed.analytics);
      setPersonalizationCookies(parsed.personalization);
    }
  }, []);

  const handleAcceptAll = () => {
    // Accepter tous les cookies
    savePreferences(true, true, true);
  };

  const handleSavePreferences = () => {
    // Sauvegarder les préférences actuelles
    savePreferences(
      functionalCookies,
      analyticsCookies,
      personalizationCookies
    );
  };

  const savePreferences = (functional, analytics, personalization) => {
    const prefs = {
      functional,
      analytics,
      personalization,
    };
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    onClose();
    // Initialiser les cookies en fonction des préférences
    // Exemple : Activer les cookies analytiques uniquement si accepté
    if (analytics) {
      // Charger votre script analytique ici
    }
    if (personalization) {
      // Charger vos scripts de personnalisation ici
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}} // Empêcher la fermeture en cliquant en dehors
      fullScreen={fullScreen}
      aria-labelledby="cookie-consent-dialog"
      scroll="paper"
    >
      <DialogTitle id="cookie-consent-dialog" sx={{ textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          Paramétrage des cookies
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Nous utilisons des cookies pour améliorer votre expérience et proposer
          des contenus adaptés. Certains cookies sont essentiels au bon
          fonctionnement du site, d'autres sont optionnels.
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* Cookies Fonctionnels */}
        <Typography variant="h6" mb={1} fontWeight="bold">
          Cookies fonctionnels
        </Typography>
        <Typography variant="body2" mb={1}>
          Ces cookies permettent de mémoriser vos choix (par ex: vos progrès
          dans un cours, la langue, vos préférences de navigation). Cela inclut
          potentiellement des cookies permettant de suivre vos sections et
          exercices complétés, pour afficher votre progression dans vos cours.
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={functionalCookies}
              onChange={e => setFunctionalCookies(e.target.checked)}
              color="primary"
            />
          }
          label="Activer les cookies fonctionnels"
        />

        <Divider sx={{ my: 2 }} />

        {/* Cookies Analytiques */}
        <Typography variant="h6" mb={1} fontWeight="bold">
          Cookies analytiques
        </Typography>
        <Typography variant="body2" mb={1}>
          Ces cookies nous aident à comprendre comment les utilisateurs
          interagissent avec le site et à améliorer son contenu (ex: quelles
          sections de cours sont les plus visitées, quels exercices posent
          problème).
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={analyticsCookies}
              onChange={e => setAnalyticsCookies(e.target.checked)}
              color="primary"
            />
          }
          label="Activer les cookies analytiques"
        />

        <Divider sx={{ my: 2 }} />

        {/* Cookies de Personnalisation */}
        <Typography variant="h6" mb={1} fontWeight="bold">
          Cookies de personnalisation
        </Typography>
        <Typography variant="body2" mb={1}>
          Ces cookies permettent d’adapter le contenu à votre profil, par
          exemple, en vous suggérant des compétences ou des sections
          personnalisées en fonction de votre progression ou de vos préférences
          passées.
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={personalizationCookies}
              onChange={e => setPersonalizationCookies(e.target.checked)}
              color="primary"
            />
          }
          label="Activer la personnalisation"
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" mb={3}>
          Pour plus d'informations, consultez notre{' '}
          <a href="/privacy-policy">Politique de Confidentialité</a>.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          padding: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleSavePreferences}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            marginBottom: { xs: 1, sm: 0 },
          }}
        >
          Sauvegarder mes préférences
        </Button>
        <Button
          variant="contained"
          onClick={handleAcceptAll}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Tout accepter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CookieConsentModal;
