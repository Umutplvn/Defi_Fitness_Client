import React from "react";
import Box from "@mui/material/Box";
import DescriptionIcon from "@mui/icons-material/Description";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link } from "react-router-dom";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector } from "react-redux";
import TelegramIcon from '@mui/icons-material/Telegram';

const HomeTabBar = () => {
  const{isAdmin, membership}=useSelector((state)=>state.auth)
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
          padding: "10px",
        }}
      >
       {isAdmin &&    <Link to="/adminpanel">
          <AdminPanelSettingsIcon
            sx={{
              cursor: "pointer",
              ":hover": { scale: "1.1" },
              color: "black",
            }}
          />
        </Link>}

        <Link to="/videos">
          <PlayCircleIcon
            sx={{
              cursor: "pointer",
              ":hover": { scale: "1.1" },
              color: "black",
            }}
          />
        </Link>

        <Link to="/blogs">
          <DescriptionIcon
            sx={{
              cursor: "pointer",
              ":hover": { scale: "1.1" },
              color: "black",
            }}
          />
        </Link>

        {membership !=="Basic" &&  <Link
          to="/chats"
        >
          <TelegramIcon  sx={{
              cursor: "pointer",
              ":hover": { scale: "1.1" },
              color: "black",
            }}/>
        </Link>}
        
        <Link to="/paidcontent">
          <WorkspacePremiumIcon
            sx={{
              cursor: "pointer",
              ":hover": { scale: "1.1" },
              color: "black",
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default HomeTabBar;
