// src/context/AuthContext.jsx

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  refreshAccessToken as refreshTokenService,
  logoutUser,
  getAccessToken,
} from '../authService'; // Assurez-vous que le chemin est correct

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token') ||
      null
  );
  const navigate = useNavigate();

  // Fonction pour décoder un token JWT
  const decodeJWT = token => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (e) {
      console.error('Failed to decode JWT:', e);
      return {};
    }
  };

  // Fonction pour initialiser l'utilisateur à partir du token
  const initializeUser = useCallback(async () => {
    if (token) {
      try {
        const payload = decodeJWT(token);
        if (payload && payload.sub) {
          setUser({
            email: payload.sub,
            // Ajoutez d'autres informations utilisateur si disponibles
          });
        }
      } catch (error) {
        console.error('Error initializing user:', error);
        logout();
      }
    }
  }, [token]);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  // Fonction pour rafraîchir le token d'accès en utilisant le refresh token
  const refreshAccessToken = useCallback(async () => {
    try {
      const newAccessToken = await refreshTokenService();
      setToken(newAccessToken);
      setUser({
        email: decodeJWT(newAccessToken).sub,
        // Ajoutez d'autres informations utilisateur si disponibles
      });
    } catch (error) {
      console.error('Error refreshing token', error);
      logout();
    }
  }, []);

  // Rafraîchit le token toutes les 15 minutes
  useEffect(() => {
    const tokenInterval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000);

    return () => clearInterval(tokenInterval);
  }, [refreshAccessToken]);

  // Fonction de connexion
  const login = async (identifier, password, rememberMe) => {
    try {
      const response = await loginUser(identifier, password, rememberMe);
      // Supposons que le backend retourne seulement les tokens
      setToken(response.access_token);
      setUser({
        email: decodeJWT(response.access_token).sub, // Décoder le token pour obtenir l'email
        // Ajoutez d'autres informations utilisateur si disponibles
      });

      navigate('/dashboard');
      console.log('Réponse du backend:', response);
    } catch (error) {
      console.error('Erreur pendant le login:', error);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
