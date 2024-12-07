import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../services/paymentService';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

// Charger la clé publique de Stripe
const stripePromise = loadStripe(
  'pk_test_51QO6NIDc4Et5GayXOqgDcD6UrzuN7cjqX6VoaBmop7BKYYeulgXGOTXfxkzOv27G2JYvamampKocn1GxEsNqToz100JXuXolOF'
); // Remplacez par votre clé Stripe publique

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError('Stripe n’est pas initialisé.');
      setLoading(false);
      return;
    }

    try {
      // Appeler le backend pour créer un PaymentIntent
      const { clientSecret } = await createPaymentIntent();

      // Confirmer le paiement
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setSuccess(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    } catch (err) {
      setError('Erreur lors du traitement du paiement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, margin: '0 auto' }}
    >
      <Typography variant="h5" gutterBottom>
        Paiement de l'abonnement
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      {success ? (
        <Alert severity="success">
          Paiement réussi ! Merci pour votre abonnement.
        </Alert>
      ) : (
        <>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
            }}
          />
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!stripe || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Payer 3,99 €'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
