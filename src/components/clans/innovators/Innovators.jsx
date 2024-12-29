import React, { useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import innovatorsImage from '../../inno.png'; // Import de l'image des Innovateurs

function ScrollAnimation({ children, window }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 80,
  });

  return (
    <Slide in={trigger} direction="up" timeout={800}>
      <div>{children}</div>
    </Slide>
  );
}

const Innovators = () => {
  const { t } = useTranslation();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: false,
    background: {
      color: 'transparent',
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        onClick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: { value: '#ffcc00' }, // Couleur des particules (Innovateurs)
      links: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 1.8,
        direction: 'none',
        outModes: 'bounce',
        random: false,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.7,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3.5 },
      },
    },
    detectRetina: true,
  };

  return (
    <div>
      <Helmet>
        <title>{t('innovators.meta.title')}</title>
        <meta name="description" content={t('innovators.meta.description')} />
        <meta name="keywords" content={t('innovators.meta.keywords')} />
      </Helmet>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: `
              linear-gradient(
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.6)
              ),
              url(${innovatorsImage})
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <Fade in timeout={1500}>
            <Box
              sx={{
                maxWidth: { xs: '90%', md: '60%' },
                mx: 'auto',
                backdropFilter: 'blur(2px)',
                p: { xs: 2, md: 4 },
                borderRadius: 2,
                bgcolor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  mb: 2,
                  fontWeight: 700,
                  textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                }}
              >
                {t('innovators.title')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1rem', md: '1.5rem' },
                  textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
                }}
              >
                {t('innovators.subtitle')}
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <ScrollAnimation>
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              {t('innovators.nansheTitle')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.8 }}
            >
              {t('innovators.nansheDescription')}
            </Typography>
          </Box>
        </ScrollAnimation>

        <ScrollAnimation>
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              {t('innovators.clanTitle')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.8 }}
            >
              {t('innovators.clanDescription')}
            </Typography>
          </Box>
        </ScrollAnimation>

        <Fade in timeout={1800}>
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                textTransform: 'uppercase',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
              }}
            >
              {t('innovators.joinButton')}
            </Button>
          </Box>
        </Fade>
      </Container>
    </div>
  );
};

export default Innovators;