import api from '../api'; // Assurez-vous que ce fichier utilise Axios

export const createStripeSession = async priceId => {
  const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token');

  console.log('Creating Stripe session with:', { priceId, token });

  const response = await fetch('/v1/payments/create-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Envoi du token au backend
    },
    body: JSON.stringify({ priceId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Backend error:', errorData);
    throw new Error(`Stripe session creation failed: ${response.statusText}`);
  }

  return response.json();
};

export const createPaymentIntent = async () => {
  try {
    const response = await api.post('/payments/create-intent');
    return response.data; // Retourne le client_secret
  } catch (error) {
    console.error('Erreur lors de la création du PaymentIntent :', error);
    throw new Error('Impossible de créer un PaymentIntent');
  }
};
