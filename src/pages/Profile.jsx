import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import "../styles/aboutCarousel.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import workoutplan from "../assets/workoutplan.svg";
import blog from "../assets/blog.svg";
import workoutpr from "../assets/weight.svg";
import size from "../assets/measuring-tape.svg";
import settingsvg from "../assets/settings.svg";
import ReactStars from "react-stars";
import { useSelector } from "react-redux";
import premiumsvg from "../assets/premium.svg";

const Profile = () => {
  const navigate = useNavigate();
  const { level, avatar } = useSelector((state) => state.auth);
  const Data = [
    {
      image: workoutplan,
      title: "Workout Plan",
      link: "/profile/workoutprogram",
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
      image: premiumsvg,
      title: "Change Plan",
      link: "/profile/changeplan",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        pl: { xs: "0", sm: "4.5rem", md: "10rem" },
        justifyContent: "center",
        pt: "3rem",
        mb: "10rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src={avatar} sx={{ width: "3.5rem", height: "3.5rem" }} />
        <ReactStars
          count={5}
          value={level}
          size={20}
          color2={"#ffd700"}
          edit={false}
        />
        <hr style={{ width: "90%" }} />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
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
    </Box>
  );
};

export default Profile;
