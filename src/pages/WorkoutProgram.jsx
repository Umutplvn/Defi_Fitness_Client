import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const WorkoutProgram = () => {
  const { name, workoutplan } = useSelector((state) => state.auth);
  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  return (
    <Box sx={{width:"100%", display:"flex", justifyContent:"center",  pt: "3rem", pr:"2rem", pl: { xs: "2rem", sm: "6.5rem", md: "12rem" } }}>
      {workoutplan ? (
        <Typography sx={{maxWidth:"40rem", fontFamily: "Montserrat", fontWeight: "500" }}>
          Hey {formatName(name)}, <br />
          <br /> Your new workout plan is ready! <br />
          This month, we’re stepping it up to help you reach your goals.
          <br />
          <br />
          <a href={workoutplan} target="_blank" rel="noopener noreferrer">
            Click here
          </a>{" "}
          to get started. <br />
          <br /> Remember, every workout counts. Let’s make this month your best
          one yet! <br />
          <br />
          <Typography sx={{fontWeight:"600", fontFamily: "Montserrat",}}>
          Best regards, <br />
          Your Fitness Coach
          </Typography>
        </Typography>
      ) : (
        <Typography sx={{ maxWidth:"40rem", fontFamily: "Montserrat", fontWeight: "500" }}>
          Dear {formatName(name)}, <br />
          <br />
          We wanted to let you know that your new workout plan is currently in
          development. We are working diligently to ensure it meets your goals
          and expectations. <br />
          <br />
          Please stay tuned for further updates. We will notify you as soon as
          the plan is ready and available for you. <br />
          <br />
          Thank you for your patience and understanding. <br />
          <br />
          <Typography sx={{fontWeight:"600", fontFamily: "Montserrat",}}>
          Best regards, <br />
          Your Fitness Coach
          </Typography>
        
        </Typography>
      )}
    </Box>
  );
};

export default WorkoutProgram;
