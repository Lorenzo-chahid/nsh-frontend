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

// Importer CookieBanner
import CookieBanner from './components/CookieBanner';

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
          <CookieBanner /> {/* Ajouter la bannière de cookies */}
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
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <PrivateAdminRoute>
                  <AdminPanel />
                </PrivateAdminRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="tables" element={<TablesView />} />
              <Route path="chat" element={<AdminChatView />} />
            </Route>
          </Routes>
        </MainContainer>
      </AuthProvider>
    </Router>
  );
};

export default App;
