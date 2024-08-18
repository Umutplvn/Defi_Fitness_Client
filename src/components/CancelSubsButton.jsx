import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";

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
    <Button             type="submit"
    variant="contained"
    sx={{
      mt: 4,
      mb: 5,
      textAlign: "center",
      backgroundColor: "#000000",
      color: "white",
      borderRadius: "0.7rem",
      width: "5rem",
      transition: "0.2s",
      "&:hover": {
        backgroundColor: "#37a629",
        color: "white",
      },
    }}
    onClick={handleCancelSubscription}
  >
    Yes
    </Button>
  );
};

export default CancelSubscriptionButton;
