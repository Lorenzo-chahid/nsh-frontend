import React, { useState, useEffect } from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const SkillsManager = ({ projectId, userData, onNextStep }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSkills = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/v1/skills/generate', {
        project_id: projectId,
        user_data: userData,
      });
      setSkills(response.data.skills);
    } catch (err) {
      setError('Erreur lors de la génération des compétences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateSkills();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <CircularProgress />
          <Typography>Génération des compétences...</Typography>
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div>
          <Typography variant="h6">Compétences générées :</Typography>
          <ul>
            {skills.map(skill => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
          <Button variant="contained" color="primary" onClick={onNextStep}>
            Valider et continuer
          </Button>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
