import React from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import useAuthCall from '../hooks/useAuthCall';

const CancelSubscriptionButton = ({ stripeCustomerId }) => {
  const { userId } = useSelector((state) => state.auth);
  const { cancelUserSubscription } = useAuthCall();

  const handleCancelSubscription = async () => {
    try {
      await cancelUserSubscription(stripeCustomerId, userId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleCancelSubscription}
    >
      Cancel
    </Button>
  );
};

export default CancelSubscriptionButton;
