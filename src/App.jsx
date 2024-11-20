// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateProject from './components/CreateProject';
import ManageProjects from './components/ManageProjects';
import Home from './components/Home';
import ThreeDCharacter from './components/ThreeDCharacter';
import CourseList from './components/CourseList';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Course from './components/Course';
import { AuthProvider } from './context/AuthContext';
import MainContainer from './components/MainContainer';
import PrivateRoute from './components/PrivateRoute';
import IsometricWorld from './components/IsometricWorld';
import UserProfile from './components/user/UserProfile';
import UserCalendar from './components/Calendar';

// Importer les formulaires dynamiques
import BusinessForm from './components/forms/business/BusinessForm';
import BudgetForm from './components/forms/business/BudgetForm';
import LanguageLearningForm from './components/forms/education/LanguageLearningForm';
import SkillAcquisitionForm from './components/forms/education/SkillAcquisitionForm';
import StressManagement from './components/forms/health/StressManagement';
import WeightLossForm from './components/forms/health/WeightLossForm';
import EmotionalResilienceForm from './components/forms/personal/EmotionalResilienceForm';
import SocialSkillsForm from './components/forms/personal/SocialSkillsForm';
import ProjectManagementForm from './components/forms/productivity/ProjectManagementForm';
import TaskManagementForm from './components/forms/productivity/TaskManagementForm';
import NotificationsPage from './components/NotificationsPage'; // Importer le nouveau composant

// Importer les composants Admin
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import TablesView from './components/admin/TablesView';
import PrivateAdminRoute from './components/admin/PrivateAdminRoute';
import AdminPanel from './components/admin/AdminPanel';
import AdminChatView from './components/admin/AdminChatView'; // Nouveau composant si nécessaire

// Importer le composant ProjectDetails
import ProjectDetails from './components/ProjectDetails'; // Nouveau composant pour afficher les détails du projet

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MainContainer>
          <Routes>
            {/* Routes Publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignIn />} />
            <Route path="/isometric-world" element={<IsometricWorld />} />

            {/* Routes Protégées pour Utilisateurs */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <UserCalendar />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create"
              element={
                <PrivateRoute>
                  <CreateProject />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/manage"
              element={
                <PrivateRoute>
                  <ManageProjects />
                </PrivateRoute>
              }
            />
            {/* Nouvelle Route pour afficher les détails d'un projet */}
            <Route
              path="/projects/:projectId"
              element={
                <PrivateRoute>
                  <ProjectDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <CourseList />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/:courseId"
              element={
                <PrivateRoute>
                  <Course />
                </PrivateRoute>
              }
            />
            <Route
              path="/game"
              element={
                <PrivateRoute>
                  <ThreeDCharacter />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <NotificationsPage />
                </PrivateRoute>
              }
            />
            {/* Routes pour les formulaires dynamiques basés sur catégorie et sous-catégorie */}
            <Route
              path="/projects/create/finance/budget"
              element={
                <PrivateRoute>
                  <BudgetForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create/finance/business"
              element={
                <PrivateRoute>
                  <BusinessForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create/health/weight-loss"
              element={
                <PrivateRoute>
                  <WeightLossForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create/health/stress-management"
              element={
                <PrivateRoute>
                  <StressManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create/education/language-learning"
              element={
                <PrivateRoute>
                  <LanguageLearningForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create/education/skill-acquisition"
              element={
                <PrivateRoute>
                  <SkillAcquisitionForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create/personal/emotional-resilience"
              element={
                <PrivateRoute>
                  <EmotionalResilienceForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create/personal/social-skills"
              element={
                <PrivateRoute>
                  <SocialSkillsForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create/productivity/project-management"
              element={
                <PrivateRoute>
                  <ProjectManagementForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create/productivity/task-management"
              element={
                <PrivateRoute>
                  <TaskManagementForm />
                </PrivateRoute>
              }
            />

            {/* Routes Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <PrivateAdminRoute>
                  <AdminPanel />
                </PrivateAdminRoute>
              }
            >
              {/* Routes imbriquées pour l'AdminPanel */}
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="tables" element={<TablesView />} />
              <Route path="chat" element={<AdminChatView />} />
              {/* Ajoutez d'autres routes administratives ici si nécessaire */}
            </Route>
          </Routes>
        </MainContainer>
      </AuthProvider>
    </Router>
  );
};

export default App;
