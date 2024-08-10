import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import "../styles/aboutCarousel.css";
import { GiArmorUpgrade } from "react-icons/gi";
import EditIcon from "@mui/icons-material/Edit";
import DiamondIcon from "@mui/icons-material/Diamond";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';

const Settings = () => {
  const { membership } = useSelector(
    (state) => state?.auth
  );


  return (
    <Box
      sx={{
        pl: { xs: "0", sm: "4.5rem", md: "10rem" },
        width: "100%",
        pt: "3rem",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem"
      }}
    >
      <Box
        sx={{
          width: "80%",
          maxWidth: "800px",
          height: "7rem",
          borderRadius: "1rem",
          display: "flex",
          backgroundColor: "#f3f3f3dd",
          border: "2px solid #b4b4b4dd",
          padding: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Monstserrat",
              fontSize: "1rem",
              fontWeight: "700",
            }}
          >
            Your plan
          </Typography>
          <Typography
            sx={{ fontWeight: "800", fontSize: "2rem" }}
            className="shiny-gold"
          >
            <span dangerouslySetInnerHTML={{ __html: membership }} />
          </Typography>
        </Box>

        <Box sx={{ cursor: "pointer" }}>
          <Typography
            sx={{
              fontFamily: "Monstserrat",
              fontSize: "1rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <GiArmorUpgrade />
            Change
          </Typography>
        </Box>
      </Box>
{/* Account */}
      <Box
        sx={{
          width: "80%",
          maxWidth: "800px",
          height: "7rem",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f3f3f3dd",
          border: "2px solid #b4b4b4dd",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Monstserrat",
            fontSize: "1.3rem",
            fontWeight: "700",
          }}
        >
          Account
        </Typography>

        <Typography
          sx={{
            mt: "0.7rem",
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            fontFamily: "Monstserrat",
            fontSize: "1.1rem",
            borderRadius: "0.3rem",
            p: "0.2rem",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#bcbcbcdd",
            },
          }}
        >
          <EditIcon sx={{ fontSize: "1.2rem", color: "#3f3f3f" }} />
          Edit Profile
        </Typography>
      </Box>
      
{/*  Subscription */}

      <Box
        sx={{
          width: "80%",
          maxWidth: "800px",
          height: "10rem",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f3f3f3dd",
          border: "2px solid #b4b4b4dd",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Monstserrat",
            fontSize: "1.3rem",
            fontWeight: "700",
          }}
        >
          Subscription
        </Typography>

        <Typography
          sx={{
            mt: "0.7rem",
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            fontFamily: "Monstserrat",
            fontSize: "1.1rem",
            borderRadius: "0.3rem",
            p: "0.2rem",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#bcbcbcdd",
            },
          }}
        >
          <DiamondIcon sx={{ fontSize: "1.2rem", color: "#6ee4fe" }} />
          Available Plans
        </Typography>
        <Typography
          sx={{
            mt: "0.7rem",
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            fontFamily: "Monstserrat",
            fontSize: "1.1rem",
            borderRadius: "0.3rem",
            p: "0.2rem",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#bcbcbcdd",
            },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: "1.2rem", color: "#3f3f3f" }} />
          Cancel subscription
        </Typography>
      </Box>
{/*  Security and Privacy */}
      <Box
        sx={{
          width: "80%",
          maxWidth: "800px",
          height: "10rem",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f3f3f3dd",
          border: "2px solid #b4b4b4dd",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Monstserrat",
            fontSize: "1.3rem",
            fontWeight: "700",
          }}
        >
          Security and Privacy
        </Typography>

        <Typography
          sx={{
            mt: "0.7rem",
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            fontFamily: "Monstserrat",
            fontSize: "1.1rem",
            borderRadius: "0.3rem",
            p: "0.2rem",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#bcbcbcdd",
            },
          }}
        >
          <HttpsRoundedIcon sx={{ fontSize: "1.2rem", color: "#3f3f3f" }} />
          Change Password
        </Typography>
        <Typography
          sx={{
            mt: "0.7rem",
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            fontFamily: "Monstserrat",
            fontSize: "1.1rem",
            borderRadius: "0.3rem",
            p: "0.2rem",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#bcbcbcdd",
            },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: "1.2rem", color: "#3f3f3f" }} />
          Cancel subscription
        </Typography>
      </Box>
    </Box>
  );
};

export default Settings;
