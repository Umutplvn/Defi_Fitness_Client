// src/components/CheckoutButton.js
import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CheckoutButton = () => {
  const {userId} =useSelector((state)=>state.auth) 
  const priceId = "price_1PnABkP3dSOC4uCmWjEsUf3p";
  const publicKey = "pk_test_51Pn9FyP3dSOC4uCmkRJQFsEvnDJQSLarGeZzKIjjYh488gsvLNNUyHjToy1o6BlQ3aHw8GfAnnVzHYx3AP1dBHiv00GG187Rwo";

  const handleClick = async () => {
    try {
      const response = await axios.post(`https://defi-fitness-api.onrender.com/api/create-checkout-session`, { priceId, userId });

      const { sessionId } = response.data;

      const stripe = window.Stripe(publicKey);
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        console.error('Stripe not loaded');
      }
    } catch (error) {
      console.error('Failed to create checkout session', error);
    }
  };

  return (
    <Button  variant="soft"
    color="neutral"

    sx={{"&:hover":{backgroundColor:"#5b5b5b"}, backgroundColor:"#9a9a9a"}}
  onClick={handleClick}>
      Upgrade
    </Button>
  );
};

export default CheckoutButton;
