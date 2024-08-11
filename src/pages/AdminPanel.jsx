import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import members from "../assets/team.svg";
import blog from "../assets/blog.svg";
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
    <>
          <BasicModal open={open} setOpen={setOpen} />

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
          onClick={() => navigateFunc(item)}
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
    </>
  );
};

export default AdminPanel;
