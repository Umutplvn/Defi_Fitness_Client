import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import {Select, MenuItem, TextField, FormControl, Button} from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import useAuthCall from "../hooks/useAuthCall";
import { useMediaQuery, createTheme } from '@mui/material';

const WorkoutProgram = () => {
const {name,workoutplan}=useSelector((state)=>state.auth)
const formatName = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
  return (
    <Box sx={{ pt:"2rem", pl: { xs: "2rem", sm: "6.5rem", md: "12rem" },
  }} >
    <Typography  sx={{ fontFamily: "Montserrat", fontWeight:"500" }}>
      Hey {formatName(name)}, <br />
      <br /> Your new workout plan is ready! <br />
      This month, we’re stepping it up to help you reach your goals.
      <br />
      <br />
      <a
        href={workoutplan}
        target="_blank"
        rel="noopener noreferrer"
      >
        Click here
      </a>
      {' '}to get started. <br />
      <br /> Remember, every workout counts. Let’s make this month your
      best one yet! <br />
      <br />
      Best regards, <br />
      Your Fitness Coach
    </Typography>
   
  </Box>  )
}

export default WorkoutProgram