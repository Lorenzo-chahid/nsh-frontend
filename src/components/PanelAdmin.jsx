import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import UserList from './UserList';
import ProjectList from './ProjectList'; // Crée ces composants similaires à UserList
import CourseList from './CourseList';

const dataProvider = jsonServerProvider('http://localhost:8000/api/v1/admin');

const AdminPanel = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} />
      <Resource name="projects" list={ProjectList} />
      <Resource name="courses" list={CourseList} />
    </Admin>
  );
};

export default AdminPanel;
