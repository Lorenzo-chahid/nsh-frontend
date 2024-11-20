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
  Snackbar,
  Alert,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { getCategoriesFromInput } from '../categoryService';
import Carousel from 'react-material-ui-carousel';
import { motion } from 'framer-motion';

const images = [
  { url: '/images/slider1.jpg', caption: 'Découvrez de nouveaux horizons' },
  { url: '/images/slider2.jpg', caption: 'Boostez vos compétences' },
  {
    url: '/images/slider3.jpg',
    caption: 'Rejoignez une communauté passionnée',
  },
];

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(true);
  const [bannerVisible, setBannerVisible] = useState(true);

  const handleInputChange = e => {
    const value = e.target.value;
    setInputValue(value);

    // Obtenir les catégories en fonction de l'input
    const matchedCategories = getCategoriesFromInput(value);
    setCategories(matchedCategories);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleBannerClose = () => {
    setBannerVisible(false);
  };

  return (
    <div>
      {/* Banderole d'information */}
      {bannerVisible && (
        <AppBar position="static" sx={{ bgcolor: 'secondary.main' }}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 16px',
            }}
          >
            <Typography variant="body1" sx={{ color: 'white' }}>
              🚧 Le site est en pré-alpha : toutes les données peuvent être
              effacées. Les inscriptions sont ouvertes, mais des mises à jour
              majeures sont prévues.
              <br />
              🚧 This site is in pre-alpha: all data may be erased.
              Registrations are open, but major updates are coming.
            </Typography>
            <IconButton onClick={handleBannerClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Notification au chargement de la page */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={10000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity="info"
          sx={{
            width: '100%',
            backgroundColor: 'secondary.main',
            color: 'white',
          }}
        >
          🚧 Le site est en pré-alpha : toutes les données peuvent être
          effacées. 🚧 This site is in pre-alpha: all data may be erased.
        </Alert>
      </Snackbar>

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
            Bienvenue sur <span style={{ color: '#6a5acd' }}>Nanshe</span>
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={2}>
            La plateforme qui révolutionne l’apprentissage, la productivité et
            le bien-être.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Rejoignez-nous
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
                    {item.caption}
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
              label="Rechercher un projet ou une catégorie"
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
            Qu'est-ce que Nanshe ?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="sm"
            mx="auto"
          >
            Une plateforme innovante offrant des projets enrichissants dans
            divers domaines comme la finance, la santé, et le développement
            personnel. Rejoignez-nous pour faire partie de la communauté.
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
                Apprentissage interactif
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Participez à des projets pratiques et développez de nouvelles
                compétences.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 4, backgroundColor: '#f8f8f8' }}
            >
              <Typography variant="h6" color="primary.main">
                Communauté engagée
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Échangez avec d’autres passionnés et progressez ensemble.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 4, backgroundColor: '#f8f8f8' }}
            >
              <Typography variant="h6" color="primary.main">
                Objectifs personnalisés
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Avancez à votre rythme et mesurez votre progression.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
