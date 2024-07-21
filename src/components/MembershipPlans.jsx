import { Box, Typography } from "@mui/material";
import React from "react";

const MembershipPlans = () => {
  return (
    <Box 
      id="membership" 
      sx={{ 
        width: "100wh", 
        height: "100vh", 
        padding: "1rem", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        gap: "1rem"
      }}
    >
      <Box
         sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: { xs: "center", sm: "left" },
          gap: "0.5rem",
          width: "100%", 
          maxWidth: "500px"
        }}
      >
        <Typography sx={{ fontSize: { xs: "4rem", sm: "6rem", md: "8rem" }}}>🥇</Typography>
        <Box sx={{ width: { xs: "100%", sm: "80%" }}}> 
          <Typography sx={{ fontSize: { xs: "1.4rem", sm: "1.6rem" }, fontWeight: "600" }}>
            GOLDEN MEMBERSHIP
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            • Unlimited coach messaging
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            • Full access to all videos and articles
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            • Exclusive content and updates
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: { xs: "center", sm: "left" },
          gap: "0.5rem",
          width: "100%", 
          maxWidth: "500px"
        }}
      >
        <Typography sx={{ fontSize: { xs: "4rem", sm: "6rem", md: "8rem" }}}>🥈</Typography>
        <Box sx={{ width: { xs: "100%", sm: "80%" }}}> 
          <Typography sx={{ fontSize: { xs: "1.4rem", sm: "1.6rem" }, fontWeight: "600" }}>
            SILVER MEMBERSHIP
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            • Limited coach messaging
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            • Get training programs via email
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            • Access to selected videos and articles
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: { xs: "center", sm: "left" },
          gap: "0.5rem",
          width: "100%", 
          maxWidth: "500px"
        }}
      >
        <Typography sx={{ fontSize: { xs: "4rem", sm: "6rem", md: "8rem" }}}>🥉</Typography>
        <Box sx={{ width: { xs: "100%", sm: "80%" }}}> 
          <Typography sx={{ fontSize: { xs: "1.4rem", sm: "1.6rem" }, fontWeight: "600" }}>
            BRONZE MEMBERSHIP
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            • Limited coach messaging
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            • Get training programs via email
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MembershipPlans;
