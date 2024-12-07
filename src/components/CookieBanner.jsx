import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';

const CookieBanner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  // Vérifie si les cookies ont déjà été acceptés
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsBannerVisible(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    // Définit un indicateur d'acceptation
    localStorage.setItem('cookiesAccepted', true);
    setIsBannerVisible(false);
  };

  return (
    isBannerVisible && (
      <Snackbar
        open={isBannerVisible}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="info"
          sx={{
            width: '100%',
            backgroundColor: '#4a4e69',
            color: '#f2e9e4',
            borderRadius: 2,
          }}
          action={
            <Button
              size="small"
              onClick={handleAcceptCookies}
              sx={{ color: '#f2e9e4' }}
            >
              J'accepte
            </Button>
          }
        >
          <Typography>
            Ce site utilise des cookies essentiels pour garantir son bon
            fonctionnement. En poursuivant votre navigation, vous acceptez
            l'utilisation de ces cookies.
          </Typography>
        </Alert>
      </Snackbar>
    )
  );
};

export default CookieBanner;
