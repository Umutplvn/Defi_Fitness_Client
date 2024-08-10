import { Box, Typography } from "@mui/material";
import React from "react";
import "../styles/aboutCarousel.css";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import workoutplan from "../assets/workoutplan.svg"
import blog from "../assets/blog.svg";
import workoutpr from "../assets/weight.svg"
import size from "../assets/measuring-tape.svg"
import settingsvg from "../assets/settings.svg"
import editsvg from "../assets/edit.svg"


const Profile = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const Data = [

    {
      image: workoutplan,
      title: "Workout Plan",
      link: "/profile/workoutplan",
    },
    {
      image: blog,
      title: "Saved Blogs",
      link: "/profile/savedblogs",
    },

    {
      image: workoutpr,
      title: "Workout PR",
      link: "/profile/pr",
    },
    {
      image: size,
      title: "Body Size",
      link: "/profile/bodysize",
    },

    {
      image: settingsvg,
      title: "Settings",
      link: "/profile/settings",
    },
    {
      image: editsvg,
      title: "Edit Profile",
      link: "/profile/editprofile",
    },



  ];


  return (

    <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "2rem",
      // p: "2rem",
      ml: { xs: "0", sm: "6rem", md: "12rem" },
      justifyContent: "center",
      pt: "3rem",
      mb: "10rem",
    }}
  >
    {/* <BasicModal open={open} setOpen={setOpen} /> */}

    {Data?.map((item, index) => (
      <Card
        key={index}
        onClick={() => navigate(item.link)}
        sx={{
          width: { xs: "130px", md: "150px" },
          height: { xs: "140px", md: "160px" },
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "2rem",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
            scale: "1.001",
            transform: "ease in out",
            transition: "0.5s",
          },
        }}
      >
        <CardMedia
          sx={{ height: "60px", width: "60px" }}
          image={item.image}
        />
        <CardContent>
          <Typography
            gutterBottom
            sx={{
              fontSize: "0.8rem",
              fontWeight: "600",
              fontFamily: "Montserrat",
            }}
          >
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
    );
};

export default Profile;
