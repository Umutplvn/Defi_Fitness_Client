import { Avatar, Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import formatDateTime from "../helper/formatDateTime";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Comments = ({ blog, setBlog }) => {
  const { axiosWithToken } = useAxios();
  const { avatar, userId, isAdmin } = useSelector((state) => state.auth);
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
      setText("");
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  //! DELETE A COMMENT
  const deleteComment = async ({ commentId }) => {
    try {
      const { data } = await axiosWithToken.delete(
        `${process.env.REACT_APP_BASE_URL}/comment/delete`,
        { params: { blogId, commentId } }
      );
      setBlog(data.result);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  return (
    <Box sx={{ mb: "7rem", width: "100%" }}>
      {/* TITLE */}
      <Typography
        sx={{
          width: "100%",
          color: "black",
          fontSize: "1.1rem",
          fontWeight: "600",
          mb: "1rem",
          fontFamily: "Montserrat",
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
            type: "form",

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
              onClick={() => setText("")}
              sx={{
                fontSize: "0.8rem",
                color: "red",
                cursor: "pointer",
                fontFamily: "Montserrat",
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={!text}
              onClick={createComment}
              sx={{
                fontSize: "0.8rem",
                color: "green",
                cursor: "pointer",
                fontFamily: "Montserrat",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>

      {/* MAP COMMENTS */}
      {blog?.comments
        ?.slice()
        .reverse()
        .map((item) => {
          return (
            <Box
              key={item?._id}
              sx={{ display: "flex", gap: "0.5rem", mb: "1rem", pr: "0.75rem" }}
            >
              <Avatar src={item.comment.avatar} />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "95%" }}>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {item.comment.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.9rem", fontFamily: "Montserrat" }}
                  >
                    {item.comment.text}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontFamily: "Montserrat",
                      color: "#7a7a7a",
                    }}
                  >
                    {formatDateTime(item.createdAt)}
                  </Typography>
                </Box>

                {(item?.comment?.userId == userId || isAdmin) && (
                  <HighlightOffIcon
                    onClick={() => deleteComment({ commentId: item?._id })}
                    sx={{ fontSize: "0.9rem", cursor: "pointer" }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default Comments;
