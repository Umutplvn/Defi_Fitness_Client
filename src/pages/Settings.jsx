import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { ProfileBox } from "../styles/globalStyle";
import useAuthCall from "../hooks/useAuthCall";
import { useSelector } from "react-redux";
import BasicModal from "../components/UpdateAvatar";
import UpdateUserInfo from "../components/UpdateUserInfo";
import ChangePass from "../components/ChangePass";
import AccountPage from "../components/AccountPage";

const Settings = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { logout,readUser } = useAuthCall();
  const { avatar, isAdmin,userId } = useSelector((state) => state?.auth);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    readUser(userId);
  }, []);


  return (
    <Box sx={{ pl: { xs: "0", sm: "5.5rem", md: "11rem"}, height: "100vh" }}>
      {/* Title */}
      <Typography
        sx={{
          padding: "1rem 0.5rem",
          fontSize: "1.2rem",
          fontWeight: "700",
          boxShadow: " rgba(17, 17, 26, 0.1) 0px 1px 0px ",
          backgroundColor: "#fdffff",
          mb: "1rem",
          fontFamily: "Montserrat",
        }}
      >
        Settings
      </Typography>
      <Box sx={{maxWidth:"1400px", m:"auto"}}>
        <BasicModal setOpen={setOpen} open={open} avatar={avatar} />

        <Box sx={ProfileBox}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "0.5rem",
            }}
            onClick={handleOpen}
          >
            <Avatar
              sx={{ width: "3.5rem", height: "3.5rem", cursor: "pointer" }}
              src={avatar}
            ></Avatar>
            <Typography
              sx={{
                color: "#FE5E00",
                fontFamily: "Montserrat",
                fontSize: "0.8rem",
                "&:hover": {
                  fontWeight: "600",
                  cursor: "pointer",
                },
              }}
            >
              EDIT
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: "1rem" }}>
          <UpdateUserInfo handleToggle={handleToggle} openIndex={openIndex} />
          <ChangePass handleToggle={handleToggle} openIndex={openIndex} />
          {!isAdmin && (
            <AccountPage handleToggle={handleToggle} openIndex={openIndex} />
          )}{" "}
        </Box>

      <Box sx={{  p:"1rem", display:"flex", justifyContent:"center"}}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#F2F2F2",
            color: "#242424",
            borderRadius: "1rem",
            width: "8rem",
            transition: "0.4s",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={logout}
        >
          <LogoutRoundedIcon sx={{ fontSize: "1rem" }} />
          LOGOUT
        </Button>
      </Box>
      </Box>
    </Box>
  );
};

export default Settings;
