import React, { useCallback, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Fade,
  useScrollTrigger,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import guardiansImage from '../../gardiens.png';
import noviceImage from './novice.png';
import adventurerImage from './adventurer.png';
import trackerImage from './tracker.png';
import { Security, Shield, Favorite } from '@mui/icons-material'; // Icônes Material-UI

const classesData = [
  {
    id: 'novice',
    name: 'Novice',
    description: 'Le point de départ pour tout Gardien. Apprenez à protéger et soutenir votre clan.',
    image: noviceImage,
  },
  {
    id: 'defender',
    name: 'Défenseur',
    description: 'Un Gardien expérimenté, spécialisé dans la protection et la résilience.',
    image: adventurerImage,
  },
  {
    id: 'guardian',
    name: 'Gardien Suprême',
    description: 'Maître de la défense et de l’organisation, guidant le clan vers la victoire.',
    image: trackerImage,
  },
];

function ScrollAnimation({ children, window }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 80,
  });

  return (
    <Fade in={trigger} timeout={800}>
      <div>{children}</div>
    </Fade>
  );
}

const Guardians = () => {
  const { t } = useTranslation();
  const [activeClass, setActiveClass] = useState(classesData[0]); // Classe active par défaut : Novice

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
      },
      modes: {
        push: { quantity: 2 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: '#00ffcc' }, // Couleur spécifique pour les Guardians
      move: { enable: true, speed: 1.5 },
      number: { density: { enable: true, area: 800 }, value: 40 },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 3 } },
    },
  };

  const explanations = [
    {
      title: t('guardians.nansheTitle'),
      description: t('guardians.nansheDescription'),
      icon: <Shield fontSize="large" color="primary" />,
    },
    {
      title: t('guardians.clanTitle'),
      description: t('guardians.clanDescription'),
      icon: <Security fontSize="large" color="secondary" />,
    },
    {
      title: t('guardians.benefitsTitle'),
      description: t('guardians.benefitsDescription'),
      icon: <Favorite fontSize="large" color="error" />,
    },
  ];

  return (
    <div>
      {/* Meta tags */}
      <Helmet>
        <title>{t('guardians.meta.title')}</title>
        <meta name="description" content={t('guardians.meta.description')} />
        <meta name="keywords" content={t('guardians.meta.keywords')} />
      </Helmet>

      {/* En-tête */}
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
              linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),
              url(${guardiansImage})
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
                maxWidth: { xs: '95%', md: '70%' },
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
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  mb: 2,
                  fontWeight: 700,
                  textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                }}
              >
                {t('guardians.title')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1rem', md: '1.8rem' },
                  textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
                }}
              >
                {t('guardians.subtitle')}
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Box>

      {/* Section Explications */}
      <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
        {explanations.map((item, index) => (
          <Grid
            container
            spacing={4}
            key={index}
            sx={{ mb: 6 }}
            alignItems="center"
            justifyContent="center"
            direction={index % 2 === 0 ? 'row' : 'row-reverse'}
          >
            <Grid item xs={12} md={6} textAlign="center">
              {item.icon}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  lineHeight: 1.8,
                }}
              >
                {item.description}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Container>

      {/* Section Classes */}
      <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
        <ScrollAnimation>
          <Typography
            variant="h4"
            sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}
          >
            {t('guardians.classesTitle')}
          </Typography>
        </ScrollAnimation>
        <Grid container spacing={4} justifyContent="center">
          {classesData.map((cls) => (
            <Grid item xs={12} sm={4} key={cls.id}>
              <Box
                onClick={() => setActiveClass(cls)}
                sx={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 2,
                  border: cls.id === activeClass.id ? '3px solid #00ffcc' : '3px solid transparent',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { borderColor: '#00ffcc' },
                }}
              >
                <img
                  src={cls.image}
                  alt={cls.name}
                  style={{
                    maxWidth: '150px',
                    height: '150px',
                    borderRadius: '15px',
                    marginBottom: '1rem',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                  }}
                >
                  {cls.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Classe active */}
        <ScrollAnimation>
          <Box
            sx={{
              mt: 6,
              p: 4,
              borderRadius: 2,
              bgcolor: 'rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
              maxWidth: '80%',
              mx: 'auto',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontWeight: 600,
                mb: 2,
              }}
            >
              {activeClass.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.8 }}
            >
              {activeClass.description}
            </Typography>
          </Box>
        </ScrollAnimation>
      </Container>
    </div>
  );
};

export default Guardians;