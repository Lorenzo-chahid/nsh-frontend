import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { signupUser, loginUser } from '../authService';

const AuthModal = ({ open, onClose, onAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signupUser(email, email.split('@')[0], password);
      } else {
        await loginUser(email, password);
      }

      onAuthenticated(); // Appeler la fonction pour notifier que l'utilisateur est connecté
      onClose(); // Fermer la modale
    } catch (err) {
      setError(
        isSignUp
          ? "L'inscription a échoué. Essayez avec un autre email."
          : 'Connexion échouée. Vérifiez vos identifiants.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isSignUp ? 'Créer un compte' : 'Connexion'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          type="email"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', cursor: 'pointer', color: 'primary.main' }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? 'Vous avez déjà un compte ? Connectez-vous'
            : "Vous n'avez pas de compte ? Inscrivez-vous"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Annuler
        </Button>
        <Button
          onClick={handleAuth}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : isSignUp ? (
            "S'inscrire"
          ) : (
            'Se connecter'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
