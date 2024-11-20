import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  AttachMoney,
  Business,
  HealthAndSafety,
  Psychology,
  Language,
  School,
  Mood,
  Group,
  Assignment,
  ListAlt,
} from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
}));

const IconWrapper = styled(Box)(({ bgColor }) => ({
  backgroundColor: bgColor,
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  marginBottom: '16px',
  color: '#fff',
}));

const cardData = [
  {
    title: 'Budget',
    icon: <AttachMoney fontSize="large" />,
    color: '#4CAF50',
    route: '/projects/create/finance/budget',
  },
  {
    title: 'Business',
    icon: <Business fontSize="large" />,
    color: '#2196F3',
    route: '/projects/create/finance/business',
  },
  {
    title: 'Weight Loss',
    icon: <HealthAndSafety fontSize="large" />,
    color: '#FF9800',
    route: '/projects/create/health/weight-loss',
  },
  {
    title: 'Stress Management',
    icon: <Psychology fontSize="large" />,
    color: '#F44336',
    route: '/projects/create/health/stress-management',
  },
  {
    title: 'Language Learning',
    icon: <Language fontSize="large" />,
    color: '#9C27B0',
    route: '/projects/create/education/language-learning',
  },
  {
    title: 'Skill Acquisition',
    icon: <School fontSize="large" />,
    color: '#FFEB3B',
    route: '/projects/create/education/skill-acquisition',
  },
  {
    title: 'Emotional Resilience',
    icon: <Mood fontSize="large" />,
    color: '#3F51B5',
    route: '/projects/create/personal/emotional-resilience',
  },
  {
    title: 'Social Skills',
    icon: <Group fontSize="large" />,
    color: '#00BCD4',
    route: '/projects/create/personal/social-skills',
  },
  {
    title: 'Project Management',
    icon: <Assignment fontSize="large" />,
    color: '#FF5722',
    route: '/projects/create/productivity/project-management',
  },
  {
    title: 'Task Management',
    icon: <ListAlt fontSize="large" />,
    color: '#607D8B',
    route: '/projects/create/productivity/task-management',
  },
];

const CreateProjectForms = () => {
  const navigate = useNavigate();

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme?.palette?.background?.paper || '#fff', // Ajoutez une valeur par défaut
    borderRadius: '16px',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    },
  }));

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '24px',
        }}
      >
        Créez votre prochain projet
      </Typography>
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard onClick={() => navigate(card.route)}>
              <CardContent style={{ textAlign: 'center', padding: '24px' }}>
                <IconWrapper bgColor={card.color}>{card.icon}</IconWrapper>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '600',
                    color: card.color,
                    marginBottom: '8px',
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: '1.5em' }}
                >
                  Cliquez pour commencer votre projet {card.title.toLowerCase()}{' '}
                  dès maintenant.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CreateProjectForms;
