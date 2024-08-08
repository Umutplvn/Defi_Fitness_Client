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
import BasicModal from "./WorkoutPlan";
import { useState } from "react";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const Data = [
    {
      image: blog,
      title: "Blog",
      link: "/adminpanel/createblog",
    },
    {
      image: plan,
      title: "Workout Plan",
      link: "/adminpanel/workoutplan",
    },
    {
      image: premium,
      title: "Paid Plan",
      link: "/adminpanel/createpaidplan",
    },

    {
      image: video,
      title: "Video",
      link: "/adminpanel/sharevideo",
    },

    {
      image: members,
      title: "Members",
      link: "/adminpanel/members",
    },
  ];

  const navigateFunc = (item) => {
    if (item.title === "Workout Plan") {
      handleOpen();
    } else if (item.title == "Video") {
    } else {
      navigate(item.link);
    }
  };

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
      <BasicModal open={open} setOpen={setOpen} />

      {Data?.map((item, index) => (
        <Card
          key={index}
          onClick={() => navigateFunc(item)}
          sx={{
            width: { xs: "200px", md: "220px" },
            height: { xs: "240px", md: "280px" },
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
            sx={{ height: "70px", width: "70px" }}
            image={item.image}
          />
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                fontSize: "1.2rem",
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

export default AdminPanel;
