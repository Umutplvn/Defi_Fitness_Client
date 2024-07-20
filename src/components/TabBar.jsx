import * as React from "react";
import Box from "@mui/material/Box";
import HomeMaxRoundedIcon from '@mui/icons-material/HomeMaxRounded';import InfoIcon from "@mui/icons-material/Info";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "react-scroll";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
export default function TabPanel() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        gap: 3,
        position: "fixed",
        bottom: "1rem",
        zIndex: "4",
        backdropFilter: "blur(5px)", 
        background: "rgba(255, 255, 255, 0.5)", 
        borderRadius: "10px", 
        padding: "10px"
    }}
    >
      <Link to="video" spy={true} smooth={true} offset={0} duration={500} >
        <HomeMaxRoundedIcon sx={{cursor:"pointer", ":hover":{ scale:"1.1"}, color:"#E80110"}}/>
      </Link>

      <Link to="about" spy={true} smooth={true} offset={0} duration={500}>
        <InfoIcon sx={{cursor:"pointer" ,":hover":{ scale:"1.1"}, color:"#E80110"}} />
      </Link>

      <Link to="skills" spy={true} smooth={true} offset={0} duration={500}>
        <AutoFixHighIcon sx={{cursor:"pointer", ":hover":{ scale:"1.1"}, color:"#E80110" }} />
      </Link>

      <Link to="portfolio" spy={true} smooth={true} offset={0} duration={500}>
        <AccountTreeIcon sx={{cursor:"pointer", ":hover":{ scale:"1.1"}, color:"#E80110" }} />
      </Link>

      <Link  to="contact" spy={true} smooth={true} offset={50} duration={500}>
        <ContactMailIcon sx={{ cursor:"pointer", ":hover":{ scale:"1.1"}, color:"#E80110"}} />
      </Link>
    </Box>
  );
}
