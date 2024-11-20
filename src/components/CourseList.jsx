// src/components/CoursesList.js

import React, { useEffect, useState } from 'react';
import { fetchUserCourses } from '../CourseService';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchUserCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

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

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Mes Cours
      </Typography>
      <Divider />
      <List>
        {courses.map(course => (
          <React.Fragment key={course.id}>
            <ListItem
              alignItems="flex-start"
              component={Link}
              to={`/courses/${course.id}`}
              button
            >
              <ListItemText
                primary={course.title}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {course.description}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/courses/new"
        >
          Ajouter un Nouveau Cours
        </Button>
      </Box>
    </Box>
  );
};

export default CoursesList;
