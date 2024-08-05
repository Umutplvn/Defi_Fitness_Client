import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import members from "../assets/team.svg";
import blog from "../assets/blog.svg";
import video from "../assets/video.svg";
import premium from "../assets/premium.svg";
import plan from "../assets/plan.svg";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const AdminPanel = () => {
  const navigate = useNavigate();
  const Data = [
    {
      image: blog,
      title: "Create Blog",
      link: "/adminpanel/createblog",
    },
    {
      image: plan,
      title: "Workout Plan",
      link: "/adminpanel/workoutplan",
    },
    {
      image: premium,
      title: "Create Paid Plan",
      link: "/adminpanel/createpaidplan",
    },

    {
      image: video,
      title: "Share Video",
      link: "/adminpanel/sharevideo",
    },

    {
      image: members,
      title: "Members",
      link: "/adminpanel/members",
    },


  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        p: "1rem",
        ml: { xs: "0", sm: "6rem", md: "12rem" },
        justifyContent: "center",
        pt: "3rem",
        mb: "10rem",
      }}
    >
      {Data?.map((item, index) => (
        <Card
          key={index}
          onClick={() => navigate(item.link)}
          sx={{
            width: "270px",
            height: "240px",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "2rem",
            "&:hover": {
              boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
              scale: "1.001",
              transform: "ease in out",
              transition: "0.5s",
            },
          }}
        >
          <CardMedia
            sx={{ height: "100px", width: "100px" }}
            image={item.image}
          />
          <CardContent>
            <Typography
              gutterBottom
              sx={{ fontSize: "1.4rem", fontWeight: "600" }}
            >
              {item.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AdminPanel;
