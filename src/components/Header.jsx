import { Box, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../assets/defi-icon.jpeg";

const Header = ({ play, setPlay }) => {
  const [isOpen, setOpen] = useState(false);

  const togglePlay = () => {
    setPlay((prevPlay) => !prevPlay);
    setOpen(!isOpen);
  };

  const headerStyles = {
    container: {
      position: "relative",
      width: "3rem",
      height: "3rem",
    },
    rotatingBorder: {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1.5px solid white",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      animation: "rotate 4s linear infinite",
      color: "white",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
    },
    "@keyframes rotate": {
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg)",
      },
    },
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100vw",
          height: "4.5rem",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pl: "1rem",
          pr: "1rem",
          zIndex: 4,
          m: "auto",
          position: "relative",
        }}
      >
        <Hamburger
          direction="right"
          size="22"
          toggled={isOpen}
          toggle={togglePlay}
        />
        <Box style={headerStyles.container}>
          <img src={Logo} alt="Rotating Logo" style={headerStyles.image} />
          <div style={headerStyles.rotatingBorder}></div>
          <style>
            {`
              @keyframes rotate {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </Box>
      </Box>
      <Box
        sx={{
          zIndex: 2,
          height: "10rem",
          backgroundColor: "black",
          color: "white",
          position: "absolute",
          top: isOpen ? "2rem" : "-100%",
          transition: "top 1s ease",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Link to="/login" style={{ textDecoration: 'none', width: '100%' }}>
          <MenuItem
             sx={{
              textAlign: 'center',
              fontSize: { xs: '1rem', sm: '1rem', md: '1.2rem' },
              padding: '0.5rem 0.5rem', color:"white",
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Login
          </MenuItem>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none', width: '100%' }}>
          <MenuItem
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1rem', sm: '1rem', md: '1.2rem' },
              padding: '0.5rem 0.5rem', color:"white",
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Register
          </MenuItem>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
