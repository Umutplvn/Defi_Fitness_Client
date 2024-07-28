import React from "react";
import { Avatar, Box, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/defi-icon.jpeg";
import { useSelector } from "react-redux";
import HomeTabBar from "./HomeTabBar";

const HomeAppBar = () => {
  const { avatar } = useSelector((state) => state.auth);

  const headerStyles = {
    container: {
      position: "relative",
      width: "3rem",
      height: "3rem",
      cursor: "pointer",
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
          maxWidth: "1536px",
          m: "auto",
          position: "relative",
        }}
      >
        <Link to="/blogs" style={{ textDecoration: "none" }}>
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
        </Link>
        <Link to="/profile">
          {avatar ? (
            <Avatar src={avatar} sx={{ width: "3rem", height: "3rem" }} />
          ) : (
            <Avatar sx={{ width: "3rem", height: "3rem" }} />
          )}
        </Link>
      </Box>
      <HomeTabBar />

    </Box>
  );
};

export default HomeAppBar;
