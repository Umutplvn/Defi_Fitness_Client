import { Avatar, Box, Typography, Button, ButtonBase } from "@mui/material";
import React, { useState } from "react";
import formatDateTime from "../helper/formatDateTime";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";

const Comments = ({ blog, setBlog }) => {
  const { axiosWithToken } = useAxios();
  const { avatar } = useSelector((state) => state.auth);
  const [text, setText] = useState();
  const { blogId } = useParams();

//! CREATE A COMMENT   
  const createComment = async () => {
    try {
      const { data } = await axiosWithToken.post(
        `${process.env.REACT_APP_BASE_URL}/comment/${blogId}`,
        { blogId, text }
      );
      setBlog(data.result);
      setText("")
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  //! DELETE A COMMENT   
  const deleteComment = async (commentId) => {
    try {
      const { data } = await axiosWithToken.post(
        `${process.env.REACT_APP_BASE_URL}/comment/delete`,
        { blogId, commentId }
      );
      console.log(data);
    //   setBlog(data.result);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  return (
    <Box sx={{ mb: "7rem", width:"100%" }}>
      {/* TITLE */}
      <Typography
        sx={{
          width: "100%",
          color: "black",
          fontSize: "1.1rem",
          fontWeight: "600",
          fontFamily: "sans-serif",
          mb: "1rem",
        }}
      >
        Comments
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          mb: "1rem",
          alignItems: "flex-start",
        }}
      >
        <Avatar src={avatar} sx={{ mr: 1, my: 0.5 }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "end",
          }}
        >
          <TextField
          value={text}

            id="input-with-sx"
            sx={{ width: "100%" }}
            variant="standard"
            placeholder="Add a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Button
            onClick={()=>setText("")}
              sx={{ fontSize:"0.8rem", color: "red", cursor: "pointer" }}
            >
              Cancel
            </Button>
            <Button
            disabled={!text}
              onClick={createComment}
              sx={{ fontSize: "0.8rem", color: "green", cursor: "pointer" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>


      {/* MAP COMMENTS */}
      {blog?.comments?.slice().reverse().map((item) => {
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
