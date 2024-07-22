import React from "react";
import Box from "@mui/material/Box";
import HomeMaxRoundedIcon from '@mui/icons-material/HomeMaxRounded';
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "react-scroll";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const TabBar = () => {
  return (
    <Box sx={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          width: "90%",
          justifyContent: "center",
          gap: 3,
          maxWidth: "300px",
          position: "fixed",
          bottom: "1rem",
          zIndex: "4",
          backdropFilter: "blur(5px)",
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "10px",
          padding: "10px"
        }}
      >
        <Link to="video" spy={true} smooth={true} offset={0} duration={500}>
          <HomeMaxRoundedIcon sx={{ cursor: "pointer", ":hover": { scale: "1.1" }, color: "black" }} />
        </Link>
        <Link to="about" spy={true} smooth={true} offset={0} duration={500}>
          <InfoIcon sx={{ cursor: "pointer", ":hover": { scale: "1.1" }, color: "black" }} />
        </Link>
        <Link to="membership" spy={true} smooth={true} offset={0} duration={500}>
          <MilitaryTechIcon sx={{ cursor: "pointer", ":hover": { scale: "1.1" }, color: "black" }} />
        </Link>
        <Link to="contact" spy={true} smooth={true} offset={50} duration={500}>
          <ContactMailIcon sx={{ cursor: "pointer", ":hover": { scale: "1.1" }, color: "black" }} />
        </Link>
      </Box>
    </Box>
  );
};

export default TabBar;
