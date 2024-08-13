// src/components/CheckoutButton.js
import React from 'react';
import { Button } from '@mui/material';

const CheckoutButton = ({ priceId }) => {
  const handleClick = async () => {

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    if (!response.ok) {
      console.error('Failed to create checkout session');
      return;
    }

    const { sessionId } = await response.json();
    const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); 
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Upgrade
    </Button>
  );
};

export default CheckoutButton;
