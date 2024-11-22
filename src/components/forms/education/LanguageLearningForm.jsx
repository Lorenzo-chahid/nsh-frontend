import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const LanguageLearningForm = () => {
  const { token } = useAuth();
  const { t } = useTranslation(); // Hook pour les traductions
  const [language, setLanguage] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [learningMethod, setLearningMethod] = useState('');
  const [duration, setDuration] = useState('');
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const languageLearningData = {
      language,
      current_level: currentLevel,
      learning_method: learningMethod,
      duration: parseInt(duration),
    };

    setLoading(true);
    try {
      const response = await axios.post(
        '/api/v1/forms/language-learning/',
        languageLearningData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProject(response.data);
      setError(null);
    } catch (error) {
      setError(t('languageLearning.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {t('languageLearning.title')}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label={t('languageLearning.languageLabel')}
          fullWidth
          margin="normal"
          value={language}
          onChange={e => setLanguage(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          select
          label={t('languageLearning.currentLevelLabel')}
          fullWidth
          margin="normal"
          value={currentLevel}
          onChange={e => setCurrentLevel(e.target.value)}
          required
          disabled={loading}
        >
          {Object.keys(
            t('languageLearning.levels', { returnObjects: true })
          ).map(level => (
            <Tooltip
              key={level}
              title={t(`languageLearning.levels.${level}.description`)}
              placement="right"
            >
              <MenuItem value={level}>
                {t(`languageLearning.levels.${level}.label`)} ({level})
              </MenuItem>
            </Tooltip>
          ))}
        </TextField>
        <TextField
          select
          label={t('languageLearning.learningMethodLabel')}
          fullWidth
          margin="normal"
          value={learningMethod}
          onChange={e => setLearningMethod(e.target.value)}
          required
          disabled={loading}
        >
          {['immersion', 'grammar', 'oral', 'other'].map(method => (
            <MenuItem key={method} value={method}>
              {t(`languageLearning.methods.${method}`)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label={t('languageLearning.durationLabel')}
          type="number"
          fullWidth
          margin="normal"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          required
          disabled={loading}
        />

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading
              ? t('languageLearning.loading')
              : t('languageLearning.submit')}
          </Button>
        </Box>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {project && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">
            {t('languageLearning.projectCreated')}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {project.course}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default LanguageLearningForm;
