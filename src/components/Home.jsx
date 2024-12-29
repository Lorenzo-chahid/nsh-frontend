import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import CookieConsentModal from './cookies/CookieConsentModal';
import AuthModal from './AuthModal';
import explorersImage from './expo.png';
import guardiansImage from './gardiens.png';
import innovatorsImage from './inno.png';
import shadowAgentsImage from './ombre.png';
import bannerImage from './bann.png';

const clans = [
  {
    id: 'explorers',
    titleKey: 'clans.explorers.title',
    descriptionKey: 'clans.explorers.description',
    backgroundImage: explorersImage,
    buttonTextKey: 'clans.explorers.join',
    link: '/#/clans/explorators',
  },
  {
    id: 'guardians',
    titleKey: 'clans.guardians.title',
    descriptionKey: 'clans.guardians.description',
    backgroundImage: guardiansImage,
    buttonTextKey: 'clans.guardians.join',
    link: '/#/clans/guardians',
  },
  {
    id: 'innovators',
    titleKey: 'clans.innovators.title',
    descriptionKey: 'clans.innovators.description',
    backgroundImage: innovatorsImage,
    buttonTextKey: 'clans.innovators.join',
    link: '/#/clans/innovators',
  },
  {
    id: 'shadow_agents',
    titleKey: 'clans.shadow_agents.title',
    descriptionKey: 'clans.shadow_agents.description',
    backgroundImage: shadowAgentsImage,
    buttonTextKey: 'clans.shadow_agents.join',
    link: '/#/clans/shadow_agents',
  },
];

const carouselItems = [
  {
    title: 'Bienvenue sur Nanshe',
    description: 'Une plateforme collaborative et gamifiée pour réaliser vos projets, apprendre et progresser.',
    background: bannerImage,
  },
  {
    title: 'Apprenez à votre rythme',
    description: 'Découvrez des cours et des projets adaptés à vos besoins et objectifs personnels.',
    background: bannerImage,
  },
  {
    title: 'Rejoignez une communauté',
    description: 'Collaborez avec d’autres utilisateurs pour atteindre vos objectifs communs.',
    background: bannerImage,
  },
];

const Home = () => {
  const { t } = useTranslation();
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  useEffect(() => {
    const storedPrefs = localStorage.getItem('cookie_preferences');
    if (!storedPrefs) {
      setCookieModalOpen(true);
    }
  }, []);

  const handleCloseCookieModal = () => {
    setCookieModalOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
        <meta name="keywords" content={t('home.meta.keywords')} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nanshe.fr" />
      </Helmet>

      <CookieConsentModal
        open={cookieModalOpen}
        onClose={handleCloseCookieModal}
      />

      {/* Header avec carrousel */}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Carousel
          indicators={false}
          autoPlay
          animation="fade"
          navButtonsAlwaysVisible
          interval={5000}
          sx={{
            height: '100%',
            '& .MuiPaper-root': {
              height: '100%',
            },
            '& .MuiTouchRipple-root': {
              height: '100%',
            },
          }}
          navButtonsProps={{
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              borderRadius: '50%',
              zIndex: 2,
            },
          }}
        >
          {carouselItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                height: '100%',
                width: '100%',
                backgroundImage: `url(${item.background})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Ajout d'un filtre sombre */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2, // Devant le filtre
                  backdropFilter: 'blur(3px)',
                  padding: { xs: 2, md: 4 },
                  borderRadius: 2,
                  color: '#fff',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>

      <Container maxWidth="lg">
        {clans.map((clan, index) => (
          <Box
            key={clan.id}
            sx={{
              position: 'relative',
              height: { xs: '50vh', sm: '75vh', md: '100vh' },
              backgroundImage: `url(${clan.backgroundImage})`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              mt: index === 0 ? 0 : 4,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              color="#fff"
              bgcolor="rgba(0, 0, 0, 0.5)"
              sx={{
                backdropFilter: 'blur(5px)',
                borderRadius: 4,
                px: { xs: 2, md: 4 },
                py: { xs: 3, md: 6 },
                maxWidth: { xs: '90%', md: '70%' },
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: '1.5rem', md: '3rem' }, mb: 2 }}
              >
                {t(clan.titleKey)}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, mb: 4 }}
              >
                {t(clan.descriptionKey)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => window.location.href = clan.link}
              >
                {t(clan.buttonTextKey)}
              </Button>
            </Box>
          </Box>
        ))}

        <Box mt={6} textAlign="center">
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 2 }}
          >
            {t('home.collaborative.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            {t('home.collaborative.description')}
          </Typography>
        </Box>
      </Container>

      <AuthModal
        open={false}
        onClose={() => {}}
        onAuthenticated={() => {}}
      />
    </div>
  );
};

export default Home;