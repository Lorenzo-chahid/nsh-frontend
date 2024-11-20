import React, { useState, useEffect } from 'react';
import { analyzeRequest } from '../api';
import {
  Box,
  Button,
  TextField,
  Container,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mapping des URLs en fonction des catégories et sous-catégories
const REDIRECT_PATHS = {
  'Finance / Business': {
    'Gestion de budget': '/projects/create/finance/budget',
    "Création d'entreprise": '/projects/create/finance/startup',
    Investissement: '/projects/create/finance/investment',
  },
  'Santé / Bien-être': {
    'Perte de poids': '/projects/create/health/weight-loss',
    'Condition physique': '/projects/create/health/weight-loss',
    'Bien-être mental': '/projects/create/health/mental-wellbeing',
  },
  'Education / Apprentissage': {
    'Apprentissage linguistique': '/projects/create/education/language',
    'Acquisition de compétences': '/projects/create/education/skills',
  },
  'Productivité / Gestion de projet': {
    'Gestion de projet': '/projects/create/productivity/project-management',
    'Amélioration de la productivité':
      '/projects/create/productivity/improvement',
  },
  'Développement personnel': {
    'Amélioration de soi': '/projects/create/self-development/improvement',
    'Gestion du stress': '/projects/create/self-development/stress-management',
  },
};

const CreateProject = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await analyzeRequest(userInput, 'fr');
      setAnalysisResult(response);
    } catch (error) {
      console.error("Erreur lors de l'analyse", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (analysisResult) {
      const { category, subcategory } = analysisResult;
      const redirectPath = REDIRECT_PATHS[category]?.[subcategory];
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        console.warn('No redirect path found for this category/subcategory');
      }
    }
  }, [analysisResult, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          mt: 4,
          background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
          borderRadius: 4,
          boxShadow: '8px 8px 16px #cfcfcf, -8px -8px 16px #ffffff',
        }}
        component={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            Quelle est votre demande ?
          </Typography>
          <TextField
            fullWidth
            label="Votre demande"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAnalyze}
            disabled={loading}
            fullWidth
            sx={{
              padding: 1.5,
              fontSize: '1rem',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Analyser'}
          </Button>
        </Box>

        {analysisResult && (
          <Box mt={4}>
            <Typography variant="h6">Résultats de l'analyse</Typography>
            <Typography>Catégorie : {analysisResult.category}</Typography>
            <Typography>
              Sous-catégorie : {analysisResult.subcategory}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default CreateProject;
