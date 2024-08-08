import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/defi-icon.jpeg";
import { useSelector } from "react-redux";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TelegramIcon from '@mui/icons-material/Telegram';
const HomeAppBarLarge = () => {
  const { avatar, isAdmin, membership } = useSelector((state) => state?.auth);


  return (
    <Box
      sx={{
        width: { sm: "4.5rem", md: "10rem" },
        height: "100vh",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        alignItems: "center",
        borderWidth: "0 4px 0 0",
        borderStyle: "solid",
        borderColor: "white",
        borderTopRightRadius: "1rem",
        pt: "3rem",
        zIndex: 4,
        maxWidth: "1536px",
        position: "fixed",
        left: "0",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "0",
          right: "0",
          width: "5px",
          height: "100%",
          background:
            "linear-gradient(to bottom, #FE5E00 0%, #FE5E00 50%,#FE5E00) 100%)",
          animation: "shine 4s infinite",
          borderRadius: "0 1rem 1rem 0",
          boxShadow: "0 0 4px #FE5E00",
        },
        "@keyframes shine": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
      }}
    >
      {/* LOGO */}
      <Link
        to="/blogs"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "3rem",
            cursor: "pointer",
          }}
        >
          <img
            src={Logo}
            alt="Rotating Logo"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
          <div
            style={{
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
            }}
          ></div>
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          mt: "50%",
        }}
      >
        {/* ADMIN PANEL */}

       {isAdmin && <Link
          to="/adminpanel"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "white"}}
        >
          <AdminPanelSettingsIcon style={{ fontSize: "2.2rem" }} />

          <Typography
            sx={{
              display: { xs: "none", md: "block",  fontFamily:"Montserrat"  },
              ml: 1,
            }}
          >
            Admin
          </Typography>
        </Link>}
{/* PROFILE */}
<Link
          to="/profile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "white",
          }}
        >
          <Avatar src={avatar} sx={{width:"2.2rem", height:"2.2rem"}} />

          <Typography
            sx={{
              display: { xs: "none", md: "block",  fontFamily:"Montserrat"  },
              ml: 1,
            }}
          >
            Profile
          </Typography>
        </Link>

        {/* BLOGS */}
        <Link
          to="/blogs"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "white",
          }}
        >
          <DescriptionIcon style={{ fontSize: "2.2rem" }} />

          <Typography
            sx={{
              display: { xs: "none", md: "block",  fontFamily:"Montserrat"  },
              ml: 1,
            }}
          >
            Blogs
          </Typography>
        </Link>


        {/* VIDEOS */}
        <Link
          to="/videos"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "white",
          }}
        >
          <PlayCircleIcon style={{ fontSize: "2.2rem" }} />

          <Typography
            sx={{
              display: { xs: "none", md: "block",  fontFamily:"Montserrat"  },
              ml: 1,
            }}
          >
            Videos
          </Typography>
        </Link>
   
        {/*ADMIN CHAT */}
        {(membership!=="Basic" ) &&  <Link
          to="/chats"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "white",
          }}
        >
          <TelegramIcon style={{ fontSize: "2.2rem",  }} />

          <Typography
            sx={{
              display: { xs: "none", md: "block", fontFamily:"Montserrat"  },
              ml: 1,
            }}
          >
            Chat
          </Typography>
        </Link>}
        {/* PAID CONTENT */}
        <Link
          to="/paidcontent"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "white",
          }}
        >
          <WorkspacePremiumIcon style={{ fontSize: "2.4rem" }} />

          <Typography
            sx={{
              display: { xs: "none", md: "block",  fontFamily:"Montserrat"  },
              ml: 1,
            }}
          >
            Exclusive
          </Typography>
        </Link>
             {/* PROFILE */}
       {!isAdmin &&       <Link
          to="/profile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "white",
          }}
        >
          {avatar ? (
            <Avatar src={avatar} sx={{ width: "2.2rem", height: "2.2rem" }} />
          ) : (
            <Avatar sx={{ width: "2.2rem", height: "2.2rem" }} />
          )}
          
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              ml: 1,
            }}
          >
            Profile
          </Typography>
        </Link>}

      </Box>
    </Box>
  );
};

export default HomeAppBarLarge;
