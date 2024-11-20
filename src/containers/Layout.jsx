// src/containers/Layout.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatButton from '../components/ChatButton'; // Ajustez le chemin si nécessaire
import ChatWindow from '../components/ChatWindow'; // Ajustez le chemin si nécessaire
import { useAuth } from '../context/AuthContext'; // Assurez-vous que le chemin est correct

const Layout = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const { user } = useAuth(); // Récupérer les informations de l'utilisateur depuis le contexte

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/admin">Admin Home</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
            <li>
              <Link to="/admin/projects">Projects</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">{children}</main>

      {/* Bouton de Chat */}
      <ChatButton onClick={() => setChatOpen(true)} />

      {/* Fenêtre de Chat */}
      <ChatWindow
        open={chatOpen}
        handleClose={() => setChatOpen(false)}
        currentPage={window.location.pathname} // Passez le chemin actuel pour le contexte
      />
    </div>
  );
};

export default Layout;
