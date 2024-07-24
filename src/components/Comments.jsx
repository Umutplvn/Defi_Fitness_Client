import { Avatar, Box, Typography, Button } from "@mui/material";
import React from "react";
import formatDateTime from "../helper/formatDateTime";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector } from "react-redux";

const Comments = ({ blog }) => {
  const {avatar}=useSelector((state)=>state.auth)
  return (
    <Box sx={{ mb: "7rem" }}>
                     {/* TITLE */}
      <Typography
        sx={{
          width: "100%",
          color: "black",
          fontSize: "1.1rem",
          fontWeight: "600",
          fontFamily: "sans-serif",
          mb:"1rem"
        }}
      >
        Comments

      </Typography>

<Box sx={{ display: 'flex', alignItems: 'flex-end', mb:"1rem", alignItems:"flex-start" }}>
        <Avatar src={avatar} sx={{ mr: 1, my: 0.5}} />
        <Box sx={{width:"100%", display:"flex", flexDirection:"column", gap:"0.5rem", alignItems:"end"}}>
        <TextField id="input-with-sx" sx={{width:"100%"}} variant="standard" placeholder="Add a comment..."/>
        <Box sx={{display:"flex", gap:"1rem"}}>

<Typography sx={{ fontSize:"0.9rem", color:"red", cursor:"pointer"}}>Cancel</Typography>
<Typography onClick={()=>console.log("submit")} sx={{fontSize:"0.9rem", color:"green", cursor:"pointer"}}>Submit</Typography>
        </Box>
        </Box>

      </Box>
      
 

      {/* MAP COMMENTS */}
      {blog?.comments.map((item) => {
        return (
          <Box
            key={item?._id}
            sx={{ display: "flex", gap: "0.5rem", mb: "1rem" }}
          >
            <Avatar src={item.comment.avatar} />
            <Box>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  fontFamily: "sans-serif",
                }}
              >
                {item.comment.name}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", fontFamily: "sans-serif" }}>
                {item.comment.text}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontFamily: "sans-serif",
                  color: "#7a7a7a",
                }}
              >
                {formatDateTime(item.createdAt)}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Comments;
