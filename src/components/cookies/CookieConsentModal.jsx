import React, { useState, useEffect } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';

// Exemple de clés pour le localStorage
const COOKIE_PREFERENCES_KEY = 'cookie_preferences';

const CookieConsentModal = ({ open, onClose }) => {
  const [essentialCookies, setEssentialCookies] = useState(true);
  // Les cookies essentiels sont obligatoires, on peut bloquer le switch
  const [functionalCookies, setFunctionalCookies] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [personalizationCookies, setPersonalizationCookies] = useState(false);

  useEffect(() => {
    // Charger les préférences si elles existent déjà
    const storedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (storedPrefs) {
      const parsed = JSON.parse(storedPrefs);
      setEssentialCookies(parsed.essential);
      setFunctionalCookies(parsed.functional);
      setAnalyticsCookies(parsed.analytics);
      setPersonalizationCookies(parsed.personalization);
    }
  }, []);

  const handleAcceptAll = () => {
    // L'utilisateur accepte tous les cookies
    setFunctionalCookies(true);
    setAnalyticsCookies(true);
    setPersonalizationCookies(true);
    savePreferences(true, true, true, true);
  };

  const handleSavePreferences = () => {
    // L'utilisateur sauvegarde les préférences en l’état
    savePreferences(
      essentialCookies,
      functionalCookies,
      analyticsCookies,
      personalizationCookies
    );
  };

  const savePreferences = (
    essential,
    functional,
    analytics,
    personalization
  ) => {
    const prefs = {
      essential,
      functional,
      analytics,
      personalization,
    };
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose} // Peut-être garder cette action désactivée tant que l'utilisateur n'a pas fait un choix
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backgroundColor: 'rgba(0,0,0,0.5)' },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" mb={2} fontWeight="bold">
            Paramétrage des cookies
          </Typography>
          <Typography variant="body1" mb={2}>
            Nous utilisons des cookies pour améliorer votre expérience et
            proposer des contenus adaptés. Certains cookies sont essentiels au
            bon fonctionnement du site, d'autres sont optionnels.
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" mt={2} mb={1} fontWeight="bold">
            Cookies essentiels
          </Typography>
          <Typography variant="body2" mb={1}>
            Ces cookies sont nécessaires pour le fonctionnement de base du site
            (ex: maintenir votre session, assurer la sécurité). Vous ne pouvez
            pas les désactiver.
          </Typography>
          <FormControlLabel
            control={<Switch checked={essentialCookies} disabled />}
            label="Actif"
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" mt={2} mb={1} fontWeight="bold">
            Cookies fonctionnels
          </Typography>
          <Typography variant="body2" mb={1}>
            Ces cookies permettent de mémoriser vos choix (par ex: vos progrès
            dans un cours, la langue, vos préférences de navigation). Cela
            inclut potentiellement des cookies permettant de suivre vos sections
            et exercices complétés, pour afficher votre progression dans vos
            cours.
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={functionalCookies}
                onChange={e => setFunctionalCookies(e.target.checked)}
              />
            }
            label="Activer les cookies fonctionnels"
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" mt={2} mb={1} fontWeight="bold">
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
              />
            }
            label="Activer les cookies analytiques"
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" mt={2} mb={1} fontWeight="bold">
            Cookies de personnalisation
          </Typography>
          <Typography variant="body2" mb={1}>
            Ces cookies permettent d’adapter le contenu à votre profil, par
            exemple, en vous suggérant des compétences ou des sections
            personnalisées en fonction de votre progression ou de vos
            préférences passées.
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={personalizationCookies}
                onChange={e => setPersonalizationCookies(e.target.checked)}
              />
            }
            label="Activer la personnalisation"
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" mb={3}>
            Pour plus d'informations, consultez notre{' '}
            <a href="/privacy-policy">Politique de Confidentialité</a>.
          </Typography>

          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleSavePreferences}>
              Sauvegarder mes préférences
            </Button>
            <Button variant="contained" onClick={handleAcceptAll}>
              Tout accepter
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CookieConsentModal;
