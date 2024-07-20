import { Box } from "@mui/material";
import React, { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import PersonIcon from "@mui/icons-material/Person";
import MenuItem from "@mui/material/MenuItem";
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
          width: "100wh",
          height: "4rem",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pl: "1rem",
          pr: "1rem",
          zIndex: "2",
          maxWidth:"1536px",
          m:"auto"
        }}
      >
        {/* <Hamburger
          direction="right"
          size="22"
          toggled={isOpen}
          toggle={togglePlay}
        /> */}
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
        <PersonIcon />
      </Box>
      <Box
        sx={{
          zIndex: "1",
          height: "calc(100vh - 4rem)",
          backgroundColor: "black",
          color: "white",
          position: "absolute",
          top: isOpen ? "4rem" : "-100%",
          transition: "top 2s ease",
          left: 0,
          right: 0,
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Box>
    </Box>
  );
};

export default Header;
