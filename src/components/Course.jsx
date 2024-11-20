// src/components/Course.jsx

import React, { useEffect, useState } from 'react';
import { getCourseById, deleteCourse } from '../CourseService'; // Assurez-vous d'importer depuis CourseService
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
  const { courseId } = useParams(); // Récupérer courseId depuis l'URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utiliser useNavigate

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        setError('Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleDelete = async () => {
    try {
      await deleteCourse(courseId);
      navigate('/courses'); // Utiliser navigate pour rediriger
    } catch (err) {
      console.error('Failed to delete course:', err);
      alert('Failed to delete course');
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          Course not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          {course.title}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Supprimer le Cours
        </Button>
      </Box>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {course.description}
      </Typography>
      <Divider />

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Sections
        </Typography>
        {course.sections.map(section => (
          <Card key={section.id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{section.title}</Typography>
              <ReactMarkdown>{section.content}</ReactMarkdown>

              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Exercises
              </Typography>
              <List>
                {section.exercises.map(exercise => (
                  <ListItem key={exercise.id} alignItems="flex-start">
                    <ListItemText
                      primary={exercise.question}
                      secondary={exercise.answer}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CourseDetail;
